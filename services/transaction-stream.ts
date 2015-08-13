import * as SocketIO from "socket.io"
import { Services } from "./services"
import { Transaction, TransactionType, TransactionStatus } from "../models/transaction"
import { PresentationHelper } from "./presentation-helper"

export class TransactionStream {
  private socketIo: SocketIO.Server

  constructor(httpServer: any) {
    this.socketIo = SocketIO(httpServer)
    this.setUpServer()
  }

  public notifyTransactionUpdate(transaction: Transaction) {
    console.log("sending tx update about " + transaction.identifier)
    this.socketIo.to(transaction.identifier).emit("transaction.update", { transaction: PresentationHelper.presentTransaction(transaction) })
  }

  private setUpServer() {
    this.socketIo.on("connection", function(socket: SocketIO.Socket) {
      socket.on("listen", function(identifier: string) {
        console.log("someone listens to tx id: " + identifier)
        socket.join(identifier)
      })
    })
  }
}
