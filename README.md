# fivem-ddos-protector

### Installation Guide

First git clone this repo.
Then open the nginx folder.
there you'll find setup.sh file

Now run
> sudo bash setup.sh

It will install nginx nodejs and some other dependencies.

After that go back to root of this project and run 
> npm install

now edit config.js and enter domain name and fivem server ip and port. 

> IMPORTENT 
Also enter the IP of current server to "serverIP" field of config.js

after that run
> sudo node update-nginx-conf.js

It will build nginx config and iniceate Iptables rules.

After that point A records to corosponding domains. 
and you are good to go.

# fivem-ddos-protector

### Installation Guide by SubhamPRO

> git clone https://github.com/bubundas17/fivem-ddos-protector.git
> cd fivem-ddos-protector
> cd nginx
> sudo bash ./setup.sh
> cd ..
> sudo npm install -g pm2
> pm2 startup
> sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u SG-PXY(USERNAME) --hp /home/SG-PXY(PATH)
> pm2 start bin/www
> npm install
> pm2 restart all
> sudo mv /etc/nginx/conf.d/proxy.conf /etc/nginx/modules-enabled/
> sudo nginx -t (CHECK STATUS)
> sudo nano /etc/nginx/modules-enabled/proxy.conf
> sudo service nginx restart
> cd /etc/nginx/modules-enabled/
> cd fivem-ddos-protector/
> sudo nano config.js (now edit config.js and enter domain name and fivem server ip and port.)
> sudo node update-nginx-conf.js


After upper instruction done point doamin to proxy ip !
