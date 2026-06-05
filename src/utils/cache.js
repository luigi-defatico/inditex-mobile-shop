const TTL = 60 * 60 * 1000 // 1 hour in milliseconds

/**
 * Retrieves a cached value if it exists and has not expired.
 * @param {string} key
 * @returns {any | null}
 */
export function getFromCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > TTL) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

/**
 * Stores a value in the cache with the current timestamp.
 * @param {string} key
 * @param {any} data
 */
export function setToCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // localStorage might be unavailable in some environments
  }
}
