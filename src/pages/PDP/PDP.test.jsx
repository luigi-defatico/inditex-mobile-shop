import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import PDP from './PDP'
import * as productApi from '../../api/productApi'

vi.mock('../../api/productApi')

const mockProduct = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: 999,
  imgUrl: 'https://example.com/img.jpg',
  cpu: 'A15 Bionic',
  ram: '6GB',
  os: 'iOS 16',
  displayResolution: '2532x1170',
  battery: '3279mAh',
  primaryCamera: '12MP',
  secondaryCmera: '12MP',
  dimentions: '146.7 x 71.5 x 7.8 mm',
  weight: '172g',
  options: {
    colors: [
      { code: 1000, name: 'Black' },
      { code: 1001, name: 'White' },
    ],
    storages: [
      { code: 2, name: '128GB' },
      { code: 3, name: '256GB' },
    ],
  },
}

function renderPDP(id = '1') {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <CartProvider>
        <Routes>
          <Route path="/product/:id" element={<PDP />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  )
}

describe('PDP', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('shows loading state initially', () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    renderPDP()
    expect(screen.getByText('Loading product...')).toBeInTheDocument()
  })

  it('renders product details after fetch', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    renderPDP()
    await waitFor(() => {
      expect(screen.getByText('Apple iPhone 14')).toBeInTheDocument()
      expect(screen.getByText('A15 Bionic')).toBeInTheDocument()
      expect(screen.getByText('iOS 16')).toBeInTheDocument()
      expect(screen.getByText('999 €')).toBeInTheDocument()
    })
  })

  it('shows error message on fetch failure', async () => {
    productApi.fetchProduct.mockRejectedValue(new Error('Not found'))
    renderPDP()
    await waitFor(() => {
      expect(screen.getByText(/Failed to load product/)).toBeInTheDocument()
    })
  })

  it('pre-selects first color and storage option', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    renderPDP()
    await waitFor(() => expect(screen.getByText('Black')).toBeInTheDocument())

    expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '128GB' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'White' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: '256GB' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('allows changing color selection', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    const user = userEvent.setup()
    renderPDP()
    await waitFor(() => expect(screen.getByText('White')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'White' }))

    expect(screen.getByRole('button', { name: 'White' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('adds product to cart with correct params', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    productApi.addToCart.mockResolvedValue({ count: 1 })
    const user = userEvent.setup()
    renderPDP()
    await waitFor(() => expect(screen.getByText('Add to cart')).toBeInTheDocument())

    await user.click(screen.getByText('Add to cart'))

    await waitFor(() => {
      expect(productApi.addToCart).toHaveBeenCalledWith({
        id: '1',
        colorCode: 1000,
        storageCode: 2,
      })
    })
  })

  it('shows success feedback after adding to cart', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    productApi.addToCart.mockResolvedValue({ count: 1 })
    const user = userEvent.setup()
    renderPDP()
    await waitFor(() => expect(screen.getByText('Add to cart')).toBeInTheDocument())

    await user.click(screen.getByText('Add to cart'))

    await waitFor(() => {
      expect(screen.getByText('Added to cart!')).toBeInTheDocument()
    })
  })

  it('shows error feedback when add to cart fails', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    productApi.addToCart.mockRejectedValue(new Error('Server error'))
    const user = userEvent.setup()
    renderPDP()
    await waitFor(() => expect(screen.getByText('Add to cart')).toBeInTheDocument())

    await user.click(screen.getByText('Add to cart'))

    await waitFor(() => {
      expect(screen.getByText('Failed to add to cart. Please try again.')).toBeInTheDocument()
    })
  })
})
