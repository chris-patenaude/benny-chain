const ChainUtil = require("../chain-util");

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.output = [];
    }

    /**
     * Generates a new transaction object
     * @param {Wallet} senderWallet the wallet of the money sender
     * @param {string} recipient the public key of the recipient
     * @param {number} amount the amount being transferred
     * @returns {Transaction} the newly formed transaction
     */
    static newTransaction(senderWallet, recipient, amount) {
        if (amount > senderWallet.balance) {
            throw new Error("Transaction Rejected: Amount exceeds senders balance.");
        }

        const transaction = new this();

        transaction.output.push(
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        );

        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    /**
     * signs the transaction with the wallets key credentials
     * @param {Transaction} transaction the transaction to be signed
     * @param {Wallet} senderWallet the wallet signing the transaction
     */
    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
        };
    }
}

module.exports = Transaction;
