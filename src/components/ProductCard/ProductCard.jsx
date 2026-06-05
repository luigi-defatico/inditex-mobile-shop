import { useNavigate } from 'react-router-dom'
import styles from './ProductCard.module.css'

/**
 * @param {{ product: import('../../api/productApi').Product }} props
 */
function ProductCard({ product }) {
  const navigate = useNavigate()

  function handleSelect() {
    navigate(`/product/${product.id}`)
  }

  return (
    <article
      className={styles.card}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
      aria-label={`${product.brand} ${product.model}`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.model}>{product.model}</p>
        <p className={styles.price}>
          {product.price ? `${product.price} €` : 'Price not available'}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
