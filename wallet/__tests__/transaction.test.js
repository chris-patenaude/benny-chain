const Transaction = require("../transaction");
const Wallet = require("..");

describe("The Transaction class", () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = "r3c1p13nt";
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it("Should outputs the amount subtracted from the wallet balance", () => {
        expect(transaction.outputs.find((outputs) => outputs.address === wallet.publicKey).amount).toEqual(
            wallet.balance - amount
        );
    });

    it("Should outputs the amount subtracted from the wallet balance", () => {
        expect(transaction.outputs.find((outputs) => outputs.address === recipient).amount).toEqual(amount);
    });

    it("Should reject transactions that reduce the senders balance below zero", () => {
        amount = Infinity;
        expect(() => Transaction.newTransaction(wallet, recipient, amount)).toThrowError();
    });

    it("Should input the balance of the wallet", () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it("Should validate a valid transaction", () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it("Should invalidate a corrupt transaction", () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe("and updating a transaction", () => {
        let nextAmount, nextRecipient;
        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = "n3xt-4ddr355";
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it("Should accept updates with value that do not exceed the senders balance", () => {
            expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount).toEqual(
                wallet.balance - amount - nextAmount
            );
        });

        it("should output an amount for the next recipient", () => {
            expect(transaction.outputs.find((output) => output.address === nextRecipient).amount).toEqual(nextAmount);
        });

        it("should reject updates that exceed the senders balance", () => {
            expect(() => transaction.update(wallet, nextRecipient, Infinity)).toThrowError();
        });
    });
});
