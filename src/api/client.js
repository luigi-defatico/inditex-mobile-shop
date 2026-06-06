import { API_BASE_URL } from './config'

/**
 * Performs an HTTP GET request.
 * @param {string} path
 * @returns {Promise<any>}
 */
export async function get(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const error = new Error(`GET ${path} failed with status ${response.status}`)
    console.error(error)
    throw error
  }
  return response.json()
}

/**
 * Performs an HTTP POST request.
 * @param {string} path
 * @param {any} body
 * @returns {Promise<any>}
 */
export async function post(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const error = new Error(`POST ${path} failed with status ${response.status}`)
    console.error(error)
    throw error
  }
  return response.json()
}
