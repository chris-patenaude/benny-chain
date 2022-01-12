const Websocket = require("ws");
const Blockchain = require("../blockchain");

const P2P_PORT = process.env.P2P_PORT || 5001;

// comma separated list of peer addresses (e.g. "wp://localhost:3002,wp://localhost:3003,ect.")
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
    /**
     * Creates an instance of a peer-to-peer server to facilitate blockchain synchronization
     * @param {Blockchain} blockchain The block chain being connected manipulated
     */
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    /**
     * Start the server and listen for new connections
     */
    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on("connection", (socket) => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for peer-to-peer connection on port: ${P2P_PORT}`);
    }

    /**
     * Connect to each peer address
     */
    connectToPeers() {
        peers.forEach((peer) => {
            const socket = new Websocket(peer);
            socket.on("open", () => this.connectSocket(socket));
        });
    }

    /**
     * Add a new socket connection
     * @param {Websocket} socket Websocket to be added to the pool
     */
    connectSocket(socket) {
        this.sockets.push(socket);
        this.messageHandler(socket);
        this.sendChain(socket);
        console.log("Socket connected");
    }

    /**
     * Add a message listener to a socket
     * @param {Websocket} socket Listener target
     */
    messageHandler(socket) {
        socket.on("message", (message) => {
            const data = JSON.parse(message);
            try {
                this.blockchain.replaceChain(data);
            } catch (error) {
                console.error(error.message);
            }
        });
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach((socket) => this.sendChain(socket));
    }
}

module.exports = P2PServer;
