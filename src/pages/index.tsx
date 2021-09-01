import React, {useState, useEffect} from "react";
import Web3 from "web3";
import QrCode from "qrcode";
import {v4} from "uuid";
import ProductAuthJSON from "../abis/ProductAuth.json";
import { Button, ProductDisplay, TextInput } from "../components";
import { IProduct } from "../types";

const Index = () => {
  const [transactionState, setTransactionState] = useState<"ongoing" | "idle">("idle");
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const [productInfo, setProductInfo] = useState<IProduct & {productQrCode: string}>({
    productName: "",
    productType: "",
    productId: "",
    productQrCode: ""
  })

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
  
  async function createProduct(){
    const {accounts, ProductAuthContract} = state;
    const {productName, productType} = productInfo;
    const productId = v4();
    setTransactionState("ongoing");
    await ProductAuthContract.methods.addProduct(productName, productType, productId).send({from: accounts[0]});
    const productQrCode = await QrCode.toDataURL(productId);
    setProductInfo({
      productName: "",
      productType: "",
      productId,
      productQrCode
    })
    setTransactionState("idle");
  }

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

  const {productName, productType, productId, productQrCode} = productInfo;
  
  return (
    <div>
      <TextInput disabled={transactionState === "ongoing"} value={productName} onChange={e=> setProductInfo({...productInfo, productName: e.target.value})} label="Product Name" placeHolder="Set product name" />
      <TextInput disabled={transactionState === "ongoing"} value={productType} onChange={e=> setProductInfo({...productInfo, productType: e.target.value})} label="Product Type" placeHolder="Set product type" />
      <Button disabled={transactionState === "ongoing" || !productName || !productType} onClick={async ()=> {
        createProduct()
      }} content="Create Product"/>
      {transactionState === "ongoing" ? <div className="loader"/> : transactionState === "idle" && productId && productQrCode && <div className="flex flex-col items-center justify-center">
        <span className="font-bold">{productId}</span>
        <img style={{width: 250}} src={productQrCode} alt="Product Qr Code"/>
      </div>}

      <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Product Id" placeHolder="Fetched product id"/>
      <Button onClick={fetchProductById} content="Fetch Product"/>
      {fetchedProduct && <ProductDisplay product={fetchedProduct}/>}
    </div>
  );
};

export default Index;

// 73ec2ae5-7a93-4155-aa77-1d1b3d5f6d8f