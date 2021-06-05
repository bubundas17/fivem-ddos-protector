#!/usr/bin/env node
// sudo certbot --agree-tos --nginx -n -m bubundas17@gmail.com --domains s1.fivemshield.xyz

let config = require("./config")

let fs = require("fs")
let path = require("path");
let Handlebars = require("handlebars");
const exec = require('sync-exec');

(async () => {
    updateNginx();
    updateIptables();
    console.log("Restarting Nginx")
    exec(`sudo service nginx restart`);
})()

function updateIptables() {
    console.log("Reseting Iptables Rules.")
    exec("sudo iptables -F");
    exec("sudo iptables -X");
    for (let server of config.servers) {
        console.log("Writing Iptables Rules for " + server.domain)
        for (let i = 0; i <= 5; i++) {
            exec(`sudo iptables -D INPUT -p tcp --dport ${server.fivemPort} -j DROP`);
            exec(`sudo iptables -D INPUT -p udp --dport ${server.fivemPort} -j DROP`);
            for (let ip of config.defaultWhitelistIps) {
                exec(`sudo iptables -D INPUT -p tcp --dport ${server.fivemPort} -s ${ip} -j ACCEPT`);
                exec(`sudo iptables -D INPUT -p udp --dport ${server.fivemPort} -s ${ip} -j ACCEPT`);
            }
        }
        for (let ip of config.defaultWhitelistIps) {
            exec(`sudo iptables -A INPUT -p tcp --dport ${server.fivemPort} -s ${ip} -j ACCEPT`);
            exec(`sudo iptables -A INPUT -p udp --dport ${server.fivemPort} -s ${ip} -j ACCEPT`);
        }
        exec(`sudo iptables -A INPUT -p tcp --dport ${server.fivemPort} -j DROP`);
        exec(`sudo iptables -A INPUT -p udp --dport ${server.fivemPort} -j DROP`);
    }
}

function updateNginx() {
    console.log("Removing Old NGINX Rules")
    exec("rm -rf /etc/nginx/sites-enabled/*")
    exec("rm -rf /etc/nginx/streams-enabled/*")
    let stream = fs.readFileSync("./nginx-templates/stream.hbs");
    let streamCompile = Handlebars.compile(stream.toString());

    let domain = fs.readFileSync("./nginx-templates/domain.hbs");
    let domainCompile = Handlebars.compile(domain.toString());

    for (let server of config.servers) {
        // let compiled = Handlebars.precompile(template);
        // console.log(compiled);
        console.log("Writing Nginx Conf for " + server.domain)
        fs.writeFileSync(`/etc/nginx/streams-enabled/${server.id}.conf`, streamCompile(server))
        fs.writeFileSync(`/etc/nginx/sites-enabled/${server.id}.conf`, domainCompile(server))
    }
}