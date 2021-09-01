import React, { useContext, useState } from "react";
import { TextInput, Button, ProductDisplay, Header } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

export default function User(){
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const {ProductAuthContract, accounts} = useContext(RootContext);

  async function fetchProductById(){
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

  return <div>
    <Header />
    <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Product Id" placeHolder="Fetched product id"/>
    <Button onClick={fetchProductById} content="Fetch Product"/>
    {fetchedProduct && <ProductDisplay product={fetchedProduct}/>}
  </div>
}
