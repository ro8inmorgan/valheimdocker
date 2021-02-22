[Unit]
Description=Valheim service
Wants=network.target
After=syslog.target network-online.target

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=root
WorkingDirectory=/home/steam/valheim
ExecStart=/home/steam/valheim/start_server.sh

[Install]
WantedBy=multi-user.target