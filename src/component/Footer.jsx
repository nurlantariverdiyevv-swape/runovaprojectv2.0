import { useContext } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../provider/context"

function Footer() {
    const { content } = useContext(DataContext)

    return (
        <footer className="bg-black text-white px-4 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {content.footer.map(section => (
                    <div key={section.title}>
                        <h3 className="font-semibold mb-4">{section.title}</h3>
                        {section.links.map(label => (
                            <Link key={label} to="/" className="block text-sm text-gray-300 hover:text-white mb-2">{label}</Link>
                        ))}
                    </div>
                ))}
            </div>
            <p className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-700 text-sm text-gray-400">©2026 Runova. All rights reserved.</p>
        </footer>
    )
}

export default Footer
