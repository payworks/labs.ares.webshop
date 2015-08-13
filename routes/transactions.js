var express = require("express");
var services_1 = require("../services/services");
var conversion_helper_1 = require("../services/conversion-helper");
var presentation_helper_1 = require("../services/presentation-helper");
var util = require("util");
var http = require('http');
var router = express.Router();
router.post("/", function (req, res) {
    var amount = req.body.amount;
    services_1.Services.getPayworksApi().registerTransaction(amount, function (error, transaction) {
        if (!error && transaction) {
            services_1.Services.getTransactionDao().saveTransaction(transaction);
            res.redirect("/transactions/" + transaction.identifier);
        }
        else {
            res.render("error");
        }
    });
})
    .get("/:identifier", function (req, res) {
    var transaction = services_1.Services.getTransactionDao().findTransactionByIdentifier(req.params.identifier);
    if (transaction) {
        res.render("transaction", { transaction: presentation_helper_1.PresentationHelper.presentTransaction(transaction) });
    }
    else {
        res.render("error");
    }
})
    .post("/webhook", function (req, res) {
    var transaction = conversion_helper_1.ConversionHelper.convertWebhookResponseToTransaction(req.body);
    services_1.Services.getTransactionDao().saveTransaction(transaction);
    services_1.Services.getTransactionStream().notifyTransactionUpdate(transaction);
    res.sendStatus(200);
});
module.exports = router;
