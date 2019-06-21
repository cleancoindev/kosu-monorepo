> ## [kosu.js](../README.md)

[Globals](../globals.md) / [Voting](voting.md) /

# Class: Voting

Integration with Voting contract on an Ethereum blockchain.

## Hierarchy

-   **Voting**

### Index

#### Constructors

-   [constructor](voting.md#constructor)

#### Properties

-   [address](voting.md#private-address)
-   [coinbase](voting.md#private-coinbase)
-   [contract](voting.md#private-contract)
-   [treasury](voting.md#private-treasury)
-   [web3](voting.md#private-web3)
-   [web3Wrapper](voting.md#private-web3wrapper)

#### Methods

-   [commitVote](voting.md#commitvote)
-   [encodeVote](voting.md#encodevote)
-   [getContract](voting.md#private-getcontract)
-   [revealVote](voting.md#revealvote)
-   [totalRevealedTokens](voting.md#totalrevealedtokens)
-   [totalWinningTokens](voting.md#totalwinningtokens)
-   [userWinningTokens](voting.md#userwinningtokens)
-   [winningOption](voting.md#winningoption)

## Constructors

### constructor

\+ **new Voting**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `treasury`: [Treasury](treasury.md)): _[Voting](voting.md)_

Defined in Voting.ts:18

Create a new Voting instance.

**Parameters:**

| Name       | Type                                        | Description                   |
| ---------- | ------------------------------------------- | ----------------------------- |
| `options`  | [KosuOptions](../interfaces/kosuoptions.md) | instantiation options         |
| `treasury` | [Treasury](treasury.md)                     | treasury integration instance |

**Returns:** _[Voting](voting.md)_

---

## Properties

### `Private` address

● **address**: _string_

Defined in Voting.ts:16

---

### `Private` coinbase

● **coinbase**: _string_

Defined in Voting.ts:18

---

### `Private` contract

● **contract**: _any_

Defined in Voting.ts:17

---

### `Private` treasury

● **treasury**: _[Treasury](treasury.md)_

Defined in Voting.ts:14

---

### `Private` web3

● **web3**: _`Web3`_

Defined in Voting.ts:13

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

Defined in Voting.ts:15

---

## Methods

### commitVote

▸ **commitVote**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in Voting.ts:67

Commits vote to voting contract

**Parameters:**

| Name              | Type        | Description                                  |
| ----------------- | ----------- | -------------------------------------------- |
| `_pollId`         | `BigNumber` | uint poll index                              |
| `_vote`           | string      | encoded vote option                          |
| `_tokensToCommit` | `BigNumber` | uint number of tokens to be commited to vote |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### encodeVote

▸ **encodeVote**(`_voteOption`: string, `_voteSalt`: string): _string_

Defined in Voting.ts:150

Encodes a vote by hashing the option and salt

**Parameters:**

| Name          | Type   | Description |
| ------------- | ------ | ----------- |
| `_voteOption` | string | .           |
| `_voteSalt`   | string | .           |

**Returns:** _string_

Encoded vote

---

### `Private` getContract

▸ **getContract**(): _`Promise<VotingContract>`_

Defined in Voting.ts:38

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _`Promise<VotingContract>`_

The contract

---

### revealVote

▸ **revealVote**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in Voting.ts:92

Reveals vote on voting contract

**Parameters:**

| Name          | Type        | Description                          |
| ------------- | ----------- | ------------------------------------ |
| `_pollId`     | `BigNumber` | uint poll index                      |
| `_voteOption` | `BigNumber` | uint representation of vote position |
| `_voteSalt`   | `BigNumber` | uint salt used to encode vote option |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### totalRevealedTokens

▸ **totalRevealedTokens**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

Defined in Voting.ts:126

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### totalWinningTokens

▸ **totalWinningTokens**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

Defined in Voting.ts:116

Reads the total winning tokens for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---

### userWinningTokens

▸ **userWinningTokens**(`_pollId`: `BigNumber`, `_userAddress`: string): _`Promise<BigNumber>`_

Defined in Voting.ts:137

Reads users winning tokens committed for poll

**Parameters:**

| Name           | Type        | Default value | Description                                   |
| -------------- | ----------- | ------------- | --------------------------------------------- |
| `_pollId`      | `BigNumber` | -             | uint poll index                               |
| `_userAddress` | string      | this.coinbase | address of user whose winning contribution is |

**Returns:** _`Promise<BigNumber>`_

---

### winningOption

▸ **winningOption**(`_pollId`: `BigNumber`): _`Promise<BigNumber>`_

Defined in Voting.ts:106

Reads the winning option for poll

**Parameters:**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `_pollId` | `BigNumber` | uint poll index |

**Returns:** _`Promise<BigNumber>`_

---