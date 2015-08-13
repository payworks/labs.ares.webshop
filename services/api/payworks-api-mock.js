var moment = require('moment');
var transaction_1 = require('../../models/transaction');
var PayworksApiMock = (function () {
    function PayworksApiMock() {
    }
    PayworksApiMock.prototype.registerTransaction = function (amount, callback) {
        callback(null, {
            identifier: "df1d25e8a0ff47d6850573ae90c16488",
            sessionIdentifier: "59b17c79-7a04-4e68-9bc1-78dbf71adf32",
            status: transaction_1.TransactionStatus.INITIALIZED,
            type: transaction_1.TransactionType.CHARGE,
            amount: amount,
            created: moment()
        });
    };
    return PayworksApiMock;
})();
exports.PayworksApiMock = PayworksApiMock;
