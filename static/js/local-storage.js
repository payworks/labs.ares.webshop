var Client;
(function (Client) {
    var LocalStorage = (function () {
        function LocalStorage() {
        }
        LocalStorage.prototype.isAvailable = function () {
            return typeof (Storage) !== "undefined";
        };
        LocalStorage.prototype.getLastTransactionIdentifier = function () {
            if (typeof (Storage) !== "undefined") {
                return localStorage.getItem(LocalStorage.LAST_TRANSACTION_ID);
            }
            else {
                return null;
            }
        };
        LocalStorage.prototype.setLastTransactionIdentifier = function (identifier) {
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("lastTransactionIdentifier", identifier);
                return true;
            }
            else {
                return false;
            }
        };
        LocalStorage.LAST_TRANSACTION_ID = "lastTransactionIdentifier";
        return LocalStorage;
    })();
    Client.LocalStorage = LocalStorage;
})(Client || (Client = {}));
