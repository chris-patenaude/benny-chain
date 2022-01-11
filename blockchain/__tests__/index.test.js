const Blockchain = require("..");
const Block = require("../block");

describe("The Blockchain class", () => {
    let blockchain, data;
    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
        data = [1, 2, 3];
    });

    it("Should initialize a new chain with a single genesis block", () => {
        expect(blockchain.chain).toHaveLength(1);
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("Should be able to add new block to the chain", () => {
        blockchain.addBlock(data);
        expect(blockchain.chain).toHaveLength(2);
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

    it("Should validate a valid chain", () => {
        blockchain2.addBlock(data);
        blockchain2.addBlock(data);
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it("Should invalidate chains with corrupt a genesis block", () => {
        blockchain2.chain[0].data = "bad data";
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("Should invalidate chains with a corrupt block within the chain", () => {
        blockchain2.addBlock("good data");
        blockchain2.chain[1].data = "bad data";
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("Should accept a valid incoming chain that is longer then the current chain", () => {
        blockchain2.addBlock("some data");
        expect(() => blockchain.replaceChain(blockchain2.chain)).not.toThrowError();
        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    it("Should reject a valid incoming chain that less then or equal to the length of the current chain", () => {
        expect(() => blockchain.replaceChain(blockchain2.chain)).toThrowError();
        expect(blockchain.chain).toHaveLength(1);
    });

    it("Should reject a invalid incoming chain", () => {
        blockchain2.addBlock("good data");
        blockchain2.chain[1].data = "bad data";
        expect(() => blockchain.replaceChain(blockchain2.chain)).toThrowError();
        expect(blockchain.chain).toHaveLength(1);
        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });
});
