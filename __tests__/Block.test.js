const Block = require("../Block");


describe("The printStr() function", () => {
	it("Should print out a text description of an individual instance", () => {
		const block = new Block('foo', 'bar', 'zoo', 'baz');
		expect(block.toString()).toMatchSnapshot()
	})
});

describe("The genesis() function", () => {
	it("Should generate a genesis block for initializing the blockchain", () => {
		const genesisBlock = Block.genesis();
		expect(genesisBlock.data).toHaveLength(0);
		expect(genesisBlock.hash).toEqual("f1r57-h45h");
		expect(genesisBlock.lastHash).toEqual("------------");
		expect(genesisBlock.timestamp).toEqual("Genesis Time");
	})
})

describe("The mineBlock() function", () => {
	it("Should generate a new block with a hash based on the previous block", () => {
		jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 123456789)
		const prevBlock = Block.genesis();
		const newBlock = Block.mineBlock(prevBlock, [1, 2, 3])
		expect(newBlock.data).toEqual([1,2,3]);
		expect(newBlock.hash).toEqual("TODO - HASH");
		expect(newBlock.lastHash).toEqual("f1r57-h45h");
		expect(newBlock.timestamp).toEqual(123456789);
	})
})