import { Transaction } from "../models/transaction"

export class LinkGenerator {

  private merchantIdentifier: string
  private merchantSecretKey: string

  constructor(merchantIdentifier: string, merchantSecretKey: string) {
    this.merchantIdentifier = merchantIdentifier
    this.merchantSecretKey = merchantSecretKey
  }

  public getLinkForTransaction(transaction: Transaction): string {
    return "payworks://transaction/charge?sessionIdentifier=" + transaction.sessionIdentifier +
      "&providerMode=TEST" +
      "&accessoryFamily=MIURA_MPI" +
      "&merchantIdentifier=" + this.merchantIdentifier +
      "&merchantSecretKey=" + this.merchantSecretKey
  }

}
