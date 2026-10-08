import { useReducer } from "react"
import basketReducer from "./basketReducer"
import { BasketContext } from "./context"

function BasketProvider({ children }) {
  const [basket, dispatchBasket] = useReducer(basketReducer, localStorage.runova_basket ? JSON.parse(localStorage.runova_basket) : [])

  return (
    <BasketContext value={{basket, dispatchBasket}}>
      {children}
    </BasketContext>
  )
}

export default BasketProvider
