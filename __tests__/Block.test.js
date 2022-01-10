const Block = require("../Block");
const NOW = 123456789;

describe("The Block class", () => {
	let data, genesisBlock, block;
	beforeEach(() => {
		jest.spyOn(global.Date, 'now').mockImplementationOnce(() => NOW);
		data = [1,2,3];
		genesisBlock = Block.genesis();
		block = Block.mineBlock(genesisBlock, data);
	})
	it("Should print out a text description of an individual instance", () => {
		expect(block.toString()).toMatchSnapshot()
	})
	it("Should generate a genesis block for initializing the blockchain", () => {
		expect(genesisBlock.data).toHaveLength(0);
		expect(genesisBlock.hash).toEqual("f1r57-h45h");
		expect(genesisBlock.lastHash).toEqual("------------");
		expect(genesisBlock.timestamp).toEqual("Genesis Time");
	})
	it("Should generate a new block with a hash based on the previous block", () => {
		expect(block.data).toEqual(data);
		expect(block.hash).toMatchSnapshot();
		expect(block.lastHash).toEqual(genesisBlock.hash);
		expect(block.timestamp).toEqual(NOW);
	})
});