# Where is the Ether?

<summary>
  Where is the Ether?
  <details>
    If you take a look at the test cases you'll see that there will be three blocks mined with several transactions in each one.

    The addresses where the ether is sent to will be randomly generated. It is up to you to find all of these addresses and return them in an array.

    **🏁 Your Goal: Find the Addresses**

    The findEther function is passed an address which has sent ether to several addresses. The goal of this function is to find every address that has received ether and return it in an array of addresses.
  </details>
</summary>

## Context

This is my solution to "Where is the Ether?" exercise in "Week 3 - Front-End Libraries". But written in TypeScript with the latest core dependencies. Including `ethers@6.6.4` and `ganache@7.9.0`.

Note that there are some additional changes in response to the dependency upgrades:

- The `utils.parseEther` API is now exported directly from `ethers` starting from v6 ([ref](https://docs.ethers.org/v6/migrating/#migrate-utils))
  - Before

    ```js
    const { utils } = require('ethers')

    utils.parseEther('10')
    ```
  
  - After

    ```js
    import { ethers } from 'ethers'
    
    ethers.parseEther('10')
    ```

- `Web3Provider` is now called `BrowserProvider`. There's a slight change on the import path change as well. ([ref](https://docs.ethers.org/v6/migrating/#migrate-providers))
  - Before

    ```js
    const { providers } = require('ethers')

    // ...
    const provider = new providers.Web3Provider(ganacheProvider)
    ```

  - After

    ```js
    import { BrowserProvider } from 'ethers'

    // ...
    const provider = new BrowserProvider(ganacheProvider)
    ```

- The `send()` API (from `EthereumProvider`) is deprecated in favor of `request()`
  - Before

    ```js
    ganacheProvider.send({ method: "...", /* ... */ })
    ```

  - After

    ```js
    ganacheProvider.request({ method: "...", params: [/* ... */] })
    ```

## Installation

```sh
npm i
```

## Run the `findEther` test

```sh
npm run test
```
