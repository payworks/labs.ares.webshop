module Client {
  export class LocalStorage {
    private static LAST_TRANSACTION_ID = "lastTransactionIdentifier"

    public isAvailable(): boolean {
      return typeof(Storage) !== "undefined"
    }

    public getLastTransactionIdentifier(): string {
      if (typeof(Storage) !== "undefined") {
        return localStorage.getItem(LocalStorage.LAST_TRANSACTION_ID)
      } else {
        return null
      }
    }

    public setLastTransactionIdentifier(identifier: string): boolean {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("lastTransactionIdentifier", identifier)
        return true
      } else {
        return false
      }
    }

  }
}
