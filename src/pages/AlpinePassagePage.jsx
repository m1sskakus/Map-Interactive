import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlpineMap, AlpineMapLegend } from '../components/alpine/AlpineMap.jsx'
import { alpineLayers, alpineLocations, alpineRoutes, alpineSources } from '../data/alpinePassage.js'
import './AlpinePassagePage.css'

const sourceById = Object.fromEntries(alpineSources.map((source) => [source.id, source]))

function AlpinePassagePage() {
  const [activeLocation, setActiveLocation] = useState(alpineLocations[0])
  const [activeRoute, setActiveRoute] = useState(null)
  const [layers, setLayers] = useState({ mountains: true, settlements: true, passes: true, routes: true, rivers: true })
  const [discovered, setDiscovered] = useState([])

  function selectLocation(location) {
    setActiveLocation(location)
    setActiveRoute(null)
    setDiscovered((current) => current.includes(location.id) ? current : [...current, location.id])
  }

  function selectRoute(route) {
    setActiveRoute(route)
    setActiveLocation(null)
  }

  function resetSelection() {
    setActiveLocation(null)
    setActiveRoute(null)
  }

  function toggleLayer(layerId) {
    setLayers((current) => ({ ...current, [layerId]: !current[layerId] }))
  }

  const panelSources = activeLocation?.sourceIds || activeRoute?.sourceIds || []

  return <main className="alpine-page">
    <div className="alpine-topline page-wrap"><Link to="/place/innsbruck" className="back-to-atlas"><span aria-hidden="true">←</span> К главе Инсбрука</Link><span>ПОЛЕВОЙ АТЛАС <i>/</i> ТИРОЛЬ · 1519</span><Link to="/#atlas" className="alpine-atlas-link">К общему атласу ↗</Link></div>

    <header className="alpine-intro page-wrap">
      <div className="alpine-intro-copy"><p className="eyebrow"><span className="alpine-star" aria-hidden="true">✳</span> CARTA PASSVVM · EXPLORATIO</p><h1>Альпийский <em>проход</em></h1><p>Пересеките горы взглядом: проследите за долинами, реками и перевалами, связывавшими земли Тироля.</p><div className="alpine-motto"><span>ALPES · VIAE · HOMINES</span><i>Горы · пути · люди</i></div></div>
      <aside className="alpine-progress" aria-live="polite"><span>ЗНАКОМСТВО С РЕГИОНОМ</span><strong>{String(discovered.length).padStart(2, '0')} <i>/</i> {String(alpineLocations.length).padStart(2, '0')}</strong><small>мест открыто</small><div className="progress-track"><i style={{ width: (discovered.length / alpineLocations.length * 100) + '%' }}/></div></aside>
      <div className="alpine-intro-rule" aria-hidden="true"><i/><span>ANNO DOMINI MDXIX</span><i/></div>
    </header>

    <section className="alpine-exploration page-wrap" aria-labelledby="alpine-map-title">
      <div className="alpine-map-heading"><div><p className="eyebrow"><span>01</span> TABVLA GEOGRAPHICA</p><h2 id="alpine-map-title">Восточные Альпы <em>и их связи</em></h2></div><p>Нажмите на метку, путь или слой карты, чтобы увидеть, как устроен этот ландшафт.</p></div>
      <div className="alpine-explorer-grid">
        <div className="alpine-map-column">
          <figure className="alpine-map-figure"><AlpineMap selectedLocation={activeLocation} selectedRoute={activeRoute} layers={layers} onSelectLocation={selectLocation}/><figcaption><span>SCHEMATA REGIONIS TYROLIS</span><i>Схематическая карта · без государственных границ 1519 года</i></figcaption></figure>
          <AlpineMapLegend/>
          <nav className="alpine-location-index" aria-label="Выбрать место на карте"><span className="alpine-index-title">МЕСТА НА КАРТЕ</span>{alpineLocations.map((location,index)=><button type="button" className={activeLocation?.id===location.id?'is-active':''} key={location.id} onClick={()=>selectLocation(location)}><small>{String(index+1).padStart(2,'0')}</small>{location.name}</button>)}</nav>
        </div>

        <aside className="alpine-sidebar" aria-label="Управление картой и исторические заметки">
          <section className="alpine-layer-box" aria-labelledby="alpine-layer-heading"><div className="alpine-aside-heading"><span>LAYERS · TABVLA</span><h3 id="alpine-layer-heading">Слои карты</h3></div><div className="alpine-layer-list">{alpineLayers.map((layer)=><label className="alpine-layer-toggle" key={layer.id}><input type="checkbox" checked={layers[layer.id]} onChange={()=>toggleLayer(layer.id)}/><span className="layer-check" aria-hidden="true">{layer.symbol}</span><span>{layer.label}</span><i aria-hidden="true"/></label>)}</div><p className="alpine-layer-foot">Переключите слой — карта изменится сразу.</p></section>

          <section className="alpine-routes-box" aria-labelledby="alpine-routes-heading"><div className="alpine-aside-heading"><span>VIAE HISTORICAE</span><h3 id="alpine-routes-heading">Коридоры связи</h3></div><div className="alpine-route-options">{alpineRoutes.map((route,index)=><button type="button" key={route.id} onClick={()=>selectRoute(route)} aria-pressed={activeRoute?.id===route.id} className={'alpine-route-option route-'+route.color}><span className="route-number">0{index+1}</span><span><strong>{route.name}</strong><small>{route.short}</small></span><i aria-hidden="true">↗</i></button>)}</div><button type="button" className="alpine-reset" onClick={resetSelection}>Показать карту целиком <span aria-hidden="true">⤢</span></button></section>

          <section className="alpine-discovery-panel" aria-live="polite" aria-label="Информация о выбранном месте или пути">
            {activeLocation ? <><div className="alpine-detail-topline"><span>LOCVS · {activeLocation.historicName}</span><span>{String(alpineLocations.indexOf(activeLocation)+1).padStart(2,'0')} / 08</span></div><p className="alpine-detail-type">{activeLocation.type}</p><h3>{activeLocation.name}</h3><p className="alpine-detail-intro">{activeLocation.intro}</p><div className="alpine-detail-facts"><div><small>РЕЛЬЕФ И ПОЛОЖЕНИЕ</small><p>{activeLocation.geography}</p></div><div><small>СВЯЗЬ С ТИРОЛЕМ</small><p>{activeLocation.connection}</p></div><div><small>ИСТОРИЧЕСКАЯ ЗАМЕТКА</small><p>{activeLocation.context}</p></div></div></> : activeRoute ? <><div className="alpine-detail-topline"><span>VIA · {activeRoute.latinName}</span><span>КОРИДОР</span></div><p className="alpine-detail-type">ИСТОРИЧЕСКИЙ ПУТЬ СООБЩЕНИЯ</p><h3>{activeRoute.name}</h3><p className="alpine-route-endpoints">{activeRoute.short}</p><p className="alpine-detail-intro">{activeRoute.description}</p><div className="alpine-detail-facts"><div><small>КОНТЕКСТ И ОГОВОРКА</small><p>{activeRoute.context}</p></div></div></> : <div className="alpine-empty-state"><span aria-hidden="true">✳</span><h3>Выберите след на карте</h3><p>Метки покажут, где встречались долины, дороги и городская жизнь.</p></div>}
            {panelSources.length>0&&<div className="alpine-detail-sources"><small>ИСТОЧНИКИ</small>{panelSources.map((sourceId)=>{const source=sourceById[sourceId];return source&&<a href={source.url} key={source.id} target="_blank" rel="noreferrer">{source.title} <span aria-hidden="true">↗</span></a>})}</div>}
          </section>
        </aside>
      </div>
    </section>

    <section className="alpine-reading page-wrap"><div className="alpine-reading-number">II</div><div><p className="eyebrow">TRANSMONTANA · TRANSITVS</p><h2>Горы задавали <em>условия движения</em></h2></div><div className="alpine-reading-copy"><p>На карте Бреннерский коридор пересекает хребет, а река Инн собирает поселения в другой оси движения. Тироль связывал эти линии: долины давали проходы, но ущелья, высоты и вода влияли на то, где именно могли двигаться люди и грузы.</p><p>Кунтерсвег у Больцано обходил трудный участок Айзака через Риттен. Поэтому карта показывает широкие исторические коридоры, не пытаясь выдать современную линию за дорогу 1519 года.</p></div></section>

    <section className="alpine-sources"><div className="page-wrap alpine-sources-inner"><div><p className="eyebrow">APPARATUS FONTIVM</p><h2>Источники<br/><em>и картографические оговорки</em></h2><p>Современные географические названия помогают ориентироваться. Карта схематична, не показывает государственные границы 1519 года и не является точной реконструкцией дорожной сети.</p></div><ol>{alpineSources.map((source,index)=><li key={source.id}><span>{String(index+1).padStart(2,'0')}</span><div><a href={source.url} target="_blank" rel="noreferrer">{source.title} <i aria-hidden="true">↗</i></a><p>{source.note}</p></div></li>)}</ol></div></section>
    <div className="alpine-return page-wrap"><Link to="/place/innsbruck">← Вернуться к главе Инсбрука</Link><span>ALPES · TYROLIS · MDXIX</span></div>
  </main>
}

export default AlpinePassagePage
