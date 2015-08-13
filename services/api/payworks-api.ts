import { Transaction } from '../../models/transaction'

export interface PayworksApi {
  registerTransaction(amount: number, callback: (error: any, transaction: Transaction) => void): void
}
