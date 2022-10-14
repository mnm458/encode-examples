



describe("Testing ERC20 Token", () => {
//   let tokenContract: EncodeBootcampJulyToken;
//   let accounts: any[];
//   let minterRoleHash: BytesLike;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory(
      "EncodeBootcampJulyToken"
    );
    tokenContract = await tokenFactory.deploy();
    await tokenContract.deployed();
    minterRoleHash = await tokenContract.MINTER_ROLE();
  });

  describe("when the contract is deployed", async () => {
    it("has zero total supply", async () => {
      const totalSupplyBN = await tokenContract.totalSupply();
      const expectedValueBN = PREMINT;
      const diffBN = totalSupplyBN.gt(expectedValueBN)
        ? totalSupplyBN.sub(expectedValueBN)
        : expectedValueBN.sub(totalSupplyBN);
      const diff = Number(diffBN);
      expect(diff).to.eq(0);
    });

    it("sets the deployer as minter", async () => {
      const hasRole = await tokenContract.hasRole(
        minterRoleHash,
        accounts[0].address
      );
      expect(hasRole).to.eq(true);
    });

    describe("when the minter call the mint function", async () => {
      beforeEach(async () => {
        const mintTx = await tokenContract.mint(
          accounts[1].address,
          TEST_MINT_VALUE
        );
        await mintTx.wait();
      });

      it("updates the total supply", async () => {
        const totalSupplyBN = await tokenContract.totalSupply();
        const expectedValueBN = TEST_MINT_VALUE;
        const diffBN = totalSupplyBN.gt(expectedValueBN)
          ? totalSupplyBN.sub(expectedValueBN)
          : expectedValueBN.sub(totalSupplyBN);
        const diff = Number(diffBN);
        expect(diff).to.eq(0);
      });

      it("has given balance to the account", async () => {
        const balanceOfBN = await tokenContract.balanceOf(accounts[1].address);
        const expectedValueBN = TEST_MINT_VALUE;
        const diffBN = balanceOfBN.gt(expectedValueBN)
          ? balanceOfBN.sub(expectedValueBN)
          : expectedValueBN.sub(balanceOfBN);
        const diff = Number(diffBN);
        expect(diff).to.eq(0);
      });
    });
  });
});