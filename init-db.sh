#!/bin/sh
set -eu
# À exécuter une seule fois après le démarrage de PostgreSQL.
docker compose exec -T guacamole /opt/guacamole/bin/initdb.sh --postgres \
  | docker compose exec -T database psql -v ON_ERROR_STOP=1 -U guacamole_user -d guacamole_db
echo "Schéma Guacamole initialisé. Redémarre Guacamole."
