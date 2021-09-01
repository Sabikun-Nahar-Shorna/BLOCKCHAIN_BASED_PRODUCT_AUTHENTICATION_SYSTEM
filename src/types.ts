export interface IProduct{
  productType: string
  productName: string
  productId: string
}

export interface ILoginInput {
  email: string
  password: string,
}

export interface IRegisterInput extends ILoginInput {
}