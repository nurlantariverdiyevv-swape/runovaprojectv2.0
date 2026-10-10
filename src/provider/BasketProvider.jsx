import { useReducer } from "react"
import basketReducer from "./basketReducer"

function BasketProvider() {
  const [basket, dispatchBasket] = useReducer(basketReducer, localStorage.runova_basket ? JSON.parse(localStorage.runova_basket) : [])

  return {basket, dispatchBasket}
}

export default BasketProvider