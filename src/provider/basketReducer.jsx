function basketReducer(basket, action) {
  const {type, payload} = action
  let result = []
  if (type === 'del') result = delFromBasket(basket, payload.i)
  if (type === 'add') result = addToBasket(basket, payload.id, payload.size, payload.color)
  if (type === 'edit') result = editItemInBasket(basket, payload.i, payload.quant)

  localStorage.setItem('runova_basket', JSON.stringify(result))
  return result
}

function delFromBasket(basket, ind) {
  return basket.filter((_, i) => i != ind)
}

function addToBasket(basket, id, size, color) {
  let ind = basket.findIndex(item => item.id == id && item.size == size && item.color == color)
  if (ind == -1) return [...basket, {id, size, color, quant: 1}]
  else return editItemInBasket(basket, ind, basket[ind].quant + 1)
}

function editItemInBasket(basket, ind, quant) {
  if (quant) {
    let clone = [...basket]
    clone[ind] = {...clone[ind], quant}
    return clone
  } else return delFromBasket(basket, ind)
}

export default basketReducer
