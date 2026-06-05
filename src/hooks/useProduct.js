import { useState, useEffect } from 'react'
import { fetchProduct } from '../api/productApi'

/**
 * Fetches a single product by ID.
 * @param {string} id
 * @returns {{ product: import('../api/productApi').ProductDetail|null, status: 'idle'|'loading'|'success'|'error', error: string|null }}
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchProduct(id)
        if (!cancelled) {
          setProduct(data)
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
  }, [id])

  return { product, status, error }
}
