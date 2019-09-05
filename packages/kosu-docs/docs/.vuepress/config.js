module.exports = {
    plugins: [
        [
            "@vuepress/google-analytics",
            {
                ga: "UA-121297415-3            ", // UA-00000000-0
            },
        ],
    ],
    title: "Kosu Docs",
    head: [
        ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
        ["link", { rel: "manifest", href: "/site.webmanifest" }],
        ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#2b5797" }],
        // ['link', { rel: "preload", type: "font/otf", as: "font", crossorigin: "anonymous", href: "/Gilroy-Medium.otf" }],
        ["meta", { name: "msapplication-TileColor", content: "#2b5797" }],
        ["meta", { name: "theme-color", content: "#ffffff" }],
    ],
    description: "Kosu Documentation and Reference",
    base: "/",
    themeConfig: {
        logo: "/docs-logo.png",
        editLinks: true,
        editLinkText: "View source on GitHub",
        lastUpdated: true,
        sidebarDepth: 3,
        docsRepo: "paradigmfoundation/docs",
        docsDir: "docs",
        nav: [{ text: "Home", link: "https://paradigm.market/" }],
        sidebar: [
            {
                title: "Kosu Overview",
                collapsable: true,
                food: "1.svg",
                children: [
                    "/",
                    "/overview/",
                    "/overview/token-mechanics",
                    "/overview/validator-curation",
                    "/overview/contributing",
                ],
            },
            {
                title: "Kosu.js",
                collapsable: true,
                food: "2.svg",
                children: [
                    "/kosu.js/",
                    "/kosu.js/classes/kosu",
                    "/kosu.js/classes/kosutoken",
                    "/kosu.js/classes/eventemitter",
                    "/kosu.js/classes/nodeclient",
                    "/kosu.js/classes/ordergateway",
                    "/kosu.js/classes/orderhelper",
                    "/kosu.js/classes/posterregistry",
                    "/kosu.js/classes/treasury",
                    "/kosu.js/classes/validatorregistry",
                    "/kosu.js/classes/voting",
                ],
            },
            {
                title: "Kosu system contracts",
                collapsable: true,
                food: "3.svg",
                children: [
                    "/kosu-system-contracts/",
                    "/kosu-system-contracts/AuthorizedAddresses",
                    "/kosu-system-contracts/EventEmitter",
                    "/kosu-system-contracts/KosuToken",
                    "/kosu-system-contracts/OrderGateway",
                    "/kosu-system-contracts/PosterRegistry",
                    "/kosu-system-contracts/PosterRegistryProxy",
                    "/kosu-system-contracts/Treasury",
                    "/kosu-system-contracts/ValidatorRegistry",
                    "/kosu-system-contracts/Voting",
                ],
            },
            {
                title: "Go Kosu",
                collapsable: true,
                food: "4.svg",
                children: ["/go-kosu/", "/go-kosu/kosu_rpc"],
            },
        ],
    },
};
