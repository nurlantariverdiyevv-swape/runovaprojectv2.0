import { Outlet, ScrollRestoration } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import AppDataProvider from "../provider/AppDataProvider"
import BasketProvider from "../provider/BasketProvider"
import WishlistProvider from "../provider/WishlistProvider"

function App() {
  return (
    <AppDataProvider>
      <BasketProvider>
        <WishlistProvider>
          <ScrollRestoration />
          <Header />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </WishlistProvider>
      </BasketProvider>
    </AppDataProvider>
  )
}

export default App