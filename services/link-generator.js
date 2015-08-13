var LinkGenerator = (function () {
    function LinkGenerator(merchantIdentifier, merchantSecretKey) {
        this.merchantIdentifier = merchantIdentifier;
        this.merchantSecretKey = merchantSecretKey;
    }
    LinkGenerator.prototype.getLinkForTransaction = function (transaction) {
        return "payworks://transaction/charge?sessionIdentifier=" + transaction.sessionIdentifier +
            "&providerMode=TEST" +
            "&accessoryFamily=MIURA_MPI" +
            "&merchantIdentifier=" + this.merchantIdentifier +
            "&merchantSecretKey=" + this.merchantSecretKey;
    };
    return LinkGenerator;
})();
exports.LinkGenerator = LinkGenerator;
