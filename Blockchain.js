const Block = require("./Block");

class Blockchain {

	/**
	 * Initializes an new Blockchain
	 */
    constructor() {
        this.chain = [Block.genesis()];
    }

	/**
	 * Initializes and adds a new block to the chain
	 * @param {*} data 
	 */
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);
        return block;
    }
}

module.exports = Blockchain;