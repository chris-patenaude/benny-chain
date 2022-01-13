const ChainUtil = require("../chain-util");

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    /**
     * Update the transaction instance with an additional output
     * @param {Wallet} senderWallet the waller of the money sender
     * @param {string} recipient the address of the recipient
     * @param {number} amount the amount being sent
     */
    update(senderWallet, recipient, amount) {
        const senderOutput = this.outputs.find((output) => output.address === senderWallet.publicKey);
        if (amount > senderOutput.amount) {
            throw new Error("Transaction Update Rejected: Amount exceeds senders balance.");
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({ amount, address: recipient });
        Transaction.signTransaction(this, senderWallet);

        return this;
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

        transaction.outputs.push(
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

    /**
     * Verifies the validity of a transaction
     * @param {Transaction} transaction the transaction being verified
     */
    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transaction;
