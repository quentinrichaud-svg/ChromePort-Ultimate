# ChromePort Ultimate v1.1 — kit source

## Contenu
- `index.html` : interface web, analyseur local et onglet bureau distant.
- `src/msi-inspector.js` : lecteur CFB/OLE local et inventaire des flux MSI.
- `deploy/` : Docker Compose Guacamole + PostgreSQL et exemple Caddy HTTPS.
- `docs/` : architecture, sécurité et déploiement.

## Publication GitHub Pages
Remplace `index.html` dans la racine du dépôt et ajoute `src/msi-inspector.js` en conservant le chemin. GitHub Pages héberge uniquement le client statique.

## Limites
Ce kit ne fournit PAS de machine Windows gratuite ni de serveur public. Une session réelle exige un serveur Linux administré, Apache Guacamole, une machine Windows allumée et accessible en RDP sur un réseau privé, ainsi qu'un HTTPS valide. Le streaming Guacamole est HTML5 sur HTTP(S)/WebSocket, pas du WebRTC natif et pas optimisé pour le jeu à faible latence.

Les fichiers EXE/MSI sélectionnés dans ChromePort restent dans le navigateur : aucun upload ni exécution.
