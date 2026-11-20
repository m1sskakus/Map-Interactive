import { Link, useParams } from 'react-router-dom'
import FrankfurtPage from './FrankfurtPage.jsx'
import AugsburgPage from './AugsburgPage.jsx'
import NurembergPage from './NurembergPage.jsx'
import InnsbruckPage from './InnsbruckPage.jsx'
import AachenPage from './AachenPage.jsx'
import { places } from '../data/places.js'

function PlacePage() {
  const { slug } = useParams()
  const place = places.find((item) => item.slug === slug)

  if (!place) {
    return (
      <main className="not-found page-wrap">
        <span className="eyebrow">АТЛАС · 1519</span>
        <h1>Это место не найдено</h1>
        <p>Вернитесь к карте и выберите одну из отмеченных точек.</p>
        <Link className="text-link" to="/#atlas">Вернуться к атласу <span aria-hidden="true">↗</span></Link>
      </main>
    )
  }

  if (slug === 'frankfurt') return <FrankfurtPage />
  if (slug === 'augsburg') return <AugsburgPage />
  if (slug === 'nuremberg') return <NurembergPage />
  if (slug === 'innsbruck') return <InnsbruckPage />
  if (slug === 'aachen') return <AachenPage />

  return (
    <main className="future-place page-wrap">
      <Link className="back-to-atlas" to="/#atlas"><span aria-hidden="true">←</span> Назад к атласу</Link>
      <p className="eyebrow">ГЛАВА {place.number} · {place.latinName}</p>
      <h1>{place.name}</h1>
      <p className="future-place-theme">{place.theme}</p>
      <p>{place.short}</p>
      <div className="future-note"><span aria-hidden="true">✳</span><p>Подробная глава этого города появится в следующем этапе проекта. Метка на атласе и маршрут уже работают.</p></div>
      <Link className="text-link" to="/#atlas">Продолжить путешествие по карте <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

export default PlacePage
