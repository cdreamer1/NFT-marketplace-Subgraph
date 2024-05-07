import {
  Initialized as InitializedEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
  ItemSold as ItemSoldEvent,
  ItemUpdated as ItemUpdatedEvent,
  OfferCanceled as OfferCanceledEvent,
  OfferCreated as OfferCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  UpdatePlatformFee as UpdatePlatformFeeEvent,
  UpdatePlatformFeeRecipient as UpdatePlatformFeeRecipientEvent,
} from "../generated/AlivelandMarketplace/AlivelandMarketplace";
import {
  Initialized,
  ItemListed,
  ItemSold,
  OfferCreated,
  OwnershipTransferred,
  UpdatePlatformFee,
  UpdatePlatformFeeRecipient,
  TradeVolume,
  History,
} from "../generated/schema";
import { BigInt, store } from "@graphprotocol/graph-ts";

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

export function handleItemCanceled(event: ItemCanceledEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.owner.toHex();

  let entity = ItemListed.load(id);

  if (entity) {
    store.remove("ItemListed", id);
  }

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "CancelListing";
  historyEntity.from = event.params.owner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nft;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.owner.toHex();

  let entity = new ItemListed(id);
  entity.owner = event.params.owner;
  entity.nft = event.params.nft;
  entity.mediaType = event.params.mediaType;
  entity.tokenId = event.params.tokenId;
  entity.quantity = event.params.quantity;
  entity.payToken = event.params.payToken;
  entity.pricePerItem = event.params.pricePerItem;
  entity.startingTime = event.params.startingTime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "Listed";
  historyEntity.from = event.params.owner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nft;
  historyEntity.pricePerItem = event.params.pricePerItem;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleItemSold(event: ItemSoldEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex() +
    "-" +
    event.params.buyer.toHex();

  let entity = new ItemSold(id);
  entity.seller = event.params.seller;
  entity.buyer = event.params.buyer;
  entity.nft = event.params.nft;
  entity.tokenId = event.params.tokenId;
  entity.quantity = event.params.quantity;
  entity.payToken = event.params.payToken;
  entity.pricePerItem = event.params.pricePerItem;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const listed_id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex();

  let listed_entity = ItemListed.load(listed_id);

  if (listed_entity) {
    store.remove("ItemListed", listed_id);
  }

  const offer_id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.buyer.toHex();

  let offer_entity = OfferCreated.load(offer_id);

  if (offer_entity) {
    store.remove("OfferCreated", offer_id);
  }

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "Sold";
  historyEntity.from = event.params.seller;
  historyEntity.to = event.params.buyer;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nft;
  historyEntity.pricePerItem = event.params.pricePerItem;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();

  // Increase value in TradeVolume
  const tradevolume_id = event.params.nft.toHex();
  let tradevolume_entity = TradeVolume.load(tradevolume_id);

  if (tradevolume_entity) {
    tradevolume_entity.value = tradevolume_entity.value.plus(
      event.params.pricePerItem
    );
  } else {
    tradevolume_entity = new TradeVolume(tradevolume_id);
    tradevolume_entity.value = new BigInt(0);
  }
  tradevolume_entity.blockTimestamp = event.block.timestamp;
  tradevolume_entity.save();
}

export function handleItemUpdated(event: ItemUpdatedEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.owner.toHex();

  let entity = ItemListed.load(id);

  if (entity) {
    entity.pricePerItem = event.params.newPrice;
    entity.payToken = event.params.payToken;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleOfferCanceled(event: OfferCanceledEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.creator.toHex();

  let entity = OfferCreated.load(id);

  if (entity) {
    store.remove("OfferCreated", id);
  }

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "OfferCanceled";
  historyEntity.from = event.params.creator;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nft;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
}

export function handleOfferCreated(event: OfferCreatedEvent): void {
  const id =
    event.params.nft.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.creator.toHex();

  let entity = new OfferCreated(id);
  entity.creator = event.params.creator;
  entity.nft = event.params.nft;
  entity.owner = event.params.owner;
  entity.tokenId = event.params.tokenId;
  entity.quantity = event.params.quantity;
  entity.payToken = event.params.payToken;
  entity.pricePerItem = event.params.pricePerItem;
  entity.deadline = event.params.deadline;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Add to History
  let historyEntity = new History(event.block.timestamp.toString());

  historyEntity.eventType = "OfferMade";
  historyEntity.from = event.params.creator;
  historyEntity.to = event.params.owner;
  historyEntity.tokenId = event.params.tokenId;
  historyEntity.nft = event.params.nft;
  historyEntity.pricePerItem = event.params.pricePerItem;

  historyEntity.blockNumber = event.block.number;
  historyEntity.blockTimestamp = event.block.timestamp;
  historyEntity.transactionHash = event.transaction.hash;

  historyEntity.save();
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

export function handleUpdatePlatformFee(event: UpdatePlatformFeeEvent): void {
  let entity = new UpdatePlatformFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.platformFee = event.params.platformFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdatePlatformFeeRecipient(
  event: UpdatePlatformFeeRecipientEvent
): void {
  let entity = new UpdatePlatformFeeRecipient(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.platformFeeRecipient = event.params.platformFeeRecipient;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
