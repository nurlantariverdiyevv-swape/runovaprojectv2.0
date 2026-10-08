import { useState } from "react"
import { WishlistContext } from "./context"

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(localStorage.runova_wishlist ? JSON.parse(localStorage.runova_wishlist) : [])

  function saveWishlist(list) {
    localStorage.setItem('runova_wishlist', JSON.stringify(list))
    setWishlist(list)
  }

  function toggleWishlist(id) {
    if (wishlist.includes(id)) saveWishlist(wishlist.filter(item => item != id))
    else saveWishlist([...wishlist, id])
  }

  return (
    <WishlistContext value={{wishlist, toggleWishlist, clearWishlist: () => saveWishlist([])}}>
      {children}
    </WishlistContext>
  )
}

export default WishlistProvider
