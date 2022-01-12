const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2PServer = require("./p2p-server");

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2PServer(blockchain);

app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
    res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect("/blocks"); // Not sure about this. Seems like we should return a 201 response, not redirect
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
p2pServer.listen();
