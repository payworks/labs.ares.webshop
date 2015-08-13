var transaction_1 = require('../models/transaction');
var services_1 = require('./services');
var PresentationHelper;
(function (PresentationHelper) {
    function presentTransaction(transaction) {
        return {
            identifier: transaction.identifier,
            amount: transaction.amount,
            type: transaction_1.TransactionType[transaction.type],
            status: transaction_1.TransactionStatus[transaction.status],
            startLink: services_1.Services.getLinkGenerator().getLinkForTransaction(transaction)
        };
    }
    PresentationHelper.presentTransaction = presentTransaction;
})(PresentationHelper = exports.PresentationHelper || (exports.PresentationHelper = {}));
