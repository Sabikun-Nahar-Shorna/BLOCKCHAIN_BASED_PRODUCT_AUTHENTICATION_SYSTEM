# Blockchain app

## Frontend setup

1. Clone the repo
2. Write `npm install` to install all the dependencies
3. Run `npm run ganache` to start up the local blockchain network in the terminal
4. Run `npm run migrate` to migrate the `ProductAuth` smart contract in the locally running blockchain
5. After the smart contract have been deployed, check the terminal for the output, and copy the contract address which is `0xBA3cCf2eDC797aD42fA2Fa4659c5CC85Bd9A7724` in the example.

```txt
Deploying 'ProductAuth'
-----------------------
> transaction hash:    0x80cce2a973dd4fbfe25987bed84db8eeced02de0dff325c88d82f9228bd80416    
> Blocks: 0            Seconds: 0
> contract address:    0xBA3cCf2eDC797aD42fA2Fa4659c5CC85Bd9A7724
```
6. Go to `_app.tsx` and paste the address in the following line of code

```tsx
const ProductAuthContract = new web3.eth.Contract(ProductAuthJSON.abi as any, "<contract_address>", {from: accounts[0], gas: 300000})

```
7. Run `npm run dev` to start the frontend site.
8. Login with any valid email and password
9. In order to scan the qr code the site has to be accessed via a mobile device. [adb](https://www.xda-developers.com/install-adb-windows-macos-linux/) must be installed for that.
10. Once installed connect the mobile device using USB, and turn on the USB debugging option. Type the following command in the terminal

```txt
adb reverse tcp:3000 tcp:3000 && adb reverse tcp:8545 tcp:8545
```