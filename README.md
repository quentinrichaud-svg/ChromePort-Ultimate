# ChromePort Ultimate — Free Edition (v1.0 alpha)

Prototype web accessible depuis ChromeOS, sans installation locale.

## Ce qui fonctionne
- Interface responsive en HTML/CSS/JavaScript.
- Sélection ou glisser-déposer d'un fichier `.exe` ou `.msi`.
- Analyse locale des signatures MZ/PE et OLE/CFB.
- Lecture de l'architecture PE x86/x64/ARM/ARM64 lorsque l'en-tête est présent dans l'aperçu.
- Export d'un rapport texte.
- Aucun fichier n'est envoyé ni exécuté.

## Ce qui ne fonctionne PAS encore
- Aucun décodage complet des tables MSI.
- Aucun lancement Windows.
- Aucun serveur Windows, RDP ou flux vidéo intégré.
- Aucun transfert de fichier vers un serveur.
- Aucun système de compte ou de sessions.

## Hébergement gratuit
1. Créer un dépôt GitHub public nommé `ChromePort-Ultimate`.
2. Ajouter `index.html` à la racine.
3. Dans Settings → Pages, choisir Deploy from a branch, `main`, `/ (root)`.
4. Ouvrir l'URL GitHub Pages depuis ChromeOS.

## Architecture cible
- Frontend statique : GitHub Pages.
- Analyseur : navigateur, local-first.
- Passerelle de session : backend HTTPS avec authentification.
- Bureau Windows : VM Windows autorisée, isolée et réinitialisable.
- Accès navigateur : Apache Guacamole (RDP HTML5) ou client WebRTC dédié.
- Signalisation WebRTC : serveur HTTPS/WSS.
- Entrées : clavier/souris uniquement dans la session active, avec autorisation explicite.

GitHub Pages ne peut pas héberger le backend ni une VM Windows. Les offres gratuites de fonctions serverless ne remplacent pas un poste Windows persistant. Ne jamais placer de mot de passe, jeton GitHub ou secret dans le code frontend.

## Sécurité minimale avant une vraie session
- Authentification et contrôle d'accès par session.
- HTTPS obligatoire.
- Jetons courts et révocables.
- VM non privilégiée, sans accès au réseau local par défaut.
- Confirmation explicite avant transfert et installation.
- Journalisation, limite de taille, antivirus côté serveur et suppression des fichiers temporaires.
- Arrêt automatique de la VM et restauration d'un snapshot.
