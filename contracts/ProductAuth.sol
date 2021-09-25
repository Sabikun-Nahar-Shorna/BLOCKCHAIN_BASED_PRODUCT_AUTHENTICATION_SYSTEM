//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract ProductAuth {
  // Mapping between id and Product to store product using its id
  mapping(string => Product) public productsMap;
  // An array that keeps tracks of all products created
  Product[] public products;
  // Public address that stores the address that deployed the smart contract on the network
  address public owner;
  // Custom product type using struct, a Product has the following three data
  // 1. Name of the product
  // 2. Type of the product
  // 3. Id of the product
  struct Product {
    string productName;
    string productType;
    string productId;
  }

  // Constructor runs only once when the smart contract is deployed
  constructor(){
    // This sets the owner state variables to the address that deploys the smart contract
    // in our case it will be the first address located in the ganache blockchain 
    owner = msg.sender;
  }

  // function to add the product to the state variables 
  function addProduct(string memory productName, string memory productType, string memory productId) public {
    // Create a product of type Product using the passed parameters
    Product memory product = Product({
      productName: productName,
      productType: productType,
      productId: productId
    });
    // Add the product using its id into the state map variable
    productsMap[productId] = product;
    // Push the product at the end of the state array variable
    products.push(product);
  }

  // Fetch all the currently stored products
  function fetchProducts() public view returns (Product[] memory){
    return products;
  }

  // Fetch an individual product by its id
  function fetchProductById(string memory productId) public view returns (Product memory){
    return productsMap[productId];
  }
}