# Changelog

## master

## v0.6.0

-   Add Docker releases
-   Promote snapshot_block as a consensus parameter
-   Add `abci` subcommand

## v0.5.0

-   Fix Order store I/O overhead
-   Fix wrong initial validators power calculations
-   Add --validator family flags to optionally start as a validator node
-   Add GetBlocks RPC endpoint
-   Fix wrong RPC remote address in lite mode

## v0.4.0

-   Add LatestOrders RPC endpoint
-   Refactor ./cmd/kosud
-   Allow to start the node in --lite mode
-   Embed RPC Server in kosud
-   Create node and start subcommands
-   [bug] Fix panic on kosu-cli
-   Add /store prefix to Query Path
-   Require power=1 in genesis file
-   [bug][\#304] Fix BigInt JSON Serialization
-   Add InitialPosters support
-   Bump tendermint version from v0.32.3 to v0.32.4
-   Sort ValidatorUpdates by address and returns updated set
-   Fix witness unsupported key logger bug
-   Upgrade tendermint/tm-db to v0.2.0
-   Fix witness connection mngmt and error handling
-   Remove confirmation_threshold from ConsensusParams
-   Ethereum Snapshot block

## v0.3.0

-   introduce validators verification from app_state
-   fix frozen subscriptions
-   use MaxOrderBytes in CheckTx
-   Verify that Rebalance and Witness TXs are submitted by validators
-   Create CHANGELOG.md
