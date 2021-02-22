FROM cm2network/steamcmd:latest


LABEL maintainer="robin@robinmorgan.nl"

EXPOSE 2456/udp
EXPOSE 2457/udp
EXPOSE 2458/udp
EXPOSE 3000/tcp

COPY ./valheimgui /home/steam/valheimgui
COPY start.sh /home/steam/
COPY start_valheim.sh /home/steam/
COPY valheim /etc/init.d/


USER root
RUN ["/usr/bin/apt-get","update"]
RUN ["/usr/bin/apt-get","--assume-yes","install","cron","procps","daemon","nodejs","npm"]
RUN ["chmod","+x","/home/steam/start.sh"]
RUN ["chown","steam:steam","/home/steam/start.sh"]
RUN ["chmod","+x","/home/steam/start_valheim.sh"]
RUN ["chown","steam:steam","/home/steam/start_valheim.sh"]
RUN ["chmod","+x","/etc/init.d/valheim"]
RUN ["chown","steam:steam","/etc/init.d/valheim"]

CMD  ["/home/steam/start.sh"]
#CMD  ["/bin/bash"]

