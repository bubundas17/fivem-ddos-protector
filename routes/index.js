var express = require('express');
var router = express.Router();

let axios = require("axios");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// Set Minimum Score required for this login.
let minScore = 0.5;  // 0 for no filter, 1 for maximum security (Probably no one will get pass)

router.post('/play', async (req, res) => {
    if(!req.body.token) return res.render('play', {title: 'Connect', ip: req.ip, error: true});
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=6LdzPgYbAAAAACOFvfEXDBFRJeEzp2hACpRikdgm&response=${req.body.token}`;
    // console.log(req.body);
    try {
        let data = await axios.get(url)
        let resp = data.data;
        console.log(resp)
        if(!resp.success) return res.render('play', {title: 'Connect', ip: req.ip, error: true});
        if(resp.score < minScore) return res.render('play', {title: 'Connect', ip: req.ip, error: true});

        // All done, User Validated. Now add firewall rule to IPTables
        
        res.render('play', {title: 'Connect', ip: req.ip});
    } catch (e) {
        console.log(e)
        res.render('play', {title: 'Connect', ip: req.ip, error: true});
    }

})

module.exports = router;
