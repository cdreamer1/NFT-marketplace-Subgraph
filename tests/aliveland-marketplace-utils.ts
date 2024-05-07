import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Initialized,
  ItemCanceled,
  ItemListed,
  ItemSold,
  ItemUpdated,
  OfferCanceled,
  OfferCreated,
  OwnershipTransferred,
  UpdatePlatformFee,
  UpdatePlatformFeeRecipient
} from "../generated/AlivelandMarketplace/AlivelandMarketplace"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createItemCanceledEvent(
  owner: Address,
  nft: Address,
  tokenId: BigInt
): ItemCanceled {
  let itemCanceledEvent = changetype<ItemCanceled>(newMockEvent())

  itemCanceledEvent.parameters = new Array()

  itemCanceledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCanceledEvent
}

export function createItemListedEvent(
  owner: Address,
  nft: Address,
  mediaType: string,
  tokenId: BigInt,
  quantity: BigInt,
  payToken: Address,
  pricePerItem: BigInt,
  startingTime: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("mediaType", ethereum.Value.fromString(mediaType))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerItem",
      ethereum.Value.fromUnsignedBigInt(pricePerItem)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "startingTime",
      ethereum.Value.fromUnsignedBigInt(startingTime)
    )
  )

  return itemListedEvent
}

export function createItemSoldEvent(
  seller: Address,
  buyer: Address,
  nft: Address,
  tokenId: BigInt,
  quantity: BigInt,
  payToken: Address,
  pricePerItem: BigInt
): ItemSold {
  let itemSoldEvent = changetype<ItemSold>(newMockEvent())

  itemSoldEvent.parameters = new Array()

  itemSoldEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  itemSoldEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerItem",
      ethereum.Value.fromUnsignedBigInt(pricePerItem)
    )
  )

  return itemSoldEvent
}

export function createItemUpdatedEvent(
  owner: Address,
  nft: Address,
  tokenId: BigInt,
  payToken: Address,
  newPrice: BigInt
): ItemUpdated {
  let itemUpdatedEvent = changetype<ItemUpdated>(newMockEvent())

  itemUpdatedEvent.parameters = new Array()

  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return itemUpdatedEvent
}

export function createOfferCanceledEvent(
  creator: Address,
  nft: Address,
  tokenId: BigInt
): OfferCanceled {
  let offerCanceledEvent = changetype<OfferCanceled>(newMockEvent())

  offerCanceledEvent.parameters = new Array()

  offerCanceledEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  offerCanceledEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  offerCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return offerCanceledEvent
}

export function createOfferCreatedEvent(
  creator: Address,
  nft: Address,
  owner: Address,
  tokenId: BigInt,
  quantity: BigInt,
  payToken: Address,
  pricePerItem: BigInt,
  deadline: BigInt
): OfferCreated {
  let offerCreatedEvent = changetype<OfferCreated>(newMockEvent())

  offerCreatedEvent.parameters = new Array()

  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerItem",
      ethereum.Value.fromUnsignedBigInt(pricePerItem)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return offerCreatedEvent
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

export function createUpdatePlatformFeeEvent(
  platformFee: i32
): UpdatePlatformFee {
  let updatePlatformFeeEvent = changetype<UpdatePlatformFee>(newMockEvent())

  updatePlatformFeeEvent.parameters = new Array()

  updatePlatformFeeEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(platformFee))
    )
  )

  return updatePlatformFeeEvent
}

export function createUpdatePlatformFeeRecipientEvent(
  platformFeeRecipient: Address
): UpdatePlatformFeeRecipient {
  let updatePlatformFeeRecipientEvent = changetype<UpdatePlatformFeeRecipient>(
    newMockEvent()
  )

  updatePlatformFeeRecipientEvent.parameters = new Array()

  updatePlatformFeeRecipientEvent.parameters.push(
    new ethereum.EventParam(
      "platformFeeRecipient",
      ethereum.Value.fromAddress(platformFeeRecipient)
    )
  )

  return updatePlatformFeeRecipientEvent
}
