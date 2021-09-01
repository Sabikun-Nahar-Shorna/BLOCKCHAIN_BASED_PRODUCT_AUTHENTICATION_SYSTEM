import { AppProps } from 'next/app';
import React, {useState, useEffect} from 'react';
import Web3 from "web3";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { RootContext } from "../contexts";

import '../styles/main.css';

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
    <Component {...pageProps} />
  </RootContext.Provider>
     
}

export default MyApp;
