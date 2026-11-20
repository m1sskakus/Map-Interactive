import { useRef, useState } from 'react'
import './CityExplorer.css'

const locations = [
  {
    id: 'castle', number: '01', name: 'Нюрнбергский замок', shortName: 'Замок', type: 'ВЛАСТЬ · ИМПЕРИЯ',
    x: 47, y: 12, groups: ['power', 'defence'], related: ['walls', 'market'],
    intro: 'На северной высоте замок обозначал присутствие королевской власти над вольным имперским городом.',
    story: 'Нюрнберг был тесно связан с императорами и королями, а привилегии монархов помогли росту города. В 1519 году замок был знаком имперского статуса; это не означает, что Карл V постоянно жил здесь.',
    detail: 'Что увидеть: замок и городской совет были разными центрами власти — имперской и городской.'
  },
  {
    id: 'sebald', number: '02', name: 'Церковь Святого Зебальда', shortName: 'Св. Зебальд', type: 'ВЕРА · СЕВЕРНЫЙ ГОРОД',
    x: 38, y: 31, groups: ['faith', 'public'], related: ['market', 'river'],
    intro: 'Старая приходская церковь была духовным ориентиром северной части города.',
    story: 'Святой Зебальд — старейшая приходская церковь Нюрнберга. Приход объединял религиозную жизнь и повседневность горожан; крупное здание и его произведения искусства отражали долгую историю общины.',
    detail: 'В 1519 году город оставался католическим. Реформация в Нюрнберге началась позднее, в 1525 году.'
  },
  {
    id: 'market', number: '03', name: 'Главный рынок · Hauptmarkt', shortName: 'Hauptmarkt', type: 'ТОРГОВЛЯ · ПАМЯТЬ',
    x: 58, y: 38, groups: ['trade', 'public', 'power'], related: ['castle', 'sebald', 'hospital'],
    intro: 'Площадь была местом торговли и публичных событий, но её история включает насилие.',
    story: 'Главный рынок устроили примерно с 1350 года на месте уничтоженного еврейского квартала. Погром 1349 года предшествовал созданию площади и Frauenkirche. В XVI веке рынок служил обмену и городской жизни; его прошлое нельзя отделить от судьбы еврейской общины.',
    detail: 'Позднейшие здания вокруг площади менялись. План показывает только её примерное место, а не подтверждённые фасады 1519 года.'
  },
  {
    id: 'river', number: '04', name: 'Пегниц и переправы', shortName: 'Пегниц', type: 'РЕКА · ГОРОДСКИЕ СВЯЗИ',
    x: 27, y: 54, groups: ['movement', 'trade', 'public'], related: ['hospital', 'sebald', 'lorenz'],
    intro: 'Пегниц пересекала старый город и делила его на северную и южную части.',
    story: 'Река, острова и мосты задавали городскую географию. Переправы связывали районы по обе стороны воды и делали реку частью повседневного движения. Линия реки на этой схеме условная.',
    detail: 'Не всякий мост, который виден сегодня, существовал в таком же виде в 1519 году.'
  },
  {
    id: 'hospital', number: '05', name: 'Госпиталь Святого Духа', shortName: 'Госпиталь', type: 'ЗАБОТА · ГОРОДСКОЕ УПРАВЛЕНИЕ',
    x: 68, y: 55, groups: ['care', 'faith', 'public'], related: ['river', 'market', 'lorenz'],
    intro: 'Основанный патрицием госпиталь поддерживал нуждающихся и был крупным городским учреждением.',
    story: 'Конрад Гросс основал Госпиталь Святого Духа в 1339 году; учреждением управлял городской совет. Оно предназначалось для пожилых и нуждающихся. В начале XVI века комплекс расширяли над Пегницем под руководством Ганса Бехайма Старшего.',
    detail: 'Это пример того, как частное пожертвование становилось частью городской системы попечения.'
  },
  {
    id: 'lorenz', number: '06', name: 'Церковь Святого Лоренца', shortName: 'Св. Лоренц', type: 'ВЕРА · ЮЖНЫЙ ГОРОД',
    x: 52, y: 75, groups: ['faith', 'public'], related: ['river', 'hospital', 'walls'],
    intro: 'Монументальная приходская церковь формировала южную часть города и её общественную жизнь.',
    story: 'Здание возводили с XIII века; хор создавался с 1439 года, а строительные работы продолжались до 1477-го. В 1519 году церковь была важным ориентиром южного городского прихода и свидетельством художественных амбиций Нюрнберга.',
    detail: 'Нынешний облик складывался постепенно; схематичный силуэт на карте не передаёт точный вид здания в конкретный год.'
  },
  {
    id: 'walls', number: '07', name: 'Стены и городские ворота', shortName: 'Стены', type: 'ЗАЩИТА · ДОСТУП',
    x: 83, y: 32, groups: ['defence', 'power', 'movement'], related: ['castle', 'lorenz'],
    intro: 'Укрепления очерчивали пределы города и направляли вход и выход через ворота.',
    story: 'Последнее кольцо городских укреплений было завершено в 1452 году. Стены обозначали границу Нюрнберга и требовали постоянной заботы; ворота связывали город с дорогами и окрестностями.',
    detail: 'На схеме показан условный контур, а не точное положение башен и ворот.'
  },
]

