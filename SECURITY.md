# Sécurité et limites

- L'analyseur lit les fichiers avec File API dans le navigateur ; aucun upload n'est codé.
- L'inventaire MSI/CFB n'est pas un décodage complet des tables relationnelles MSI.
- L'analyseur n'est pas un antivirus et ne certifie pas qu'un programme est sain.
- Guacamole doit être derrière HTTPS et protégé par authentification.
- Ne publie jamais le port RDP 3389 sur Internet.
- Aucun mot de passe ou jeton dans `index.html`, GitHub Pages ou un dépôt public.
- Connexion distante uniquement sur des appareils dont tu as l'autorisation.
- Un serveur public implique coûts, maintenance et responsabilité ; aucune gratuité permanente n'est garantie.
