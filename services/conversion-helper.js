var moment = require('moment');
var transaction_1 = require('../models/transaction');
var ConversionHelper;
(function (ConversionHelper) {
    function convertRegisterResponseToTransaction(response) {
        return {
            sessionIdentifier: response.data.identifier,
            identifier: response.data.transaction.identifier,
            amount: response.data.transaction.amount,
            status: transaction_1.TransactionStatus[response.data.transaction.status],
            type: transaction_1.TransactionType[response.data.transaction.type],
            created: moment(response.data.transaction.created),
        };
    }
    ConversionHelper.convertRegisterResponseToTransaction = convertRegisterResponseToTransaction;
    function convertWebhookResponseToTransaction(response) {
        return {
            identifier: response.transaction.identifier,
            amount: response.transaction.amount,
            status: transaction_1.TransactionStatus[response.transaction.status],
            type: transaction_1.TransactionType[response.transaction.type],
            created: moment(response.transaction.created)
        };
    }
    ConversionHelper.convertWebhookResponseToTransaction = convertWebhookResponseToTransaction;
})(ConversionHelper = exports.ConversionHelper || (exports.ConversionHelper = {}));
