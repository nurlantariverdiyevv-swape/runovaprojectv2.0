import { Outlet, ScrollRestoration } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import BasketProvider from "../provider/BasketProvider"
import WishlistProvider from "../provider/WishlistProvider"
import DataProvider from "../provider/dataProvider"

function App() {
  return (
    <DataProvider>
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
    </DataProvider>
  )
}

export default App
