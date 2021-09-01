import { AppProps } from 'next/app';
import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { FirebaseContext, RootContext } from "../contexts";
import { initFirebase } from '../utils/initFirebase';

import '../styles/main.css';
import { useFirebaseAutoAuth } from '../hooks';
import { AuthContext } from '../contexts/AuthContext';

const { auth, app } = initFirebase();

const MyApp = ({ Component, pageProps }: AppProps) => {
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
      const web3 = new Web3("http://127.0.0.1:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const ProductAuthContract = new web3.eth.Contract(ProductAuthJSON.abi as any, "0xfcE42E27C47542A04F9eA8B80901A477Dc9668D3", {from: accounts[0], gas: 300000})
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
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  </RootContext.Provider>
     
}

export default MyApp;
