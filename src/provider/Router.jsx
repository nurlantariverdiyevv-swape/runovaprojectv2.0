import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../component/App'
import Main from '../component/Main'
import Shop from '../component/Shop'
import ProductDetail from '../component/ProductDetail'
import Wishlist from '../component/Wishlist'
import Basket from '../component/Basket'

const router = createBrowserRouter([
  {path: '/', Component: App, children: [
    {index: true, Component: Main },
    {path: '/shop', Component: Shop },
    {path: '/shop/:category', Component: Shop },
    {path: '/product/:id', Component: ProductDetail },
    {path: '/wishlist', Component: Wishlist },
    {path: '/basket', Component: Basket },
    {path: '*', loader: () => redirect('/') },
  ]}
])

export default router
