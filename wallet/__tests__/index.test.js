const Wallet = require("..");
const TransactionPool = require("../transaction-pool");

describe("The Wallet class", () => {
    let wallet, transactionPool;
    beforeEach(() => {
        wallet = new Wallet();
        transactionPool = new TransactionPool();
    });

    describe("when creating a transaction", () => {
        let transaction, sendAmount, recipient;
        beforeEach(() => {
            sendAmount = 50;
            recipient = "r4nd0m-4ddr355";
            transaction = wallet.createTransaction(recipient, sendAmount, transactionPool);
        });

        describe("and repeating the same transaction", () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, transactionPool);
            });

            it("should subtract twice the send amount from the wallet balance", () => {
                expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount).toEqual(
                    wallet.balance - sendAmount * 2
                );
            });

            it("should clone the send amount output for the recipient", () => {
                expect(
                    transaction.outputs.filter((output) => output.address === recipient).map((output) => output.amount)
                ).toEqual([sendAmount, sendAmount]);
            });
        });
    });
});
