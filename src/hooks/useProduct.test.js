import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProduct } from './useProduct'
import * as productApi from '../api/productApi'

vi.mock('../api/productApi')

const mockProduct = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: 999,
  imgUrl: '',
  options: { colors: [{ code: 1, name: 'Black' }], storages: [{ code: 1, name: '128GB' }] },
}

describe('useProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    const { result } = renderHook(() => useProduct('1'))
    expect(result.current.status).toBe('loading')
  })

  it('sets product and success status on successful fetch', async () => {
    productApi.fetchProduct.mockResolvedValue(mockProduct)
    const { result } = renderHook(() => useProduct('1'))
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.product).toEqual(mockProduct)
    expect(result.current.error).toBeNull()
  })

  it('sets error status on failed fetch', async () => {
    productApi.fetchProduct.mockRejectedValue(new Error('Not found'))
    const { result } = renderHook(() => useProduct('1'))
    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('Not found')
    expect(result.current.product).toBeNull()
  })

  it('does not fetch when id is not provided', () => {
    const { result } = renderHook(() => useProduct(null))
    expect(result.current.status).toBe('idle')
    expect(productApi.fetchProduct).not.toHaveBeenCalled()
  })
})
