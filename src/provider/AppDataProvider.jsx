import { useEffect, useState } from "react"
import { getProducts, getContent, getCategories } from "./api"
import { DataContext } from "./context"

function AppDataProvider({ children }) {
  const [products, setProducts] = useState(null)
  const [content, setContent] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    getProducts().then(data => setProducts(data))
    getContent().then(data => setContent(data))
    getCategories().then(data => setCategories(data))
  }, [])

  if (!products || !content || !categories) return null

  return (
    <DataContext value={{products, content, categories}}>
      {children}
    </DataContext>
  )
}

export default AppDataProvider