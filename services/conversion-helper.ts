import moment = require('moment')
import { Transaction, TransactionType, TransactionStatus } from '../models/transaction'

export module ConversionHelper {
  export function convertRegisterResponseToTransaction(response: any): Transaction {
    return {
      sessionIdentifier: response.data.identifier,
      identifier: response.data.transaction.identifier,
      amount: response.data.transaction.amount,
      status: TransactionStatus[<string>response.data.transaction.status],
      type: TransactionType[<string>response.data.transaction.type],
      created: moment(response.data.transaction.created),
    }
  }

  export function convertWebhookResponseToTransaction(response: any): Transaction {
    return {
      identifier: response.transaction.identifier,
      amount: response.transaction.amount,
      status: TransactionStatus[<string>response.transaction.status],
      type: TransactionType[<string>response.transaction.type],
      created: moment(response.transaction.created)
    }
  }
}
