const { OrderGateway } = require('../src/OrderGateway');
const DeployedAddresses = require('@kosu/system-contracts').DeployedAddresses;

describe('OrderGateway', () => {
  let orderGateway;

  before(async () => {
    orderGateway = kosu.orderGateway;

    maker = accounts[7].toLowerCase();
    taker = accounts[8].toLowerCase();
    let makerArguments = await orderGateway.makerArguments(subContract);
    let takerArguments = await orderGateway.takerArguments(subContract);

    await tka.approve(subContract, MAX_UINT,  maker);
    await tkb.approve(subContract, MAX_UINT, taker );

    let makerValues = {
      signer: maker,
      signerToken: TKA,
      signerTokenCount: 1000,
      buyer: taker,
      buyerToken: TKB,
      buyerTokenCount: 1000,
    };

    order = { subContract, maker: maker, makerArguments, takerArguments, makerValues };
    await kosu.orderHelper.makeOrder(order);
  });

  describe('participate()', () => {
    it('should participate in a fully constructed Order.');
  });

/*  describe('events', () => {
    it('should call callback', (done) => {
      const takerValues = {
        tokensToBuy: 100
      };

      orderGateway.oneEvent((error, event) => {
        event.returnValues.id.should.eq('test');
        done()
      });

      order.id = 'test';
      order.take(taker, takerValues);
    });
  });*/


  describe('makerArguments()', () => {
    it('should get the makerArguments of a SubContract', async () => {
      const makerArguments = await orderGateway.makerArguments(subContract);
      assert.doesNotThrow(() => { JSON.stringify(makerArguments) });
    });
  });

  describe('takerArguments()', () => {
    it('should get the takerArguments of a SubContract', async () => {
      const takerArguments = await orderGateway.takerArguments(subContract);
      assert.doesNotThrow(() => { JSON.stringify(takerArguments) });
    });
  });

  describe('constructor()', () => {
    it("should not deploy a new contract if configuration doesn't point to a network with a deployed contract.", async () => {
      await orderGateway.initializing;

      (async () => { const gw = new OrderGateway({ web3, networkId: 123 }); await gw.initializing })().should.eventually.be.rejected;
    });

    it("should select an existing contract if the core has been deployed to the network.", async () => {
      await orderGateway.initializing;
      const deployedAddress = orderGateway.address;

      const testOrderGateway = new OrderGateway({ web3, networkId: 3 });
      await testOrderGateway.initializing;

      deployedAddress.should.not.equal(testOrderGateway.address);
      testOrderGateway.address.should.equal(DeployedAddresses[3].OrderGateway);
    });

    it("should select an existing contract if the options provide address.", async () => {
      await orderGateway.initializing;
      const deployedAddress = orderGateway.address;

      const testOrderGateway = new OrderGateway({ web3, orderGatewayAddress: deployedAddress });
      await testOrderGateway.initializing;

      deployedAddress.should.equal(testOrderGateway.address);
    });
  });
});