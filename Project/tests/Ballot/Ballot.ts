import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function giveRightToVote(ballotContract: Ballot, voterAddress: any) {
  const tx = await ballotContract.giveRightToVote(voterAddress);
  await tx.wait();
}

describe("Ballot", function () {
  let ballotContract: Ballot;
  let accounts: any[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function(){
      for (let index = 0; index < PROPOSALS.length; index++){
        const proposal = await ballotContract.proposals(index); 
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[index]);
      }
     
  });

    it("has zero votes for all proposals", async function(){
        //TODO
    });

    it("sets the deployer address as chairperson", async function(){
        const address = await ballotContract.chairperson();
        const deployer = accounts[0].address;
        expect(address).to.eq(deployer)
    });

    it("sets the voting weight for the chairperson as 1", async function(){
      const chairpersonVoter = await ballotContract.voters(accounts[0].address);
      expect(chairpersonVoter.weight).to.eq(1);
    })
    });

  describe("when the chariperson interacts with the giveRightToVote function in the contract", function(){
    it("gives right to vote for another address", async function(){
      
      let newVoter = await ballotContract.voters(accounts[1].address);
      expect(newVoter.weight).to.eq(0);
      const tx = await ballotContract.giveRightToVote(accounts[1].address);
      await tx.wait();
      newVoter = await ballotContract.voters(accounts[1].address);
      expect(newVoter.weight).to.eq(1); 
    })

    it("cannot give right to vote for someone that has voted", async function(){
      const tx = await ballotContract.giveRightToVote(accounts[1].address);
      await tx.wait();
      const voteTx = await ballotContract.connect(accounts[1]).vote(2);
      await voteTx.wait();
      await expect(ballotContract.giveRightToVote(accounts[1].address)).to.be.revertedWith("The voter already voted")
    })
  })

});
