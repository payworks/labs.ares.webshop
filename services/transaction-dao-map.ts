import { TransactionDao } from "./transaction-dao"
import { Transaction } from "../models/transaction"
import moment = require('moment')

export class TransactionDaoMap implements TransactionDao {
  private static KEEP_FOR_DAYS = 10

  private store: { [identifier:string]: Transaction } = {}

  public findTransactionByIdentifier(identifier: string): Transaction {
    this.cleanStore()
    return this.store[identifier]
  }

  public saveTransaction(transaction: Transaction) {
    this.cleanStore()
    this.store[transaction.identifier] = transaction
  }

  private cleanStore() {
    // remove all transactions in memory older than KEEP_FOR_DAYS days

    var now = moment()
    var filtered: { [identifier:string]: Transaction } = {}

    for (var key in this.store) {
      var diff: number = now.diff(this.store[key].created)
      if (moment.duration(diff).asDays() < TransactionDaoMap.KEEP_FOR_DAYS) {
        filtered[key] = this.store[key]
      }
    }

    this.store = filtered
  }
}
