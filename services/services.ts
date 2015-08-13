import { PayworksApi } from "./api/payworks-api"
import { PayworksApiConnected } from "./api/payworks-api-connected"
import { PayworksApiMock } from "./api/payworks-api-mock"
import { LinkGenerator } from "./link-generator"
import { TransactionDao } from "./transaction-dao"
import { TransactionDaoMap } from "./transaction-dao-map"
import { TransactionStream } from "./transaction-stream"

export class Services {
  private static payworksApi: PayworksApi
  private static linkGenerator: LinkGenerator
  private static transactionDao: TransactionDao
  private static transactionStream: TransactionStream
  private static httpServer: any

  public static initialize(apiIdentifier: string, apiSecretKey: string, merchantIdentifier: string, merchantSecretKey: string) {
    this.payworksApi = new PayworksApiConnected(apiIdentifier, apiSecretKey, merchantIdentifier, merchantSecretKey)
    // this.payworksApi = new PayworksApiMock()
    this.linkGenerator = new LinkGenerator(merchantIdentifier, merchantSecretKey)
    this.transactionDao = new TransactionDaoMap()
  }

  public static setHttpServerAndInitializeStream(httpServer: any) {
    this.httpServer = httpServer
    this.transactionStream = new TransactionStream(httpServer)
  }

  public static getPayworksApi(): PayworksApi {
    return this.payworksApi
  }

  public static getLinkGenerator(): LinkGenerator {
    return this.linkGenerator
  }

  public static getTransactionDao(): TransactionDao {
    return this.transactionDao
  }

  public static getTransactionStream(): TransactionStream {
    return this.transactionStream
  }
}
