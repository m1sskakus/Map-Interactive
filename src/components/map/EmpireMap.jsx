import { Link } from 'react-router-dom'
import { places } from '../../data/places.js'

const mountainPeaks = [
  [384, 442, 0.74], [427, 449, 0.87], [476, 443, 1.02], [531, 448, 0.96], [585, 440, 0.84], [635, 445, 0.72],
]

function MapArtwork() {
  return (
    <svg className="map-artwork" viewBox="0 0 960 620" role="img" aria-labelledby="map-title map-description" preserveAspectRatio="xMidYMid meet">
      <title id="map-title">Атлас Центральной Европы, около 1519 года</title>
      <desc id="map-description">Стилизованная карта с реками Рейн и Дунай, Альпами, горными массивами и пятью отмеченными городами. Границы условны.</desc>
      <defs>
        <pattern id="water-lines" width="26" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 6c6-3 12 3 19 0M-8 18c7-3 13 3 20 0M15 28c7-3 13 3 20 0" fill="none" stroke="#526d64" strokeOpacity=".15" strokeWidth=".8" />
        </pattern>
        <pattern id="paper-grain" width="95" height="95" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="21" r=".7" fill="#4d412e" opacity=".16" />
          <circle cx="63" cy="48" r=".6" fill="#4d412e" opacity=".13" />
          <circle cx="31" cy="82" r=".7" fill="#4d412e" opacity=".12" />
          <path d="M17 61h12m34-43h8m-3 59h12" stroke="#786748" strokeOpacity=".12" strokeWidth=".8" />
        </pattern>
        <filter id="land-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
          <feOffset dy="7" />
          <feComponentTransfer><feFuncA type="linear" slope=".24" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="land-clip">
          <path d="M114 124l24-30 39-10 24-22 42 9 32-16 37 15 29-18 34 18 36-10 34 21 31-16 39 13 39-16 34 12 31-19 37 18 38-4 30 23 31-2 27 23 39-3 26 28-10 28 24 21-18 26 22 22-12 26 19 22-20 30 10 29-18 24 8 28-28 19-2 28-27 18-8 28-30 8-23 22-33-7-23 17-31-11-26 17-33-14-31 5-28-18-30 7-32-24-29 3-22-22-28 5-25-19-29 1-23-23-29-3-17-27-30-7-9-28-25-10-5-28-23-18 4-27-23-17 10-29-20-19 8-29-21-18 9-24-22-10 15-20z" />
        </clipPath>
      </defs>

      <rect width="960" height="620" fill="#aab8aa" />
      <rect width="960" height="620" fill="url(#water-lines)" />
      <path d="M0 526c104-25 180 20 286 2 123-21 200-39 327-6 117 31 229 15 347-10" fill="none" stroke="#6d8178" strokeOpacity=".25" strokeWidth="2" />
      <path d="M20 111c55-16 108-16 148-2M15 129c58-16 104-15 140-1M790 548c48-11 94-8 144 4" fill="none" stroke="#6d8178" strokeOpacity=".23" strokeWidth="1.2" />

      <path d="M114 124l24-30 39-10 24-22 42 9 32-16 37 15 29-18 34 18 36-10 34 21 31-16 39 13 39-16 34 12 31-19 37 18 38-4 30 23 31-2 27 23 39-3 26 28-10 28 24 21-18 26 22 22-12 26 19 22-20 30 10 29-18 24 8 28-28 19-2 28-27 18-8 28-30 8-23 22-33-7-23 17-31-11-26 17-33-14-31 5-28-18-30 7-32-24-29 3-22-22-28 5-25-19-29 1-23-23-29-3-17-27-30-7-9-28-25-10-5-28-23-18 4-27-23-17 10-29-20-19 8-29-21-18 9-24-22-10 15-20z" className="continent-shadow" filter="url(#land-shadow)" />
      <path d="M114 124l24-30 39-10 24-22 42 9 32-16 37 15 29-18 34 18 36-10 34 21 31-16 39 13 39-16 34 12 31-19 37 18 38-4 30 23 31-2 27 23 39-3 26 28-10 28 24 21-18 26 22 22-12 26 19 22-20 30 10 29-18 24 8 28-28 19-2 28-27 18-8 28-30 8-23 22-33-7-23 17-31-11-26 17-33-14-31 5-28-18-30 7-32-24-29 3-22-22-28 5-25-19-29 1-23-23-29-3-17-27-30-7-9-28-25-10-5-28-23-18 4-27-23-17 10-29-20-19 8-29-21-18 9-24-22-10 15-20z" className="continent" />
      <path d="M114 124l24-30 39-10 24-22 42 9 32-16 37 15 29-18 34 18 36-10 34 21 31-16 39 13 39-16 34 12 31-19 37 18 38-4 30 23 31-2 27 23 39-3 26 28-10 28 24 21-18 26 22 22-12 26 19 22-20 30 10 29-18 24 8 28-28 19-2 28-27 18-8 28-30 8-23 22-33-7-23 17-31-11-26 17-33-14-31 5-28-18-30 7-32-24-29 3-22-22-28 5-25-19-29 1-23-23-29-3-17-27-30-7-9-28-25-10-5-28-23-18 4-27-23-17 10-29-20-19 8-29-21-18 9-24-22-10 15-20z" className="continent-outline" />
      <path d="M114 124l24-30 39-10 24-22 42 9 32-16 37 15 29-18 34 18 36-10 34 21 31-16 39 13 39-16 34 12 31-19 37 18 38-4 30 23 31-2 27 23 39-3 26 28-10 28 24 21-18 26 22 22-12 26 19 22-20 30 10 29-18 24 8 28-28 19-2 28-27 18-8 28-30 8-23 22-33-7-23 17-31-11-26 17-33-14-31 5-28-18-30 7-32-24-29 3-22-22-28 5-25-19-29 1-23-23-29-3-17-27-30-7-9-28-25-10-5-28-23-18 4-27-23-17 10-29-20-19 8-29-21-18 9-24-22-10 15-20z" fill="url(#paper-grain)" />

      <g clipPath="url(#land-clip)">
        <path d="M119 171c71-36 112-8 159 14 47 23 83 14 127 0s87-19 135 10 83 32 130 9 100-26 170 5" className="territory-line" />
        <path d="M163 304c62-43 106-23 152 2 47 25 88 14 130 33 45 21 77 19 117-4 48-28 88-12 132 17s95 27 149-1" className="territory-line" />
        <path d="M262 69c-14 59 16 97 3 146s2 82 36 118 17 79 47 116m72-382c-17 58 3 105 19 146s6 82 30 126 20 95 3 148m151-416c-29 58-15 98 11 131s-7 80 11 121 4 80 24 127m142-395c-31 55-19 94-2 125s-16 69 4 103-3 77-17 140" className="territory-line fine" />
        <path d="M408 440c-11-44-22-74-18-109s-10-59-17-88 12-54 20-79 5-49 22-75" className="river-main" />
        <path d="M408 440c-11-44-22-74-18-109s-10-59-17-88 12-54 20-79 5-49 22-75" className="river-highlight" />
        <path d="M395 333c-33-10-49-28-73-46s-42-29-70-33" className="river-main tributary" />
        <path d="M395 333c-33-10-49-28-73-46s-42-29-70-33" className="river-highlight tributary" />
        <path d="M416 407c50 1 73-23 115-20s60-17 91-12 58-7 89-30 62-14 101-26" className="river-main" />
        <path d="M416 407c50 1 73-23 115-20s60-17 91-12 58-7 89-30 62-14 101-26" className="river-highlight" />
        <path d="M493 476c22-20 34-41 49-64" className="river-main tributary" />
        <path d="M493 476c22-20 34-41 49-64" className="river-highlight tributary" />
        <path d="M171 235c37-17 62-19 98-8m68-48c19-15 39-23 60-23m75 67c33-18 62-18 92-4m65 94c28-17 48-17 72-7m-432 52c30-17 53-15 79-5" className="road-line" />
      </g>

      <g className="alps-relief" aria-hidden="true">
        {mountainPeaks.map(([x, y, scale]) => (
          <g key={x} transform={'translate(' + x + ' ' + y + ') scale(' + scale + ')'}>
            <path d="M0 35 19 1 33 23 46 5 68 35Z" className="mountain-shadow" />
            <path d="m19 1 8 16-8-5-8 13Zm27 4 7 14-8-4-8 13Z" className="mountain-snow" />
            <path d="M0 35 19 1 33 23 46 5 68 35" className="mountain-line" />
            <path d="m5 29 11-3m19-5 8 7m8-2 9 3" className="mountain-hatch" />
          </g>
        ))}
      </g>
      <g className="ridge-relief" aria-hidden="true">
        <path d="m609 244 13-26 8 13 12-28 9 18 13-24 8 24 11-11 11 29m-344 99 11-25 8 15 8-23 9 25m366-10 12-24 9 13 10-21 9 27" />
      </g>
      <g className="forest-relief" aria-hidden="true">
        <path d="m218 308 8-17 8 17h-5l6 9h-18l6-9Zm20 5 8-17 8 17h-5l6 9h-18l6-9Zm18-12 8-17 8 17h-5l6 9h-18l6-9Zm420-117 8-17 8 17h-5l6 9h-18l6-9Zm20 8 8-17 8 17h-5l6 9h-18l6-9Zm22-8 8-17 8 17h-5l6 9h-18l6-9Zm36 176 8-17 8 17h-5l6 9h-18l6-9Zm19 6 8-17 8 17h-5l6 9h-18l6-9Z" />
      </g>

      <text x="270" y="392" className="map-region-label">SVEVIA</text>
      <text x="530" y="193" className="map-region-label">FRANCIA ORIENTALIS</text>
      <text x="677" y="383" className="map-region-label">NORICVM</text>
      <text x="517" y="496" className="map-water-label">ALPES</text>
      <text x="335" y="268" className="map-river-label">RHENVS</text>
      <text x="628" y="393" className="map-river-label">DANVBIVS</text>
      <text x="291" y="188" className="map-land-label">SACRVM ROMANVM IMPERIVM</text>

      <g className="compass-rose" transform="translate(829 153)" aria-hidden="true">
        <circle r="49" /><circle r="42" className="compass-inner" />
        <path d="M0-35 7-5 0 0-7-5ZM35 0 5 7 0 0 5-7ZM0 35-7 5 0 0 7 5ZM-35 0-5-7 0 0-5 7Z" className="compass-points" />
        <path d="M0-25 5 0 0 25-5 0Z" className="compass-star" />
        <circle r="4" className="compass-center" />
        <text x="0" y="-57" textAnchor="middle">N</text><text x="0" y="66" textAnchor="middle">S</text>
        <text x="-58" y="4" textAnchor="middle">W</text><text x="58" y="4" textAnchor="middle">E</text>
      </g>
      <g className="map-scale" transform="translate(82 526)" aria-hidden="true">
        <path d="M0 0h104M0-5v10m34-7v7m35-7v7m35-10v10" />
        <text x="0" y="22">0</text><text x="96" y="22">100 MILIA</text>
      </g>
      <g className="map-cartouche" transform="translate(766 494)" aria-hidden="true">
        <path d="M0 0h119v55H0zM8 7h103v41H8z" />
        <text x="59" y="24" textAnchor="middle">TABVLA</text><text x="59" y="41" textAnchor="middle">1519</text>
      </g>
      <path d="M17 18h926v584H17z" className="map-frame-outer" />
      <path d="M27 28h906v564H27z" className="map-frame-inner" />
      <path d="M34 35h892v550H34z" className="map-frame-light" />
      <path d="M34 79V35h44m804 0h44v44M34 541v44h44m804 0h44v-44" className="map-corners" />
    </svg>
  )
}

