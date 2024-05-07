import {
  AlivelandAuctionContractDeployed as AlivelandAuctionContractDeployedEvent,
  AuctionCancelled as AuctionCancelledEvent,
  AuctionCreated as AuctionCreatedEvent,
  AuctionResulted as AuctionResultedEvent,
  BidPlaced as BidPlacedEvent,
  BidRefunded as BidRefundedEvent,
  BidWithdrawn as BidWithdrawnEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PauseToggled as PauseToggledEvent,
  UpdateAuctionEndTime as UpdateAuctionEndTimeEvent,
  UpdateAuctionReservePrice as UpdateAuctionReservePriceEvent,
  UpdateAuctionStartTime as UpdateAuctionStartTimeEvent,
  UpdateBidWithdrawalLockTime as UpdateBidWithdrawalLockTimeEvent,
  UpdateMinBidIncrement as UpdateMinBidIncrementEvent,
  UpdatePlatformFee as UpdatePlatformFeeEvent,
  UpdatePlatformFeeRecipient as UpdatePlatformFeeRecipientEvent,
} from "../generated/AlivelandAuction/AlivelandAuction";
import {
  AuctionCreated,
  AuctionResulted,
  BidPlaced,
  History,
  Initialized,
  OwnershipTransferred,
  PauseToggled,
  TradeVolume,
  UpdatePlatformFee,
} from "../generated/schema";
import { store, BigInt } from "@graphprotocol/graph-ts";

export function handleAlivelandAuctionContractDeployed(
  event: AlivelandAuctionContractDeployedEvent
): void {}

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  const id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let entity = AuctionCreated.load(id);

  if (entity) {
    store.remove("AuctionCreated", id);
  }

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "CancelAuction";
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nftAddress;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  const id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let entity = new AuctionCreated(id);
  entity.nftAddress = event.params.nftAddress;
  entity.tokenId = event.params.tokenId;
  entity.mediaType = event.params.mediaType;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;
  entity.payToken = event.params.payToken;
  entity.reservePrice = event.params.reservePrice;
  entity.owner = event.params.owner;
  entity.lockTime = event.params.lockTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "AuctionCreated";
  historyEntity.from = event.params.owner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nftAddress;
  historyEntity.pricePerItem = event.params.reservePrice;
  historyEntity.payToken = event.params.payToken;
  historyEntity.quantity = BigInt.fromI32(1);

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleAuctionResulted(event: AuctionResultedEvent): void {
  const id =
    event.params.nftAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.oldOwner.toHex() +
    "-" +
    event.params.winner.toHex();

  let entity = new AuctionResulted(id);
  entity.oldOwner = event.params.oldOwner;
  entity.nftAddress = event.params.nftAddress;
  entity.tokenId = event.params.tokenId;
  entity.winner = event.params.winner;
  entity.payToken = event.params.payToken;
  entity.winningBid = event.params.winningBid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Remove buyer from BidPlaced
  const bidder_id =
    event.params.nftAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.winner.toHex();

  let bidder_entity = BidPlaced.load(bidder_id);
  if (bidder_entity) {
    store.remove("BidPlaced", bidder_id);
  }

  // Remove from AuctionCreated
  const created_id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let created_entity = AuctionCreated.load(created_id);

  if (created_entity) {
    store.remove("AuctionCreated", created_id);
  }

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "BidAccepted";
  historyEntity.from = event.params.oldOwner;
  historyEntity.to = event.params.winner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nftAddress;
  historyEntity.payToken = event.params.payToken;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();

  // Increase value in TradeVolume
  const tradevolume_id = event.params.nftAddress.toHex();
  let tradevolume_entity = TradeVolume.load(tradevolume_id);

  if (tradevolume_entity) {
    tradevolume_entity.value = tradevolume_entity.value.plus(
      event.params.winningBid
    );
  } else {
    tradevolume_entity = new TradeVolume(tradevolume_id);
    tradevolume_entity.value = new BigInt(0);
  }
  tradevolume_entity.blockTimestamp = event.block.timestamp;
  tradevolume_entity.save();
}

export function handleBidPlaced(event: BidPlacedEvent): void {
  const id =
    event.params.nftAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    // "-" +
    // event.params.owner.toHex()
    "-" +
    event.params.bidder.toHex();

  let entity = new BidPlaced(id);
  entity.nftAddress = event.params.nftAddress;
  entity.tokenId = event.params.tokenId;
  entity.bidder = event.params.bidder;
  entity.owner = event.params.owner;
  entity.bid = event.params.bid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "BidPlaced";
  historyEntity.from = event.params.bidder;
  historyEntity.to = event.params.owner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nftAddress;
  historyEntity.pricePerItem = event.params.bid;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleBidRefunded(event: BidRefundedEvent): void {
  const id =
    event.params.nftAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    // "-" +
    // event.params.owner.toHex()
    "-" +
    event.params.bidder.toHex();

  let entity = BidPlaced.load(id);
  if (entity) {
    store.remove("BidPlaced", id);
  }
}

export function handleBidWithdrawn(event: BidWithdrawnEvent): void {
  const id =
    event.params.nftAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    // "-" +
    // event.params.owner.toHex()
    "-" +
    event.params.bidder.toHex();

  let entity = BidPlaced.load(id);
  if (entity) {
    store.remove("BidPlaced", id);
  }
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.version = event.params.version;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePauseToggled(event: PauseToggledEvent): void {
  let entity = new PauseToggled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.isPaused = event.params.isPaused;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateAuctionEndTime(
  event: UpdateAuctionEndTimeEvent
): void {
  const id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let entity = AuctionCreated.load(id);

  if (entity) {
    entity.endTime = event.params.endTime;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleUpdateAuctionReservePrice(
  event: UpdateAuctionReservePriceEvent
): void {
  const id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let entity = AuctionCreated.load(id);

  if (entity) {
    entity.reservePrice = event.params.reservePrice;
    entity.payToken = event.params.payToken;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleUpdateAuctionStartTime(
  event: UpdateAuctionStartTimeEvent
): void {
  const id =
    event.params.nftAddress.toHex() + "-" + event.params.tokenId.toString();
  // "-" +
  // event.params.owner.toHex();

  let entity = AuctionCreated.load(id);

  if (entity) {
    entity.startTime = event.params.startTime;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleUpdateBidWithdrawalLockTime(
  event: UpdateBidWithdrawalLockTimeEvent
): void {}

export function handleUpdateMinBidIncrement(
  event: UpdateMinBidIncrementEvent
): void {}

export function handleUpdatePlatformFee(event: UpdatePlatformFeeEvent): void {}

export function handleUpdatePlatformFeeRecipient(
  event: UpdatePlatformFeeRecipientEvent
): void {}
