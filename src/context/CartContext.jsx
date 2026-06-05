/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'cart:count'

const CartContext = createContext(null)

/**
 * Provides cart state to the application.
 * @param {{ children: React.ReactNode }} props
 */
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, String(cartCount))
  }, [cartCount])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * @returns {{ cartCount: number, setCartCount: Function }}
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
