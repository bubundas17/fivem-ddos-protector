# fivem-ddos-protector

### Installation Guide

First git clone this repo.
Then open the nginx folder.
there you'll find setup.sh file
> git clone https://github.com/bubundas17/fivem-ddos-protector.git

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

Now run the nodejs server

> pm2 startup
> pm2 start bin/www
> pm2 save

### Adding/Removing Fivem domains/servers

open config.js
and add/remove domains from config.js

and run 
> sudo node update-nginx-conf.js

To regenerate Nginx configs.

now restart nodejs webserver

> pm2 restart all

