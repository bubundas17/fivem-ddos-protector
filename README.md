# fivem-ddos-protector

### Installation Guide

First git clone this repo.
Then open the nginx folder.
there you'll find setup.sh file
``` bash
git clone https://github.com/bubundas17/fivem-ddos-protector.git
```
``` bash
cd fivem-ddos-protector/nginx
```
Now run
``` bash
sudo bash setup.sh
```

It will install nginx nodejs and some other dependencies.

After that go back to root of this project and run 
``` bash
sudo npm install
```
now edit config.js and enter domain name and fivem server ip and port. 

> IMPORTENT 
Also enter the IP of current server to "serverIP" field of config.js

after that run
``` bash
sudo node update-nginx-conf.js
```

It will build nginx config and iniceate Iptables rules.
After that point A records to corosponding domains.

Now run the nodejs server

```bash
pm2 startup
pm2 start bin/www
pm2 save
```

### Adding/Removing Fivem domains/servers

open config.js
and add/remove domains from config.js

and run 
```
sudo node update-nginx-conf.js
```
To regenerate Nginx configs.

now restart nodejs webserver

``` bash
pm2 restart all
```


Server.CFG setup : 

```
sv_forceIndirectListing true
sv_listingHostOverride dbrpwhitelist.ml
sv_listingIpOverride "52.237.97.98"
sv_proxyIPPranges "52.237.97.98/32"
```
