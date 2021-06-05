module.exports = {
    defaultWhitelistIps: [
        "201.42.94.22",
        "146.59.193.195",
        "51.210.126.15",
        "51.178.63.83",
        "178.33.224.212",
        "5.135.143.71",
        "121.4.163.148"
    ],
    serverIP: "20.198.111.120",
    servers: [
        {
            id: "olrp",
            domain: "olrp.online",
            name: "OLRP Online",
            reSecret: "",
            reSiteKey: "",
            fivemIP: "152.126.50.5",
            fivemPort: 30125
        },
        {
            id: "fivemshield",
            domain: "fivemshield.xyz",
            name: "fivemshield Online",
            reSecret: "",
            reSiteKey: "",
            fivemIP: "152.126.50.5",
            fivemPort: 30126
        },
        {
            id: "default",
            default: true,          // Fallback all other domains to this config
            domain: "default.xyz",
            name: "default Online",
            reSecret: "",
            reSiteKey: "",
            fivemIP: "152.126.50.5",
            fivemPort: 30127
        }
    ]
}