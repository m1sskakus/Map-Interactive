import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CityExplorer from '../components/nuremberg/CityExplorer.jsx'
import ApprenticeDayStory from '../components/nuremberg/ApprenticeDayStory.jsx'
import WorkshopSection from '../components/nuremberg/WorkshopSection.jsx'
import './NurembergPage.css'

const crafts = [
  { number: '01', title: 'Металл в умелых руках', mark: 'IRON · COPPER', text: 'К 1500 году нюрнбергские мастера получили европейскую известность в обработке металла. В городе делали проволоку, оружие, доспехи, домашнюю утварь и точные приборы. За вещью стояли специализированные навыки и длинная цепочка поставок.', tone: 'iron' },
  { number: '02', title: 'Материал становится товаром', mark: 'MATERIAL · MARKET', text: 'Медь, железо, дерево, ткань и красители входили в мастерские через торговлю. Готовые изделия отправлялись на местные и дальние рынки, где их ценили за качество и назначение.', tone: 'copper' },
  { number: '03', title: 'Рисунок, печать, идея', mark: 'ART · PRINT', text: 'Городская среда объединяла ремесленное мастерство и художественную работу. Печатные мастерские помогали распространять изображения и знания; Альбрехт Дюрер стал одним из самых известных художников, связанных с Нюрнбергом.', tone: 'ink' },
]

const people = [
  { id: 'master', role: 'Мастер', title: 'Отвечать за мастерскую и качество', body: 'Мастер обладал навыком, инструментами и правом вести собственное дело. Он организовывал работу, принимал учеников и отвечал за соответствие изделия городским правилам.', day: 'Планирование заказов, закупка материала, работа и проверка готовых изделий.', limits: 'Доступ к мастерскому статусу зависел от ремесла, ресурсов и отношений с городскими властями; мастер не был свободен от проверок и правил.' },
  { id: 'journeyman', role: 'Подмастерье', title: 'Работать, накапливать опыт', body: 'Подмастерье уже владел ремеслом, но трудился у мастера и зависел от найма. Навык и опыт давали мобильность и возможность искать работу в разных мастерских.', day: 'Выполнение части заказа, работа с инструментами и помощь мастеру.', limits: 'Доход и положение зависели от доступной работы; самостоятельное дело требовало средств, связей и допуска.' },
  { id: 'apprentice', role: 'Ученик', title: 'Учиться через ежедневную работу', body: 'Ученик осваивал профессию рядом с мастером: наблюдал, готовил материалы и выполнял поручения. Обучение было социальным отношением с обязанностями, а не только передачей техники.', day: 'Подготовка рабочего места, простые операции и наблюдение за сложными этапами.', limits: 'Молодой ученик находился в зависимом положении и имел мало контроля над своим временем и доходом.' },
  { id: 'merchant', role: 'Торговец', title: 'Соединять мастерскую с покупателем', body: 'Купец подбирал товары, договаривался о цене и перевозке, искал клиентов за пределами города. Его работа связывала ремесленный квартал с рынком и дальними торговыми путями.', day: 'Переговоры, оценка качества, расчёты и организация перевозки товара.', limits: 'Риски дороги, изменение спроса и городские правила могли повлиять на прибыль; не каждый торговец располагал капиталом крупной компании.' },
]

const objects = [
  { id: 'hammer', title: 'Молот и наковальня', category: 'МЕТАЛЛ · ИНСТРУМЕНТ', glyph: '⚒', description: 'Символический набор инструментов кузнечной мастерской. Не конкретная находка из Нюрнберга: форма инструментов различалась в зависимости от ремесла и операции.', connection: 'Обработка металла была одной из сильных сторон городской экономики и требовала специализированных навыков.' },
  { id: 'wire', title: 'Проволока и волочильная доска', category: 'МЕТАЛЛ · ТЕХНИКА', glyph: '〰', description: 'Нюрнберг был связан с ранним развитием механического волочения проволоки. На карточке — условная визуализация процесса, не точная копия атрибутированного инструмента.', connection: 'Новшество в способе обработки помогало делать материал для множества изделий и расширяло специализацию мастерских.' },
  { id: 'instrument', title: 'Измерительный циркуль', category: 'ТОЧНОСТЬ · ИЗМЕРЕНИЕ', glyph: '⌖', description: 'Циркуль служит примером измерительного инструмента раннего Нового времени. Здесь показан тип предмета без заявления о конкретном экземпляре или мастере.', connection: 'Точные измерения были нужны мастерам, строителям, картографам и торговцам; городские ремёсла создавали такой инструментарий.' },
  { id: 'print', title: 'Печатная гравюра', category: 'ИЗОБРАЖЕНИЕ · ПЕЧАТЬ', glyph: '▧', description: 'Стилизованная печатная доска напоминает о распространении изображений и технических знаний. Это авторская графика проекта, не исторический оттиск.', connection: 'Художественное производство и ремесленная точность пересекались в мастерских и печатном деле Нюрнберга.' },
]

