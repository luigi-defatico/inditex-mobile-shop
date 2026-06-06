import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import PLP from './PLP'
import * as productApi from '../../api/productApi'

vi.mock('../../api/productApi')

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: 999, imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: 799, imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: 799, imgUrl: '' },
]

function renderPLP() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <PLP />
      </CartProvider>
    </BrowserRouter>
  )
}

describe('PLP', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('shows loading state initially', () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    renderPLP()
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('renders product list after fetch', async () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    renderPLP()
    await waitFor(() => {
      expect(screen.getByText('iPhone 14')).toBeInTheDocument()
      expect(screen.getByText('Galaxy S23')).toBeInTheDocument()
    })
  })

  it('shows error message on fetch failure', async () => {
    productApi.fetchProducts.mockRejectedValue(new Error('Network error'))
    renderPLP()
    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/)).toBeInTheDocument()
    })
  })

  it('filters products by search query', async () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    const user = userEvent.setup()
    renderPLP()
    await waitFor(() => expect(screen.getByText('iPhone 14')).toBeInTheDocument())

    await user.type(screen.getByRole('searchbox'), 'samsung')

    await waitFor(() => {
      expect(screen.getByText('Galaxy S23')).toBeInTheDocument()
      expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument()
    })
  })

  it('shows empty state when search finds no results', async () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    const user = userEvent.setup()
    renderPLP()
    await waitFor(() => expect(screen.getByText('iPhone 14')).toBeInTheDocument())

    await user.type(screen.getByRole('searchbox'), 'Nokia')

    await waitFor(() => {
      expect(screen.getByText('No products match your search.')).toBeInTheDocument()
    })
  })
})
