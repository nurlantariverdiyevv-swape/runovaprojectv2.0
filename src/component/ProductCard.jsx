import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingBag } from "lucide-react"
import { WishlistContext } from "../provider/context"

function ProductCard({ product }) {
    const { wishlist, toggleWishlist } = useContext(WishlistContext)
    const { id, name, sub, price, oldPrice, badge, colors } = product
    const [color, setColor] = useState(0)

    return (
        <div className="relative">
            <Link to={`/product/${id}`} className="group block relative mb-3">
                <img src={colors[color].img} alt={name} className="w-full aspect-square object-cover bg-gray-100 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md"><ShoppingBag size={16} /></span>
            </Link>
            <button onClick={() => toggleWishlist(id)} className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5 cursor-pointer">
                <Heart size={18} className={wishlist.includes(id) ? 'fill-black' : ''} />
            </button>

            <div className="flex gap-1.5 mb-2">
                {colors.map((c, i) => (
                    <img key={c.id} onClick={() => setColor(i)} src={c.img} alt={c.name}
                        className={`w-6 h-6 object-cover rounded-sm cursor-pointer border ${color == i ? 'border-black' : 'border-transparent opacity-70'}`} />
                ))}
            </div>

            <Link to={`/product/${id}`}>
                {badge && <span className="text-xs font-semibold text-red-600">{badge}</span>}
                <h3 className="text-[15px] lg:text-base font-semibold leading-snug hover:underline">{name}</h3>
                <p className="text-xs lg:text-sm text-gray-500">{sub}</p>
                <p className="text-sm lg:text-base font-semibold mt-1">
                    ${price} {oldPrice && <s className="text-gray-400 text-xs lg:text-sm font-normal">${oldPrice}</s>}
                </p>
            </Link>
        </div>
    )
}

export default ProductCard