function NurembergArtwork() {
  return <svg className="nuremberg-artwork" viewBox="0 0 960 620" role="img" aria-labelledby="nuremberg-art-title nuremberg-art-desc">
    <title id="nuremberg-art-title">Художественная реконструкция Нюрнберга около 1519 года</title>
    <desc id="nuremberg-art-desc">Панорама позднесредневекового города с башнями, крышами, мастерской и рекой Пегниц; стилизованная, а не точная реконструкция.</desc>
    <defs><linearGradient id="n-bg" x2="0" y2="1"><stop stopColor="#aab0a0"/><stop offset=".53" stopColor="#d4c7a4"/><stop offset="1" stopColor="#e8d9b7"/></linearGradient><pattern id="n-hatch" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M-4 16 16-4M4 20 20 4" stroke="#302820" strokeOpacity=".15" strokeWidth="1"/></pattern></defs>
    <rect width="960" height="620" fill="url(#n-bg)"/><path d="M0 346q140-80 280 4t250-6 245 6 185-33v303H0Z" fill="#777b68" opacity=".45"/>
    <path d="M35 387 95 333l51 53v115H35Zm113 9 65-80 62 80v103h-127Zm610-8 66-91 72 91v105H758Zm117 11 41-57 39 56v91h-80Z" fill="#9b8060" stroke="#39332a" strokeWidth="3"/>
    <path d="M0 468h960v152H0Z" fill="#a28b66" stroke="#3c3429" strokeWidth="3"/><path d="M0 515q122-33 231 0t223 0 227 0 279 0" fill="none" stroke="#556b67" strokeWidth="25"/><path d="M0 507q122-33 231 0t223 0 227 0 279 0" fill="none" stroke="#c1c8b0" strokeWidth="3"/>
    <g fill="#d1bd91" stroke="#443a2c" strokeWidth="3"><path d="M189 452V305l83-64 84 64v147Z"/><path d="M169 308 272 220l105 88" fill="#584639"/><path d="M205 452V330h58v122m29 0V330h39v122" fill="#60523e"/><path d="M441 462V329l70-54 71 54v133Z"/><path d="M425 332 512 256l88 76" fill="#514338"/><path d="M474 462V367h27v95m30-93h24v93" fill="#604c37"/></g>
    <g fill="#6c5540" stroke="#322c25" strokeWidth="3"><path d="M693 460V249h42v211Z"/><path d="m684 250 30-71 30 71Z"/><path d="M704 205v-49m-12 0h24m-14-10 2-15 4 15" fill="none"/><path d="M391 461V339l24-22 24 22v122Z"/><path d="m385 341 30-57 30 57Z"/></g>
    <g fill="none" stroke="#312a22" strokeWidth="3"><path d="M75 469v-60h57v60m-50-48h43m-28-18v-21h15v21m-7-20v-42m-6 0h13m-8-6 2-10 3 10"/><path d="M620 459v-46h37v46m-42-46h46m-35-13 13-18 13 18m-17 0v-31m-7 0h15m-10-7 3-12 4 12"/></g>
    <g fill="#44372c"><circle cx="100" cy="429" r="4"/><circle cx="123" cy="429" r="4"/><circle cx="640" cy="430" r="4"/></g>
    <path d="M17 17h926v586H17z" fill="none" stroke="#302820" strokeWidth="6"/><path d="M30 30h900v560H30z" fill="url(#n-hatch)" opacity=".25"/><text x="55" y="75" className="n-art-title">NORIMBERGA · 1519</text><text x="57" y="99" className="n-art-caption">RECONSTRUCTIO ARTISTICA · PEGNITZ</text>
  </svg>
}

function ObjectGlyph({ item, large = false }) {
  return <span className={'n-object-glyph glyph-' + item.id + (large ? ' is-large' : '')} aria-hidden="true">{item.glyph}</span>
}

