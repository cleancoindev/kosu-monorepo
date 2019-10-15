import { BlockchainLifecycle } from "@0x/dev-utils";
import { MnemonicWalletSubprovider, RPCSubprovider } from "@0x/subproviders";
import { providerUtils } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import fs from "fs";
import safeRequire from "safe-node-require";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { toWei } from "web3-utils";
import yargs from "yargs";

import * as deployedAddresses from "../deployedAddresses.json";
import { migrations } from "../migrations";

const args = yargs
    .option("rpc-url", {
        type: "string",
        default: "http://localhost:8545",
    })
    .boolean("test-mnemonic").argv;

let mnemonic = safeRequire("./mnemonic.json");
if (args["test-mnemonic"] || !mnemonic) {
    mnemonic = process.env.npm_package_config_test_mnemonic;
}

(async () => {
    const mnemonicSubprovider = mnemonic ? new MnemonicWalletSubprovider({ mnemonic }) : null;
    const rpcSubprovider = new RPCSubprovider(args["rpc-url"]);
    const providerEngine = new Web3ProviderEngine();
    if (mnemonicSubprovider) {
        providerEngine.addProvider(mnemonicSubprovider);
    }
    providerEngine.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(providerEngine);

    const web3 = new Web3(providerEngine);

    const normalizedFromAddress = await web3.eth.getCoinbase().then((x: string) => x.toLowerCase());

    const txDefaults = {
        from: normalizedFromAddress,
        gasPrice: toWei("5", "gwei"),
    };

    const networkId = await web3.eth.net.getId();

    if ([6174, 6175].includes(networkId)) {
        // @ts-ignore
        await new BlockchainLifecycle(new Web3Wrapper(new Web3.providers.HttpProvider(args["rpc-url"]))).startAsync();
        if ((await web3.eth.getTransactionCount(normalizedFromAddress)) > 0) {
            throw new Error("Reset Kosu Chain");
        }
    }

    const migratedContracts = await migrations(providerEngine, txDefaults, {});

    const contracts = {};
    for (const contractKey of Object.keys(migratedContracts)) {
        const contract = migratedContracts[contractKey];
        contracts[contract.contractName] = contract.txReceipt;
        contracts[contract.contractName].timestamp = await web3.eth
            .getBlock(contract.txReceipt.blockNumber.toString())
            .then(b => b.timestamp);
    }
    deployedAddresses[networkId] = contracts;
    // @ts-ignore
    delete deployedAddresses.default;

    await new Promise<void>((resolve, reject) =>
        fs.writeFile("./src/deployedAddresses.json", JSON.stringify(deployedAddresses), () => resolve()),
    );
})().catch(err => {
    console.log(err);
    process.exit(1);
});