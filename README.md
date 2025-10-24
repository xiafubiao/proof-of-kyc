# A Quick zkTLS Demo for Primus Network (AlphaNet) 

<img width="719" height="432" alt="Untitled design (2)" src="https://github.com/user-attachments/assets/2070b69f-184a-46cd-b5fe-0e4f7a9392d4" />


This demo demonstrates how to seamlessly integrate the Primus Network SDK and create a fully functional zkTLS-based dApp, showcasing the complete development workflow.

The demo allows any user to create zkTLS data attestations (proofs) about their KYC status in Binance exchange. The attestation is created through the network attestor and is further verified on the Base Sepolia with Primus contracts.

# How to Run the Demo?
git clone the repo into your local folder, then:

```node
cd proof-of-kyc

npm run dev
```
and copy the local server URL in your browser and play. 

Remember to install the Primus [extension](https://chromewebstore.google.com/detail/primus/oeiomhmbaapihbilkfkhmlajkeegnjhe) before the test.

# How to Create Your Own zkTLS DAPP?

We use Vite and React as the frameworks to create a dapp project. 
```node
npm create vite@latest YOUR_PROJECT
```
You can choose **JavaScript** and **React** as framework options in the question list. In your project folder, install the related modules.

```node
cd YOUR_PROJECT

npm install
```
Open your terminal and navigate to your project directory. Then run one of the following commands:

Using npm:
```node
npm install --save @primuslabs/network-js-sdk
```

Using yarn:
```node
yarn add --save @primuslabs/network-js-sdk
```

# Importing the SDK
After installation, you can import the SDK in your JavaScript or TypeScript files. Here's how to do that:
```node
import PrimusZKTLS from "@primuslabs/network-js-sdk"
```

# Generate the Attestation
To initialize the SDK and generate the zkTLS attestation, you can refer to this [example](https://docs.primuslabs.xyz/primus-network/build-with-primus/for-developers/example#complete-example)

Note you shall replace the following parameters in your own dapp
* template ID: you can pick either a published template or a local template to fulfil the requirement.
* userAddress: this is the wallet of the end users, you should use a wallet provider to get the connected user's address in your own dapp. 

Make sure your configured chain ID is correct and supported by the SDK.

# Verify the Attestation On-Chain
The Primus Network SDK allows you to simply verify the generated attestation through `verifyAndPollTaskResultParams` API. The function will simply check the attestor's signature's validity, and for futher business logic validation, such as the satisfiability towards KYC data, you shall create your own on-chain checker.

# User Flow
From an end-user perspective, he shall first deposit a certain amount of gas token (e.g., base-ETH test tokens) to pay for the network service, which is slightly different from the original Primus zkTLS dapps. Developers can enable the "withdraw" operations in their dapp by calling [`withdrawBalance`](https://docs.primuslabs.xyz/primus-network/build-with-primus/for-developers/example#5-balance-withdrawal) API, to handle unsettled attestation tasks. 

# More Templates
You can get more templates from the dev hub [marketplace](https://dev.primuslabs.xyz/marketplace)
