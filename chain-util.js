const EC = require("elliptic").ec;
const { v4: uuidv4 } = require("uuid");
const { SHA256 } = require("crypto-js");

// Standards of Efficient Cryptography Prime 256 bit Koblitz Curve First Implementation
const ec = new EC("secp256k1");
class ChainUtil {
    /**
     * Generates an elliptic curve key pair
     */
    static genKeyPair() {
        return ec.genKeyPair();
    }

    /**
     * Generates a UUID
     */
    static id() {
        return uuidv4();
    }

    /**
     * Generates a SHA256 Hash value for a given data input
     * @param {*} data data to be hashed
     */
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    /**
     * Verifies the signature of a data hash using a public key
     * @param {string} publicKey the public key used to decrypt the signature
     * @param {string} signature the private key generated signature
     * @param {string} dataHash the hashed representation of the data being signed
     */
    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
    }
}

module.exports = ChainUtil;
