module.exports = [
    {
        "path": "/",
        "key": "landing",
        "component": require("../components/landing/landing.jsx").default,
        "exact": true
    },
    {
        "path": "/valuable",
        "key": "valuable",
        "component": require("../components/valuable/valuable-main.jsx").default,
        "exact": true
    },
    {
        "path": "/valuable/edit/:name",
        "key": "valuable",
        "component": require("../components/valuable/valuable-edit.jsx").default,
        "exact": false
    },
    {
        "path": "/valuable/crawler",
        "key": "valuable",
        "component": require("../components/valuable/crawler-valuable").default,
        "exact": false
    },
    {
        "path": "/talent",
        "key": "talent",
        "component": require("../components/talent/talent.jsx").default,
        "exact": false
    },
    {
        "path": "/partner",
        "key": "partner",
        "component": require("../components/partner/partner.jsx").default,
        "exact": false
    }
]