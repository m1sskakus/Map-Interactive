import { alpineLocations, alpineRoutes, alpineMapNotes } from '../../data/alpinePassage.js'
import './AlpineMap.css'

function MapMarker({ item, selected, onSelect, onRoute }) {
  const inSelectedRoute = onRoute?.locationIds.includes(item.id)
  const routeMode = Boolean(onRoute)
  return <button
    type="button"
    className={'alpine-marker marker-' + item.layer + ' label-' + item.label + (selected ? ' is-selected' : '') + (routeMode && inSelectedRoute ? ' is-on-route' : '')}
    style={{ left: (item.x / 10) + '%', top: (item.y / 7.4) + '%' }}
    aria-pressed={selected}
    aria-label={item.name + ', ' + item.type + '. Открыть описание.'}
    onClick={() => onSelect(item)}
  >
    <span className="marker-core" aria-hidden="true" />
    <span className="marker-label"><strong>{item.name}</strong><small>{item.historicName}</small></span>
  </button>
}

function TerrainArtwork({ layers, activeRoute }) {
  return <svg className="alpine-terrain" viewBox="0 0 1000 740" aria-hidden="true" preserveAspectRatio="none">
    <defs>
      <linearGradient id="alpine-paper" x1="0" y1="0" x2="0.9" y2="1"><stop stopColor="#e9ddbf"/><stop offset=".48" stopColor="#d9cda9"/><stop offset="1" stopColor="#c8bc99"/></linearGradient>
      <linearGradient id="alpine-slope" x1="0" y1="0" x2="0.2" y2="1"><stop stopColor="#75806b"/><stop offset="1" stopColor="#435547"/></linearGradient>
      <pattern id="alpine-grain" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 4h3m7 10h2M15 2h1M4 17h2" stroke="#685940" strokeOpacity=".17" strokeWidth="1"/></pattern>
      <pattern id="alpine-hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M-4 12 12-4M2 16 16 2" stroke="#314237" strokeOpacity=".26" strokeWidth="1"/></pattern>
      <filter id="alpine-shadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <rect width="1000" height="740" fill="url(#alpine-paper)"/>
    <path d="M0 260q132-37 236 12t218-4 259 13 287-10v469H0Z" fill="#b4b396" opacity=".38"/>
    <path d="M0 475q180-56 336 15t305-12 359 10v252H0Z" fill="#b1a785" opacity=".34"/>
    {layers.mountains && <g className="mountain-layer">
      <path d="M-20 285 86 128l60 73 102-159 97 160 67-103 114 174 99-122 93 131 87-108 135 134v253H-20Z" fill="#918e78" opacity=".68"/>
      <path d="M25 201 86 128l30 39 30 34-56-17-53 26m120-58 102-159 37 62 60 98-81-48-77 25m123 37 67-103 40 63 74 111-87-56-82 27m193 0 99-122 43 59 50 72-83-38-66 37m153-46 87-108 49 69 86 93-86-48-69 18" fill="#dfd2b1"/>
      <path d="M-20 285 86 128l60 73 102-159 97 160 67-103 114 174 99-122 93 131 87-108 135 134v253H-20Z" fill="url(#alpine-hatch)" opacity=".56"/>
      <path d="m0 357 111-83 81 64 98-104 107 110 107-88 118 97 105-115 79 79 105-82" fill="none" stroke="#596856" strokeWidth="2" opacity=".72"/>
      <path d="m0 391 111-83 81 64 98-104 107 110 107-88 118 97 105-115 79 79 105-82" fill="none" stroke="#746d56" strokeWidth="1" opacity=".65"/>
      <path d="M0 440q140-38 258 13t248-3 236 12 258-15" fill="none" stroke="#6d715b" strokeWidth="3" opacity=".42"/>
      <g fill="#564e3d" fontFamily="var(--serif)" fontSize="14" letterSpacing="3"><text x="92" y="174">NORDKETTE</text><text x="690" y="248">KARWENDEL</text><text x="92" y="525">STUBAIER ALPEN</text><text x="716" y="493">ZILLERTALER ALPEN</text></g>
    </g>}
    {layers.rivers && <g className="water-layer">
      <path d="M62 349q102-35 174-7t151 3q81 0 142 11t114-13q83-24 177-7t190 8" fill="none" stroke="#718987" strokeWidth="17" opacity=".72"/>
      <path d="M62 349q102-35 174-7t151 3q81 0 142 11t114-13q83-24 177-7t190 8" fill="none" stroke="#e2ddc4" strokeWidth="2" opacity=".8"/>
      <path d="M482 501q26 42 16 86t-1 64q-1 43-32 89" fill="none" stroke="#7a9087" strokeWidth="13" opacity=".7"/>
      <path d="M482 501q26 42 16 86t-1 64q-1 43-32 89" fill="none" stroke="#e4ddc4" strokeWidth="2" opacity=".86"/>
      <text x="180" y="328" className="river-label">OENVS · РЕКА ИНН</text><text x="506" y="649" className="river-label river-south">EISACK · АЙЗАК</text>
      <path d="M447 371q-28 23-29 57t-4 78q30-19 37-54t-4-81Z" fill="#89937c" opacity=".38"/>
      <path d="M492 583q33-31 72-27t67 1q-19 34-60 42t-79-16Z" fill="#89937c" opacity=".4"/>
    </g>}
    {layers.routes && <g className="route-layer">
      {alpineRoutes.map((route) => <g key={route.id} className={'svg-route svg-route-' + route.color + (activeRoute?.id === route.id ? ' route-active' : activeRoute ? ' route-muted' : '')}>
        <path className="route-halo" d={route.path}/><path className="route-stroke" d={route.path}/>
      </g>)}
    </g>}
    <path className="map-distance-ribbon" d="M35 604q126-32 243 1t228 0 237-8 222 2"/>
    <g className="map-cartouche"><path d="M706 45h250v70H706z"/><path d="M714 53h234v54H714z"/><text x="831" y="78" textAnchor="middle">TYROLIS · 1519</text><text x="831" y="96" textAnchor="middle">SCHEMA REGIONIS ALPINAE</text></g>
    <g className="map-compass" transform="translate(86 98)"><circle r="34"/><circle r="27"/><path d="M0-21 6 0 0 21-6 0Zm-21 0 21 6 21-6-21-6Z"/><text x="0" y="-42" textAnchor="middle">N</text></g>
    <g className="map-scale" transform="translate(783 676)"><path d="M0 0h110m-110-5v10m55-7v7m55-10v10"/><text x="0" y="20">СКЕМАТИЧЕСКОЕ ИЗОБРАЖЕНИЕ · НЕ В МАСШТАБЕ</text></g>
    <rect width="1000" height="740" fill="url(#alpine-grain)" opacity=".36"/>
    <path d="M13 13h974v714H13z" fill="none" stroke="#51432f" strokeWidth="7"/><path d="M27 27h946v686H27z" fill="none" stroke="#a38650" strokeWidth="1.5"/>
    <rect x="5" y="5" width="990" height="730" fill="none" stroke="#473c2e" strokeWidth="2" strokeDasharray="2 8"/>
  </svg>
}

function AlpineMap({ selectedLocation, selectedRoute, layers, onSelectLocation }) {
  return <div className="alpine-map" aria-label="Интерактивная карта альпийского региона">
    <TerrainArtwork layers={layers} activeRoute={selectedRoute}/>
    <div className="map-edge-note map-edge-north">NORD · ИННТАЛЬ</div><div className="map-edge-note map-edge-south">SÜD · EISACKTAL</div>
    {alpineLocations.filter((item) => layers[item.layer]).map((item) => <MapMarker key={item.id} item={item} selected={selectedLocation?.id === item.id} onSelect={onSelectLocation} onRoute={selectedRoute}/>)}
    {!layers.routes && <div className="map-layer-notice">Слой путей скрыт</div>}
  </div>
}

function AlpineMapLegend() {
  return <p className="alpine-map-note"><span aria-hidden="true">✳</span> {alpineMapNotes.geography} {alpineMapNotes.routes}</p>
}

export { AlpineMap, AlpineMapLegend }
