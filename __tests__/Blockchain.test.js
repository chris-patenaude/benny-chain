const Blockchain = require("../Blockchain");

describe("The Blockchain class", () => {
	let blockchain, data;
	beforeEach(() => {
		blockchain = new Blockchain();
		data = [1,2,3];
	})

	it("Should initialize a new chain with a single genesis block", () => {
		expect(blockchain.chain).toHaveLength(1);
	})

	it("Should be able to add new block to the chain", () => {
		blockchain.addBlock(data);
		expect(blockchain.chain).toHaveLength(2);
	})
})