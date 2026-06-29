#!/bin/bash
set -e
cd /home/debian/617east
rm -rf dist
tar xzf /tmp/617east-dist.tar.gz
ls -la dist/assets/ | awk '{print $5, $NF}'
docker stop 617east-web 2>/dev/null || true
docker rm 617east-web 2>/dev/null || true
docker build -t 617east-web:latest . 2>&1
docker run -d \
  --name 617east-web \
  --network n8n_default \
  --restart unless-stopped \
  -l traefik.enable=true \
  -l traefik.http.routers.617east.rule="Host(\`617east.com\`)" \
  -l traefik.http.routers.617east.entrypoints=websecure \
  -l traefik.http.routers.617east.tls.certresolver=letsencrypt \
  -l traefik.http.services.617east.loadbalancer.server.port=80 \
  617east-web:latest
echo "DEPLOY_COMPLETE"
