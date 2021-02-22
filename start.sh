#!/bin/sh
#echo '*/30 * * * * root /home/steam/steamcmd/steamcmd.sh +login anonymous +force_install_dir /home/steam/valheim +app_update 896660 +quit\n' > /etc/cron.d/valheimupdate

# echo '0 */4 * * * root /etc/init.d/valheim restart\n' > /etc/cron.d/valheimrestart

# /etc/init.d/cron start
/home/steam/steamcmd/steamcmd.sh +login anonymous +force_install_dir /home/steam/valheim +app_update 896660 +quit 
#/etc/init.d/valheim start

echo "server is now starting up, try connecting within a few minutes"
cd /home/steam/valheimgui
npm install
npm run dev &

/bin/bash
