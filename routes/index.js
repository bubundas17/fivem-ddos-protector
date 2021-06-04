var express = require('express');
var router = express.Router();
const exec = require('sync-exec');
const path  = require("path");

let axios = require("axios");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Fivem DDOS Protect'});
});


router.get("/thumbnail.png", async (req, res) => {
    let image = path.join(__dirname, "../banner.png");
    let ip = req.headers["x-forwarded-for"];
    for(let i = 0; i <= 5; i++) {
        exec("sudo iptables -D INPUT -p tcp --dport 30120 -j DROP");
        exec("sudo iptables -D INPUT -p udp --dport 30120 -j DROP");
        exec(`sudo iptables -D INPUT -p tcp --dport 30120 -s ${ip} -j ACCEPT`);
        exec(`sudo iptables -D INPUT -p udp --dport 30120 -s ${ip} -j ACCEPT`);
    }
    
    exec(`sudo iptables -A INPUT -p tcp --dport 30120 -s ${ip} -j ACCEPT`);
    exec(`sudo iptables -A INPUT -p udp --dport 30120 -s ${ip} -j ACCEPT`);
    exec("sudo iptables -A INPUT -p udp --dport 30120 -j DROP");
    exec("sudo iptables -A INPUT -p tcp --dport 30120 -j DROP");
    console.log(ip);
    res.sendfile(image);
})


// Set Minimum Score required for this login.
let minScore = 0.5;  // 0 for no filter, 1 for maximum security (Probably no one will get pass)

router.post('/play', async (req, res) => {
    if(!req.body.token) return res.render('play', {title: 'Connect', ip: req.ip, error: true});
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=6LdzPgYbAAAAACOFvfEXDBFRJeEzp2hACpRikdgm&response=${req.body.token}`;
    // console.log(req.body);
    // console.log(req.headers);
    let ip = req.headers["x-forwarded-for"];
    try {
        let data = await axios.get(url)
        let resp = data.data;
        console.log(resp)
        if(!resp.success) return res.render('play', {title: 'Connect', ip: ip, error: true});
        if(resp.score < minScore) return res.render('play', {title: 'Connect', ip: ip, error: true});

        // All done, User Validated. Now add firewall rule to IPTables
        for(let i = 0; i <= 5; i++) {
            exec("sudo iptables -D INPUT -p tcp --dport 30120 -j DROP");
            exec("sudo iptables -D INPUT -p udp --dport 30120 -j DROP");
            exec(`sudo iptables -D INPUT -p tcp --dport 30120 -s ${ip} -j ACCEPT`);
            exec(`sudo iptables -D INPUT -p udp --dport 30120 -s ${ip} -j ACCEPT`);
        }
        
        exec(`sudo iptables -A INPUT -p tcp --dport 30120 -s ${ip} -j ACCEPT`);
        exec(`sudo iptables -A INPUT -p udp --dport 30120 -s ${ip} -j ACCEPT`);
        exec("sudo iptables -A INPUT -p udp --dport 30120 -j DROP");
        exec("sudo iptables -A INPUT -p tcp --dport 30120 -j DROP");
        res.render('play', {title: 'Connect', ip: ip});
    } catch (e) {
        console.log(e)
        res.render('play', {title: 'Connect', ip: ip, error: true});
    }

})

module.exports = router;
