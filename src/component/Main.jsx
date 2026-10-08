import { useContext } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { DataContext } from "../provider/context"
import ProductSlider from "./ProductSlider"

function Main() {
    const { content } = useContext(DataContext)

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <div className="relative h-[300px] sm:h-[450px] lg:h-[600px]">
                <img src="/assets/img/reklam.jpeg" alt="" className="w-full h-full object-cover object-left-bottom" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start text-white">
                    <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black uppercase mb-3">X Ultra 5 Gore-Tex</h1>
                    <p className="text-sm sm:text-lg text-gray-200 mb-6">Confidence in every step</p>
                    <Link to="/product/x-ultra-5-gtx-blackcoffee" className="bg-white text-black font-bold text-sm px-8 py-3 rounded-full hover:bg-gray-200">Shop Now</Link>
                </div>
            </div>

            {/* Activities */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-xl lg:text-2xl font-bold mb-6">Shop by activity</h2>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                    {content.activities.map((item, i) => (
                        <Link key={item.name} to={item.link} className={`group relative rounded-md overflow-hidden bg-gray-900 ${i == 0 ? 'col-span-2 lg:col-span-1' : ''}`}>
                            <img src={item.img} alt={item.name} className={`w-full object-cover ${item.position} opacity-90 group-hover:scale-105 transition-transform duration-500 ${i == 0 ? 'aspect-video lg:aspect-[2/3]' : 'aspect-[2/3]'}`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                            <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white">
                                <span className="text-sm lg:text-lg font-bold">{item.name}</span>
                                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Two banners */}
            <section className="grid md:grid-cols-2 gap-1.5 py-6">
                {content.banners.map(banner => (
                    <Link key={banner.id} to={banner.link} className="group relative h-[450px] sm:h-[520px] lg:h-[620px] overflow-hidden bg-gray-900">
                        <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-12 flex flex-col items-start gap-3 text-white">
                            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase">{banner.title}</h2>
                            <p className="text-sm sm:text-base text-gray-200 mb-2">{banner.subtitle}</p>
                            <span className="bg-white text-black font-bold text-sm sm:text-base px-7 py-3 rounded-full group-hover:bg-gray-200">Shop Now</span>
                        </div>
                    </Link>
                ))}
            </section>

            <ProductSlider />
        </div>
    )
}

export default Main