function MapMarker({ place, isSelected, onSelect }) {
  const style = { left: (place.x / 960 * 100) + '%', top: (place.y / 620 * 100) + '%' }
  return (
    <Link
      className={'map-marker marker-' + place.accent + ' label-' + place.label + (isSelected ? ' is-selected' : '')}
      style={style}
      to={'/place/' + place.slug}
      onFocus={() => onSelect(place.slug)}
      onMouseEnter={() => onSelect(place.slug)}
      aria-current={isSelected ? 'location' : undefined}
      aria-label={place.name + ': ' + place.theme + '. ' + place.short + ' Открыть главу.'}
    >
      <span className="marker-halo" aria-hidden="true" />
      <span className="marker-dot" aria-hidden="true"><i /></span>
      <span className="marker-label"><strong>{place.name}</strong><small>{place.latinName}</small></span>
    </Link>
  )
}

function EmpireMap({ selectedSlug, onSelect }) {
  return (
    <div className="atlas-map">
      <MapArtwork />
      <span className="map-top-note" aria-hidden="true">TABVLA · GERMANIA · 1519</span>
      <span className="map-bottom-note" aria-hidden="true">INTERPRETATIO CARTOGRAPHICA · NON AD MENSVRAM</span>
      <div className="map-markers" aria-label="Города, отмеченные на карте">
        {places.map((place) => (
          <MapMarker key={place.slug} place={place} isSelected={selectedSlug === place.slug} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

export default EmpireMap

