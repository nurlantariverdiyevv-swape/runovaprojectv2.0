import { useEffect, useState } from "react"
import { getProducts, getContent, getCategories } from "./api"

function AppDataProvider() {
  const [products, setProducts] = useState([])
  const [content, setContent] = useState({menu: [], activities: [], banners: [], sortOptions: [], paymentLogos: [], footer: []})
  const [categories, setCategories] = useState({})

  useEffect(() => {
    getProducts().then(data => setProducts(data))
    getContent().then(data => setContent(data))
    getCategories().then(data => setCategories(data))
  }, [])

  return {products, content, categories}
}

export default AppDataProvider
