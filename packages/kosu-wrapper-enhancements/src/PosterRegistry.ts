import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses } from "@kosu/migrations";
import { PosterRegistryContract } from "@kosu/system-contracts";
import { KosuOptions } from "@kosu/types";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";

import { Treasury } from "./Treasury";

/**
 * Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.
 *
 * Instances of the `PosterRegistry` class allow users to interact with the
 * deployed contract to bond and un-bond tokens (for access to the Kosu network)
 * and to view their balance, as well as the cumulative lockup.
 */
export class PosterRegistry {
    /**
     * The `web3Wrapper` instance with the contract's ABI loaded.
     */
    public readonly web3Wrapper: Web3Wrapper;

    /**
     * An instantiated Treasury contract wrapper.
     */
    public readonly treasury: Treasury;

    /**
     * A lower-level, auto-generated contract wrapper for the PosterRegistry
     * proxy contract. Generated from solidity source code.
     */
    public contract: PosterRegistryContract;

    /**
     * The address of the deployed PosterRegistry proxy contract.
     */
    public address: string;

    /**
     * The user's coinbase address (if available via supplied provider).
     */
    public coinbase: string;

    /**
     * Create a new PosterRegistry instance.
     *
     * @param options Instantiation options (see `KosuOptions`).
     * @param treasury Treasury integration instance.
     */
    constructor(options: KosuOptions, treasury?: Treasury) {
        this.web3Wrapper = options.web3Wrapper;
        this.treasury = treasury || new Treasury(options);
        this.address = options.posterRegistryAddress;
    }

    /**
     * Asynchronously initializes the contract instance or returns it from cache.
     *
     * @returns The contract wrapper instance.
     */
    public async getContract(): Promise<PosterRegistryContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            this.coinbase = await this.web3Wrapper.getAvailableAddressesAsync().then(as => as[0]);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].PosterRegistry.contractAddress;
            }
            if (!this.address) {
                throw new Error("Invalid network for PosterRegistry");
            }

            this.contract = new PosterRegistryContract(this.address, this.web3Wrapper.getProvider(), {
                from: this.coinbase,
            });
        }
        return this.contract;
    }

    /**
     * Reads total KOSU tokens contributed to registry.
     *
     * @returns The total pool of locked KOSU tokens in units of wei.
     */
    public async tokensContributed(): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.tokensContributed.callAsync();
    }

    /**
     * Reads number of tokens registered for a given address.
     *
     * @param address Address of user to query the bonded balance of.
     * @returns The number of tokens bonded by the supplied user's address in wei.
     */
    public async tokensRegisteredFor(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.tokensRegisteredFor.callAsync(address);
    }

    /**
     * Register tokens into the PosterRegistry contract by bonding KOSU tokens.
     *
     * @param amount The uint value of tokens to register (in wei).
     * @returns A transaction receipt from the mined `register` transaction.
     */
    public async registerTokens(amount: BigNumber | number | string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const parsed = new BigNumber(amount.toString());

        const treasuryTokens = await this.treasury.currentBalance(this.coinbase);
        const hasTreasuryBalance = treasuryTokens.gte(parsed);

        if (!hasTreasuryBalance) {
            const tokenBalance = await this.treasury.kosuToken.balanceOf(this.coinbase);
            const tokensNeeded = parsed.minus(treasuryTokens);
            const hasEnoughTokens = tokenBalance.gte(tokensNeeded as any);

            if (hasEnoughTokens) {
                // tslint:disable-next-line: no-console
                console.log(`${this.coinbase} has insufficient available Treasury balance; Depositing Tokens`);
                await this.treasury.deposit(tokensNeeded);
            } else {
                throw new Error(`${this.coinbase} has insufficient available tokens`);
            }
        }

        return contract.registerTokens.awaitTransactionSuccessAsync(parsed);
    }

    /**
     * Release tokens from the PosterRegistry for the `coinbase` address (un-bond).
     *
     * @param amount The uint value of tokens to release from the registry (in wei).
     * @returns A transaction receipt from the mined `register` transaction.
     */
    public async releaseTokens(amount: BigNumber | number | string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.releaseTokens.awaitTransactionSuccessAsync(new BigNumber(amount.toString()));
    }

    /**
     * Sends ether to the contract to bond and register tokens for posting.
     *
     * @param value Amount of wei to deposit
     * @returns Logs from the transaction block.
     */
    public async pay(value: BigNumber | number | string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const txData = {
            from: this.coinbase,
            to: contract.address,
            value: new BigNumber(value.toString()),
        };
        return this.web3Wrapper
            .sendTransactionAsync({
                ...txData,
                gas: await this.web3Wrapper.estimateGasAsync(txData),
            })
            .then(async txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));
    }
}
