interface CartItem {
  id: number
  product: Product
  user: number
  amount: number
  status: string
  selected?: boolean
}