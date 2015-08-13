var request = require('request');
var conversion_helper_1 = require('../conversion-helper');
var PayworksApiConnected = (function () {
    function PayworksApiConnected(apiIdentifier, apiSecretKey, merchantIdentifier, merchantSecretKey) {
        this.apiIdentifier = apiIdentifier;
        this.apiSecretKey = apiSecretKey;
        this.merchantIdentifier = merchantIdentifier;
        this.merchantSecretKey = merchantSecretKey;
    }
    PayworksApiConnected.prototype.registerTransaction = function (amount, callback) {
        var options = {
            uri: this.getUrlForRegisterTransaction(),
            method: "POST",
            headers: {
                "Authorization": this.getAuthorizationHeader()
            },
            json: {
                "transaction": {
                    "amount": amount,
                    "currency": "EUR",
                    "type": "CHARGE"
                }
            }
        };
        var transaction = null;
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log(body);
                transaction = conversion_helper_1.ConversionHelper.convertRegisterResponseToTransaction(body);
            }
            else {
                console.log("something something something dark side");
            }
            callback(error, transaction);
        });
    };
    PayworksApiConnected.prototype.getUrlForRegisterTransaction = function () {
        return PayworksApiConnected.PAYWORKS_URL + "merchants/" + this.merchantIdentifier + "/transactionSessions";
    };
    PayworksApiConnected.prototype.getAuthorizationHeader = function () {
        return "payworks-apiIdentifier apiIdentifier=" + this.apiIdentifier + ",apiSecretKey=" + this.apiSecretKey;
    };
    PayworksApiConnected.PAYWORKS_URL = "https://test.payworks.io/v2/";
    return PayworksApiConnected;
})();
exports.PayworksApiConnected = PayworksApiConnected;
