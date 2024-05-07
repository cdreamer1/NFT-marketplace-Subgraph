import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContractCreated,
  ContractDisabled,
  OwnershipTransferred
} from "../generated/AlivelandERC1155Factory/AlivelandERC1155Factory"

export function createContractCreatedEvent(
  creator: Address,
  nft: Address,
  name: string
): ContractCreated {
  let contractCreatedEvent = changetype<ContractCreated>(newMockEvent())

  contractCreatedEvent.parameters = new Array()

  contractCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  contractCreatedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  contractCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return contractCreatedEvent
}

export function createContractDisabledEvent(
  caller: Address,
  nft: Address
): ContractDisabled {
  let contractDisabledEvent = changetype<ContractDisabled>(newMockEvent())

  contractDisabledEvent.parameters = new Array()

  contractDisabledEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  contractDisabledEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )

  return contractDisabledEvent
}

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
