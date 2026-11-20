import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EmpireMap from '../components/map/EmpireMap.jsx'
import { places } from '../data/places.js'

function AtlasPage() {
  const [selectedSlug, setSelectedSlug] = useState('frankfurt')
  const mapSectionRef = useRef(null)
  const selectedPlace = places.find((place) => place.slug === selectedSlug) || places[0]

  function goToMap() {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="intro-section page-wrap" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">✳</span> ИСТОРИЧЕСКИЙ АТЛАС <b>/</b> 1519</p>
          <h1 id="page-title">Across the <em>Empire</em></h1>
          <p className="intro-deck">Путешествие по Священной Римской империи — через города, дороги и повседневную жизнь эпохи Карла V.</p>
          <div className="intro-meta">
            <span className="meta-rule" aria-hidden="true" />
            <p>28 июня 1519 года князья-избиратели выбрали Карла V во Франкфурте.<br /><small>Один год. Пять мест. Множество историй.</small></p>
          </div>
          <button className="journey-button" type="button" onClick={goToMap}>
            <span>Начать путешествие</span><span className="journey-arrow" aria-hidden="true">↓</span>
          </button>
        </div>
        <div className="intro-art" aria-hidden="true">
          <svg viewBox="0 0 420 320" className="intro-engraving">
            <path d="M210 17c54 38 119 33 157 22-1 103-20 203-157 265C73 242 54 142 53 39c38 11 103 16 157-22Z" />
            <path d="M210 33c50 31 104 29 139 21-4 86-22 170-139 222C93 224 75 140 71 54c35 8 89 10 139-21Z" />
            <circle cx="210" cy="159" r="126" />
            <path d="M210 56v191M126 105l84 34 84-34M126 105v78l84 65 84-65v-78M147 129l63 28 63-28M147 129v45l63 50 63-50v-45" />
            <path d="m178 101 32-49 32 49-32 26-32-26ZM188 100h44M196 79h28M200 75v26m10-33v32m10-26v26" />
            <path d="M105 249c27 6 54 13 75 30M315 249c-27 6-54 13-75 30M58 63l-24-13m38 39L40 80m302-17 24-13m-38 39 23-9M152 276c20 12 39 19 58 25 19-6 38-13 58-25" />
            <text x="210" y="294" textAnchor="middle">ANNO DOMINI MDXIX</text>
          </svg>
          <div className="intro-stamp"><span>KAISER</span><strong>V</strong><small>1519</small></div>
          <span className="engraving-caption">SACRVM ROMANVM IMPERIVM</span>
        </div>
      </section>

      <section className="atlas-section page-wrap" id="atlas" ref={mapSectionRef} aria-labelledby="atlas-heading">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span className="section-number">I</span> CARTA IMPERII</p>
            <h2 id="atlas-heading">Откройте атлас</h2>
          </div>
          <p className="section-intro">Империя не была единым государством. Это мир городов, княжеств и торговых путей — выберите место, чтобы рассмотреть его ближе.</p>
        </div>

        <div className="atlas-layout">
          <div className="map-column">
            <EmpireMap selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            <div className="map-caption"><span>Карта Центральной Европы, около 1519 года</span><span>Территории и рельеф показаны условно</span></div>
          </div>

          <aside className="place-rail" aria-label="Исследование мест">
            <div className={'selected-place selected-' + selectedPlace.accent} aria-live="polite">
              <div className="selected-topline"><span>МЕСТО {selectedPlace.number} / 05</span><span className="selected-cross" aria-hidden="true">✳</span></div>
              <p className="selected-latin">{selectedPlace.latinName}</p>
              <h3>{selectedPlace.name}</h3>
              <p className="selected-theme">{selectedPlace.theme}</p>
              <p className="selected-description">{selectedPlace.short}</p>
              <Link className="selected-action" to={'/place/' + selectedPlace.slug}>
                <span>Исследовать место</span><span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="location-index">
              <div className="index-heading"><span>ПЯТЬ ОСТАНОВОК</span><span aria-hidden="true">✣</span></div>
              <ol>
                {places.map((place) => (
                  <li key={place.slug}>
                    <Link to={'/place/' + place.slug} className={'location-entry' + (place.slug === selectedSlug ? ' is-active' : '')} onFocus={() => setSelectedSlug(place.slug)} onMouseEnter={() => setSelectedSlug(place.slug)} aria-current={place.slug === selectedSlug ? 'location' : undefined}>
                      <span className="entry-number">{place.number}</span>
                      <span className="entry-copy"><strong>{place.name}</strong><small>{place.theme}</small></span>
                      <span className="entry-arrow" aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-strip" id="about">
        <div className="page-wrap about-inner">
          <div className="about-monogram" aria-hidden="true">M<br /><small>D</small></div>
          <div className="about-copy"><p className="eyebrow">О ПУТЕШЕСТВИИ</p><h2>История начинается <em>с места.</em></h2></div>
          <p>От политических решений до вещей в мастерской — атлас соберёт разные масштабы жизни в одном историческом ландшафте. Подробные главы городов и предметов появятся в следующих разделах проекта.</p>
          <a className="about-link" href="#atlas">Вернуться к карте <span aria-hidden="true">↑</span></a>
        </div>
      </section>
    </main>
  )
}

export default AtlasPage

