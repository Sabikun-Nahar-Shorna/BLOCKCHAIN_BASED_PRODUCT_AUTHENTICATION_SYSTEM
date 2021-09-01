import { IProduct } from "../types";

interface ProductDisplayProps{
  product: IProduct
}

function ProductDisplayItem(props: {label: string, value: string}){
  const {label, value} = props;
  return <div className="flex my-1">
    <div className="flex-1 bg-gray-900 mr-3 font-semibold p-3 rounded-sm text-center text-white">
      {label}
    </div>
    <div className="flex-1 font-semibold p-3 text-center border-2 rounded-sm border-gray-700">
      {value}
    </div>
  </div>
}

export function ProductDisplay(props: ProductDisplayProps){
  const {product} = props;
  return <div className="flex flex-col mx-5">
    <div className="text-xl my-3 font-bold text-center">
      Product Info
    </div>
    <ProductDisplayItem label="Product Name" value={product.productName}/>
    <ProductDisplayItem label="Product Type" value={product.productType}/>
  </div>
}