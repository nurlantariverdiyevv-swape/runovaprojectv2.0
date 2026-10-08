import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { Search } from "lucide-react"
import { DataContext } from "../provider/context"
import productFilter from "../provider/filter"
import ProductCard from "./ProductCard"

function Shop() {
    const { category } = useParams()
    const { products, content, categories } = useContext(DataContext)
    const [text, setText] = useState('')
    const [sort, setSort] = useState('featured')
    const list = productFilter(products, categories, category, text, sort)

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="font-heading text-2xl lg:text-4xl font-extrabold uppercase mb-6">{categories[category] ? categories[category].label : 'All Products'}</h1>

            <div className="relative mb-4 max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input onInput={e => setText(e.target.value)} type="search" placeholder="Search..." className="w-full bg-gray-100 rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black" />
            </div>

            {/* Sort buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                {content.sortOptions.map(o => (
                    <button key={o.id} onClick={() => setSort(o.id)} className={`px-4 py-2 rounded-full text-sm border cursor-pointer ${sort == o.id ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}>
                        {o.label}
                    </button>
                ))}
            </div>

            <p className="text-sm text-gray-500 mb-4">{list.length} products</p>

            {list.length == 0 && <p className="text-center text-lg text-gray-500 py-20">No products found</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {list.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
    )
}

export default Shop
