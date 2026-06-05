import { get, post } from './client'
import { getFromCache, setToCache } from '../utils/cache'

const CACHE_KEYS = {
  products: 'cache:products',
  product: (id) => `cache:product:${id}`,
}

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {string} imgUrl
 */

/**
 * @typedef {Object} StorageOption
 * @property {number} code
 * @property {string} name
 */

/**
 * @typedef {Object} ColorOption
 * @property {number} code
 * @property {string} name
 */

/**
 * @typedef {Object} ProductDetail
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {string} cpu
 * @property {string} ram
 * @property {string} os
 * @property {string} displayResolution
 * @property {string} battery
 * @property {string} primaryCamera
 * @property {string} secondaryCmera
 * @property {string} dimentions
 * @property {string} weight
 * @property {{ storages: StorageOption[], colors: ColorOption[] }} options
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {number} colorCode
 * @property {number} storageCode
 */

/**
 * Fetches the list of all products. Uses cache if available.
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts() {
  const cached = getFromCache(CACHE_KEYS.products)
  if (cached) return cached
  const data = await get('/api/product')
  setToCache(CACHE_KEYS.products, data)
  return data
}

/**
 * Fetches the detail of a single product. Uses cache if available.
 * @param {string} id
 * @returns {Promise<ProductDetail>}
 */
export async function fetchProduct(id) {
  const cached = getFromCache(CACHE_KEYS.product(id))
  if (cached) return cached
  const data = await get(`/api/product/${id}`)
  setToCache(CACHE_KEYS.product(id), data)
  return data
}

/**
 * Adds a product to the cart.
 * @param {CartItem} item
 * @returns {Promise<{ count: number }>}
 */
export async function addToCart({ id, colorCode, storageCode }) {
  return post('/api/cart', { id, colorCode, storageCode })
}
