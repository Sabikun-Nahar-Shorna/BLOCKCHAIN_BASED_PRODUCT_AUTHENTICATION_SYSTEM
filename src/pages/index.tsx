import {useState, useEffect} from "react";
import Web3 from "web3";
import ProductAuthJSON from "../abis/ProductAuth.json";

const Index = () => {
  const [state, setState] = useState<{
    accounts: string[]
    networkId: number | null,
    products: any[],
    productAuth: any | null
  }>({
    accounts: [],
    networkId: null,
    products: [],
    productAuth: null
  });

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
      const productAuth = new web3.eth.Contract(ProductAuthJSON.abi as any, "0x7c9e4dc61c13d3bc7bbfc0f67fa2a1cdf8d28978", {from: accounts[0]})
      const fetchedProducts = await productAuth.methods.fetchProducts().call();
      console.log({fetchedProducts})
      setState({
        accounts,
        networkId,
        products: fetchedProducts,
        productAuth
      })
    }

    loadWeb3()
  }, []);
  
  async function createProduct(){
    const {accounts, productAuth} = state;
    const transaction = await productAuth.methods.addProduct("New Product", "Industry").send({from: accounts[0]});
    console.log({transaction});
  }

  return (
    <div>
      <button onClick={createProduct} type="button">Create Product</button>
    </div>
  );
};

export default Index;
