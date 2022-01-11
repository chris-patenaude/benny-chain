const Block = require("./block");

class Blockchain {
    /**
     * Initializes an new Blockchain
     */
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * Initializes and adds a new block to the chain
     * @param {*} data Data to be stored
     */
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);
        return block;
    }

    /**
     * Validates the chain ensuring it has not been tampered with
     * @param {*} chain incoming chain to be validated
     */
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const prevBlock = chain[i - 1];
            if (block.lastHash !== prevBlock.hash || block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }

    /**
     * Replaces the current chain with a valid longer chain
     * @param {Block[]} newChain Chain to replace current chain
     */
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            throw new Error("Rejected: Incoming chain must be longer the current chain");
        }
        if (!this.isValidChain(newChain)) {
            throw new Error("Rejected: Incoming chain is invalid");
        }
        console.log("Accepted: Chain replaced");
        this.chain = newChain;
    }
}

module.exports = Blockchain;
