import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TokenAdded,
  TokenRemoved
} from "../generated/AlivelandTokenRegistry/AlivelandTokenRegistry"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokenAddedEvent(token: Address): TokenAdded {
  let tokenAddedEvent = changetype<TokenAdded>(newMockEvent())

  tokenAddedEvent.parameters = new Array()

  tokenAddedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenAddedEvent
}

export function createTokenRemovedEvent(token: Address): TokenRemoved {
  let tokenRemovedEvent = changetype<TokenRemoved>(newMockEvent())

  tokenRemovedEvent.parameters = new Array()

  tokenRemovedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenRemovedEvent
}
