const EC = require("elliptic").ec;

// Standards of Efficient Cryptography Prime 256 bit Koblitz Curve First Implementation
const ec = new EC("secp256k1");
class ChainUtil {
    /**
     * Generates an elliptic curve key pair
     */
    static genKeyPair() {
        return ec.genKeyPair();
    }
}

module.exports = ChainUtil;
