import moment = require('moment')

export enum TransactionStatus {
  INITIALIZED,
  PENDING,
  APPROVED,
  DECLINED,
  ABORTED,
  ERROR
}

export enum TransactionType {
  CHARGE,
  REFUND
}

export interface Transaction {
  identifier: string
  sessionIdentifier?: string
  status: TransactionStatus
  type: TransactionType
  amount: number
  created: moment.Moment
}
