import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses } from "@kosu/migrations";
import { TreasuryContract } from "@kosu/system-contracts";
import { KosuOptions } from "@kosu/types";
import { TransactionReceiptWithDecodedLogs } from "ethereum-protocol";

import { KosuToken } from "./KosuToken";

/**
 * Interact with the deployed Kosu Treasury contract.
 *
 * Instances of the `Treasury` class provide methods to interact with deployed
 * Kosu Treasury contracts for functionality such as deposits/withdrawals and
 * allowance management.
 *
 * If instantiated outside the `Kosu` class, the `web3Wrapper` provided to the
 * constructor must include the Treasury's ABI (from the compiled Solidity source).
 */
export class Treasury {
    /**
     * The `web3Wrapper` instance with the contract's ABI loaded.
     */
    public readonly web3Wrapper: Web3Wrapper;

    /**
     * An instance of the `KosuToken` class to communicate with the KOSU ERC-20 token.
     */
    public readonly kosuToken: KosuToken;

    /**
     * A lower-level, auto-generated contract wrapper for the Treasury contract,
     * generated from solidity source code.
     */
    public contract: TreasuryContract;

    /**
     * They deployed Treasury's address for the detected networkID.
     */
    public address: string;

    /**
     * The user's coinbase address (if available via supplied provider).
     */
    public coinbase: string;

    /**
     * Creates a new Treasury instance.
     *
     * @param options Initialization options (see `KosuOptions`).
     * @param kosuToken Configured/instantiated `KosuToken` instance.
     */
    constructor(options: KosuOptions, kosuToken?: KosuToken) {
        this.web3Wrapper = options.web3Wrapper;
        this.kosuToken = kosuToken || new KosuToken(options);
        this.address = options.treasuryAddress;
    }

    /**
     * Asynchronously initializes the contract instance, or returns it from cache.
     *
     * @returns The lower-level contract wrapper instance.
     */
    public async getContract(): Promise<TreasuryContract> {
        if (!this.contract) {
            const networkId = await this.web3Wrapper.getNetworkIdAsync();
            this.coinbase = await this.web3Wrapper.getAvailableAddressesAsync().then(as => as[0]);

            if (!this.address) {
                this.address = DeployedAddresses[networkId].Treasury.contractAddress;
            }
            if (!this.address) {
                throw new Error("Invalid network for Treasury");
            }

            this.contract = new TreasuryContract(this.address, this.web3Wrapper.getProvider(), { from: this.coinbase });
        }
        return this.contract;
    }

    /**
     * Deposit tokens in the treasury, from the detected `coinbase` account.
     *
     * @param value The uint value of tokens to deposit in wei.
     * @returns The decoded transaction receipt, after the TX has been included in a block.
     * @example
     * ```typescript
     * // deposit 10 KOSU
     *
     * const value = new BigNumber(web3-utils.toWei("10"));
     * const receipt = await treasury.deposit(value);
     * ```
     */
    public async deposit(value: BigNumber | string | number): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        const hasBalance = await this.kosuToken.balanceOf(this.coinbase).then(bal => bal.gte(value));
        const hasApproval = await this.kosuToken.allowance(this.coinbase, this.address).then(all => all.gte(value));

        if (!hasBalance) {
            throw new Error(`${this.coinbase} has insufficient balance to deposit`);
        }

        if (!hasApproval) {
            console.log(`${this.coinbase} has insufficient approval; Setting approval`);
            await this.kosuToken.approve(this.address, value);
        }

