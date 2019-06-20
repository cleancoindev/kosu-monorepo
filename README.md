<center>
    <img src="https://storage.googleapis.com/kosu-general-storage/kosu_logo.png" width="150px" >
</center>

---

This monorepo contains the packages that implement the Kosu protocol, alongside supporting packages and developer tooling.

- [Packages](#packages)
    - [Contract packages](#contract-packages)
    - [Library packages](#library-packages)
    - [Client packages](#client-packages)
    - [Utility/development packages](#utility-development-packages)
- [Resources](#resources)
    - [Documentation](#documentation)
    - [Docker images](#docker-images)
    - [Binaries](#binaries)
- [License](#license)

## Packages

### Contract packages

Smart-contract packages (Solidity) including the core Kosu system contracts and SubContract SDK.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;            | Version                                                        | Description                                                            |
| :----------------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [`@kosu/system-contracts`](./packages/kosu-system-contracts) | ![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg) | The core Kosu contract system and test suite, implemented in Solidity. |
| [`@kosu/subcontract-sdk`](./packages/kosu-sdk-contracts)     | ![npm](https://img.shields.io/npm/v/@kosu/subcontract-sdk.svg) | The Kosu `SubContract` interface and example implementations.          |

### Library packages

Client/server libraries for interacting with the Kosu network and contract system.

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Version                                                | Description                                                                   |
| :------------------------------------------------ | :----------------------------------------------------- | :---------------------------------------------------------------------------- |
| [`@kosu/kosu.js`](./packages/kosu.js)             | ![npm](https://img.shields.io/npm/v/@kosu/kosu.js.svg) | TypeScript library for interacting with the Kosu network and contract system. |

### Client packages

| Package                           | Version                                                          | Description                                                                       |
| :-------------------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [`kosu-core`](./packages/go-kosu) | ![version](https://img.shields.io/badge/version-0.0.0-green.svg) | The reference implementation of the Kosu network in Go, built on Tendermint Core. |

### Utility/development packages

| Package &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Version                                                      | Description                                                          |
| :------------------------------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------- |
| [`@kosu/dev-images`](./packages/dev-images)       | ![npm](https://img.shields.io/npm/v/@kosu/dev-images.svg)    | Development docker images and supporting scripts for Kosu packages.  |
| [`@kosu/tslint-config`](./packages/tslint-config) | ![npm](https://img.shields.io/npm/v/@kosu/tslint-config.svg) | TypeScript linter base configuration for Kosu TypeScript projects.   |
| [`@kosu/tsc-config`](./packages/tsc-config)       | ![npm](https://img.shields.io/npm/v/@kosu/tsc-config.svg)    | TypeScript compiler base configuration for Kosu TypeScript projects. |
| [`@kosu/web-helpers`](./packages/web-helpers)     | ![npm](https://img.shields.io/npm/v/@kosu/web-helpers.svg)   | Simple web interface for interacting with the Kosu contract system.  |

## Resources

Development resources (binaries, documentation, and images) are generated with each commit to master after a successful CI build. 

## Documentation

Generated documentation is published for the following packages with each commit (`gsutil` required for access): 

- `@kosu/kosu.js`: `gs://kosu-docs/kosu.js/`
- `@kosu/kosu-system-contracts`: `gs://kosu-docs/kosu-system-contracts/`

_Documentation is also checked in to each package and viewable on GitHub._

### Docker images

Various development images used for Kosu CI/CD and development are publicly available on GCR.

- `gcr.io/kosu-io/node-ci:latest`: A custom Node.js (`lts`) image with additional binaries used in building Kosu packages.
- `gcr.io/kosu-io/go-kosu-ci:latest`: A custom golang (`1.12`) image with Tendermint pre-installed, used as the CI image for `go-kosu`.
- `gcr.io/kosu-io/kosu-geth:latest`: Geth configured as PoA private network used for a Kosu [private test-network,](https://github.com/ParadigmFoundation/kosu-monorepo/blob/master/packages/kosu-system-contracts/README.md)

### Binaries

Binaries for `go-kosu` are available (darwin/linux):

- `kosud`: Kosu network reference implementation.
   - URL: [`https://storage.googleapis.com/kosu-binaries/go-kosu/kosud`](https://storage.googleapis.com/kosu-binaries/go-kosu/kosud)

- `kosu-cli`: Command-line interface for `kosud`.
   - URL: [`https://storage.googleapis.com/kosu-binaries/go-kosu/kosu-cli`](https://storage.googleapis.com/kosu-binaries/go-kosu/kosu-cli)

# License

Kosu is being developed as free open-source software under an [MIT license.](./LICENSE)