const connectionLabels = {
  trade: 'торговля', craft: 'ремесло и производство', faith: 'религиозная жизнь', care: 'попечение',
  public: 'общественная жизнь', power: 'власть', defence: 'оборона', movement: 'передвижение',
}

function CityPlan({ selectedId, relatedIds, onSelect }) {
  const markerRefs = useRef([])
  const activeIndex = locations.findIndex((item) => item.id === selectedId)

  function moveFocus(event, index) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? locations.length - 1
      : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + locations.length) % locations.length
    markerRefs.current[next]?.focus()
  }

  return <div className="city-plan-frame">
    <svg className="city-plan-art" viewBox="0 0 900 650" role="img" aria-labelledby="city-plan-title city-plan-desc">
      <title id="city-plan-title">Иллюстративный план Нюрнберга около 1519 года</title>
      <desc id="city-plan-desc">Схематичный вид с северным замком, укреплённым городом, рекой Пегниц и городскими кварталами. Точная планировка не реконструируется.</desc>
      <defs>
        <pattern id="city-parchment" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M0 7h28M6 0v28" stroke="#785f3d" strokeOpacity=".08" strokeWidth="1"/><circle cx="19" cy="19" r=".8" fill="#735c3b" opacity=".15"/></pattern>
        <pattern id="city-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0v9" stroke="#533f2d" strokeOpacity=".18" strokeWidth="2"/></pattern>
        <filter id="city-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#352a1d" floodOpacity=".2"/></filter>
      </defs>
      <rect width="900" height="650" rx="3" fill="#d4c49f"/><rect width="900" height="650" fill="url(#city-parchment)"/>
      <path d="M86 125 166 62l566 18 98 95-17 314-111 84-520-15-95-95Z" fill="#ae9c76" stroke="#554633" strokeWidth="11"/>
      <path d="m108 139 74-55 539 16 87 82-16 287-101 73-491-15-74-75Z" fill="#e4d6b7" stroke="#6b5538" strokeWidth="3" strokeDasharray="5 5"/>
      <path d="M82 128 166 62l48 2-91 78Zm648-48 58 58-3 47-86-85ZM83 463l73 76 44 2-88-90Zm645 136 101-73 1-46-106 77Z" fill="url(#city-hatch)" opacity=".8"/>
      <g fill="none" stroke="#8a7758" strokeWidth="2" opacity=".8">
        <path d="m194 151 101 57 76-75m-61 108 64 40 74-36m-240 43 122 8-31 68m-76 18 104 50 44-39m154-249-42 75 68 49m-27 90 99-32 52 39m-174 44 58 46 98-23m-251-66 84 10 50-44m-309-126 49-22 34 37m352 161 26-50 55-9"/>
        <path d="m237 181 27 42m145 27 41 42m-183 68 41 30m247-180 44-31m48 201 43 29m-307-11 41-34" strokeWidth="1"/>
      </g>
      <path d="M48 382q94-61 174-25t146-6q70-42 137-4t134 0q78-36 211 9" fill="none" stroke="#536f69" strokeWidth="58" opacity=".92"/>
      <path d="M48 376q94-61 174-25t146-6q70-42 137-4t134 0q78-36 211 9" fill="none" stroke="#a9b5a0" strokeWidth="3" opacity=".8"/>
      <path d="M280 365v40m72-44v47m202-45v42m87-37v38" stroke="#5b4937" strokeWidth="12"/><path d="M280 365v40m72-44v47m202-45v42m87-37v38" stroke="#d0b789" strokeWidth="3"/>
      <g fill="#b69d71" stroke="#594733" strokeWidth="3" filter="url(#city-shadow)">
        <path d="m361 83 43-25 44 25v42h-87Z"/><path d="m355 84 49-32 50 32" fill="#71563e"/><path d="M375 96h12v29h-12zm32 0h11v29h-11z" fill="#45392c"/>
        <path d="m306 221 39-25 39 25v58h-78Z"/><path d="m299 222 46-35 46 35" fill="#73573f"/><path d="M338 241h15v38h-15Z" fill="#493b2d"/>
        <path d="m467 467 46-31 47 31v77h-93Z"/><path d="m458 468 55-42 56 42" fill="#72543c"/><path d="M484 493h14v51h-14zm29-2h14v53h-14z" fill="#4a3b2c"/>
        <path d="m585 341 34-23 35 23v43h-69Z"/><path d="m579 342 40-31 41 31" fill="#75553d"/>
        <path d="m188 284 30-20 31 20v46h-61Z"/><path d="m182 285 36-28 37 28" fill="#775940"/>
        <path d="m695 241 31-20 32 20v48h-63Z"/><path d="m689 242 37-29 38 29" fill="#75553d"/>
      </g>
      <g fill="#493c2b" fontFamily="Georgia,serif" letterSpacing="3" opacity=".85">
        <text x="34" y="43" fontSize="16">NORIMBERGA · 1519</text><text x="40" y="621" fontSize="12">PEGNITZ</text>
        <text x="776" y="330" fontSize="11" transform="rotate(90 776 330)">MAUER · STADTGRENZE</text>
      </g>
      <g transform="translate(818 68)" fill="none" stroke="#49392a" strokeWidth="2"><circle r="31"/><path d="M0-28 7 0 0 28-7 0ZM-28 0 0-7 28 0 0 7Z" fill="#9c7550"/><circle r="4" fill="#49392a"/></g>
      <text x="818" y="112" textAnchor="middle" fill="#49392a" fontFamily="Georgia,serif" fontSize="12">N</text>
      <path d="M18 18h864v614H18z" fill="none" stroke="#594833" strokeWidth="2"/><path d="M26 26h848v598H26z" fill="none" stroke="#9a805a" strokeWidth="1"/>
    </svg>
    <div className="city-plan-markers" role="group" aria-label="Исторические места Нюрнберга">
      {locations.map((item, index) => {
        const selected = selectedId === item.id
        const related = relatedIds.includes(item.id)
        return <button ref={(node) => { markerRefs.current[index] = node }} key={item.id}
          className={'city-map-marker location-' + item.id + (selected ? ' is-selected' : '') + (related ? ' is-related' : '')}
          style={{ left: item.x + '%', top: item.y + '%' }} type="button"
          aria-pressed={selected} aria-label={`${item.number}. ${item.name}`} aria-current={selected ? 'true' : undefined}
          onClick={() => onSelect(item.id)} onKeyDown={(event) => moveFocus(event, index)}>
          <span className="city-marker-seal">{item.number}</span><span className="city-marker-label">{item.shortName}</span>
        </button>
      })}
    </div>
    <span className="city-map-scale-note">SCHEMATISCH · НЕ В МАСШТАБЕ</span>
    {activeIndex >= 0 && <span className="city-map-keyboard-note" aria-live="polite">Место {activeIndex + 1} из {locations.length}</span>}
  </div>
}