function NurembergPage() {
  const [activePerson, setActivePerson] = useState(people[0].id)
  const [selectedObject, setSelectedObject] = useState(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const person = people.find((item) => item.id === activePerson) || people[0]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!selectedObject || !dialog) return undefined
    if (!dialog.open) dialog.showModal()
    closeRef.current?.focus()
    return () => { if (dialog.open) dialog.close() }
  }, [selectedObject])

  function closeDialog() {
    if (dialogRef.current?.open) dialogRef.current.close()
    setSelectedObject(null)
  }

  function handlePeopleKeyDown(event) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const current = people.findIndex((item) => item.id === activePerson)
    let next = current
    if (event.key === 'ArrowRight') next = (current + 1) % people.length
    if (event.key === 'ArrowLeft') next = (current - 1 + people.length) % people.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = people.length - 1
    setActivePerson(people[next].id)
    document.getElementById('n-person-tab-' + people[next].id)?.focus()
  }

  return <main className="nuremberg-page">
    <div className="n-topline page-wrap"><Link to="/#atlas" className="back-to-atlas"><span aria-hidden="true">←</span> Назад к атласу</Link><span>ГЛАВА 03 <i>/</i> НЮРНБЕРГ</span><span>1519 · ФРАНКОНИЯ</span></div>

    <section className="n-hero" aria-labelledby="n-title"><div className="n-hero-inner page-wrap"><div className="n-hero-copy"><p className="eyebrow">NORIMBERGA · ANNO 1519</p><h1 id="n-title">Нюрнберг</h1><p className="n-subtitle">Город мастеров</p><p className="n-intro">Под сводами мастерских металл становился инструментом, украшением и товаром. Нюрнберг строили не только решения правителей — его создавали руки тысяч людей.</p><a className="n-explore" href="#n-story">Войти в город <span aria-hidden="true">↓</span></a><div className="n-hero-note"><span>HANDWERK · HANDEL · STADT</span><i>РУКИ. РЕМЕСЛО. ГОРОД.</i></div></div><figure className="n-hero-art"><NurembergArtwork/><figcaption>Авторская реконструкция по мотивам городского ландшафта XVI века · не документальный вид 1519 года</figcaption></figure><div className="n-date-seal"><small>IM REICH</small><strong>15</strong><b>19</b><i>FRANCONIA</i></div></div></section>

    <section className="n-story page-wrap" id="n-story"><div className="n-story-heading"><p className="eyebrow"><span>I</span> MATERIA · MANVS · OPVS</p><h2>Город <em>умелых рук</em></h2><p>К 1500 году мастерские Нюрнберга прославились обработкой металла и текстильным производством. Их товары соединяли местные навыки, сырьё из окрестностей и дальнюю торговлю.</p></div><div className="n-craft-list">{crafts.map((craft)=><article className={'n-craft n-craft-'+craft.tone} key={craft.number}><span className="n-craft-no">{craft.number}</span><div className="n-craft-engraving" aria-hidden="true"><i>{craft.tone==='iron'?'⚒':craft.tone==='copper'?'◈':'▧'}</i><b>{craft.mark}</b></div><div className="n-craft-copy"><small>{craft.mark}</small><h3>{craft.title}</h3><p>{craft.text}</p></div></article>)}</div></section>

    <section className="n-governance"><div className="page-wrap n-governance-inner"><div className="n-governance-copy"><p className="eyebrow"><span>II</span> ORDO CIVITATIS</p><h2>Ремесло без<br/><em>обычного цеха</em></h2><p>В Нюрнберге ремесленникам запретили объединяться в цехи после восстания 1348/49 годов. Это не означало исчезновение ремесленных сообществ: отдельные занятия сохраняли объединения, обычаи и братства.</p><p>Однако политическое управление и надзор над промыслами оставались в руках совета и патрициата. С 1470 года контроль осуществляло городское Rugamt. Мастерство было заметно в городе, но ремесленники не получили равного влияния на его управление.</p></div><aside className="n-governance-aside"><div className="n-rule-stamp">RAT<br/>UND<br/>HANDWERK</div><span>1348/49</span><p>Ремесленное объединение — не то же самое, что политическая власть.</p><small>ГОРОДСКАЯ ОСОБЕННОСТЬ</small></aside></div></section>

    <section className="n-people page-wrap"><div className="n-section-head"><div><p className="eyebrow"><span>III</span> HOMINES ARTIS</p><h2>Кто создавал<br/><em>городские вещи</em></h2></div><p>Выберите роль и посмотрите на ремесленный мир с её стороны. Это иллюстративные исторические перспективы, не биографии конкретных людей.</p></div><div className="n-people-explorer"><div className="n-person-tabs" role="tablist" aria-label="Выбрать перспективу ремесленника">{people.map((item,index)=><button type="button" role="tab" id={'n-person-tab-'+item.id} aria-selected={activePerson===item.id} aria-controls="n-person-panel" tabIndex={activePerson===item.id?0:-1} key={item.id} onClick={()=>setActivePerson(item.id)} onKeyDown={handlePeopleKeyDown}><span>0{index+1}</span><strong>{item.role}</strong></button>)}</div><article className="n-person-panel" id="n-person-panel" role="tabpanel" aria-labelledby={'n-person-tab-'+person.id} key={person.id}><p className="n-reconstruction-tag">✳ ИЛЛЮСТРАТИВНАЯ ПЕРСПЕКТИВА · НЕ ДОКУМЕНТАЛЬНЫЙ ПОРТРЕТ</p><h3>{person.title}</h3><p className="n-person-body">{person.body}</p><div className="n-person-details"><div><small>РАБОТА И МАТЕРИАЛЫ</small><p>{person.day}</p></div><div><small>ВОЗМОЖНОСТИ И ГРАНИЦЫ</small><p>{person.limits}</p></div></div></article></div></section>

    <section className="n-objects"><div className="page-wrap"><div className="n-section-head"><div><p className="eyebrow"><span>IV</span> INSTRVMENTA</p><h2>Предметы труда<br/><em>и точности</em></h2></div><p>Открой предмет, чтобы узнать, как он связан с мастерскими и производством. Иллюстрации показывают типы предметов, а не атрибутированные находки.</p></div><div className="n-object-grid">{objects.map((item,index)=><button className="n-object-card" type="button" key={item.id} onClick={()=>setSelectedObject(item)} aria-haspopup="dialog"><span className="n-object-index">0{index+1}</span><ObjectGlyph item={item}/><strong>{item.title}</strong><small>{item.category}</small><span className="n-object-open">Рассмотреть ↗</span></button>)}</div></div></section>

    <CityExplorer />

    <ApprenticeDayStory />

    <WorkshopSection />

    <section className="n-sources"><div className="page-wrap n-sources-inner"><div><p className="eyebrow">FONTES · NOTAE</p><h2>Источники<br/>и примечания</h2><p>Фактические сведения сверены с историческими и музейными ресурсами. Социальные роли и графика — обозначенные реконструкции.</p></div><ol><li><a href="https://www.historisches-lexikon-bayerns.de/Lexikon/Artikel_45868" target="_blank" rel="noreferrer">Historisches Lexikon Bayerns · ремесло Нюрнберга ↗</a><span>Металлообработка, текстиль, торговые изделия, городской надзор и запрет цехов.</span></li><li><a href="https://museums.nuernberg.de/city-museum-fembo-house/permanent-exhibition/time-travel/nuremberg-crafts" target="_blank" rel="noreferrer">Stadtmuseum Fembohaus · ремёсла Нюрнберга ↗</a><span>Нюрнбергские ремёсла, механическое волочение проволоки, печать и роль совета.</span></li><li><a href="https://museums.nuernberg.de/art-collections/holdings/cultural-historical-collections/ancient-crafts/" target="_blank" rel="noreferrer">Museums Nürnberg · ремесленные предметы ↗</a><span>Запрет цехов после восстания ремесленников и сохранение ремесленных объединений и обычаев.</span></li><li><a href="https://www.gnm.de/museum-aktuell/global-player-koberger/" target="_blank" rel="noreferrer">Germanisches Nationalmuseum · типография Кобергера ↗</a><span>Нюрнбергское книгопечатание, печатный выпуск и иллюстрации Кобергерской Библии 1483 года.</span></li><li><a href="https://online-service.nuernberg.de/viewer/hausbuecher/project/" target="_blank" rel="noreferrer">Stadtbibliothek Nürnberg · цифровые Hausbücher ↗</a><span>Исторические изображения ремесленников и труда с XV века; использованы как контекст, не как декорация точной мастерской.</span></li><li><a href="https://zunft-und-handwerk.gnm.de/en/innovation-and-change" target="_blank" rel="noreferrer">Germanisches Nationalmuseum · ремесло и новшества ↗</a><span>Технологии и исторические формы ремесленного производства.</span></li><li><a href="https://tourismus.nuernberg.de/en/discover/places-of-interest/location/hauptmarkt" target="_blank" rel="noreferrer">Nürnberg Tourismus · Hauptmarkt ↗</a><span>Историческое значение городской рыночной площади.</span></li><li><a href="https://www.vassar.edu/specialcollections/exhibit-highlights/2011-2015/nuremberg-chronicle/essayprinting.html" target="_blank" rel="noreferrer">Vassar College · печать Нюрнбергской хроники ↗</a><span>Контекст печатных мастерских и производственной организации.</span></li><li><a href="https://www.nuernberg.de/internet/stadtarchiv/stadtgeschichte_daten.html" target="_blank" rel="noreferrer">Stadtarchiv Nürnberg · хронология города ↗</a><span>Последнее кольцо укреплений завершено в 1452 году; городская хронология и постройки над Пегницем.</span></li><li><a href="https://museums.nuernberg.de/city-museum-fembo-house/permanent-exhibition/time-travel/nuremberg-as-imperial-city" target="_blank" rel="noreferrer">Stadtmuseum Fembohaus · имперский город ↗</a><span>Связь Нюрнберга с императорами и признаки его статуса в Империи.</span></li><li><a href="https://www.nuremberg.museum/projects/show/1039-st-lorenz-church-as-architecture" target="_blank" rel="noreferrer">Virtuelles Museum Nürnberger Kunst · Св. Лоренц ↗</a><span>Этапы строительства церкви, включая хор 1439–1477 годов.</span></li><li><a href="https://www.nuremberg.museum/projects/show/1302-sebalduskirche-als-architektur" target="_blank" rel="noreferrer">Virtuelles Museum Nürnberger Kunst · Св. Зебальд ↗</a><span>Архитектурная история и особенности приходской церкви.</span></li><li><a href="https://www.nuernberg.de/internet/stadtarchiv/bestaende_bestandsgruppe_d.html" target="_blank" rel="noreferrer">Stadtarchiv Nürnberg · Госпиталь Святого Духа ↗</a><span>Основание Конрадом Гроссом в 1339 году и управление городским советом.</span></li><li><a href="https://tourismus.nuernberg.de/en/discover/places-of-interest/bridges/" target="_blank" rel="noreferrer">Nürnberg Tourismus · мосты ↗</a><span>Исторические переправы через Пегниц; современные мосты не приравниваются к виду 1519 года.</span></li><li><a href="https://zunft-und-handwerk.gnm.de/en/apprentice-and-master" target="_blank" rel="noreferrer">Germanisches Nationalmuseum · ученик и мастер ↗</a><span>Контекст отношений обучения в ремесле. Статья сопоставляет примеры разных городов и периодов, а не задаёт расписание 1519 года.</span></li><li><a href="https://www.uni-kassel.de/ub/landesbibliothek/ausstellung-aufbrueche/themenbereich-iii-buchkunst-2.html" target="_blank" rel="noreferrer">Universität Kassel · нюрнбергские Hausbücher ↗</a><span>Рукописи Zwölfbrüderstiftung 1426–1549 годов с изображениями ремесленников и труда.</span></li><li><a href="https://alltagimmittelalter.gnm.de/de/arbeiten-und-feiern" target="_blank" rel="noreferrer">Germanisches Nationalmuseum · труд и праздники ↗</a><span>Материалы о средневековом труде и обучении; используются как общий контекст, а не запись конкретного дня ученика.</span></li><li><a href="https://museums.nuernberg.de/city-museum-fembo-house/permanent-exhibition/time-travel/nuremberg-trade" target="_blank" rel="noreferrer">Stadtmuseum Fembohaus · торговля Нюрнберга ↗</a><span>Торговые связи нюрнбергских купцов и роль города в рынках.</span></li><li><a href="https://www.nuernberg.de/internet/stadtportal/obstmarkt.html" target="_blank" rel="noreferrer">Stadt Nürnberg · Hauptmarkt и еврейский квартал ↗</a><span>Формирование площади после погрома 1349 года и её последующее использование для торговли.</span></li></ol></div></section>

    <div className="n-return page-wrap"><Link to="/#atlas">← Вернуться к атласу</Link><span>NORIMBERGA · 1519</span></div>

    <dialog ref={dialogRef} className="n-object-dialog" onCancel={(event)=>{event.preventDefault();closeDialog()}} onClose={()=>setSelectedObject(null)} onClick={(event)=>{if(event.target===event.currentTarget)closeDialog()}} aria-labelledby="n-object-title">{selectedObject&&<div className="n-dialog-inner"><button ref={closeRef} className="n-dialog-close" type="button" onClick={closeDialog} aria-label="Закрыть предмет">×</button><div className="n-dialog-art"><ObjectGlyph item={selectedObject} large/></div><div><p className="eyebrow">{selectedObject.category}</p><h2 id="n-object-title">{selectedObject.title}</h2><p>{selectedObject.description}</p><div className="n-dialog-connection"><small>СВЯЗЬ С НЮРНБЕРГОМ</small><p>{selectedObject.connection}</p></div><button className="n-dialog-done" type="button" onClick={closeDialog}>Вернуться к коллекции</button></div></div>}</dialog>
  </main>
}

export default NurembergPage


