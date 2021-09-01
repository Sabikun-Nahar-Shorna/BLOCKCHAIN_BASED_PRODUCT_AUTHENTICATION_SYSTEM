import React, {useState, useEffect} from "react";
import Web3 from "web3";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { Button, TextInput } from "../components";

interface IProduct{
  productType: string
  productName: string
}

const Index = () => {
  const [productInfo, setProductInfo] = useState<IProduct>({
    productName: "",
    productType: ""
  })

  const [state, setState] = useState<{
    accounts: string[]
    networkId: number | null,
    products: any[],
    ProductAuthContract: any | null
  }>({
    accounts: [],
    networkId: null,
    products: [],
    ProductAuthContract: null
  });

  const {productName, productType} = productInfo;

  // if (daiTokenData && dappTokenData) {
  //   const daiToken = new web3.eth.Contract(DaiTokenJson.abi as any as AbiItem, daiTokenData.address);
  //   const dappToken = new web3.eth.Contract(DappTokenJson.abi as any as AbiItem, dappTokenData.address);
  //   const daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call(),
  //     dappTokenBalance = await dappToken.methods.balanceOf(accounts[0]).call();
  //   setState({
  //     web3,
  //     accounts,
  //     daiToken,
  //     daiTokenBalance: daiTokenBalance.toString(),
  //     dappToken,
  //     dappTokenBalance
  //   })
  // }

  useEffect(()=> {
    async function loadWeb3(){
      const web3 = new Web3("http://127.0.0.1:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const ProductAuthContract = new web3.eth.Contract(ProductAuthJSON.abi as any, "0xcf7044f1a04122bfdcfaaa530c238a8e45b21184", {from: accounts[0]})
      const fetchedProducts = await ProductAuthContract.methods.fetchProducts().call();
      setState({
        accounts,
        networkId,
        products: fetchedProducts,
        ProductAuthContract
      })
    }

    loadWeb3()
  }, []);
  
  async function createProduct(){
    const {accounts, ProductAuthContract} = state;
    await ProductAuthContract.methods.addProduct(productName, productType).send({from: accounts[0]});
  }
  
  return (
    <div>
      <TextInput value={productName} onChange={e=> setProductInfo({...productInfo, productName: e.target.value})} label="Product Name" placeHolder="Set product name" />
      <TextInput value={productType} onChange={e=> setProductInfo({...productInfo, productType: e.target.value})} label="Product Type" placeHolder="Set product type" />
      <Button onClick={createProduct} content="Create Product"/>
      {state.products.map(product=> <div key={`${product.productName}.${product.productType}`}>
        {product.productName}
        {product.productType}
      </div>)}
    </div>
  );
};

export default Index;
