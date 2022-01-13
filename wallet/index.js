const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");
const { INITIAL_BALANCE } = require("../config");

class Wallet {
    /**
     * Creates an instance of a crypto currency wallet
     */
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode("hex");
    }

    /**
     * Creates a text representation of the wallet
     */
    toString() {
        return `Wallet - 
		Public Key: ${this.publicKey.toString().substring(0, 10)}...
		Balance   : ${this.balance}`;
    }

    /**
     * Signs a data hash using the wallets public and private key
     * @param {string} dataHash the data hash to be signed
     */
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
    createTransaction(recipient, amount, transactionPool) {
        if (amount > this.balance) {
            throw new Error("Transaction Request Rejected: amount exceeds current balance");
        }
        let transaction = transactionPool.existingTransaction(this.publicKey);

        if (transaction) {
            transaction.update(this, recipient, amount);
            return transaction;
        }

        transaction = Transaction.newTransaction(this, recipient, amount);
        transactionPool.updateOrAddTransaction(transaction);
        return transaction;
    }
}

module.exports = Wallet;
