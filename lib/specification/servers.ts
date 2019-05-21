export const variables = {
    protocol: {
        enum: [
            "http",
            "https",
            "ws",
            "wss"
        ],
        default: "https"
    },
    basePath: {
        default: "v1"
    },
    port: {
        enum: [
            "3000",
            "4000"
        ],
        default: "4000"
    }
}

export const development = {
    url: "http://localhost:{port}/{basePath}",
    description: "",
    variables
};

export const production = {
    url: "http://localhost:{port}/{basePath}",
    description: "",
    variables: {
        protocol: {
            enum: [
                "http",
                "https",
                "ws",
                "wss"
            ]
        },
        basePath: {
            default: "v1"
        },
        port: {
            enum: [
                "3000",
                "4000"
            ],
            default: "4000"
        }
    }
};

export const localhost = {
    url: "http://localhost:{port}/{basePath}",
    description: "",
    variables: {
        protocol: {
            enum: [
                "http",
                "https",
                "ws",
                "wss"
            ]
        },
        basePath: {
            default: "v1"
        },
        port: {
            enum: [
                "3000",
                "4000"
            ],
            default: "4000"
        }
    }
};
