interface Product {
  id: number
  name: string
  description: string
  price: number
  store: number | Store
  owner: number | User
  image_url?: string
  cloudinary_id?: string
  tags: string[]
}