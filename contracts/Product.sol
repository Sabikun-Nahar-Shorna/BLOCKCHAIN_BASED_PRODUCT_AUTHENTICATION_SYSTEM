//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

contract Product {
  public mapping(address => Product) productMap;
  public Product[] products;
  public address owner;
  struct Product {
    string productName;
    string productType;
  }

  constructor(){
    owner = msg.sender;
  }

  function addProduct(string productName, string productType) public {
    Product memory product = Product({
      productName,
      productType
    });
    products.push(product);
  }

  function fetchProducts() public view returns Product[]{
    return products;
  }
}