const TransactionPool = require("../transaction-pool");
const Transaction = require("../transaction");
const Wallet = require("..");

describe("The TransactionPool class", () => {
    let transactionPool, wallet, transaction;
    beforeEach(() => {
        transactionPool = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, "r4nd-4ddr355", 30);
        transactionPool.updateOrAddTransaction(transaction);
    });

    it("should reject transaction that don't exist", () => {
        expect(() => transactionPool.updateOrAddTransaction()).toThrowError();
    });

    it("should add a transaction to the pool", () => {
        expect(transactionPool.transactions.find((item) => item.id === transaction.id)).toEqual(transaction);
    });

    it("should update a transaction to the pool", () => {
        const oldTransactionStr = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, "n3w-4ddr355", 40);
        transactionPool.updateOrAddTransaction(newTransaction);
        expect(JSON.stringify(transactionPool.transactions.find((item) => item.id === newTransaction.id))).not.toEqual(
            oldTransactionStr
        );
        expect(transactionPool.transactions.find((item) => item.id === newTransaction.id)).toEqual(newTransaction);
    });
});
