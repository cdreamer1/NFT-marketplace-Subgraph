import {
  ContractCreated as ContractCreatedEvent,
  ContractDisabled as ContractDisabledEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/AlivelandERC1155Factory/AlivelandERC1155Factory"
import {
  ContractCreated,
  OwnershipTransferred
} from "../generated/schema"
import { store } from "@graphprotocol/graph-ts"

export function handleContractCreated(event: ContractCreatedEvent): void {
  const id = event.params.nft.toHex()
  let entity = new ContractCreated(id)

  entity.creator = event.params.creator
  entity.nft = event.params.nft
  entity.name = event.params.name
  entity.nftType = "ERC1155"

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContractDisabled(event: ContractDisabledEvent): void {
  const id = event.params.nft.toHex()
  let entity = ContractCreated.load(id)

  if (entity) {
    store.remove("ContractCreated", id);
  }
}

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
