(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["INITIALIZED"] = 0] = "INITIALIZED";
    TransactionStatus[TransactionStatus["PENDING"] = 1] = "PENDING";
    TransactionStatus[TransactionStatus["APPROVED"] = 2] = "APPROVED";
    TransactionStatus[TransactionStatus["DECLINED"] = 3] = "DECLINED";
    TransactionStatus[TransactionStatus["ABORTED"] = 4] = "ABORTED";
    TransactionStatus[TransactionStatus["ERROR"] = 5] = "ERROR";
})(exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionStatus = exports.TransactionStatus;
(function (TransactionType) {
    TransactionType[TransactionType["CHARGE"] = 0] = "CHARGE";
    TransactionType[TransactionType["REFUND"] = 1] = "REFUND";
})(exports.TransactionType || (exports.TransactionType = {}));
var TransactionType = exports.TransactionType;
