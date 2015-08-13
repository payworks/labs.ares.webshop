var payworks_api_connected_1 = require("./api/payworks-api-connected");
var link_generator_1 = require("./link-generator");
var transaction_dao_map_1 = require("./transaction-dao-map");
var transaction_stream_1 = require("./transaction-stream");
var Services = (function () {
    function Services() {
    }
    Services.initialize = function (apiIdentifier, apiSecretKey, merchantIdentifier, merchantSecretKey) {
        this.payworksApi = new payworks_api_connected_1.PayworksApiConnected(apiIdentifier, apiSecretKey, merchantIdentifier, merchantSecretKey);
        this.linkGenerator = new link_generator_1.LinkGenerator(merchantIdentifier, merchantSecretKey);
        this.transactionDao = new transaction_dao_map_1.TransactionDaoMap();
    };
    Services.setHttpServerAndInitializeStream = function (httpServer) {
        this.httpServer = httpServer;
        this.transactionStream = new transaction_stream_1.TransactionStream(httpServer);
    };
    Services.getPayworksApi = function () {
        return this.payworksApi;
    };
    Services.getLinkGenerator = function () {
        return this.linkGenerator;
    };
    Services.getTransactionDao = function () {
        return this.transactionDao;
    };
    Services.getTransactionStream = function () {
        return this.transactionStream;
    };
    return Services;
})();
exports.Services = Services;
