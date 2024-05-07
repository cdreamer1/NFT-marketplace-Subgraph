import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AlivelandAuctionContractDeployed } from "../generated/schema"
import { AlivelandAuctionContractDeployed as AlivelandAuctionContractDeployedEvent } from "../generated/AlivelandAuction/AlivelandAuction"
import { handleAlivelandAuctionContractDeployed } from "../src/aliveland-auction"
import { createAlivelandAuctionContractDeployedEvent } from "./aliveland-auction-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newAlivelandAuctionContractDeployedEvent = createAlivelandAuctionContractDeployedEvent()
    handleAlivelandAuctionContractDeployed(
      newAlivelandAuctionContractDeployedEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AlivelandAuctionContractDeployed created and stored", () => {
    assert.entityCount("AlivelandAuctionContractDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
