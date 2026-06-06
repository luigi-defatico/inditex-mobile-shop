import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useDebounce } from '../../hooks/useDebounce'
import { filterProducts } from '../../utils/filterProducts'
import SearchBar from '../../components/SearchBar/SearchBar'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './PLP.module.css'

function PLP() {
  const { products, status } = useProducts()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const filtered = filterProducts(products, debouncedQuery)

  if (status === 'loading') {
    return <div className={styles.state}><p>Loading products...</p></div>
  }

  if (status === 'error') {
    return <div className={styles.state}><p>Failed to load products. Please try again later.</p></div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>Products</h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {filtered.length === 0 ? (
        <div className={styles.state}><p>No products match your search.</p></div>
      ) : (
        <ul className={styles.grid} role="list">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PLP
