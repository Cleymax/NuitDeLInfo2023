FROM openjdk:8 as stage0
LABEL snp-multi-stage="intermediate"
LABEL snp-multi-stage-id="baff68ff-3338-455e-a959-fa679c06921b"
WORKDIR /opt/docker
COPY 2/opt /2/opt
COPY 4/opt /4/opt
USER root
RUN ["chmod", "-R", "u=rX,g=rX", "/2/opt/docker"]
RUN ["chmod", "-R", "u=rX,g=rX", "/4/opt/docker"]
RUN ["chmod", "u+x,g+x", "/4/opt/docker/bin/noeljsonrestapi"]

FROM openjdk:8 as mainstage
USER root
RUN id -u demiourgos728 1>/dev/null 2>&1 || (( getent group 0 1>/dev/null 2>&1 || ( type groupadd 1>/dev/null 2>&1 && groupadd -g 0 root || addgroup -g 0 -S root )) && ( type useradd 1>/dev/null 2>&1 && useradd --system --create-home --uid 1001 --gid 0 demiourgos728 || adduser -S -u 1001 -G root demiourgos728 ))
WORKDIR /opt/docker
COPY --from=stage0 --chown=demiourgos728:root /2/opt/docker /opt/docker
COPY --from=stage0 --chown=demiourgos728:root /4/opt/docker /opt/docker
USER 1001:0
ENTRYPOINT ["/opt/docker/bin/noeljsonrestapi"]
CMD []
