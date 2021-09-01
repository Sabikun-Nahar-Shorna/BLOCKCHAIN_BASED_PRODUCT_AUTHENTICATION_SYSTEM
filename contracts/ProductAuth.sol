//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract ProductAuth {
  mapping(string => Product) public productsMap;
  Product[] public products;
  address public owner;
  struct Product {
    string productName;
    string productType;
    string productId;
  }

  constructor(){
    owner = msg.sender;
  }

  function addProduct(string memory productName, string memory productType, string memory productId) public {
    Product memory product = Product({
      productName: productName,
      productType: productType,
      productId: productId
    });
    productsMap[productId] = product;
    products.push(product);
  }

  function fetchProducts() public view returns (Product[] memory){
    return products;
  }

  function fetchProductById(string memory productId) public view returns (Product memory){
    return productsMap[productId];
  }
}