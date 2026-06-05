import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import PLP from './pages/PLP/PLP'
import PDP from './pages/PDP/PDP'
import NotFound from './pages/NotFound/NotFound'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<PLP />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
