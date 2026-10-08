import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { BasketContext, DataContext, WishlistContext } from "../provider/context"

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products } = useContext(DataContext)
    const { dispatchBasket } = useContext(BasketContext)
    const { wishlist, toggleWishlist } = useContext(WishlistContext)
    const [size, setSize] = useState('')
    const [color, setColor] = useState(0)
    const [slide, setSlide] = useState(0)

    const product = products.find(p => p.id == id)
    if (!product) return null
    const { name, sub, price, badge, rating, reviewsCount, description, features, colors, sizes, galleryImages } = product

    const images = [colors[color].img, ...galleryImages.filter(img => img != colors[color].img)]

    function prev() { setSlide(slide == 0 ? images.length - 1 : slide - 1) }
    function next() { setSlide(slide == images.length - 1 ? 0 : slide + 1) }

    function addToCart() {
        if (!size) return
        dispatchBasket({type: 'add', payload: {id, size, color: colors[color].name}})
        navigate('/basket')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Image slider */}
            <div className="lg:col-span-7 relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img src={images[slide]} alt={name} className="w-full h-full object-cover" />
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center cursor-pointer"><ChevronLeft size={22} /></button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center cursor-pointer"><ChevronRight size={22} /></button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/60 px-3 py-1.5 rounded-full">
                    {images.map((_, i) => <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full cursor-pointer ${slide == i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />)}
                </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
                {badge && <span className="text-sm font-semibold text-red-600">{badge}</span>}
                <h1 className="font-heading text-3xl lg:text-4xl font-bold uppercase leading-tight">{name}</h1>
                <p className="text-base text-gray-600 mt-1">{sub}</p>
                <p className="text-2xl font-bold mt-3">${price}</p>

                <div className="flex items-center gap-1 mt-2 text-sm">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} strokeWidth={0} className={i <= Math.round(rating) ? 'fill-black' : 'fill-gray-300'} />)}
                    <b className="ml-1">{rating}</b> · <span className="underline">{reviewsCount} reviews</span>
                </div>

                <div className="flex flex-wrap gap-2 my-6">
                    {colors.map((c, i) => (
                        <img key={c.id} onClick={() => { setColor(i); setSlide(0) }} src={c.img} alt={c.name}
                            className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 ${color == i ? 'border-black' : 'border-gray-200 opacity-80'}`} />
                    ))}
                </div>

                <h4 className="text-sm font-bold mb-2">Sizes</h4>
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {sizes.map(s => (
                        <button key={s.label} disabled={!s.inStock} onClick={() => setSize(s.label)}
                            className={`py-3 text-sm font-semibold rounded-lg border cursor-pointer disabled:cursor-default disabled:line-through disabled:text-gray-300 ${size == s.label ? 'border-black ring-1 ring-black' : 'border-gray-300'}`}>
                            {s.label}
                        </button>
                    ))}
                </div>

                <button onClick={addToCart} className={`w-full font-bold py-3.5 rounded-full uppercase mb-3 ${size ? 'bg-black text-white cursor-pointer' : 'bg-gray-200 text-gray-400'}`}>
                    {size ? 'Add to cart' : 'Select a size'}
                </button>
                <button onClick={() => toggleWishlist(id)} className="w-full border border-gray-300 hover:border-black font-bold py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer">
                    <Heart size={20} className={wishlist.includes(id) ? 'fill-red-500 text-red-500' : ''} />
                    {wishlist.includes(id) ? 'In Wishlist' : 'Add to wishlist'}
                </button>

                <p className="mt-8 mb-5 pl-4 border-l-2 border-black text-[15px] leading-relaxed">{description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                    {features.map(f => <div key={f} className="p-3.5 rounded-xl bg-gray-50 text-sm text-gray-800">{f}</div>)}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
