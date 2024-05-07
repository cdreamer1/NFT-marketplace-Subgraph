import {
  OwnershipTransferred as OwnershipTransferredEvent,
  TokenAdded as TokenAddedEvent,
  TokenRemoved as TokenRemovedEvent
} from "../generated/AlivelandTokenRegistry/AlivelandTokenRegistry"
import {
  OwnershipTransferred,
  TokenAdded
} from "../generated/schema"
import { store } from "@graphprotocol/graph-ts"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenAdded(event: TokenAddedEvent): void {
  let entity = new TokenAdded(event.params.token.toHex())
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenRemoved(event: TokenRemovedEvent): void {
  let entity = TokenAdded.load(event.params.token.toHex())
  if(entity) {
    store.remove("TokenAdded", event.params.token.toHex())
  }
}