function CityExplorer() {
  const [selectedId, setSelectedId] = useState(null)
  const [visited, setVisited] = useState([])
  const selected = locations.find((item) => item.id === selectedId)
  const related = selected ? locations.filter((item) => selected.related.includes(item.id)) : []
  const relatedIds = related.map((item) => item.id)

  function selectLocation(id) {
    setSelectedId(id)
    setVisited((current) => current.includes(id) ? current : [...current, id])
  }

  return <section className="city-explorer" id="n-city-explorer" aria-labelledby="city-explorer-title">
    <div className="page-wrap">
      <div className="city-explorer-heading">
        <div><p className="eyebrow"><span>V</span> VRBS NORIMBERGA · 1519</p><h2 id="city-explorer-title">Пройди по <em>городской ткани</em></h2></div>
        <p>Выбирай место на плане: вместе они рассказывают о торговле, вере, заботе, власти и повседневном движении.</p>
      </div>
      <p className="city-map-reconstruction"><span aria-hidden="true">✳</span> Историческая схема, не точная карта: расположение кварталов и части маркеров условны. Используй её как путеводитель по темам Нюрнберга, а не как план улиц.</p>
      <div className="city-explorer-layout">
        <CityPlan selectedId={selectedId} relatedIds={relatedIds} onSelect={selectLocation}/>
        <aside className={'city-location-panel' + (selected ? ' has-location' : '')} aria-live="polite" aria-atomic="true">
          {selected ? <>
            <div className="city-panel-top"><span>{selected.number} / 07</span><button type="button" onClick={() => setSelectedId(null)} aria-label="Закрыть описание места">×</button></div>
            <p className="city-location-type">{selected.type}</p><h3>{selected.name}</h3>
            <p className="city-location-intro">{selected.intro}</p><p className="city-location-story">{selected.story}</p>
            <p className="city-location-detail">{selected.detail}</p>
            <p className="city-connection-note">Места связаны здесь по общей теме городской жизни; схема не утверждает, что между ними было особое прямое событие.</p>
            <div className="city-location-connections"><small>ГОРОДСКИЕ СВЯЗИ</small><ul>{selected.groups.map((group) => <li key={group}>{connectionLabels[group]}</li>)}</ul></div>
            {related.length > 0 && <div className="city-related"><small>ПОХОЖИЕ ТЕМЫ · ВЫБЕРИ МЕСТО</small><div>{related.map((item) => <button key={item.id} type="button" onClick={() => selectLocation(item.id)}>{item.shortName}<span aria-hidden="true">↗</span></button>)}</div></div>}
          </> : <div className="city-panel-empty"><span className="city-empty-seal" aria-hidden="true">✣</span><p className="eyebrow">ОСМОТРИТЕ ПЛАН</p><h3>Куда ведёт улица?</h3><p>Выберите отмеченное место, чтобы открыть его историю и связи с другими частями города.</p><div className="city-discovery-count">Открыто мест <strong>{visited.length} / {locations.length}</strong></div></div>}
        </aside>
      </div>
      <div className="city-location-index"><div className="city-index-head"><span>INDEX URBIS</span><p>Открыто {visited.length} из {locations.length}</p></div><div className="city-index-grid">{locations.map((item) => <button type="button" key={item.id} className={selectedId === item.id ? 'is-active' : ''} onClick={() => selectLocation(item.id)}><span>{item.number}</span>{item.shortName}<b aria-hidden="true">{visited.includes(item.id) ? '✓' : '↗'}</b></button>)}</div></div>
    </div>
  </section>
}

export default CityExplorer
