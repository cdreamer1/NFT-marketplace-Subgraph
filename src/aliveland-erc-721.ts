import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  MetadataUpdate as MetadataUpdateEvent,
  Minted as MintedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  UpdateFeeRecipient as UpdateFeeRecipientEvent,
  UpdateMintFee as UpdateMintFeeEvent,
} from "../generated/AlivelandERC721/AlivelandERC721";
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  History,
  MetadataUpdate,
  Minted,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  Transfer,
} from "../generated/schema";
import { store, dataSource, Address, log } from "@graphprotocol/graph-ts";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._fromTokenId = event.params._fromTokenId;
  entity._toTokenId = event.params._toTokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._tokenId = event.params._tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMinted(event: MintedEvent): void {
  // log.info('Minted: {}', [event.params.tokenUri])

  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id = collectionAddress.toHex() + "-" + event.params.tokenId.toHex();

  let entity = new Minted(id);
  entity.nft = collectionAddress;
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

export function handlePaused(event: PausedEvent): void {}

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

export function handleTransfer(event: TransferEvent): void {
  const context = dataSource.context();
  const collectionAddress = context.getBytes("collectionAddress");

  const id =
    collectionAddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.to.toHex() +
    "-" +
    event.params.from.toHex();

  let entity = new Transfer(id);
  entity.nft = collectionAddress;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.nftType = "ERC721";

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  if (event.params.from.toHex() == "0x0") {
    let historyEntity = new History(event.block.timestamp.toString());

    historyEntity.eventType = "Minted";

    historyEntity.from = event.params.from;
    historyEntity.to = event.params.to;
    historyEntity.tokenId = event.params.tokenId;
    historyEntity.nft = collectionAddress;
    historyEntity.nftType = "ERC721";

    historyEntity.blockNumber = event.block.number;
    historyEntity.blockTimestamp = event.block.timestamp;
    historyEntity.transactionHash = event.transaction.hash;

    historyEntity.save();
  }
}

export function handleUnpaused(event: UnpausedEvent): void {}

export function handleUpdateFeeRecipient(
  event: UpdateFeeRecipientEvent
): void {}

export function handleUpdateMintFee(event: UpdateMintFeeEvent): void {}
