FROM 10.10.65.127/public/library/nginx:stable-alpine-perl

ENV LANG en_US.UTF-8

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/"$TZ" /etc/localtime ; \
    echo "$TZ" > /etc/timezone; \
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories ; \
    apk add --no-cache tini;\
    apk add --no-cache sed 


RUN rm -f /etc/nginx/nginx.conf \
    && rm -f /etc/nginx/conf.d/default.conf
# nginx ssl
RUN mkdir -p /etc/nginx/ssl

COPY docker/nginx.k8s.conf /etc/nginx/nginx.conf


EXPOSE 80

RUN mkdir -p /usr/share/nginx/html


WORKDIR /usr/share/nginx/html

COPY ./dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
