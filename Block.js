class Block {
	/**
	 * Data structure outlining the basic component of a block chain
	 * @param {string} timestamp The time the block was created
	 * @param {string} lastHash Hash value of the previous block in the chain
	 * @param {string} hash Hash value of the current block
	 * @param {*} data Data stored in the current block
	 */
	constructor(timestamp, lastHash, hash, data) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}

	/**
	 * A string representation of a block instance
	 */
	toString() {
		return `Block - 
		Timestamp: ${this.timestamp}
		Last Hash: ${this.lastHash.substring(0,10)}...
		Hash     : ${this.hash.substring(0,10)}...
		Data     : ${this.data}`;
	}

	/**
	 * Creates the first block (i.e. Genesis block) in the blockchain
	 */
	static genesis() {
		return new this(
			"Genesis Time",
			'------------',
			'f1r57-h45h',
			[]
		)
	}

	/**
	 * Creates the next block in the chain based on the previously last block
	 * @param {Block} lastBlock Reference to the last block
	 * @param {*} data Data to be stored in new block
	 */
	static mineBlock(lastBlock, data) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const hash = "TODO - HASH";

		return new this(timestamp, lastHash, hash, data);
	}

}

module.exports = Block;