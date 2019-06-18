> ## [kosu.js](README.md)

[Globals](globals.md) /

# kosu.js

### Index

#### Classes

-   [EventEmitter](classes/eventemitter.md)
-   [Kosu](classes/kosu.md)
-   [KosuToken](classes/kosutoken.md)
-   [OrderGateway](classes/ordergateway.md)
-   [OrderHelper](classes/orderhelper.md)
-   [PosterRegistry](classes/posterregistry.md)
-   [Treasury](classes/treasury.md)
-   [ValidatorRegistry](classes/validatorregistry.md)
-   [Voting](classes/voting.md)

#### Interfaces

-   [DecodedKosuLogArgs](interfaces/decodedkosulogargs.md)
-   [KosuOptions](interfaces/kosuoptions.md)
-   [KosuUtils](interfaces/kosuutils.md)
-   [LogWithDecodedKosuArgs](interfaces/logwithdecodedkosuargs.md)
-   [Order](interfaces/order.md)
-   [OrderArgument](interfaces/orderargument.md)
-   [PostableOrder](interfaces/postableorder.md)
-   [TakeableOrder](interfaces/takeableorder.md)

#### Variables

-   [NULL_ADDRESS](globals.md#const-null_address)
-   [version](globals.md#const-version)

#### Functions

-   [\_serialize](globals.md#_serialize)
-   [toBytes32](globals.md#tobytes32)

#### Object literals

-   [KosuEndpoints](globals.md#const-kosuendpoints)
-   [OrderSerializer](globals.md#const-orderserializer)
-   [Signature](globals.md#const-signature)

## Variables

### `Const` NULL_ADDRESS

● **NULL_ADDRESS**: _string_ = "0x0000000000000000000000000000000000000000"

_Defined in [utils.ts:12](url)_

---

### `Const` version

● **version**: _any_ = process.env.npm_package_version || require("../package.json").version

_Defined in [index.ts:17](url)_

---

## Functions

### \_serialize

▸ **\_serialize**(`_arguments`: any, `values`: any): _string_

_Defined in [OrderSerializer.ts:8](url)_

**Parameters:**

| Name         | Type |
| ------------ | ---- |
| `_arguments` | any  |
| `values`     | any  |

**Returns:** _string_

---

### toBytes32

▸ **toBytes32**(`value`: string): _string_

_Defined in [utils.ts:8](url)_

Convert an arbitrary string to a `bytes32` version.

**Parameters:**

| Name    | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| `value` | string | String value to be converted into bytes32 representation. |

**Returns:** _string_

---

## Object literals

### `Const` KosuEndpoints

### ■ **KosuEndpoints**: _object_

_Defined in [EventEmitter.ts:7](url)_

■ **1**: _object_

_Defined in [EventEmitter.ts:8](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/mainnet`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/mainnet`

■ **3**: _object_

_Defined in [EventEmitter.ts:12](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/ropsten`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/ropsten`

■ **42**: _object_

_Defined in [EventEmitter.ts:16](url)_

-   **http**: _string_ = `https://ethnet.zaidan.io/kovan`

-   **ws**: _string_ = `wss://ethnet.zaidan.io/ws/kovan`

---

### `Const` OrderSerializer

### ■ **OrderSerializer**: _object_

_Defined in [OrderSerializer.ts:42](url)_

could add to utils (or create order-utils pacakge)

### makerHex

▸ **makerHex**(`order`: [Order](interfaces/order.md), `_arguments`: any): _string_

_Defined in [OrderSerializer.ts:84](url)_

Generate the maker hex from order

**Parameters:**

| Name         | Type                         | Description                              |
| ------------ | ---------------------------- | ---------------------------------------- |
| `order`      | [Order](interfaces/order.md) | to generate hex from                     |
| `_arguments` | any                          | Argument json defined in the subContract |

**Returns:** _string_

### posterSignatureHex

▸ **posterSignatureHex**(`order`: [Order](interfaces/order.md), `_arguments`: any): _string_

_Defined in [OrderSerializer.ts:64](url)_

Generates hex to be used for the poster signing process

**Parameters:**

| Name         | Type                         | Description                              |
| ------------ | ---------------------------- | ---------------------------------------- |
| `order`      | [Order](interfaces/order.md) | Order to get data for                    |
| `_arguments` | any                          | Argument json defined in the subContract |

**Returns:** _string_

### recoverMaker

▸ **recoverMaker**(`order`: [Order](interfaces/order.md), `_arguments`: any[]): _string_

_Defined in [OrderSerializer.ts:105](url)_

Recovers the maker from the signed information

**Parameters:**

| Name         | Type                         | Description                              |
| ------------ | ---------------------------- | ---------------------------------------- |
| `order`      | [Order](interfaces/order.md) | to recover address from                  |
| `_arguments` | any[]                        | Argument json defined in the subContract |

**Returns:** _string_

### recoverPoster

▸ **recoverPoster**(`order`: [PostableOrder](interfaces/postableorder.md), `_arguments`: any[]): _string_

_Defined in [OrderSerializer.ts:74](url)_

Recovers the poster from the poster signature

**Parameters:**

| Name         | Type                                         | Description                              |
| ------------ | -------------------------------------------- | ---------------------------------------- |
| `order`      | [PostableOrder](interfaces/postableorder.md) | Order to recover address that signed     |
| `_arguments` | any[]                                        | Argument json defined in the subContract |

**Returns:** _string_

### serialize

▸ **serialize**(`_arguments`: any, `order`: [Order](interfaces/order.md)): _string_

_Defined in [OrderSerializer.ts:49](url)_

Serializes the data into bytes

**Parameters:**

| Name         | Type                         | Description                              |
| ------------ | ---------------------------- | ---------------------------------------- |
| `_arguments` | any                          | Argument json defined in the subContract |
| `order`      | [Order](interfaces/order.md) | Order to serialize                       |

**Returns:** _string_

---

### `Const` Signature

### ■ **Signature**: _object_

_Defined in [Signature.ts:7](url)_

_Defined in [types.d.ts:45](url)_

### generate

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [Signature.ts:16](url)_

Generates a signature for a message hex using calls to a provider though web3

**Parameters:**

| Name         | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| `web3`       | `Web3` | Web3 configured to desired provider |
| `messageHex` | string | Hex representation of the message   |
| `signer`     | string | Address to sign the message         |

**Returns:** _`Promise<string>`_

A vrs signature

▸ **generate**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [types.d.ts:46](url)_

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `web3`       | `Web3` |
| `messageHex` | string |
| `signer`     | string |

**Returns:** _`Promise<string>`_

### recoverAddress

▸ **recoverAddress**(`messageHex`: any, `signature`: string): _string_

_Defined in [Signature.ts:38](url)_

Recovers address from a message hex and signature

**Parameters:**

| Name         | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `messageHex` | any    | Hex representation of the signed message |
| `signature`  | string | VRS signature                            |

**Returns:** _string_

▸ **recoverAddress**(`messageHex`: any, `signature`: string): _string_

_Defined in [types.d.ts:48](url)_

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `messageHex` | any    |
| `signature`  | string |

**Returns:** _string_

### sign

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [Signature.ts:56](url)_

Sign hex with provided address

**Parameters:**

| Name         | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `web3`       | `Web3` | Provider which executes the signature. |
| `messageHex` | string | Hex to be singed                       |
| `signer`     | string | Address to sign with.                  |

**Returns:** _`Promise<string>`_

▸ **sign**(`web3`: `Web3`, `messageHex`: string, `signer`: string): _`Promise<string>`_

_Defined in [types.d.ts:49](url)_

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `web3`       | `Web3` |
| `messageHex` | string |
| `signer`     | string |

**Returns:** _`Promise<string>`_

### validate

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): _boolean_

_Defined in [Signature.ts:28](url)_

Validates the signature of a messageHex is from the provided signer

**Parameters:**

| Name         | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `messageHex` | string | signed message hex                     |
| `signature`  | string | signature from message hex             |
| `signer`     | string | signer who may have signed the message |

**Returns:** _boolean_

boolean representing if the signer in fact generated the signature with this message

▸ **validate**(`messageHex`: string, `signature`: string, `signer`: string): _boolean_

_Defined in [types.d.ts:47](url)_

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `messageHex` | string |
| `signature`  | string |
| `signer`     | string |

**Returns:** _boolean_

---