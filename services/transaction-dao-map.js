var moment = require('moment');
var TransactionDaoMap = (function () {
    function TransactionDaoMap() {
        this.store = {};
    }
    TransactionDaoMap.prototype.findTransactionByIdentifier = function (identifier) {
        this.cleanStore();
        return this.store[identifier];
    };
    TransactionDaoMap.prototype.saveTransaction = function (transaction) {
        this.cleanStore();
        this.store[transaction.identifier] = transaction;
    };
    TransactionDaoMap.prototype.cleanStore = function () {
        // remove all transactions in memory older than KEEP_FOR_DAYS days
        var now = moment();
        var filtered = {};
        for (var key in this.store) {
            var diff = now.diff(this.store[key].created);
            if (moment.duration(diff).asDays() < TransactionDaoMap.KEEP_FOR_DAYS) {
                filtered[key] = this.store[key];
            }
        }
        this.store = filtered;
    };
    TransactionDaoMap.KEEP_FOR_DAYS = 10;
    return TransactionDaoMap;
})();
exports.TransactionDaoMap = TransactionDaoMap;
