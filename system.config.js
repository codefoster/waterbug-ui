System.config({
    map: {
        "socket.io-client": "./node_modules/socket.io-client/socket.io.js"
    },
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import("app/main.js")
    .then(null, console.error.bind(console));