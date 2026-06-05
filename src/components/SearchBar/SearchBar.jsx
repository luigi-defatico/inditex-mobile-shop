import styles from './SearchBar.module.css'

/**
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search by brand or model..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  )
}

export default SearchBar
