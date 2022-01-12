const { SHA256 } = require("crypto-js");
const { DIFFICULTY } = require("../config");

class Block {
    /**
     * Data structure outlining the basic component of a block chain
     * @param {string} timestamp The time the block was created
     * @param {string} lastHash Hash value of the previous block in the chain
     * @param {string} hash Hash value of the current block
     * @param {*} data Data stored in the current block
     */
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    /**
     * A string representation of a block instance
     */
    toString() {
        return `Block - 
		Timestamp: ${this.timestamp}
		Last Hash: ${this.lastHash.substring(0, 10)}...
		Hash     : ${this.hash.substring(0, 10)}...
		Nonce    : ${this.nonce}
		Data     : ${this.data}`;
    }

    /**
     * Creates the first block (i.e. Genesis block) in the blockchain
     */
    static genesis() {
        return new this(1641801600000, "---", "genesis-20221001", [], 0);
    }

    /**
     * Creates the next block in the chain based on the previously last block
     * @param {Block} lastBlock Reference to the last block
     * @param {*} data Data to be stored in new block
     */
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        let nonce = 0;
        const lastHash = lastBlock.hash;
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    /**
     * Generates an SHA-256 hash value based off of provided params
     * @param {string} timestamp
     * @param {string} lastHash
     * @param {*} data
     */
    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    /**
     * Creates a hash for an already created block
     * @param {Block} block The block to be hashed
     */
    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block;
        return this.hash(timestamp, lastHash, data, nonce);
    }
}

module.exports = Block;
