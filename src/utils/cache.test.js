import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getFromCache, setToCache } from './cache'

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null for missing keys', () => {
    expect(getFromCache('nonexistent')).toBeNull()
  })

  it('stores and retrieves data', () => {
    const data = { foo: 'bar' }
    setToCache('test', data)
    expect(getFromCache('test')).toEqual(data)
  })

  it('returns null for expired entries', () => {
    setToCache('test', { foo: 'bar' })
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 60 * 60 * 1000 + 1)
    expect(getFromCache('test')).toBeNull()
    vi.restoreAllMocks()
  })

  it('removes expired entries from localStorage', () => {
    setToCache('test', { foo: 'bar' })
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 60 * 60 * 1000 + 1)
    getFromCache('test')
    vi.restoreAllMocks()
    expect(localStorage.getItem('test')).toBeNull()
  })
})
