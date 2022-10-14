
import { BigNumber } from "ethers";
import {ethers} from "hardhat";
import {expect} from "chai";


describe("Testing ERC20 Token", () => {
//   let tokenContract: EncodeBootcampJulyToken;
//   let accounts: any[];
//   let minterRoleHash: BytesLike;

//   beforeEach(async () => {
//     accounts = await ethers.getSigners();
//     const tokenFactory = await ethers.getContractFactory(
//       "EncodeBootcampJulyToken"
//     );
//     tokenContract = await tokenFactory.deploy();
//     await tokenContract.deployed();
//     minterRoleHash = await tokenContract.MINTER_ROLE();
//   });

  describe("when the contract is deployed", async () => {
    it("has zero total supply", async () => {
        const tokenContractFactory = await ethers.getContractFactory("MyToken");
        const tokenContract = await tokenContractFactory.deploy(); 
        await tokenContract.deployed();
        const totalSupply = await tokenContract.totalSupply();
        expect(totalSupply).to.eq(0);
    });

    it("sets the deployer as minter", async () => {
    
    });

    describe("when the minter call the mint function", async () => {
    //   beforeEach(async () => {
    //     const mintTx = await tokenContract.mint(
    //       accounts[1].address,
    //       TEST_MINT_VALUE
    //     );
    //     await mintTx.wait();
    //   });

      it("updates the total supply", async () => {
       
      });

      it("has given balance to the account", async () => {
      
      });
    });
  });
});