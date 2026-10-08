import { useContext } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { BasketContext, DataContext } from "../provider/context"

function Basket() {
    const { basket, dispatchBasket } = useContext(BasketContext)
    const { products, content } = useContext(DataContext)

    let total = 0
    for (const item of basket) {
        const p = products.find(p => p.id == item.id)
        if (p) total += p.price * item.quant
    }

    if (basket.length == 0) return (
        <div className="max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center">
            <ShoppingBag size={28} strokeWidth={1.5} className="mb-3" />
            <h2 className="font-heading text-xl font-bold uppercase mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Items you add to your bag will show up here.</p>
            <Link to="/shop" className="bg-black text-white rounded-full px-8 py-3 font-semibold">Start shopping</Link>
        </div>
    )

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-start">
                {/* Products */}
                <div className="bg-white p-5 lg:p-7 rounded-xl">
                    <h1 className="font-heading text-xl font-bold uppercase mb-6">Your bag</h1>
                    {basket.map((item, i) => {
                        const p = products.find(p => p.id == item.id)
                        if (!p) return null
                        const color = p.colors.find(c => c.name == item.color)

                        return (
                            <div key={i} className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
                                <Link to={`/product/${p.id}`}><img src={color.img} alt={p.name} className="w-20 h-20 lg:w-24 lg:h-24 object-cover bg-gray-100 rounded-lg" /></Link>
                                <div className="flex-1 text-sm text-gray-500">
                                    <Link to={`/product/${p.id}`} className="text-[15px] font-semibold uppercase text-black hover:underline">{p.name}</Link>
                                    <p>Size: {item.size}</p>
                                    <p>Color: {item.color}</p>
                                    <div className="inline-flex items-center gap-3 border border-gray-300 rounded-full px-3 py-1 mt-2 text-black">
                                        <button onClick={() => dispatchBasket({type: 'edit', payload: {i, quant: item.quant - 1}})} className="cursor-pointer">
                                            {item.quant == 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                                        </button>
                                        <span className="font-semibold">{item.quant}</span>
                                        <button onClick={() => dispatchBasket({type: 'edit', payload: {i, quant: item.quant + 1}})} className="cursor-pointer"><Plus size={13} /></button>
                                    </div>
                                </div>
                                <p className="font-semibold">${p.price * item.quant}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Order */}
                <div className="bg-white p-5 lg:p-7 rounded-xl">
                    <h2 className="font-heading text-xl font-bold uppercase mb-6">Order Summary</h2>
                    <p className="flex justify-between text-gray-700 mb-1">Subtotal <b className="text-black">${total}</b></p>
                    <p className="flex justify-between text-gray-700 mb-4">Tax <b className="text-black">$0</b></p>
                    <p className="flex justify-between text-xl font-semibold border-t border-gray-100 pt-4 mb-4">Total <span>${total}</span></p>
                    <button className="w-full bg-black text-white rounded-full py-3.5 font-semibold cursor-pointer">Proceed to checkout</button>

                    <p className="text-center text-sm text-gray-500 mt-6 mb-3">Easy payment</p>
                    <div className="flex justify-center flex-wrap gap-2">
                        {content.paymentLogos.map(logo => <img key={logo.name} src={logo.url} alt={logo.name} className="h-5" />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket
