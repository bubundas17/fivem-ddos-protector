#!/bin/sh
apt update;
apt install -y nginx nodejs npm
npm install -g pm2
# cp -f ./default /etc/nginx/sites-enabled/default
# cp -f ./proxy   /etc/nginx/modules-enabled/proxy.conf
mkdir /etc/nginx/streams-enabled/
cp -f ./nginx.conf /etc/nginx/nginx.conf