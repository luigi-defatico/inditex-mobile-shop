import { useState, useEffect } from 'react'

/**
 * Delays updating a value until after a specified delay.
 * @param {any} value
 * @param {number} delay - milliseconds
 * @returns {any}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
