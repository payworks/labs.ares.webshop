var SocketIO = require("socket.io");
var presentation_helper_1 = require("./presentation-helper");
var TransactionStream = (function () {
    function TransactionStream(httpServer) {
        this.socketIo = SocketIO(httpServer);
        this.setUpServer();
    }
    TransactionStream.prototype.notifyTransactionUpdate = function (transaction) {
        console.log("sending tx update about " + transaction.identifier);
        this.socketIo.to(transaction.identifier).emit("transaction.update", { transaction: presentation_helper_1.PresentationHelper.presentTransaction(transaction) });
    };
    TransactionStream.prototype.setUpServer = function () {
        this.socketIo.on("connection", function (socket) {
            socket.on("listen", function (identifier) {
                console.log("someone listens to tx id: " + identifier);
                socket.join(identifier);
            });
        });
    };
    return TransactionStream;
})();
exports.TransactionStream = TransactionStream;
