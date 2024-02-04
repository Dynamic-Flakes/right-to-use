<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/codeEzzy/lightlink">
    <img src="./diagrams/right.png" alt="Logo" width="200" height="55">
  </a>

  <h3 align="center">The Right to Use Marketplace App</h3>

</div>



## ERC721 Nft Collection on Lightlink (Pegasus Testnet)

* Account: 0x94e9569211b766d2afa6f7443389e9dd96285ae5
* Smart Contract: 0x5559f4b9bee6636ab59a0d6db46ea26ef0ea6e69
* Enterprise Mode Enabled (https://extensions-stage.lightlink.io/whitelist-enterprise)

![Alt text](./diagrams/Erc721.png?raw=true "ERC721 on Testnet")

* Explore the contract on Pegasus:  
<a href="https://pegasus.lightlink.io/address/0x5559f4b9bee6636ab59a0d6db46ea26ef0ea6e69">0x5559f4b9bee6636ab59a0d6db46ea26ef0ea6e69</a>



## ERC1155 Nft Collection on Lightlink (Pegasus Testnet)

* Account: 0x94e9569211b766d2afa6f7443389e9dd96285ae5
* Smart Contract: 0xa87c6d81ea82c8e57b70782aa33cec2d53dc7b7f
* Enterprise Mode Enabled (https://extensions-stage.lightlink.io/whitelist-enterprise)

![Alt text](./diagrams/Erc1155.png?raw=true "ERC1155 on Testnet")



* Explore the contract on Pegasus:  
<a href="https://pegasus.lightlink.io/address/0xa87c6d81ea82c8e57b70782aa33cec2d53dc7b7f">0xa87c6d81ea82c8e57b70782aa33cec2d53dc7b7f9</a>



## Summary
## Overview

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Features included

The Right to Use Marketplace  includes the following features:

- Open collections (User-generated content)
  - Mint ERC-721
  - Mint ERC-1155
  - Creator's royalties support
- Homepage content customization
  - Featured NFTs
  - Custom section with featured elements
- Search system
  - Search NFTs
  - Search collections
  - Search users
- Explore NFTs, collections and users with filtering and sorting systems
  - Explore NFTs
    - Filter by chain
    - Filter by status
    - Filter by price
    - Filter by collection
    - Filter by traits
    - Sort by dates
  - Explore collections
    - Filter by chain
    - Sort by volumes
  - Explore users
- Native currency and ERC20 support
- Lazymint for NFTs
- List NFTs on sale
  - Partial filling
  - Fixed price listing
- Make offers on NFTs
  - Partial filling
  - Open offer
- Purchase NFTs
- User profile
  - Account
    - Profile edition
    - Wallet page
  - NFTs "on sale"
  - NFTs "owned"
  - NFTs "created"
  - Offers ("bids") management
  - Trades history
  - Listings ("offers") management
- User verification system (verified status)

- Notifications
  - In-app notifications
  - Email notifications
- NFT details
  - Chain information
  - Explorer link
  - Media IPFS link
  - Metadata IPFS link
  - Traits with percentages
- NFT history (activity)
  - Lazyminted
  - Minted
  - Listed
  - Purchased
  - Transferred
- Wallet connection with
  - Metamask
  - Coinbase
  - WalletConnect
  - Magic
  - Rainbow
- Multi-chain support
- Multi currency support
- Advanced fee customization support

It also includes compatibility with the following features:

- Multi-language compatibility
- Credit card payment gateway compatibility
- Email connection compatibility
- Wallet-to-wallet messaging system

## Tools and Libraries used

The Right to Use Marketplace is based on the following tech stack

- [Javascript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Liteflow](https://liteflow.com/)
- [ChakraUI](https://chakra-ui.com/)
- [Wagmi](https://wagmi.sh/)
- [Rainbowkit](https://rainbowkit.com/)
- [Next translate](https://github.com/aralroca/next-translate)

## Get started
The easiest way to get started is to clone the repository:

1. Clone the repo
   ```sh
   git clone https://github.com/Dynamic-Flakes/right-to-use.git
   ```

## Change directory

```
cd right-to-use
```

## Create .env in the root directory
```
Configure your environmental variables in the `.env` file, referring to the `.env.example` file as a guide.

```

## Install NPM packages
Depending on your package manager, run either of these commands
```
   npm install
      or
   yarn install   

```

## Run the app locally in the development mode.

 ```js
   npm run dev  or yarn run dev
   ```
Your application is now accessible at http://localhost:3000

## Run the app locally in the production mode.
First,run this to build the app. This correctly bundles in production mode and optimizes the build for the best performance.

```
npm run build  or yarn run build
   ```

Then start the application in production mode 

```
npm run start  pr yarn run start

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Customization

#### Theme

The theme is based on [ChakraUI](https://chakra-ui.com/) and can be [customized](https://chakra-ui.com/docs/styled-system/customize-theme) in the `/styles/theme.ts` file.

#### Application

Your application includes default navigation, metadata, and wallets that can be updated directly from the `pages/_app.tsx` file.
