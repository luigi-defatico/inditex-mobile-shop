/**
 * Filters products by a search query matching brand or model.
 * @param {import('../api/productApi').Product[]} products
 * @param {string} query
 * @returns {import('../api/productApi').Product[]}
 */
export function filterProducts(products, query) {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter(
    (p) =>
      p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q)
  )
}
