import { useState, useEffect } from 'react'
import { fetchProducts } from '../api/productApi'

/**
 * Fetches the product list from the API.
 * @returns {{ products: import('../api/productApi').Product[], status: 'idle'|'loading'|'success'|'error', error: string|null }}
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchProducts()
        if (!cancelled) {
          setProducts(data)
          setStatus('success')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setStatus('error')
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { products, status, error }
}
