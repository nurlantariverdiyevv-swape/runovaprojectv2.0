import { useContext, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DataContext } from "../provider/context"
import ProductCard from "./ProductCard"

function ProductSlider() {
    const { products } = useContext(DataContext)
    const [tab, setTab] = useState('Shoes')
    const slider = useRef()
    const list = products.filter(p => p.category == tab).slice(0, 8)

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl font-bold">Recommended for you</h2>
                <div className="flex gap-2">
                    <button onClick={() => slider.current.scrollLeft -= 320} className="w-10 h-10 rounded-full border border-gray-300 hover:border-black flex items-center justify-center cursor-pointer"><ChevronLeft size={20} /></button>
                    <button onClick={() => slider.current.scrollLeft += 320} className="w-10 h-10 rounded-full border border-gray-300 hover:border-black flex items-center justify-center cursor-pointer"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                {['Shoes', 'Gear'].map(name => (
                    <button key={name} onClick={() => setTab(name)} className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${tab == name ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{name}</button>
                ))}
            </div>

            <div ref={slider} className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar">
                {list.map(product => (
                    <div key={product.id} className="w-64 lg:w-72 shrink-0">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductSlider
