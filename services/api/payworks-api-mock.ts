import moment = require('moment')
import { PayworksApi } from './payworks-api'
import { Transaction, TransactionType, TransactionStatus } from '../../models/transaction'

export class PayworksApiMock implements PayworksApi {

  public registerTransaction(amount: number, callback: (error: any, transaction: Transaction) => void): void {
    callback(null, {
      identifier: "df1d25e8a0ff47d6850573ae90c16488",
      sessionIdentifier: "59b17c79-7a04-4e68-9bc1-78dbf71adf32",
      status: TransactionStatus.INITIALIZED,
      type: TransactionType.CHARGE,
      amount: amount,
      created: moment()
    })
  }

}
