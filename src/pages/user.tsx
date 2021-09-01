import React, { useContext, useState } from "react";
import { TextInput, Button, ProductDisplay, Header } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

export default function User(){
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const {ProductAuthContract, accounts} = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function fetchProductById(){
    if(fetchedProductId){
      setIsLoading(true);
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(fetchedProductId).call({
        from: accounts[0]
      }) as IProduct;
      if(fetchProductByIdData.productId === ""){
        setIsError(true);
      } else {
        setFetchedProduct({
          productId: fetchProductByIdData.productId,
          productName: fetchProductByIdData.productName,
          productType: fetchProductByIdData.productType,
        });
        setIsError(false);
      }
      setIsLoading(false);
    }
  }

  return <div>
    <Header />
    <div className="p-2">
      <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Product Id" placeHolder="Fetched product id"/>
      <Button onClick={fetchProductById} content="Fetch Product" disabled={isLoading}/>
      {fetchedProduct && !isLoading && !isError && <ProductDisplay product={fetchedProduct}/>}
      {isError && <div className="font-bold text-xl text-red-500 text-center">No product with that id exists</div>}
    </div>
  </div>
}
