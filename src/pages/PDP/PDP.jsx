import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../../hooks/useProduct'
import { useCart } from '../../context/CartContext'
import { addToCart } from '../../api/productApi'
import styles from './PDP.module.css'

function PDP() {
  const { id } = useParams()
  const { product, status } = useProduct(id)
  const { setCartCount } = useCart()

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // Derive effective selection: use user choice or fall back to first available option
  const effectiveColor = selectedColor ?? product?.options?.colors?.[0]?.code ?? null
  const effectiveStorage = selectedStorage ?? product?.options?.storages?.[0]?.code ?? null

  async function handleAddToCart() {
    if (effectiveColor === null || effectiveStorage === null) return
    setAdding(true)
    setFeedback(null)
    try {
      const result = await addToCart({
        id,
        colorCode: effectiveColor,
        storageCode: effectiveStorage,
      })
      setCartCount(result.count)
      setFeedback('Added to cart!')
    } catch {
      setFeedback('Failed to add to cart. Please try again.')
    } finally {
      setAdding(false)
    }
  }

  if (status === 'loading') {
    return <div className={styles.state}><p>Loading product...</p></div>
  }

  if (status === 'error') {
    return (
      <div className={styles.state}>
        <p>Product not found or unavailable.</p>
        <Link to="/" className={styles.back}>Back to products</Link>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>← Back to products</Link>

      <div className={styles.layout}>
        <div className={styles.imageCol}>
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className={styles.image}
          />
        </div>

        <div className={styles.infoCol}>
          <section className={styles.description}>
            <h1 className={styles.title}>{product.brand} {product.model}</h1>
            <dl className={styles.specs}>
              <dt>Price</dt>
              <dd>{product.price ? `${product.price} €` : 'N/A'}</dd>
              <dt>CPU</dt>
              <dd>{product.cpu || 'N/A'}</dd>
              <dt>RAM</dt>
              <dd>{product.ram || 'N/A'}</dd>
              <dt>OS</dt>
              <dd>{product.os || 'N/A'}</dd>
              <dt>Display</dt>
              <dd>{product.displayResolution || 'N/A'}</dd>
              <dt>Battery</dt>
              <dd>{product.battery || 'N/A'}</dd>
              <dt>Primary camera</dt>
              <dd>{product.primaryCamera || 'N/A'}</dd>
              <dt>Secondary camera</dt>
              <dd>{product.secondaryCmera || 'N/A'}</dd>
              <dt>Dimensions</dt>
              <dd>{product.dimentions || 'N/A'}</dd>
              <dt>Weight</dt>
              <dd>{product.weight || 'N/A'}</dd>
            </dl>
          </section>

          <section className={styles.actions}>
            <div className={styles.selectorGroup}>
              <label className={styles.selectorLabel}>Storage</label>
              <div className={styles.options}>
                {product.options?.storages?.map((s) => (
                  <button
                    key={s.code}
                    className={`${styles.option} ${effectiveStorage === s.code ? styles.optionSelected : ''}`}
                    onClick={() => setSelectedStorage(s.code)}
                    aria-pressed={effectiveStorage === s.code}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectorGroup}>
              <label className={styles.selectorLabel}>Color</label>
              <div className={styles.options}>
                {product.options?.colors?.map((c) => (
                  <button
                    key={c.code}
                    className={`${styles.option} ${effectiveColor === c.code ? styles.optionSelected : ''}`}
                    onClick={() => setSelectedColor(c.code)}
                    aria-pressed={effectiveColor === c.code}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.addButton}
              onClick={handleAddToCart}
              disabled={adding}
              aria-busy={adding}
            >
              {adding ? 'Adding...' : 'Add to cart'}
            </button>

            {feedback && (
              <p className={styles.feedback} role="status">
                {feedback}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default PDP
