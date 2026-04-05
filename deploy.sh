#!/bin/bash
# Deploy script for world.amirtech.ai
# Run on Hetzner server: /opt/xworld/deploy.sh

set -e
cd "$(dirname "$0")"

echo "=== XWorld Deploy ==="
echo "Pulling latest changes..."
git pull origin main

echo "Rebuilding Docker image..."
docker compose up -d --build --remove-orphans

echo "Cleaning up dangling images..."
docker image prune -f

echo "Waiting for app to start..."
sleep 10

# Health check
if curl -sf http://localhost:3010/ > /dev/null 2>&1; then
    echo "✓ App is live at http://localhost:3010"
    echo "✓ world.amirtech.ai is ready"
else
    echo "⚠ Health check failed - check: docker compose logs xworld"
fi

echo "Deployed at $(date)"
