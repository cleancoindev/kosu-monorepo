import { MnemonicWalletSubprovider, RPCSubprovider } from "@0x/subproviders";
import {providerUtils} from "@0x/utils";
import fs from "fs";
import safeRequire from "safe-node-require";
import Web3 from "web3";
import Web3ProviderEngine from "web3-provider-engine";
import { BN, toWei } from "web3-utils";
import yargs from "yargs";

import * as deployedAddresses from "./deployedAddresses.json";
import { migrations } from "./migrations";

const mnemonic = safeRequire("./mnemonic.json");

const args = yargs
    .option("rpc-url", {
        type: "string",
        default: "http://localhost:8545",
    }).argv;

(async () => {
    const mnemonicSubprovider = mnemonic ? new MnemonicWalletSubprovider({ mnemonic }) : null;
    const rpcSubprovider = new RPCSubprovider(args["rpc-url"]);
    const provider = new Web3ProviderEngine();
    if (mnemonicSubprovider) { provider.addProvider(mnemonicSubprovider); }
    provider.addProvider(rpcSubprovider);
    providerUtils.startProviderEngine(provider);

    const web3 = new Web3(provider);

    const normalizedFromAddress = await web3.eth.getCoinbase().then((x: string) => x.toLowerCase());

    const txDefaults = {
        from: normalizedFromAddress,
        gas: 4500000,
        gasPrice: toWei("5", "gwei"),
    };

    const networkId = await web3.eth.net.getId();
    const migratedContracts = await migrations(provider, txDefaults, {});

    const contracts = {};
    for (const contractKey of Object.keys(migratedContracts)) {
        const contract = migratedContracts[contractKey];
        contracts[contract.contractName] = contract.address;
    }
    deployedAddresses[networkId] = contracts;
    // @ts-ignore
    delete deployedAddresses.default;

    await new Promise<void>((resolve, reject) => fs.writeFile("./src/deployedAddresses.json", JSON.stringify(deployedAddresses), () => resolve()));
})().catch(err => {
    console.log(err);
});