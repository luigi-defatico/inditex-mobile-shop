import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProducts } from './useProducts'
import * as productApi from '../api/productApi'

vi.mock('../api/productApi')

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: 999, imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: 799, imgUrl: '' },
]

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    const { result } = renderHook(() => useProducts())
    expect(result.current.status).toBe('loading')
  })

  it('sets products and success status on successful fetch', async () => {
    productApi.fetchProducts.mockResolvedValue(mockProducts)
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
  })

  it('sets error status on failed fetch', async () => {
    productApi.fetchProducts.mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('Network error')
    expect(result.current.products).toEqual([])
  })
})
