import { useContext } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { DataContext, WishlistContext } from "../provider/context"
import ProductCard from "./ProductCard"

function Wishlist() {
    const { products } = useContext(DataContext)
    const { wishlist, clearWishlist } = useContext(WishlistContext)
    const list = products.filter(p => wishlist.includes(p.id))

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white p-5 lg:p-7 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h1 className="font-heading text-xl font-bold uppercase">Your wishlist ({list.length})</h1>
                        {list.length > 0 && <button onClick={clearWishlist} className="border border-gray-300 hover:border-black rounded-full px-5 py-2 text-sm font-semibold cursor-pointer">Clear wishlist</button>}
                    </div>

                    {list.length == 0 && (
                        <div className="flex flex-col items-center text-center py-16">
                            <Heart size={26} strokeWidth={1.5} className="mb-3" />
                            <h2 className="font-heading text-xl font-bold uppercase mb-2">Save your favorites</h2>
                            <p className="text-gray-500 mb-6">Items added to your favorites will be on your wishlist.</p>
                            <Link to="/shop" className="bg-black text-white rounded-full px-8 py-3 font-semibold">Continue shopping</Link>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {list.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist
