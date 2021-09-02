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
  const [scannedQrCode, setScannedQrCode] = useState('');

  async function fetchProductById(){
    if(fetchedProductId && ProductAuthContract){
      setIsLoading(true);
      const fetchProductByIdData = await ProductAuthContract.methods.fetchProductById(fetchedProductId).call({
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
      <Button onClick={fetchProductById} content="Fetch Product" disabled={isLoading}/>
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
          legacyMode
          onError={(err: any)=> console.error(err)}
          onScan={(_scannedQrCode: string)=> {
            setScannedQrCode(_scannedQrCode);
            setCameraOn(false);
          }}
        />
      }
      Scanned QR Code {
        JSON.stringify(scannedQrCode)
      }
    </div>
  </div>
}
