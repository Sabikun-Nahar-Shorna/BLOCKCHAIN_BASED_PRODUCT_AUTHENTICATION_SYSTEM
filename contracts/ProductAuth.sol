//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract ProductAuth {
  mapping(address => Product) public productsMap;
  Product[] public products;
  address public owner;
  struct Product {
    string productName;
    string productType;
  }

  constructor(){
    owner = msg.sender;
  }

  function addProduct(string memory productName, string memory productType) public {
    Product memory product = Product({
      productName: productName,
      productType: productType
    });
    products.push(product);
  }

  function fetchProducts() public view returns (Product[] memory){
    return products;
  }
}