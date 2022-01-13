class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    /**
     * Updates and existing transaction or adds a new
     * transaction if it does not exist yet.
     * @param {Transaction} transaction
     */
    updateOrAddTransaction(transaction) {
        if (!transaction) {
            throw new Error("Transaction Rejected: Transaction must exist.");
        }
        let prevTransIndex = this.transactions.indexOf((item) => item.id === transaction.id);
        if (prevTransIndex > -1) {
            this.transactions[prevTransIndex] = transaction;
            return;
        }

        this.transactions.push(transaction);
    }
}

module.exports = TransactionPool;
