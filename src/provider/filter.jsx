function inCategory(product, rule) {
  for (const key in rule.match) {
    if (!rule.match[key].includes(product[key])) return false
  }
  return true
}

function productFilter(products, categories, category, text, sort) {
  let result = products
  if (category) result = categories[category] ? result.filter(p => inCategory(p, categories[category])) : []
  if (text) result = result.filter(p => p.name.toLowerCase().includes(text.toLowerCase()))

  if (sort == 'newest') result = result.filter(p => p.badge == 'New')
  if (sort == 'price-low') result = [...result].sort((a, b) => a.price - b.price)
  if (sort == 'price-high') result = [...result].sort((a, b) => b.price - a.price)
  return result
}

export default productFilter
