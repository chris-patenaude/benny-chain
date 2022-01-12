const EC = require("elliptic").ec;
const { v4: uuidv4 } = require("uuid");

// Standards of Efficient Cryptography Prime 256 bit Koblitz Curve First Implementation
const ec = new EC("secp256k1");
class ChainUtil {
    /**
     * Generates an elliptic curve key pair
     */
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidv4();
    }
}

module.exports = ChainUtil;
