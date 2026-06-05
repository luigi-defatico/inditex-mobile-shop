import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Header.module.css'

function Breadcrumbs() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
        <span>Products</span>
      </nav>
    )
  }

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      <Link to="/">Products</Link>
      <span className={styles.separator}>/</span>
      <span>Product Detail</span>
    </nav>
  )
}

function Header() {
  const { cartCount } = useCart()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Go to home">
          Mobile Shop
        </Link>
        <Breadcrumbs />
        <div className={styles.cart} aria-label={`Cart: ${cartCount} items`}>
          🛒 <span className={styles.cartCount}>{cartCount}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
