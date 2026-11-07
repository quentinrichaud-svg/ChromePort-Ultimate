# Architecture

```text
Chromebook / ChromeOS
  └─ ChromePort (GitHub Pages, statique)
       ├─ Analyse EXE/PE locale
       ├─ Analyse conteneur MSI/CFB locale
       └─ HTTPS → Apache Guacamole (serveur Linux)
                    └─ guacd → RDP réseau privé → machine Windows
```

GitHub Pages ne fournit ni calcul Windows, ni stockage privé, ni relais RDP. La machine Windows et le serveur Guacamole sont des composants externes nécessaires.
