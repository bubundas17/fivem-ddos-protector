#!/bin/sh
apt update;
apt install -y nginx nodejs npm
cp ./default /etc/nginx/sites-enabled/default
cp ./proxy  /etc/nginx/conf.d/proxy.conf
