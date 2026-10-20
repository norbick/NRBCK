# Mapa 3D NRBCK

`nrbck.pl` displays a fullscreen BlueMap of the Minecraft world. The generated
map is stored in `map/` and is published with every push to `main`.

`scripts/sync-bluemap.ps1` mirrors the current BlueMap output from the local
Minecraft server, commits it only when it changed, and pushes it to `main`.
The scheduled task named `NRBCK BlueMap deploy` runs that script every 30
minutes, so GitHub Pages redeploys the map automatically.

The public configuration in `server-config.js` must never contain passwords,
tokens, or RCON details.
