import { describe, it, expect } from 'vitest'
import { filterProducts } from './filterProducts'

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: 999, imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: 799, imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: 799, imgUrl: '' },
]

describe('filterProducts', () => {
  it('returns all products for empty query', () => {
    expect(filterProducts(mockProducts, '')).toHaveLength(3)
  })

  it('filters by brand (case insensitive)', () => {
    const result = filterProducts(mockProducts, 'apple')
    expect(result).toHaveLength(2)
    expect(result.every((p) => p.brand === 'Apple')).toBe(true)
  })

  it('filters by model', () => {
    const result = filterProducts(mockProducts, 'galaxy')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns empty array when no match', () => {
    expect(filterProducts(mockProducts, 'Nokia')).toHaveLength(0)
  })

  it('trims whitespace from query', () => {
    expect(filterProducts(mockProducts, '  apple  ')).toHaveLength(2)
  })
})
