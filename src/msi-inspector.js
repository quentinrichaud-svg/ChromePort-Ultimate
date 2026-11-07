// Local CFB/OLE reader for MSI stream inventory. No upload or execution.
export async function inspectMsi(file) {
 if(file.size>512*1024*1024)throw new Error("Fichier supérieur à 512 Mo.");
 const b=await file.arrayBuffer(),bytes=new Uint8Array(b),v=new DataView(b),sig=[208,207,17,224,161,177,26,225];
 if(sig.some((x,i)=>bytes[i]!==x))throw new Error("Signature OLE/CFB invalide.");
 const ss=1<<v.getUint16(30,true),ms=1<<v.getUint16(32,true);
 if(![512,4096].includes(ss)||ms!==64)throw new Error("Version CFB non prise en charge.");
 const FREE=0xffffffff,END=0xfffffffe,FAT=0xfffffffd,DIF=0xfffffffc;
 const sector=id=>{let o=(id+1)*ss;if(id<0||o+ss>bytes.length)throw new Error("Secteur hors limites.");return bytes.subarray(o,o+ss)};
 let ids=[];for(let i=0;i<109;i++){let x=v.getUint32(76+i*4,true);if(x!==FREE)ids.push(x)}
 let dif=v.getUint32(68,true),dc=v.getUint32(72,true);
 for(let n=0;n<dc&&dif!==END&&dif!==FREE&&n<10000;n++){let s=sector(dif),d=new DataView(s.buffer,s.byteOffset,s.byteLength);for(let p=0;p<ss-4;p+=4){let x=d.getUint32(p,true);if(x!==FREE)ids.push(x)}dif=d.getUint32(ss-4,true)}
 let fat=[];for(let id of ids){let s=sector(id),d=new DataView(s.buffer,s.byteOffset,s.byteLength);for(let p=0;p<ss;p+=4)fat.push(d.getUint32(p,true))}
 const chain=(start,t=fat,lim=100000)=>{let a=[],seen=new Set(),x=start;while(x!==END&&x!==FREE&&x!==FAT&&x!==DIF&&x<t.length&&a.length<lim&&!seen.has(x)){seen.add(x);a.push(x);x=t[x]}return a};
 const read=a=>{let o=new Uint8Array(a.length*ss);a.forEach((x,i)=>o.set(sector(x),i*ss));return o};
 let db=read(chain(v.getUint32(48,true))),dirs=[];
 for(let p=0;p+128<=db.length;p+=128){let d=new DataView(db.buffer,db.byteOffset+p,128),len=d.getUint16(64,true),name='';if(len>=2&&len<=64)for(let j=0;j<len-2;j+=2)name+=String.fromCharCode(d.getUint16(j,true));if(name)dirs.push({name,type:d.getUint8(66),start:d.getUint32(116,true),size:Number(d.getBigUint64(120,true))})}
 let root=dirs.find(x=>x.type===5);if(!root)throw new Error("Répertoire racine absent.");
 let cutoff=v.getUint32(56,true),mfs=v.getUint32(60,true),mfc=v.getUint32(64,true),mf=[];
 if(mfs!==END&&mfs!==FREE){let z=read(chain(mfs,fat,mfc||100000)),d=new DataView(z.buffer,z.byteOffset,z.byteLength);for(let p=0;p+4<=z.length;p+=4)mf.push(d.getUint32(p,true))}
 let rd=read(chain(root.start));
 const mini=e=>{let a=chain(e.start,mf),o=new Uint8Array(Math.min(e.size,a.length*ms));a.forEach((x,i)=>{let p=x*ms,q=Math.min(p+ms,o.length);if(p<rd.length&&q>p)o.set(rd.subarray(p,q),p)});return o};
 let streams=dirs.filter(x=>x.type===2).map(e=>({name:e.name,size:e.size,data:e.size===0?new Uint8Array():e.size<cutoff?mini(e):read(chain(e.start)).subarray(0,e.size)}));
 let names=streams.map(x=>x.name),wanted=["\\u0005SummaryInformation","_StringPool","_StringData","_Tables","_Columns","_Validation"];
 return {sectorSize:ss,miniSectorSize:ms,directoryEntries:dirs.length,streams:streams.map(({name,size})=>({name,size})),found:wanted.map(name=>({name,present:names.includes(name)})),stringPoolBytes:streams.find(x=>x.name==="_StringPool")?.size||0,stringDataBytes:streams.find(x=>x.name==="_StringData")?.size||0};
}
