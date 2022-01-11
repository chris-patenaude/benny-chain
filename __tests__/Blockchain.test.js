const Blockchain = require("../Blockchain");
const Block = require("../Block");

describe("The Blockchain class", () => {
	let blockchain, data;
	beforeEach(() => {
		blockchain = new Blockchain();
		data = [1,2,3];
	})

	it("Should initialize a new chain with a single genesis block", () => {
		expect(blockchain.chain).toHaveLength(1);
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	})

	it("Should be able to add new block to the chain", () => {
		blockchain.addBlock(data);
		expect(blockchain.chain).toHaveLength(2);
		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data)
	})
	it("Should validate a valid chain", () => {
		blockchain.addBlock(data);
		blockchain.addBlock(data);
		expect(blockchain.isValidChain(blockchain.chain)).toBeTruthy();
	})
	it("Should invalidate chains with corrupt genesis blocks", () => {
		const corruptChain = new Blockchain();
		corruptChain.chain[0].timestamp = "broken timestamp";
		expect(corruptChain.isValidChain(corruptChain.chain)).toBeFalsy();
	})
	it("Should invalidate chains with a corrupt block within the chain", () => {
		const corruptChain = new Blockchain();
		corruptChain.addBlock(data);
		corruptChain.addBlock(data);
		corruptChain.chain[1].timestamp = "broken timestamp";
		expect(corruptChain.isValidChain(corruptChain.chain)).toBeFalsy();
	})
})