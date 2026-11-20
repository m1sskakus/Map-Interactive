import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import PlacePage from './pages/PlacePage.jsx'
import AtlasPage from './pages/AtlasPage.jsx'
import './App.css'

const AlpinePassagePage = lazy(() => import('./pages/AlpinePassagePage.jsx'))
const CoronationGame = lazy(() => import('./components/coronation/CoronationGame.jsx'))

function NotFoundPage() {
  return (
    <main className="not-found page-wrap">
      <span className="eyebrow">АТЛАС · 1519</span>
      <h1>Эта страница ещё не нанесена на карту</h1>
      <p>Вернитесь к атласу и выберите одно из отмеченных мест.</p>
      <Link className="text-link" to="/#atlas">Вернуться к карте <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

function App() {
  const location = useLocation()
  const isCoronationGame = location.pathname === '/aachen/coronation'

  useEffect(() => {
    if (location.pathname !== '/place/aachen' || !location.hash) return

    const targetId = decodeURIComponent(location.hash.slice(1))
    const target = document.getElementById(targetId)
    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [location.pathname, location.hash])

  return (
    <div className="site-shell">
      {!isCoronationGame && <SiteHeader />}
      <Routes>
        <Route path="/" element={<AtlasPage />} />
        <Route path="/alpine-passage" element={<Suspense fallback={<main className="not-found page-wrap"><span className="eyebrow">CARTA ALPINA</span><p>Разворачиваем карту…</p></main>}><AlpinePassagePage /></Suspense>} />
        <Route path="/aachen/coronation" element={<Suspense fallback={<main className="not-found page-wrap"><span className="eyebrow">CHRONICA AQUISGRANI</span><p>Разворачиваем рукопись…</p></main>}><CoronationGame /></Suspense>} />
        <Route path="/place/:slug" element={<PlacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isCoronationGame && <SiteFooter />}
    </div>
  )
}

export default App
