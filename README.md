# Subgraphs
Subgraph for Aliveland contracts

Please take a look at [Graph protocol](https://github.com/graphprotocol/graph-node) for more information.

## Polygon hosted node endpoints

https://thegraph.com/hosted-service/subgraph/cdreamer1/aliveland-nft-subgraph

## Subgraphs

### Setup

This is one-time setup. So you can skip this if you don't want to edit the subgraph.

This can be created for almost all blockchain networks including testnets.
```bash
# install graph-cli
npm install -g @graphprotocol/graph-cli
```

```bash
# create subgraph referring the existing contracts
graph init 
  --product hosted-service \
  --from-contract <CONTRACT_ADDRESS> \
  [--network <BLOCKCHAIN_NETWORK>] \
  [--abi <FILE_PATH>]
```
You can continue adding subgraphs for other contracts without quitting.
You should create subgraphs for all the contracts.

You can read more here : https://thegraph.com/docs/en/developing/creating-a-subgraph/

### Build

```bash
# generate code
npm run codegen

# build
npm run build
```

### Deploy on Graph's hosted node

```bash
# deploy sub graph on the node
npm run deploy
```
