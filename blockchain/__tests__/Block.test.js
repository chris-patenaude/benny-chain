const Block = require("../block");
const NOW = 123456789;
const CREATION = 1641801600000;

describe("The Block class", () => {
    let data, genesisBlock, block;
    beforeEach(() => {
        jest.spyOn(global.Date, "now").mockImplementation(() => NOW);
        data = [1, 2, 3];
        genesisBlock = Block.genesis();
        block = Block.mineBlock(genesisBlock, data);
    });
    it("Should print out a text description of an individual instance", () => {
        expect(genesisBlock.toString()).toMatchSnapshot();
    });
    it("Should generate a genesis block for initializing the blockchain", () => {
        expect(genesisBlock.data).toHaveLength(0);
        expect(genesisBlock.hash).toEqual("genesis-20221001");
        expect(genesisBlock.lastHash).toEqual("---");
        expect(genesisBlock.timestamp).toEqual(CREATION);
    });
    it("Should generate a new block with a valid hash and nonce value", () => {
        expect(block.data).toEqual(data);
        expect(block.lastHash).toEqual(genesisBlock.hash);
        expect(block.timestamp).toEqual(NOW);
        expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty));
    });
    it("Should lower the difficulty for slowly mined blocks", () => {
        expect(Block.adjustDifficulty(block, Infinity)).toEqual(block.difficulty - 1);
    });
    it("Should raise the difficulty for quickly mined blocks", () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    });
});
