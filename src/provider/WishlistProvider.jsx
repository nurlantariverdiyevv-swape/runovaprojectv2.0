import { useState } from "react"

function WishlistProvider() {
  const [wishlist, setWishlist] = useState(localStorage.runova_wishlist ? JSON.parse(localStorage.runova_wishlist) : [])

  function saveWishlist(list) {
    localStorage.setItem('runova_wishlist', JSON.stringify(list))
    setWishlist(list)
  }

  function toggleWishlist(id) {
    if (wishlist.includes(id)) saveWishlist(wishlist.filter(item => item != id))
    else saveWishlist([...wishlist, id])
  }

  return {wishlist, toggleWishlist, clearWishlist: () => saveWishlist([])}
}

export default WishlistProvider
