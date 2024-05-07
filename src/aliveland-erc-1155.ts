import {
  ApprovalForAll as ApprovalForAllEvent,
  BatchMinted as BatchMintedEvent,
  Minted as MintedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  Unpaused as UnpausedEvent,
} from "../generated/AlivelandERC1155/AlivelandERC1155";
import {
  ApprovalForAll,
  History,
  Minted,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  Transfer,
  URI,
} from "../generated/schema";
import { dataSource, store } from "@graphprotocol/graph-ts";

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchMinted(event: BatchMintedEvent): void {}

export function handleMinted(event: MintedEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id = collectionAddress.toHex() + "-" + event.params.tokenId.toHex();

  let entity = new Minted(id);

  entity.tokenId = event.params.tokenId;
  entity.beneficiary = event.params.beneficiary;
  entity.tokenUri = event.params.tokenUri;
  entity.minter = event.params.minter;
  entity.name = event.params.name;

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

export function handlePaused(event: PausedEvent): void {}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id =
    collectionAddress.toHex() +
    "-" +
    event.params.account.toHex() +
    "-" +
    event.params.sender.toHex() +
    "-" +
    event.params.role.toHex();

  let entity = new RoleGranted(id);
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;
  entity.nft = collectionAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id =
    collectionAddress.toHex() +
    "-" +
    event.params.account.toHex() +
    "-" +
    event.params.sender.toHex() +
    "-" +
    event.params.role.toHex();

  let entity = RoleGranted.load(id);

  if (entity) {
    store.remove("RoleGranted", id);
  }
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  for (let i = 0; i < event.params.ids.length; i++) {
    const id =
      collectionAddress.toHex() +
      "-" +
      event.params.ids[i].toString() +
      "-" +
      event.params.to.toHex() +
      "-" +
      event.params.from.toHex();

    let entity = new Transfer(id);
    entity.nft = collectionAddress;
    entity.operator = event.params.operator;
    entity.from = event.params.from;
    entity.to = event.params.to;
    entity.tokenId = event.params.ids[i];
    entity.value = event.params.values[i];
    entity.nftType = "ERC1155";

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    if (event.params.from.toHex() == "0x0") {
      let historyEntity = new History(event.block.timestamp.toString());
      historyEntity.eventType = "Minted";

      historyEntity.from = event.params.from;
      historyEntity.to = event.params.to;
      historyEntity.tokenId = event.params.ids[i];
      historyEntity.quantity = event.params.values[i];
      historyEntity.nft = collectionAddress;
      historyEntity.nftType = "ERC1155";

      historyEntity.blockNumber = event.block.number;
      historyEntity.blockTimestamp = event.block.timestamp;
      historyEntity.transactionHash = event.transaction.hash;

      historyEntity.save();
    }
  }
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id =
    collectionAddress.toHex() +
    "-" +
    event.params.id.toString() +
    "-" +
    event.params.to.toHex() +
    "-" +
    event.params.from.toHex();

  let entity = new Transfer(id);
  entity.nft = collectionAddress;
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.id;
  entity.value = event.params.value;
  entity.nftType = "ERC1155";

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  if (event.params.from.toHex() == "0x0") {
    let historyEntity = new History(event.block.timestamp.toString());
    historyEntity.eventType = "Minted";

    historyEntity.from = event.params.from;
    historyEntity.to = event.params.to;
    historyEntity.tokenId = event.params.id;
    historyEntity.quantity = event.params.value;
    historyEntity.nft = collectionAddress;
    historyEntity.nftType = "ERC1155";

    historyEntity.blockNumber = event.block.number;
    historyEntity.blockTimestamp = event.block.timestamp;
    historyEntity.transactionHash = event.transaction.hash;

    historyEntity.save();
  }
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;
  entity.AlivelandERC1155_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {}
