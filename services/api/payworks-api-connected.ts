import moment = require('moment')
var request = require('request')
import http = require('http')
import { PayworksApi } from './payworks-api'
import { Transaction, TransactionType, TransactionStatus } from '../../models/transaction'
import { ConversionHelper } from '../conversion-helper'

export class PayworksApiConnected implements PayworksApi {
  private static PAYWORKS_URL = "https://test.payworks.io/v2/"

  private apiIdentifier: string
  private apiSecretKey: string
  private merchantIdentifier: string
  private merchantSecretKey: string

  constructor(apiIdentifier: string, apiSecretKey: string, merchantIdentifier: string, merchantSecretKey: string) {
    this.apiIdentifier = apiIdentifier
    this.apiSecretKey = apiSecretKey
    this.merchantIdentifier = merchantIdentifier
    this.merchantSecretKey = merchantSecretKey
  }

  public registerTransaction(amount: number, callback: (error: any, transaction: Transaction) => void): void {
    var options:any = {
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
    }

    var transaction: Transaction = null
    request(options, function(error: any, response: http.IncomingMessage, body: any) {
      if (!error && response.statusCode == 201) {
        console.log(body)
        transaction = ConversionHelper.convertRegisterResponseToTransaction(body)
      } else {
        console.log("something something something dark side")
      }

      callback(error, transaction)
    })
  }

  private getUrlForRegisterTransaction(): string {
    return PayworksApiConnected.PAYWORKS_URL + "merchants/" + this.merchantIdentifier + "/transactionSessions"
  }

  private getAuthorizationHeader(): string {
    return "payworks-apiIdentifier apiIdentifier="+ this.apiIdentifier + ",apiSecretKey=" + this.apiSecretKey
  }
}
