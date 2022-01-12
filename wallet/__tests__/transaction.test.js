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

    it("Should output the amount subtracted from the wallet balance", () => {
        expect(transaction.output.find((output) => output.address === wallet.publicKey).amount).toEqual(
            wallet.balance - amount
        );
    });

    it("Should output the amount subtracted from the wallet balance", () => {
        expect(transaction.output.find((output) => output.address === recipient).amount).toEqual(amount);
    });

    it("Should reject transactions the reduce the senders balance below zero", () => {
        amount = Infinity;
        expect(() => Transaction.newTransaction(wallet, recipient, amount)).toThrowError();
    });

    it("Should input the balance of the wallet", () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });
});
