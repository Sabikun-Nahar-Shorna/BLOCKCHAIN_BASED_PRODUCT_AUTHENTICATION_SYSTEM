import React, { useContext, useState } from "react";
// @ts-ignore
import QrReader from 'react-qr-scanner'
import { TextInput, Button, ProductDisplay, Header } from "../components";
import { RootContext } from "../contexts";
import { IProduct } from "../types";

export default function User(){
  const [fetchedProductId, setFetchedProductId] = useState<null | string>(null)
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);
  const {ProductAuthContract, accounts} = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  async function fetchProductById(_fetchedProductId: string){
    if(_fetchedProductId && ProductAuthContract){
      setIsLoading(true);
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(_fetchedProductId).call({
        from: accounts[0]
      });
      if(fetchProductByIdData[0] === ""){
        setIsError(true);
      } else {
        setFetchedProduct({
          productId: fetchProductByIdData[2],
          productName: fetchProductByIdData[0],
          productType: fetchProductByIdData[1],
        });
        setIsError(false);
      }
      setIsLoading(false);
    }
  }

  return <div>
    <Header />
    <div className="p-2">
      <TextInput value={fetchedProductId ?? ''} onChange={(e)=> setFetchedProductId(e.target.value)} label="Id" placeHolder="Product id"/>
      <Button onClick={()=> fetchProductById(fetchedProductId!)} content="Fetch Product" disabled={isLoading}/>
      <Button onClick={()=> setCameraOn(_cameraOn=>!_cameraOn)} content="Scan QR Code"/>
      {fetchedProduct && !isLoading && !isError && <ProductDisplay product={fetchedProduct}/>}
      {isError && <div className="font-bold text-xl text-red-500 text-center">No product with that id exists</div>}
      {
        cameraOn && <QrReader
          delay={100}
          style={{
            height: 240,
            width: 320,
          }}
          facingMode="rear"
          onError={(err: any)=> console.error(err)}
          onScan={(_scannedQrCode: string | {text: string})=> {
            if(_scannedQrCode !== null) {
              let qrCode = '';
              if(typeof _scannedQrCode === "string"){
                qrCode = _scannedQrCode
              } else if(typeof _scannedQrCode === "object"){
                qrCode = _scannedQrCode.text
              }
              setCameraOn(false);
              fetchProductById(qrCode);
            }
          }}
        />
      }
    </div>
  </div>
}
