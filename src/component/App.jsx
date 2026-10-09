import { Outlet, ScrollRestoration } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import AppDataProvider from "../provider/AppDataProvider"
import BasketProvider from "../provider/BasketProvider"
import WishlistProvider from "../provider/WishlistProvider"
import { DataContext, BasketContext, WishlistContext } from "../provider/context"

function App() {
  const { products, content, categories } = AppDataProvider()
  const { basket, dispatchBasket } = BasketProvider()
  const { wishlist, toggleWishlist, clearWishlist } = WishlistProvider()

  return (
    <DataContext value={{ products, content, categories }}>
      <BasketContext value={{ basket, dispatchBasket }}>
        <WishlistContext value={{ wishlist, toggleWishlist, clearWishlist }}>
          <ScrollRestoration />
          <Header />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </WishlistContext>
      </BasketContext>
    </DataContext>
  )
}

export default App
