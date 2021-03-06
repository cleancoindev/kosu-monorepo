const Web3Wrapper = require("@0x/web3-wrapper").Web3Wrapper;
const Web3 = require("web3");
const chai = require("chai");
const CAP = require("chai-as-promised");
const Web3ProviderEngine = require("web3-provider-engine");
const providerUtils = require("@0x/utils").providerUtils;
const GanacheSubprovider = require("@0x/subproviders").GanacheSubprovider;
const RPCSubprovider = require("@0x/subproviders").RPCSubprovider;
const migrations = require("@kosu/migrations").migrations;
const Helpers = require("@kosu/test-helpers");
const BlockchainLifecycle = require("@0x/dev-utils").BlockchainLifecycle;
const { Kosu } = require("../src");
const BigNumber = require("@0x/utils").BigNumber;

chai.use(CAP);

const useGeth = process.argv.includes("geth");

before(async () => {
    global.assert = chai.assert;
    chai.should();

    global.provider = new Web3ProviderEngine();

    if (useGeth) {
        const rpcSubprovider = new RPCSubprovider(process.env.WEB3_URI);
        provider.addProvider(rpcSubprovider);
    } else {
        const ganacheSubprovider = new GanacheSubprovider({
            network_id: 6175,
            mnemonic: process.env.npm_package_config_test_mnemonic,
        });
        provider.addProvider(ganacheSubprovider);
    }

    providerUtils.startProviderEngine(provider);

    global.web3Wrapper = new Web3Wrapper(provider);
    await new BlockchainLifecycle(web3Wrapper).startAsync();

    global.web3 = new Web3(provider);
    global.accounts = await web3.eth.personal.getAccounts();
    global.BigNumber = BigNumber;
    global.MAX_UINT = BigNumber("2")
        .pow(BigNumber("256"))
        .minus(BigNumber("1"))
        .toString();

    const config = {
        provider,
        networkId: await web3.eth.net.getId(),
        from: accounts[0].toLowerCase(),
    };

    if (!useGeth) {
        config.migratedContracts = await migrations(provider, { from: accounts[0].toLowerCase() });
        config.votingAddress = config.migratedContracts.voting.address;
        config.treasuryAddress = config.migratedContracts.treasury.address;
        config.kosuTokenAddress = config.migratedContracts.kosuToken.address;
        config.eventEmitterAddress = config.migratedContracts.eventEmitter.address;
        config.orderGatewayAddress = config.migratedContracts.orderGateway.address;
        config.posterRegistryAddress = config.migratedContracts.posterRegistry.address;
        config.validatorRegistryAddress = config.migratedContracts.validatorRegistry.address;
    }
    global.testHelpers = new Helpers.TestHelpers(web3Wrapper, config);

    const nullProvider = new Web3ProviderEngine();
    const nullGanacheSubprovider = new GanacheSubprovider({});
    nullProvider.addProvider(nullGanacheSubprovider);
    providerUtils.startProviderEngine(nullProvider);
    global.nullWeb3Wrapper = new Web3Wrapper(nullProvider);

    global.TestValues = Helpers.TestValues;
    // global.testHelpers = new Helpers.TestHelpers(web3Wrapper, )
});

describe("config", () => {
    it("should connect to web3", () => {
        accounts.length.should.be.gte(10, "There should be 10 ETH accounts.");
    });
});
