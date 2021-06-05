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
            id: "s1fivemshield",
            domain: "fivemshield.xyz",
            default: true,
            name: "fivemshield Online",
            reSecret: "",
            reSiteKey: "",
            fivemIP: "52.188.112.219",
            fivemPort: 30120
        },
        {
            id: "fivemshield",
            domain: "s1.fivemshield.xyz",
            name: "fivemshield Online",
            reSecret: "",
            reSiteKey: "",
            fivemIP: "52.188.112.219",
            fivemPort: 30121
        },
        // {
        //     id: "default",
        //     default: true,          // Fallback all other domains to this config
        //     domain: "default.xyz",
        //     name: "default Online",
        //     reSecret: "",
        //     reSiteKey: "",
        //     fivemIP: "52.188.112.219",
        //     fivemPort: 30127
        // }
    ]
}