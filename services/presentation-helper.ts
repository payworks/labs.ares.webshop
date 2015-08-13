import { Transaction, TransactionType, TransactionStatus } from '../models/transaction'
import { Services } from './services'

export module PresentationHelper {
  export function presentTransaction(transaction: Transaction) {
    return {
      identifier: transaction.identifier,
      amount: transaction.amount,
      type: TransactionType[transaction.type],
      status: TransactionStatus[transaction.status],
      startLink: Services.getLinkGenerator().getLinkForTransaction(transaction)
    }
  }
}
