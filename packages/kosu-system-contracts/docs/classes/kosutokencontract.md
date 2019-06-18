> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [KosuTokenContract](kosutokencontract.md) /

# Class: KosuTokenContract

## Hierarchy

-   `BaseContract`

    -   **KosuTokenContract**

### Index

#### Constructors

-   [constructor](kosutokencontract.md#constructor)

#### Properties

-   [abi](kosutokencontract.md#abi)
-   [address](kosutokencontract.md#address)
-   [constructorArgs](kosutokencontract.md#constructorargs)
-   [contractName](kosutokencontract.md#contractname)
-   [txReceipt](kosutokencontract.md#optional-txreceipt)

#### Methods

-   [deployAsync](kosutokencontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](kosutokencontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](kosutokencontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [allowance](kosutokencontract.md#allowance)
-   [approve](kosutokencontract.md#approve)
-   [balanceOf](kosutokencontract.md#balanceof)
-   [burn](kosutokencontract.md#burn)
-   [decimals](kosutokencontract.md#decimals)
-   [decreaseAllowance](kosutokencontract.md#decreaseallowance)
-   [increaseAllowance](kosutokencontract.md#increaseallowance)
-   [mint](kosutokencontract.md#mint)
-   [mintTo](kosutokencontract.md#mintto)
-   [name](kosutokencontract.md#name)
-   [symbol](kosutokencontract.md#symbol)
-   [totalSupply](kosutokencontract.md#totalsupply)
-   [transfer](kosutokencontract.md#transfer)
-   [transferFrom](kosutokencontract.md#transferfrom)

## Constructors

### constructor

\+ **new KosuTokenContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[KosuTokenContract](kosutokencontract.md)_

_Overrides void_

Defined in generated-wrappers/kosu_token.ts:1172

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[KosuTokenContract](kosutokencontract.md)_

---

## Properties

### abi

● **abi**: _`ContractAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:22

---

### address

● **address**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:23

---

### constructorArgs

● **constructorArgs**: _any[]_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:25

---

### contractName

● **contractName**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:24

---

### `Optional` txReceipt

● **txReceipt**? : _`TransactionReceiptWithDecodedLogs`_

Defined in generated-wrappers/kosu_token.ts:50

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_auth`: string): _`Promise<KosuTokenContract>`_

Defined in generated-wrappers/kosu_token.ts:1137

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `_auth`             | string              |

**Returns:** _`Promise<KosuTokenContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_auth`: string): _`Promise<KosuTokenContract>`_

Defined in generated-wrappers/kosu_token.ts:1122

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `_auth`             | string              |

**Returns:** _`Promise<KosuTokenContract>`_

---

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `inputAbi` | `DataItem`[] |
| `args`     | any[]        |

**Returns:** _string_

---

## Object literals

### allowance

### ■ **allowance**: _object_

Defined in generated-wrappers/kosu_token.ts:1092

### callAsync

▸ **callAsync**(`owner`: string, `spender`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/kosu_token.ts:1093

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `owner`         | string              | -             |
| `spender`       | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### approve

### ■ **approve**: _object_

Defined in generated-wrappers/kosu_token.ts:77

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:103

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `spender`            | string            |
| `value`              | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`spender`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/kosu_token.ts:163

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `spender`       | string              | -             |
| `value`         | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:133

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `spender` | string            | -             |
| `value`   | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `value`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:153

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `spender` | string      |
| `value`   | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:78

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `spender` | string            | -             |
| `value`   | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### balanceOf

### ■ **balanceOf**: _object_

Defined in generated-wrappers/kosu_token.ts:704

### callAsync

▸ **callAsync**(`owner`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/kosu_token.ts:705

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `owner`         | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### burn

### ■ **burn**: _object_

Defined in generated-wrappers/kosu_token.ts:485

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:508

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/kosu_token.ts:562

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:536

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:554

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:486

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### decimals

### ■ **decimals**: _object_

Defined in generated-wrappers/kosu_token.ts:344

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:345

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<number>`_

---

### decreaseAllowance

### ■ **decreaseAllowance**: _object_

Defined in generated-wrappers/kosu_token.ts:862

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:888

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `spender`            | string            |
| `subtractedValue`    | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/kosu_token.ts:948

**Parameters:**

| Name              | Type                | Default value |
| ----------------- | ------------------- | ------------- |
| `spender`         | string              | -             |
| `subtractedValue` | `BigNumber`         | -             |
| `callData`        | `Partial<CallData>` | {}            |
| `defaultBlock?`   | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:918

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `spender`         | string            | -             |
| `subtractedValue` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `subtractedValue`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:938

**Parameters:**

| Name              | Type        |
| ----------------- | ----------- |
| `spender`         | string      |
| `subtractedValue` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `subtractedValue`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:863

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `spender`         | string            | -             |
| `subtractedValue` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### increaseAllowance

### ■ **increaseAllowance**: _object_

Defined in generated-wrappers/kosu_token.ts:370

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:396

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `spender`            | string            |
| `addedValue`         | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`spender`: string, `addedValue`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/kosu_token.ts:456

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `spender`       | string              | -             |
| `addedValue`    | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:426

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `spender`    | string            | -             |
| `addedValue` | `BigNumber`       | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`spender`: string, `addedValue`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:446

**Parameters:**

| Name         | Type        |
| ------------ | ----------- |
| `spender`    | string      |
| `addedValue` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`spender`: string, `addedValue`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:371

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `spender`    | string            | -             |
| `addedValue` | `BigNumber`       | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### mint

### ■ **mint**: _object_

Defined in generated-wrappers/kosu_token.ts:758

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:781

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/kosu_token.ts:835

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:809

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:827

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:759

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### mintTo

### ■ **mintTo**: _object_

Defined in generated-wrappers/kosu_token.ts:589

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_address`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:615

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `_address`           | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`_address`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/kosu_token.ts:675

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_address`      | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`_address`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:645

**Parameters:**

| Name       | Type              | Default value |
| ---------- | ----------------- | ------------- |
| `_address` | string            | -             |
| `amount`   | `BigNumber`       | -             |
| `txData`   | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_address`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:665

**Parameters:**

| Name       | Type        |
| ---------- | ----------- |
| `_address` | string      |
| `amount`   | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_address`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:590

**Parameters:**

| Name       | Type              | Default value |
| ---------- | ----------------- | ------------- |
| `_address` | string            | -             |
| `amount`   | `BigNumber`       | -             |
| `txData`   | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### name

### ■ **name**: _object_

Defined in generated-wrappers/kosu_token.ts:51

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:52

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### symbol

### ■ **symbol**: _object_

Defined in generated-wrappers/kosu_token.ts:732

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:733

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### totalSupply

### ■ **totalSupply**: _object_

Defined in generated-wrappers/kosu_token.ts:192

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/kosu_token.ts:193

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### transfer

### ■ **transfer**: _object_

Defined in generated-wrappers/kosu_token.ts:977

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`to`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:1003

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `to`                 | string            |
| `value`              | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`to`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/kosu_token.ts:1063

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `to`            | string              | -             |
| `value`         | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:1033

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `to`     | string            | -             |
| `value`  | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`to`: string, `value`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:1053

**Parameters:**

| Name    | Type        |
| ------- | ----------- |
| `to`    | string      |
| `value` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:978

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `to`     | string            | -             |
| `value`  | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### transferFrom

### ■ **transferFrom**: _object_

Defined in generated-wrappers/kosu_token.ts:218

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/kosu_token.ts:247

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `from`               | string            |
| `to`                 | string            |
| `value`              | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/kosu_token.ts:313

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `from`          | string              | -             |
| `to`            | string              | -             |
| `value`         | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/kosu_token.ts:279

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `from`   | string            | -             |
| `to`     | string            | -             |
| `value`  | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`from`: string, `to`: string, `value`: `BigNumber`): _string_

Defined in generated-wrappers/kosu_token.ts:301

**Parameters:**

| Name    | Type        |
| ------- | ----------- |
| `from`  | string      |
| `to`    | string      |
| `value` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`from`: string, `to`: string, `value`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/kosu_token.ts:219

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `from`   | string            | -             |
| `to`     | string            | -             |
| `value`  | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---