        return contract.deposit.awaitTransactionSuccessAsync(new BigNumber(value.toString()));
    }

    /**
     * Withdraw tokens from treasury to the detected `coinbase` account.
     *
     * @param value The uint value of tokens to withdraw in wei.
     * @returns The decoded transaction receipt, after the TX is mined in a block.
     * @example
     * ```typescript
     * // withdraw 10 KOSU
     *
     * const value = new BigNumber(web3-utils.toWei("10"));
     * const receipt = await treasury.withdraw(value);
     * ```
     */
    public async withdraw(value: BigNumber | string | number): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.withdraw.awaitTransactionSuccessAsync(new BigNumber(value.toString()));
    }

    /**
     * Authorize an address to vote in proxy
     *
     * @param _proxy The address to be added as a proxy
     * @returns The decoded transaction receipt, after the TX is mined in a block.
     */
    public async authorizeProxy(_proxy: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.authorizeProxy.awaitTransactionSuccessAsync(_proxy);
    }

    /**
     * Remove an address's authorization to vote in proxy
     *
     * @param _proxy The address to be removed as a proxy
     * @returns The decoded transaction receipt, after the TX is mined in a block.
     */
    public async deauthorizeProxy(_proxy: string): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return contract.deauthorizeProxy.awaitTransactionSuccessAsync(_proxy);
    }

    /**
     * Checks if an address is a valid proxy for another address
     *
     * @param _account The balance holder
     * @param _proxy The possible voting proxy
     * @returns The boolean status of proxy voting permission
     */
    public async isProxyFor(_account: string, _proxy: string): Promise<boolean> {
        const contract = await this.getContract();
        return contract.isProxyFor.callAsync(_account, _proxy);
    }

    /**
     * Read the total system balance of KOSU for a provided `address` string.
     *
     * @param address The Ethereum address to check system balance for.
     * @returns The user's total KOSU system balance, in wei.
     * @example
     * ```typescript
     * // view system balance of address
     *
     * const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
     * const balanceWei = await treasury.systemBalance(address);
     *
     * // convert to ether from wei
     * const balance = web3-utils.fromWei(balanceWei);
     * ```
     */
    public async systemBalance(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.systemBalance.callAsync(address);
    }

    /**
     * Read the available (current) treasury balance for a provided `address`.
     *
     * @param address The Ethereum address to check current balance of.
     * @returns The user's current treasury balance (in wei).
     * @example
     * ```typescript
     * // view current balance of address
     *
     * const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
     * const balanceWei = await treasury.currentBalance(address);
     *
     * // convert to ether from wei
     * const balance = web3-utils.fromWei(balanceWei);
     * ```
     */
    public async currentBalance(address: string): Promise<BigNumber> {
        const contract = await this.getContract();
        return contract.currentBalance.callAsync(address);
    }

    /**
     * View the current treasury allowance for the detected `coinbase` account.
     *
     * @returns The current KOSU approval for the Treasury for the current user, in wei.
     * @example
     * ```typescript
     * // view current allowance for the treasury
     *
     * const allowanceWei = await treasury.treasuryAllowance();
     *
     * // convert to ether from wei
     * const allowance = web3-utils.fromWei(allowanceWei);
     * ```
     */
    public async treasuryAllowance(): Promise<BigNumber> {
        const contract = await this.getContract();
        return this.kosuToken.allowance(this.coinbase, contract.address);
    }

    /**
     * Approve the treasury to transfer KOSU on behalf of the user's `coinbase`
     * account.
     *
     * @param value The amount of KOSU (in wei) to approve the treasury for.
     * @returns The decoded transaction receipt, after the TX has been mined.
     * @example
     * ```typescript
     * // approve the treasury for 1,000,000 KOSU
     *
     * const value = new BigNumber(web3-utils.toWei("1000000"));
     * const receipt = await treasury.approveTreasury(value);
     * ```
     */
    public async approveTreasury(value: BigNumber | string | number): Promise<TransactionReceiptWithDecodedLogs> {
        const contract = await this.getContract();
        return this.kosuToken.approve(contract.address, new BigNumber(value.toString()));
    }

    /**
     * Sends ether to the contract to bond and deposit tokens.
     *
     * @param value Amount of wei to deposit
     * @returns Logs from the transaction block.
     */
    public async pay(value: BigNumber | string | number): Promise<TransactionReceiptWithDecodedLogs> {
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
