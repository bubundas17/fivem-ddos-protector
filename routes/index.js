var express = require('express');
var router = express.Router();
const exec = require('sync-exec');
const path  = require("path");

const config = require("../config");
let axios = require("axios");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: req.config.name, name: req.config.name});
});

router.get("/debug", (req, res) => {
    res.send(req.config)
})


router.get("/thumbnails/:id.png", async (req, res) => {
    let image = path.join(__dirname, `../thumbnails/${req.params.id}.png`);
    let ip = req.headers["x-forwarded-for"];
    for(let i = 0; i <= 5; i++) {
        exec(`sudo iptables -D INPUT -p tcp --dport ${req.config.fivemPort} -j DROP`);
        exec(`sudo iptables -D INPUT -p udp --dport ${req.config.fivemPort} -j DROP`);
        exec(`sudo iptables -D INPUT -p tcp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
        exec(`sudo iptables -D INPUT -p udp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
    }
    
    exec(`sudo iptables -A INPUT -p tcp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
    exec(`sudo iptables -A INPUT -p udp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
    exec(`sudo iptables -A INPUT -p udp --dport ${req.config.fivemPort} -j DROP`);
    exec(`sudo iptables -A INPUT -p tcp --dport ${req.config.fivemPort} -j DROP`);
    // console.log(ip);
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
            exec(`sudo iptables -D INPUT -p tcp --dport ${req.config.fivemPort} -j DROP`);
            exec(`sudo iptables -D INPUT -p udp --dport ${req.config.fivemPort} -j DROP`);
            exec(`sudo iptables -D INPUT -p tcp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
            exec(`sudo iptables -D INPUT -p udp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
        }
        
        exec(`sudo iptables -A INPUT -p tcp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
        exec(`sudo iptables -A INPUT -p udp --dport ${req.config.fivemPort} -s ${ip} -j ACCEPT`);
        exec(`sudo iptables -A INPUT -p udp --dport ${req.config.fivemPort} -j DROP`);
        exec(`sudo iptables -A INPUT -p tcp --dport ${req.config.fivemPort} -j DROP`);
        res.render('play', {title: 'Connect', ip: ip, fivemPort: req.config.fivemPort, serverIP: config.serverIP, name: req.config.name});
    } catch (e) {
        console.log(e)
        res.render('play', {title: 'Connect', ip: ip, error: true});
    }

})

module.exports = router;
