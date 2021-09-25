import { AppProps } from 'next/app';
import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import { SnackbarProvider } from "notistack";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { AuthContext, FirebaseContext, RootContext } from "../contexts";
import { initFirebase } from '../utils';
import '../styles/main.css';
import { useFirebaseAutoAuth } from '../hooks';

const { auth, app } = initFirebase();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Creating a state to stored smart contract related data
  const [state, setState] = useState<{
    accounts: string[]
    networkId: number | null,
    ProductAuthContract: any | null
  }>({
    accounts: [],
    networkId: null,
    ProductAuthContract: null
  });

  const {currentUser, setCurrentUser} = useFirebaseAutoAuth(auth);

  useEffect(()=> {
    async function loadWeb3(){
      // Creates a new Web3 object, url points to our local blockchain
      const web3 = new Web3("http://127.0.0.1:8545");
      // Get all the accounts from our local blockchain, which will be 10 by default
      const accounts = await web3.eth.getAccounts();
      // Get the network id our blockchain is running on
      const networkId = await web3.eth.net.getId();
      // Load the SmartContract using the generated abi, smart contract address
      // 3rd argument specifies which account/address is loading the smart contract, 
      // and gas is required to set the limit of gas the address is willing to spend in this transaction (loading smart contract)
      const ProductAuthContract = new web3.eth.Contract(ProductAuthJSON.abi as any, "0x842C96D077577688B3e8C2578C1DEc9d73872251", {from: accounts[0], gas: 300000});
      // Store all the obtained data in the state
      setState({
        accounts,
        networkId,
        ProductAuthContract
      })
    }

    loadWeb3()
  }, []);

  const {
    accounts,
    networkId,
    ProductAuthContract
  } = state;

  return <RootContext.Provider value={{ProductAuthContract, accounts, networkId}}>
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <FirebaseContext.Provider value={{app, auth}}>
      <SnackbarProvider maxSnack={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  </RootContext.Provider>
}

export default MyApp;
