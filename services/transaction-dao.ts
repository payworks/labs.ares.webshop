import { Transaction } from "../models/transaction"

export interface TransactionDao {
  findTransactionByIdentifier(identifier: string): Transaction
  saveTransaction(transaction: Transaction): void
}
