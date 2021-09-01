import React, {useState, useEffect} from "react";
import Web3 from "web3";

import ProductAuthJSON from "../abis/ProductAuth.json";
import { Button, ProductDisplay, TextInput } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

const Index = () => {
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);

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

  async function fetchProductById(){
    const {accounts, ProductAuthContract} = state;
    if(fetchedProductId){
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(fetchedProductId).call({
        from: accounts[0]
      }) as IProduct;
      setFetchedProduct({
        productId: fetchProductByIdData.productId,
        productName: fetchProductByIdData.productName,
        productType: fetchProductByIdData.productType,
      })
    }
  }

  const {
    accounts,
    networkId,
    ProductAuthContract
  } = state;
  
  return (
    <RootContext.Provider value={{ProductAuthContract, accounts, networkId}}>
      <div>
        <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Product Id" placeHolder="Fetched product id"/>
        <Button onClick={fetchProductById} content="Fetch Product"/>
        {fetchedProduct && <ProductDisplay product={fetchedProduct}/>}
      </div>
    </RootContext.Provider>
  );
};

export default Index;

// 73ec2ae5-7a93-4155-aa77-1d1b3d5f6d8f