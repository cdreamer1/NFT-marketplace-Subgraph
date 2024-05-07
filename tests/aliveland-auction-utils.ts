import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AlivelandAuctionContractDeployed,
  AuctionCancelled,
  AuctionCreated,
  AuctionResulted,
  BidPlaced,
  BidRefunded,
  BidWithdrawn,
  Initialized,
  OwnershipTransferred,
  PauseToggled,
  UpdateAuctionEndTime,
  UpdateAuctionReservePrice,
  UpdateAuctionStartTime,
  UpdateBidWithdrawalLockTime,
  UpdateMinBidIncrement,
  UpdatePlatformFee,
  UpdatePlatformFeeRecipient
} from "../generated/AlivelandAuction/AlivelandAuction"

export function createAlivelandAuctionContractDeployedEvent(): AlivelandAuctionContractDeployed {
  let alivelandAuctionContractDeployedEvent = changetype<
    AlivelandAuctionContractDeployed
  >(newMockEvent())

  alivelandAuctionContractDeployedEvent.parameters = new Array()

  return alivelandAuctionContractDeployedEvent
}

export function createAuctionCancelledEvent(
  nftAddress: Address,
  tokenId: BigInt
): AuctionCancelled {
  let auctionCancelledEvent = changetype<AuctionCancelled>(newMockEvent())

  auctionCancelledEvent.parameters = new Array()

  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return auctionCancelledEvent
}

export function createAuctionCreatedEvent(
  nftAddress: Address,
  tokenId: BigInt,
  mediaType: string,
  startTime: BigInt,
  endTime: BigInt,
  payToken: Address,
  reservePrice: BigInt,
  owner: Address,
  lockTime: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("mediaType", ethereum.Value.fromString(mediaType))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "lockTime",
      ethereum.Value.fromUnsignedBigInt(lockTime)
    )
  )

  return auctionCreatedEvent
}

export function createAuctionResultedEvent(
  oldOwner: Address,
  nftAddress: Address,
  tokenId: BigInt,
  winner: Address,
  payToken: Address,
  winningBid: BigInt
): AuctionResulted {
  let auctionResultedEvent = changetype<AuctionResulted>(newMockEvent())

  auctionResultedEvent.parameters = new Array()

  auctionResultedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  auctionResultedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  auctionResultedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionResultedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  auctionResultedEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  auctionResultedEvent.parameters.push(
    new ethereum.EventParam(
      "winningBid",
      ethereum.Value.fromUnsignedBigInt(winningBid)
    )
  )

  return auctionResultedEvent
}

export function createBidPlacedEvent(
  nftAddress: Address,
  tokenId: BigInt,
  bidder: Address,
  owner: Address,
  bid: BigInt
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromUnsignedBigInt(bid))
  )

  return bidPlacedEvent
}

export function createBidRefundedEvent(
  nftAddress: Address,
  tokenId: BigInt,
  bidder: Address,
  bid: BigInt
): BidRefunded {
  let bidRefundedEvent = changetype<BidRefunded>(newMockEvent())

  bidRefundedEvent.parameters = new Array()

  bidRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  bidRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  bidRefundedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidRefundedEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromUnsignedBigInt(bid))
  )

  return bidRefundedEvent
}

export function createBidWithdrawnEvent(
  nftAddress: Address,
  tokenId: BigInt,
  bidder: Address,
  bid: BigInt
): BidWithdrawn {
  let bidWithdrawnEvent = changetype<BidWithdrawn>(newMockEvent())

  bidWithdrawnEvent.parameters = new Array()

  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromUnsignedBigInt(bid))
  )

  return bidWithdrawnEvent
}

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

export function createPauseToggledEvent(isPaused: boolean): PauseToggled {
  let pauseToggledEvent = changetype<PauseToggled>(newMockEvent())

  pauseToggledEvent.parameters = new Array()

  pauseToggledEvent.parameters.push(
    new ethereum.EventParam("isPaused", ethereum.Value.fromBoolean(isPaused))
  )

  return pauseToggledEvent
}

export function createUpdateAuctionEndTimeEvent(
  nftAddress: Address,
  tokenId: BigInt,
  endTime: BigInt
): UpdateAuctionEndTime {
  let updateAuctionEndTimeEvent = changetype<UpdateAuctionEndTime>(
    newMockEvent()
  )

  updateAuctionEndTimeEvent.parameters = new Array()

  updateAuctionEndTimeEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  updateAuctionEndTimeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updateAuctionEndTimeEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return updateAuctionEndTimeEvent
}

export function createUpdateAuctionReservePriceEvent(
  nftAddress: Address,
  tokenId: BigInt,
  payToken: Address,
  reservePrice: BigInt
): UpdateAuctionReservePrice {
  let updateAuctionReservePriceEvent = changetype<UpdateAuctionReservePrice>(
    newMockEvent()
  )

  updateAuctionReservePriceEvent.parameters = new Array()

  updateAuctionReservePriceEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  updateAuctionReservePriceEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updateAuctionReservePriceEvent.parameters.push(
    new ethereum.EventParam("payToken", ethereum.Value.fromAddress(payToken))
  )
  updateAuctionReservePriceEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice)
    )
  )

  return updateAuctionReservePriceEvent
}

export function createUpdateAuctionStartTimeEvent(
  nftAddress: Address,
  tokenId: BigInt,
  startTime: BigInt
): UpdateAuctionStartTime {
  let updateAuctionStartTimeEvent = changetype<UpdateAuctionStartTime>(
    newMockEvent()
  )

  updateAuctionStartTimeEvent.parameters = new Array()

  updateAuctionStartTimeEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  updateAuctionStartTimeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updateAuctionStartTimeEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )

  return updateAuctionStartTimeEvent
}

export function createUpdateBidWithdrawalLockTimeEvent(
  bidWithdrawalLockTime: BigInt
): UpdateBidWithdrawalLockTime {
  let updateBidWithdrawalLockTimeEvent = changetype<
    UpdateBidWithdrawalLockTime
  >(newMockEvent())

  updateBidWithdrawalLockTimeEvent.parameters = new Array()

  updateBidWithdrawalLockTimeEvent.parameters.push(
    new ethereum.EventParam(
      "bidWithdrawalLockTime",
      ethereum.Value.fromUnsignedBigInt(bidWithdrawalLockTime)
    )
  )

  return updateBidWithdrawalLockTimeEvent
}

export function createUpdateMinBidIncrementEvent(
  minBidIncrement: BigInt
): UpdateMinBidIncrement {
  let updateMinBidIncrementEvent = changetype<UpdateMinBidIncrement>(
    newMockEvent()
  )

  updateMinBidIncrementEvent.parameters = new Array()

  updateMinBidIncrementEvent.parameters.push(
    new ethereum.EventParam(
      "minBidIncrement",
      ethereum.Value.fromUnsignedBigInt(minBidIncrement)
    )
  )

  return updateMinBidIncrementEvent
}

export function createUpdatePlatformFeeEvent(
  platformFee: BigInt
): UpdatePlatformFee {
  let updatePlatformFeeEvent = changetype<UpdatePlatformFee>(newMockEvent())

  updatePlatformFeeEvent.parameters = new Array()

  updatePlatformFeeEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(platformFee)
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
