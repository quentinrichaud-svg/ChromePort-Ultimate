# Déploiement Guacamole

## Pré-requis
Serveur Linux administré, Docker Engine + Compose, machine Windows compatible RDP sur réseau privé, et domaine DNS + HTTPS pour un accès public. Demande l'aide d'un adulte responsable pour l'hébergement et les accès.

## 1. Secrets
Dans `docker-compose.yml`, remplace `CHANGE_THIS_LONG_RANDOM_PASSWORD` par le même mot de passe long et aléatoire dans les deux services. Ne publie jamais un vrai secret dans un dépôt public. En production, utilise un fichier `.env` non versionné ou des secrets Docker.

## 2. Démarrage
Depuis `deploy/` :
```bash
docker compose up -d database guacd guacamole
docker compose ps
```
Guacamole est lié à `127.0.0.1:8080` sur l'hôte.

## 3. Initialiser PostgreSQL
Le schéma doit être créé avant la première connexion. Exécute une fois :
```bash
chmod +x init-db.sh
./init-db.sh
docker compose restart guacamole
```
Si cela échoue, consulte `docker compose logs guacamole database` et arrête-toi avant d'exposer le service.

## 4. HTTPS
Adapte `Caddyfile.example` avec ton domaine. Caddy doit pouvoir recevoir les connexions sur 80/443. N'expose pas le port 8080 publiquement.

## 5. Connexion Windows
Dans Guacamole, change immédiatement les identifiants initiaux et crée une connexion RDP :
- Hostname : adresse privée Windows joignable depuis `guacd`.
- Port : 3389 sur le réseau privé.
- Compte Windows dédié et limité.
- N'active pas le partage de disques, imprimantes ou presse-papiers sans nécessité.

Le réseau doit permettre à `guacd` de joindre Windows. N'ouvre jamais RDP directement sur Internet.

## 6. ChromePort
Dans l'onglet Bureau distant, saisis l'URL HTTPS Guacamole puis Enregistrer. Si le serveur interdit l'intégration iframe, utilise Ouvrir dans un onglet.

## 7. Contrôles
HTTPS et certificat valides, mots de passe changés, comptes individuels, RDP privé/VPN uniquement, mises à jour et sauvegardes.

Références : https://guacamole.apache.org/doc/gug/ ; https://guacamole.apache.org/doc/gug/guacamole-docker.html ; https://learn.microsoft.com/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access
