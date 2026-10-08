import { useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react"
import { BasketContext, DataContext, WishlistContext } from "../provider/context"

function Header() {
    const { products, content } = useContext(DataContext)
    const { basket } = useContext(BasketContext)
    const { wishlist } = useContext(WishlistContext)
    const [open, setOpen] = useState(false)

    const wishCount = products.filter(p => wishlist.includes(p.id)).length
    let basketCount = 0
    for (const item of basket) basketCount += item.quant

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="bg-black text-white text-xs text-center py-1.5 px-4">R+ Members: Free Shipping and More</div>

            <div className="max-w-7xl mx-auto px-4 h-14 lg:h-16 flex items-center justify-between gap-6">
                {/* Left: logo */}
                <Link to="/"><img src="/assets/img/runovalogo.png" alt="Runova" className="h-7 lg:h-8" /></Link>

                {/* Center: categories (desktop only) */}
                <nav className="hidden lg:flex gap-[21px] text-[18px] font-semibold">
                    <NavLink to="/shop" end className="hover:underline underline-offset-4">All</NavLink>
                    {content.menu.map(cat => <NavLink key={cat} to={`/shop/${cat.toLowerCase()}`} className="hover:underline underline-offset-4">{cat}</NavLink>)}
                </nav>

                {/* Right: login, wishlist, basket */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="hidden lg:flex items-center gap-2 text-sm font-semibold"><User size={20} strokeWidth={1.5} /> Log in</Link>
                    <Link to="/wishlist" className="relative">
                        <Heart size={22} strokeWidth={1.5} />
                        {wishCount > 0 && <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishCount}</span>}
                    </Link>
                    <Link to="/basket" className="relative">
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        {basketCount > 0 && <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{basketCount}</span>}
                    </Link>
                    <button onClick={() => setOpen(true)} className="lg:hidden cursor-pointer"><Menu size={26} strokeWidth={1.5} /></button>
                </div>
            </div>

            {/* Mobile menu: opens from the right */}
            <div onClick={() => setOpen(false)} className={`lg:hidden fixed inset-0 bg-black/50 z-50 ${open ? 'block' : 'hidden'}`} />
            <div className={`lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setOpen(false)} className="mb-6 cursor-pointer"><X size={26} strokeWidth={1.5} /></button>

                <nav onClick={() => setOpen(false)} className="flex flex-col">
                    <NavLink to="/shop" end className="py-3 text-base font-bold">All</NavLink>
                    {content.menu.map(cat => <NavLink key={cat} to={`/shop/${cat.toLowerCase()}`} className="py-3 text-base font-bold">{cat}</NavLink>)}

                    <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col gap-5 text-sm font-medium">
                        <Link to="/" className="flex items-center gap-3"><User size={20} strokeWidth={1.5} /> Log in</Link>
                        <Link to="/wishlist" className="flex items-center gap-3"><Heart size={20} strokeWidth={1.5} /> Wishlist ({wishCount})</Link>
                        <Link to="/basket" className="flex items-center gap-3"><ShoppingBag size={20} strokeWidth={1.5} /> Basket ({basketCount})</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header