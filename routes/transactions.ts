import express = require("express")
import { Services } from "../services/services";
import { Transaction, TransactionType, TransactionStatus } from "../models/transaction"
import { ConversionHelper } from "../services/conversion-helper"
import { PresentationHelper } from "../services/presentation-helper"
var util = require("util")
var http = require('http')

var router = express.Router()

router.post("/", function(req, res) {
  var amount = req.body.amount

  Services.getPayworksApi().registerTransaction(amount, function(error: any, transaction: Transaction) {
    if (!error && transaction) {
      Services.getTransactionDao().saveTransaction(transaction)
      res.redirect("/transactions/" + transaction.identifier)
    } else {
      res.render("error")
    }
  })

})

.get("/:identifier", function(req, res) {
  var transaction = Services.getTransactionDao().findTransactionByIdentifier(req.params.identifier)
  if (transaction) {
    res.render("transaction", { transaction: PresentationHelper.presentTransaction(transaction) })
  } else {
    res.render("error")
  }

})

.post("/webhook", function(req, res) {
  var transaction: Transaction = ConversionHelper.convertWebhookResponseToTransaction(req.body)
  Services.getTransactionDao().saveTransaction(transaction)
  Services.getTransactionStream().notifyTransactionUpdate(transaction)

  res.sendStatus(200)
})

module.exports = router
