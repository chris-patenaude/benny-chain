const Wallet = require("..");

describe("The Wallet class", () => {
    beforeEach(() => {
        wallet = new Wallet();
    });

    it("Should print a string representation of the wallet", () => {
        console.log(wallet.toString());
    });
});
