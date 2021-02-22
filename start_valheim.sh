#!/bin/sh
export templdpath=$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=/home/steam/valheim/linux64:$LD_LIBRARY_PATH
export SteamAppId=892970
echo "Starting server PRESS CTRL-C to exit"
/home/steam/valheim/valheim_server.x86_64 -name "$SERVER_NAME" -port 2456 -world "$WORLD_NAME" -password "$PASSWORD" -savedir "/home/steam/valheim/serverfiles"
export LD_LIBRARY_PATH=$templdpath