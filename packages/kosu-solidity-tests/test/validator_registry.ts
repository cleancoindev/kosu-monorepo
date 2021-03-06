/* tslint:disable:max-file-line-count */
import { BigNumber } from "@0x/utils";
import {
    artifacts,
    AuthorizedAddressesContract,
    KosuTokenContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
} from "@kosu/system-contracts";
import { Challenge, Listing } from "@kosu/types";
import { decodeKosuEvents } from "@kosu/utils";
import { padRight, soliditySha3, stringToHex, toTwosComplement } from "web3-utils";

describe("ValidatorRegistry", async () => {
    const base64Key: string = "x6899Z4PYjavGaaEBt8jk0Y/3HF5GiR1duDld66IlxM=";
    const tendermintPublicKey: string = `0x${Buffer.from(base64Key, "base64").toString("hex")}`;
    const nilKey: string = toTwosComplement(stringToHex(""));
    const paradigmMarket: string = "https://paradigm.market";

    const salt = new BigNumber("42");
    const vote0 = new BigNumber("0");
    const vote1 = new BigNumber("1");
    const secret0 = soliditySha3({ t: "uint", v: "0" }, { t: "uint", v: salt.toString() });
    const secret1 = soliditySha3({ t: "uint", v: "1" }, { t: "uint", v: salt.toString() });

    let validatorRegistry: ValidatorRegistryContract;
    let kosuToken: KosuTokenContract;
    let treasury: TreasuryContract;
    let auth: AuthorizedAddressesContract;
    let voting: VotingContract;
    let applicationPeriod: BigNumber;
    let exitPeriod: BigNumber;
    let rewardPeriod: BigNumber;
    let challengePeriod: BigNumber;
    let commitPeriod: BigNumber;
    let minimumStake: BigNumber;
    let stakeholderProportionPPM: BigNumber;
    let publicKeys: string[];
    let publicKeysBase64: string[];

    before(async () => {
        publicKeys = accounts.map(a => padRight(a, 64).toLowerCase());
        publicKeysBase64 = publicKeys.map(key => new Buffer(key.substr(2), "hex").toString("base64"));

        validatorRegistry = contracts.validatorRegistry;
        kosuToken = contracts.kosuToken;
        treasury = contracts.treasury;
        auth = contracts.authorizedAddresses;
        voting = contracts.voting;
        applicationPeriod = await validatorRegistry.applicationPeriod.callAsync();
        exitPeriod = await validatorRegistry.exitPeriod.callAsync();
        rewardPeriod = await validatorRegistry.rewardPeriod.callAsync();
        minimumStake = await validatorRegistry.minimumStake.callAsync();
        stakeholderProportionPPM = await validatorRegistry.stakeholderProportionPPM.callAsync();
        challengePeriod = await validatorRegistry.challengePeriod.callAsync();
        commitPeriod = await validatorRegistry.commitPeriod.callAsync();
    });

    after(async () => {
        await testHelpers.cleanAccounts();
    });

    describe("constructor", () => {
        it("should have a reasonable gas cost", async () => {
            const { txReceipt } = await ValidatorRegistryContract.deployFrom0xArtifactAsync(
                artifacts.ValidatorRegistry,
                provider,
                txDefaults,
                treasury.address,
                voting.address,
                contracts.eventEmitter.address,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
            );

            txReceipt.gasUsed.should.be.lt(5700000);
        });
    });

    describe("token", () => {
        it("should have a token configured", async () => {
            await validatorRegistry.kosuToken.callAsync().should.eventually.eq(kosuToken.address);
        });
    });

    describe("voting", () => {
        it("should have voting configured", async () => {
            await validatorRegistry.voting.callAsync().should.eventually.eq(voting.address);
        });
    });

    describe("treasury", () => {
        it("should have a treasury configured", async () => {
            await validatorRegistry.treasury.callAsync().should.eventually.eq(treasury.address);
        });
    });

    describe("monolithic test", () => {
        before(async () => {
            for (const account of accounts) {
                await kosuToken.transfer.awaitTransactionSuccessAsync(account, minimumStake.multipliedBy(10));
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumStake.multipliedBy(10), {
                    from: account,
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumStake.multipliedBy(10), { from: account });
            }
        });

        after(async () => {
            for (const account of accounts) {
                await testHelpers.clearTreasury(account);
                // console.log(await kosuToken.balanceOf.callAsync(account));
            }
        });

        it("should optimize coverage and runtime", async () => {
            // should fail with less tokens than minimum
            await validatorRegistry.registerListing
                .callAsync(publicKeys[0], minimumStake.minus(new BigNumber("1")), TestValues.zero, paradigmMarket)
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("must register with at least minimum balance");

            // should fail when you try to generate too many tokens
            await validatorRegistry.registerListing
                .callAsync(
                    publicKeys[0],
                    minimumStake,
                    (await validatorRegistry.maxRewardRate.callAsync()).plus(new BigNumber("1")),
                    paradigmMarket,
                )
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("reward rate exceeds max");

            const listingRegister0 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[0],
                minimumStake,
                TestValues.zero,
                paradigmMarket,
                { from: accounts[0] },
            ).should.eventually.be.fulfilled;

            const listingRegister1 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[1],
                minimumStake,
                await validatorRegistry.maxRewardRate.callAsync(),
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;

            const listingRegister2 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[2],
                minimumStake,
                new BigNumber("-1"),
                paradigmMarket,
                { from: accounts[2] },
            ).should.eventually.be.fulfilled;

            const listingRegister3 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[3],
                minimumStake,
                TestValues.oneEther.multipliedBy("-1"),
                paradigmMarket,
                { from: accounts[3] },
            ).should.eventually.be.fulfilled;

            const listingRegister4 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[4],
                minimumStake,
                TestValues.zero,
                paradigmMarket,
                { from: accounts[4] },
            ).should.eventually.be.fulfilled;

            const listingRegister5 = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                publicKeys[5],
                minimumStake,
                await validatorRegistry.maxRewardRate.callAsync(),
                paradigmMarket,
                { from: accounts[5] },
            ).should.eventually.be.fulfilled;

            // Reads all the listings
            const allListings: Listing[] = await validatorRegistry.getAllListings.callAsync();
            allListings.length.should.be.gt(4);
            allListings.forEach(listing => {
                publicKeys.should.contain(listing.tendermintPublicKey);
                accounts.should.contain(listing.owner);
                minimumStake.lte(listing.stakedBalance).should.eq(true, "have enough stake");
                listing.status.should.eq(1, "are pending listings");
            });

            // listingKeys should return a list of listing keys
            const validators = await validatorRegistry.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            // @ts-ignore
            validators.should.containSubset(publicKeys.slice(0, 5));

            // should emit a ValidatorRegistered event
            const listingRegister0DecodedLogs = decodeKosuEvents(listingRegister0.logs)[0];
            listingRegister0DecodedLogs.eventType.should.eq(
                "ValidatorRegistered",
                "should emit a ValdiatorRegisteredEvent - eventType",
            );
            listingRegister0DecodedLogs.tendermintPublicKey.should.eq(
                publicKeysBase64[0],
                "should emit a ValdiatorRegisteredEvent - tendermintPublicKey",
            );
            listingRegister0DecodedLogs.owner.should.eq(
                accounts[0].toLowerCase(),
                "should emit a ValdiatorRegisteredEvent - owner",
            );
            listingRegister0DecodedLogs.applicationBlockNumber.should.eq(
                listingRegister0.blockNumber.toString(),
                "should emit a ValdiatorRegisteredEvent - applicationBlockNumber",
            );
            listingRegister0DecodedLogs.rewardRate.should.eq(
                "0",
                "should emit a ValdiatorRegisteredEvent - rewardRate",
            );
            listingRegister0DecodedLogs.details.should.eq(
                paradigmMarket,
                "should emit a ValdiatorRegisteredEvent - details",
            );

            // should emit a ValidatorRegistered event with correct positive reward
            const listingRegister1DecodedLogs = decodeKosuEvents(listingRegister1.logs)[0];
            listingRegister1DecodedLogs.applicationBlockNumber.should.eq(
                listingRegister1.blockNumber.toString(),
                "should emit a ValidatorRegistered event with correct positive reward - applicationBlockNumber",
            );
            listingRegister1DecodedLogs.rewardRate.should.eq(
                await validatorRegistry.maxRewardRate.callAsync().then(x => x.toString()),
                "should emit a ValidatorRegistered event with correct positive reward - rewardRate",
            );

            // should emit a ValidatorRegistered event with correct negative reward
            const listingRegister2DecodedLogs = decodeKosuEvents(listingRegister2.logs)[0];
            listingRegister2DecodedLogs.applicationBlockNumber.should.eq(
                listingRegister2.blockNumber.toString(),
                "should emit a ValidatorRegistered event with correct negative reward - applicationBlockNumber",
            );
            listingRegister2DecodedLogs.rewardRate.should.eq(
                "-1",
                "should emit a ValidatorRegistered event with correct negative reward - rewardRate",
            );

            // should be initialized correctly
            const listing0Pending = await validatorRegistry.getListing.callAsync(publicKeys[0]);
            listing0Pending.tendermintPublicKey.should.eq(
                publicKeys[0],
                "should be initialized correctly - tendermintPublicKey",
            );
            listing0Pending.owner.should.eq(accounts[0], "should be initialized correctly - owner");
            listing0Pending.applicationBlock
                .toString()
                .should.eq(
                    listingRegister0.blockNumber.toString(),
                    "should be initialized correctly - applicationBlock",
                );
            listing0Pending.rewardRate.toString().should.eq("0", "should be initialized correctly - rewardRate");
            listing0Pending.stakedBalance
                .toString()
                .should.eq(minimumStake.toString(), "should be initialized correctly - stakedBalance");
            listing0Pending.status.should.eq(1, "should be initialized correctly - status");
            listing0Pending.details.should.eq(paradigmMarket, "should be initialized correctly - details");

            // should fail when you try to overwrite a listing.
            await validatorRegistry.registerListing
                .callAsync(publicKeys[0], minimumStake, TestValues.zero, paradigmMarket)
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing with public key exists", "should fail when you try to overwrite a listing");

            // should require sufficient blocks to pass before confirmation
            await validatorRegistry.confirmListing
                .callAsync(publicKeys[0])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("application period active");

            // should increase the maxRewardRate -- confirm generator
            const oldMaxRewardRate = await validatorRegistry.maxRewardRate.callAsync();
            await testHelpers.skipApplicationPeriod(listingRegister1.blockNumber);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(publicKeys[1], { from: accounts[1] })
                .should.eventually.be.fulfilled;
            const newMaxRewardRate = await validatorRegistry.maxRewardRate.callAsync();
            newMaxRewardRate.gt(oldMaxRewardRate).should.eq(true, "should increase maxRewardRate");

            // confirm listing 4
            await testHelpers.skipApplicationPeriod(listingRegister4.blockNumber);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(publicKeys[4], { from: accounts[4] })
                .should.eventually.be.fulfilled;

            // should allow a valid listing to be challenged emiting an event with a poll Id
            const challenge0PollId = await voting.nextPollId.callAsync();
            const listingChallenge0 = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                publicKeys[0],
                paradigmMarket,
                { from: accounts[9] },
            ).should.eventually.be.fulfilled;
            const listingChallenge0DecodedLogs = decodeKosuEvents(listingChallenge0.logs)[1];

            const listing1Challenge = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                publicKeys[1],
                paradigmMarket,
                { from: accounts[9] },
            ).should.eventually.be.fulfilled;
            const listingChallenge1DecodedLogs = decodeKosuEvents(listing1Challenge.logs)[1];

            // should get challenges
            const challenges: Challenge[] = await validatorRegistry.getAllChallenges.callAsync();
            challenges.length.should.be.gt(0); // todo do better

            // should require appropriate state
            await validatorRegistry.challengeListing
                .callAsync(publicKeys[0], paradigmMarket, { from: accounts[9] })
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing is not pending, accepted or exiting");

            // should require challenge to be ended
            await validatorRegistry.resolveChallenge
                .callAsync(publicKeys[0])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("challenge has not ended");

            // should not initExit on listing with pending challenge
            await validatorRegistry.initExit
                .callAsync(publicKeys[0])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing not accepted");

            listingChallenge0DecodedLogs.eventType.should.eq("ValidatorChallenged", "should be a challenged event");
            listingChallenge0DecodedLogs.challenger.should.eq(
                accounts[9].toLowerCase(),
                "ChallengedEvent should be from accounts[9",
            );
            listingChallenge0DecodedLogs.owner.should.eq(
                accounts[0].toLowerCase(),
                "ChallengedEvent should be against accounts[0]",
            );
            listingChallenge0DecodedLogs.pollId.should.eq(
                challenge0PollId.toString(),
                "ChallengedEvent should expose pollId",
            );
            listingChallenge0DecodedLogs.details.should.eq(paradigmMarket, "ChallengedEvent should have details");

            // 0 failed challenge
            await voting.commitVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge0DecodedLogs.pollId),
                secret1,
                TestValues.fiveEther,
                {
                    from: accounts[8],
                },
            );
            await voting.commitVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge0DecodedLogs.pollId),
                secret0,
                TestValues.tenEther,
                {
                    from: accounts[7],
                },
            );

            // 1 passed challenge
            await voting.commitVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge1DecodedLogs.pollId),
                secret1,
                TestValues.fiveEther,
                {
                    from: accounts[8],
                },
            );

            await testHelpers.skipCommitPeriod(listingChallenge0.blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge0DecodedLogs.pollId),
                vote1,
                salt,
                {
                    from: accounts[8],
                },
            );
            await voting.revealVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge0DecodedLogs.pollId),
                vote0,
                salt,
                {
                    from: accounts[7],
                },
            );
            await voting.revealVote.awaitTransactionSuccessAsync(
                new BigNumber(listingChallenge1DecodedLogs.pollId),
                vote1,
                salt,
                {
                    from: accounts[8],
                },
            );

            await testHelpers.skipChallengePeriod(listingChallenge0.blockNumber);

            // should not confirm a challenged listing
            await validatorRegistry.confirmListing
                .callAsync(publicKeys[0])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing not pending");

            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[9]);

            // resolve challenge 0
            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(publicKeys[0]).should.eventually.be
                .fulfilled;

            // should correctly distribute tokens to winning stakeholder
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[9]);
            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(await testHelpers.toAtStakeBalance(minimumStake));
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));

            // resolve challenge 1
            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(publicKeys[1]).should.eventually.be
                .fulfilled;

            // should fail resolveChallenge if called a second time
            await validatorRegistry.resolveChallenge
                .callAsync(publicKeys[0])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing is not challenged");

            // should only let owner confirm listing
            await validatorRegistry.confirmListing
                .callAsync(publicKeys[0], {
                    from: accounts[1],
                })
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("not listing owner");

            // should confirm a valid listing
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(publicKeys[0]).should.eventually.be
                .fulfilled;
            const listing0AfterConfirm = await validatorRegistry.getListing.callAsync(publicKeys[0]);

            listing0AfterConfirm.status.toString().should.eq("2"); // Accepted is 2
            listing0AfterConfirm.tendermintPublicKey.should.eq(publicKeys[0], "tendermint");
            listing0AfterConfirm.owner.should.eq(accounts[0]);

            // should set state to exiting
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(publicKeys[0]).should.eventually.be.fulfilled;
            const listing0AfterInitExit = await validatorRegistry.getListing.callAsync(publicKeys[0]);
            listing0AfterInitExit.status.toString().should.eq("4");

            // should only let the owner initExit
            await validatorRegistry.initExit
                .callAsync(publicKeys[2])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("not listing owner");

            // pending listing should exit immediately
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(publicKeys[2], { from: accounts[2] }).should
                .eventually.be.fulfilled;
            const listing2AfterInitExit = await validatorRegistry.getListing.callAsync(publicKeys[2]);
            listing2AfterInitExit.status.toString().should.eq("0");
            listing2AfterInitExit.owner.should.eq("0x0000000000000000000000000000000000000000");

            // listingKeys should return a list of listing keys excluding removed
            await validatorRegistry.listingKeys
                .callAsync()
                .should.eventually.not.include(publicKeys[2], "still contained 2");

            // exit listing 4
            const listing4InitExit = await validatorRegistry.initExit.awaitTransactionSuccessAsync(publicKeys[4], {
                from: accounts[4],
            }).should.eventually.be.fulfilled;

            // should not allow a listing to exit until after the exit period
            await validatorRegistry.finalizeExit
                .callAsync(publicKeys[4], { from: accounts[4] })
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("exiting cool off period active");

            // skip exit
            await testHelpers.skipExitPeriod(listing4InitExit.blockNumber);

            const listing4PreExitBalance = await treasury.currentBalance.callAsync(accounts[4]);

            // should only let the owner finalizeExit
            await validatorRegistry.finalizeExit
                .callAsync(publicKeys[4])
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("not listing owner");

            await validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(publicKeys[4], { from: accounts[4] })
                .should.eventually.be.fulfilled;
            const listing4PostExitBalance = await treasury.currentBalance.callAsync(accounts[4]);

            // should release the tokens to the treasury
            listing4PostExitBalance
                .minus(listing4PreExitBalance)
                .toString()
                .should.eq(minimumStake.toString());

            const listing4PostExit = await validatorRegistry.getListing.callAsync(publicKeys[4]);

            listing4PostExit.status.toString().should.eq("0");
            listing4PostExit.tendermintPublicKey.should.eq(nilKey);
            listing4PostExit.applicationBlock.toString().should.eq("0");
            listing4PostExit.owner.should.eq("0x0000000000000000000000000000000000000000");

            // TODO adequate cleanup or stub here
        });
    });

    describe("challengeListing", () => {
        it("should touch and remove a listing when the stakedBalance is below minimumStake");
    });

    describe("resolveChallenge", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should correctly finalize a failed challenge", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            const result = await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;

            const decodedLogs = decodeKosuEvents(result.logs);
            decodedLogs[0].eventType.should.eq("ValidatorChallengeResolved");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(await testHelpers.toAtStakeBalance(minimumStake));
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly finalize a failed challenge on an exiting listing", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(await testHelpers.toAtStakeBalance(minimumStake));
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)))
                        .plus(new BigNumber(minimumStake))
                        .toString(),
                );

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly finalize a failed challenge on a pending listing", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            const result = await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;

            const decodedLogs = decodeKosuEvents(result.logs);
            decodedLogs[0].eventType.should.eq("ValidatorChallengeResolved");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(await testHelpers.toAtStakeBalance(minimumStake));
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await testHelpers.exitListing(tendermintPublicKey);
        });
    });

    describe("claimWinnings", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should succeed but deliver zero tokens if the user did not vote", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            initialVoterSystemBalance
                .minus(finalVoterSystemBalance)
                .toString()
                .should.eq("0");
            initialVoterCurrentBalance
                .minus(finalVoterCurrentBalance)
                .toString()
                .should.eq("0");

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should succeed but deliver zero tokens if the user voted for the looser", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            initialVoterSystemBalance
                .minus(finalVoterSystemBalance)
                .toString()
                .should.eq("0");
            initialVoterCurrentBalance
                .minus(finalVoterCurrentBalance)
                .toString()
                .should.eq("0");

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly distribute the winnings", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.oneEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.oneEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.oneEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            const atStake = new BigNumber(await testHelpers.toAtStakeBalance(minimumStake));
            finalVoterSystemBalance
                .minus(initialVoterSystemBalance)
                .toString()
                .should.eq(atStake.minus(await testHelpers.toStakeholderCut(atStake)).toString(), "a");
            finalVoterCurrentBalance
                .minus(initialVoterCurrentBalance)
                .toString()
                .should.eq(atStake.minus(await testHelpers.toStakeholderCut(atStake)).toString(), "ab");

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[5]);
        });

        it("should finalize a un-final challenge", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(await testHelpers.toAtStakeBalance(minimumStake));
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(await testHelpers.toStakeholderCut(await testHelpers.toAtStakeBalance(minimumStake)))
                        .plus(new BigNumber(minimumStake))
                        .toString(),
                );

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should fail if the challenge has not ended", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumStake);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const {
                blockNumber,
                logs,
            } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });

            await validatorRegistry.claimWinnings
                .callAsync(new BigNumber(challengeId), {
                    from: accounts[5],
                })
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("challenge hasn't ended");

            await testHelpers.skipChallengePeriod(blockNumber);
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });
    });

    describe("claimRewards", () => {
        afterEach(async () => {
            await testHelpers.cleanAccounts();
        });
        describe("generate", () => {
            const reward = new BigNumber("1000000");
            beforeEach(async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumStake, {
                    from: accounts[1],
                });
                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumStake,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await testHelpers.skipApplicationPeriod(blockNumber);
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
            });

            it("should reward the user after a reward block and multiples of reward blocks", async () => {
                await testHelpers.skipRewardPeriods();
                const startingBalance1 = await kosuToken.balanceOf.callAsync(accounts[1]);
                const payout1 = await kosuToken.estimateEtherToToken.callAsync(reward);
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance1 = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance1
                    .minus(startingBalance1)
                    .toString()
                    .should.eq(payout1.toString());

                await testHelpers.skipRewardPeriods(undefined, 10);
                const startingBalance2 = await kosuToken.balanceOf.callAsync(accounts[1]);
                const payout2 = await kosuToken.estimateEtherToToken.callAsync(reward.times(new BigNumber("10")));
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance2 = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance2
                    .minus(startingBalance2)
                    .toString()
                    .should.eq(payout2.toString());

                await testHelpers.exitListing(tendermintPublicKey, accounts[1]);
            });
        });

        describe("burn", () => {
            const reward = new BigNumber("-1000000000000000000");

            it("should burn up to all the staked balance", async () => {
                await testHelpers.ensureTokenBalance(accounts[1], minimumStake.times(2));
                const tokenBurnAmount = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-1"));
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumStake.times(2), {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumStake.plus(tokenBurnAmount), {
                    from: accounts[1],
                });

                const preRegisterCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const preRegisterSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumStake,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );

                const postRegisterCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postRegisterSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postRegisterCurrentBalance)
                    .eq(minimumStake)
                    .should.eq(true, "Stake correctly claimed");
                preRegisterSystemBalance
                    .eq(postRegisterSystemBalance)
                    .should.eq(true, "System balance should be the same");

                await testHelpers.skipApplicationPeriod(blockNumber);
                const confirm = await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    {
                        from: accounts[1],
                    },
                );

                const postConfirmCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postConfirmSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postConfirmCurrentBalance)
                    .eq(minimumStake.plus(tokenBurnAmount))
                    .should.eq(true, "Confirmation burn failure");
                preRegisterSystemBalance
                    .minus(postConfirmSystemBalance)
                    .eq(tokenBurnAmount)
                    .should.eq(true, "Burned the first time");

                // should burn the users tokens after a reward block
                const tokenBurnEstimate2 = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-2"));
                await treasury.deposit.awaitTransactionSuccessAsync(tokenBurnEstimate2, {
                    from: accounts[1],
                });
                await testHelpers.skipRewardPeriods(confirm.blockNumber, 2);
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const postMultiBurnCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postMultiBurnSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                postConfirmCurrentBalance
                    .minus(postMultiBurnCurrentBalance)
                    .eq(0)
                    .should.eq(true, "Burn multiple reward periods - Current");
                postConfirmSystemBalance
                    .minus(postMultiBurnSystemBalance)
                    .eq(0)
                    .should.eq(true, "Burn multiple reward periods - System");

                const tokenBurnEstimate3 = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-1"));
                const periodsNeeded = minimumStake
                    .dividedBy(tokenBurnEstimate3)
                    .times(1.3)
                    .dividedToIntegerBy(1);

                await testHelpers.skipRewardPeriods(null, periodsNeeded.toNumber());
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);

                const postClaimCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postClaimSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postClaimCurrentBalance)
                    .eq(tokenBurnAmount.plus(minimumStake))
                    .should.eq(true, "Burned all the test tokens - Current");
                preRegisterSystemBalance
                    .minus(postClaimSystemBalance)
                    .eq(tokenBurnAmount.plus(minimumStake))
                    .should.eq(true, "Burned all the test tokens - System");

                // should touch and remove listing
                const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
                listing.status.toString().should.eq("0");

                await testHelpers.clearTreasury(accounts[1]);
            });
        });
    });

    describe("maxRewardRate", () => {
        it("should hit max and reduce when listing exits", async () => {
            const backupMax = await validatorRegistry.maxMaxGenerator.callAsync();
            const initialMax = await validatorRegistry.maxRewardRate.callAsync();
            await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                new BigNumber(9),
                initialMax.plus(1),
            );
            let currentMax;
            const keys = [];
            do {
                currentMax = await validatorRegistry.maxRewardRate.callAsync();
                const key = `0x${Date.now()}0`;
                keys.push(key);
                await testHelpers.prepareListing(key, {
                    reward: currentMax,
                });
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(key);
            } while (currentMax.lt(await validatorRegistry.maxRewardRate.callAsync()));
            currentMax
                .toString()
                .should.eq(await validatorRegistry.maxMaxGenerator.callAsync().then(x => x.toString()));
            for (const key of keys) {
                await testHelpers.exitListing(key);
            }

            await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(new BigNumber(9), backupMax);
            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(initialMax.toString());
        });
    });

    describe("updateConfigValue", () => {
        it("should only let the owner act", async () => {
            await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                TestValues.zero,
                TestValues.oneHundredEther,
                { from: accounts[9] },
            ).should.eventually.be.rejected;
        });

        [
            "applicationPeriod",
            "commitPeriod",
            "challengePeriod",
            "exitPeriod",
            "rewardPeriod",
            "minimumStake",
            "stakeholderProportionPPM",
            "minMaxGenerator",
            "maxGeneratorGrowth",
            "maxMaxGenerator",
            "exitLockPeriod",
            "winningVoteLockPeriod",
            "losingVoteLockPeriod",
            "slashableProportionPPM",
        ].forEach((method, index) => {
            it(`should correctly set a new ${method}`, async () => {
                const originalValue = await validatorRegistry[method].callAsync();
                await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                    new BigNumber(index),
                    TestValues.maxUint,
                ).should.eventually.be.fulfilled;
                const newValue = await validatorRegistry[method].callAsync();
                newValue.toString().should.eq(TestValues.maxUint.toString());
                await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                    new BigNumber(index),
                    originalValue,
                ).should.eventually.be.fulfilled;
            });
        });
    });

    describe("reduceReward", () => {
        it("should emit an event", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", {
                reward: TestValues.oneWei.plus(TestValues.oneWei),
            });
            const { logs } = await validatorRegistry.reduceReward.awaitTransactionSuccessAsync(
                "0xffaabb",
                TestValues.oneWei,
            );
            const decodedLogs = decodeKosuEvents(logs);
            decodedLogs[0].eventType.should.eq("ValidatorReducedReward");
            decodedLogs[0].tendermintPublicKeyHex.should.contain("0xffaabb");
            decodedLogs[0].newRewardRate.should.eq(TestValues.oneWei.toString());
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not modify a negative reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", { reward: TestValues.oneWei.times("-1") });
            await validatorRegistry.reduceReward
                .callAsync("0xffaabb", TestValues.zero)
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing is not generating tokens");
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not modify a zero reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb");
            await validatorRegistry.reduceReward
                .callAsync("0xffaabb", TestValues.oneWei)
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("listing is not generating tokens");
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not increase a reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", { reward: TestValues.oneWei });
            await validatorRegistry.reduceReward
                .callAsync("0xffaabb", TestValues.oneWei.plus(TestValues.oneWei))
                .should.eventually.be.rejected.and.have.property("message")
                .that.include("not reducing reward rate");
            await testHelpers.exitListing("0xffaabb");
        });
    });

    describe("ValidatorRegistryUpdate", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should emit events when listing is confirmed", async () => {
            const result = await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs);

            decodedLogs[0].eventType.should.eq("ValidatorConfirmed");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

            decodedLogs[1].eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs[1].tendermintPublicKey.should.eq(base64Key);
            decodedLogs[1].owner.should.eq(accounts[0].toLowerCase());
            decodedLogs[1].stake.should.eq(minimumStake.toString());

            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should emit event when stake is removed", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            const result = await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs.tendermintPublicKey.should.eq(base64Key);
            decodedLogs.owner.should.eq(accounts[0].toLowerCase());
            decodedLogs.stake.should.eq("0");

            await testHelpers.finishExit(tendermintPublicKey);
        });
    });
});
