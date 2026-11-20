import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ArtifactExplorer from '../components/frankfurt/ArtifactExplorer.jsx'
import FrankfurtArtwork from '../components/frankfurt/FrankfurtArtwork.jsx'
import PerspectiveExplorer from '../components/frankfurt/PerspectiveExplorer.jsx'
import { electionTimeline, landmarks, sources } from '../data/frankfurt.js'
import './FrankfurtPage.css'

const electors = [
  'Майнц', 'Трир', 'Кёльн', 'Король Богемии', 'Пфальц', 'Саксония', 'Бранденбург',
]

function FrankfurtPage() {
  const electionRef = useRef(null)

  function exploreCity() {
    electionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="frankfurt-page">
      <div className="chapter-topline page-wrap">
        <Link to="/#atlas" className="back-to-atlas"><span aria-hidden="true">←</span> Назад к атласу</Link>
        <span>ГЛАВА 01 <i>/</i> ФРАНКФУРТ</span>
        <span>1519 · НА МАЙНЕ</span>
      </div>

      <section className="frankfurt-hero" aria-labelledby="frankfurt-title">
        <div className="frankfurt-hero-inner page-wrap">
          <div className="frankfurt-hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">✳</span> FRANCOFVRTVM · ИЮНЬ 1519</p>
            <h1 id="frankfurt-title">Франкфурт</h1>
            <p className="frankfurt-subtitle">Выборы, торговля<br />и имперская власть</p>
            <p className="frankfurt-intro">В городе на Майне решался вопрос, кто станет римским королём. Но Франкфурт жил не только политикой: его ярмарки сводили вместе людей и товары из разных земель.</p>
            <button className="frankfurt-explore" type="button" onClick={exploreCity}>
              <span>Исследовать город</span><span className="explore-arrow" aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="frankfurt-hero-art">
            <FrankfurtArtwork />
            <span className="artwork-caption">Художественная реконструкция · не точный вид города</span>
          </div>
          <div className="election-date-stamp" aria-label="Дата выборов: 28 июня 1519 года">
            <small>DIE WAHL</small><strong>28</strong><span>JUNI</span><i>1519</i>
          </div>
        </div>
      </section>

      <section className="election-section page-wrap" id="election" ref={electionRef} aria-labelledby="election-heading">
        <div className="election-intro">
          <p className="eyebrow"><span className="section-number">I</span> EIN REICH · SIEBEN STIMMEN</p>
          <h2 id="election-heading">Император —<br /><em>не по наследству</em></h2>
          <p>Священная Римская империя была союзом множества земель и правителей, а не единой наследственной монархией. После смерти Максимилиана I нового римского короля избирали князья-курфюрсты.</p>
          <p>В 1519 году за поддержку боролись Карл Габсбург и Франциск I Французский. Переговоры и крупные финансовые обещания сопровождали кампанию; их нельзя свести к простой покупке одного голоса.</p>
          <a className="source-inline" href={sources[0].url} target="_blank" rel="noreferrer">Проверить историческую справку <span aria-hidden="true">↗</span></a>
        </div>
        <div className="elector-panel">
          <div className="elector-panel-heading"><span>КОЛЛЕГИЯ ИЗБИРАТЕЛЕЙ</span><span>FRANKFURT · 1519</span></div>
          <div className="elector-wheel" role="img" aria-label="Семь князей-курфюрстов: три архиепископа и четыре светских правителя">
            <div className="elector-center"><strong>7</strong><span>КУРФЮРСТОВ</span><i>выбирают короля</i></div>
            {electors.map((elector, index) => <span className={'elector-node elector-node-' + (index + 1)} key={elector}><b>{String(index + 1).padStart(2, '0')}</b><small>{elector}</small></span>)}
            <div className="elector-ring" aria-hidden="true" />
          </div>
          <div className="elector-legend"><span><i className="legend-dot church" /> Три архиепископа</span><span><i className="legend-dot secular" /> Четыре светских правителя</span></div>
          <div className="election-outcome"><span className="outcome-mark" aria-hidden="true">✳</span><p><strong>28 июня 1519</strong><br />Избирательная капелла собора Святого Варфоломея. Карл получил поддержку семи курфюрстов.</p></div>
        </div>
      </section>

      <section className="timeline-section" aria-label="Ход выборов 1519 года">
        <div className="page-wrap timeline-inner">
          <div className="timeline-heading"><p className="eyebrow">CHRONICA · 1519</p><h2>От вакантного трона<br />к выбору</h2></div>
          <div className="timeline-list">
            {electionTimeline.map((event, index) => (
              <article className="timeline-item" key={event.date}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="timeline-copy"><span>{event.date}</span><h3>{event.title}</h3><p>{event.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="perspectives-section page-wrap" aria-labelledby="perspectives-heading">
        <div className="editorial-section-head">
          <div><p className="eyebrow"><span className="section-number">II</span> VITA CIVITATIS</p><h2 id="perspectives-heading">Город <em>разных жизней</em></h2></div>
          <p>Ярмарка и выборы собирали людей разного положения. Выберите перспективу: это исторически обоснованные собирательные образы, а не документированные биографии.</p>
        </div>
        <PerspectiveExplorer />
      </section>

      <section className="objects-section" aria-labelledby="objects-heading">
        <div className="page-wrap objects-inner">
          <div className="objects-heading editorial-section-head">
            <div><p className="eyebrow"><span className="section-number">III</span> RES ET MERCES</p><h2 id="objects-heading">Вещи, которые <em>связывали город</em></h2></div>
            <p>Раскройте предмет и посмотрите, что он может рассказать о расчётах, обмене и власти.</p>
          </div>
          <ArtifactExplorer />
        </div>
      </section>

      <section className="landmarks-section page-wrap" aria-labelledby="landmarks-heading">
        <div className="landmarks-title"><p className="eyebrow"><span className="section-number">IV</span> LOCI MEMORIAE</p><h2 id="landmarks-heading">Точки на городской сцене</h2><p>Три места, где пересекались политика, торговля и повседневный маршрут.</p></div>
        <div className="landmark-list">
          {landmarks.map((landmark) => (
            <article className="landmark-row" key={landmark.number}>
              <span className="landmark-number">{landmark.number}</span>
              <div className="landmark-copy"><small>{landmark.label}</small><h3>{landmark.title}</h3><p>{landmark.text}</p></div>
              <span className="landmark-seal" aria-hidden="true">✣</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sources-section" aria-labelledby="sources-heading">
        <div className="page-wrap sources-inner">
          <div className="sources-heading"><p className="eyebrow">APPARATUS FONTIVM</p><h2 id="sources-heading">Источники и примечания</h2><p>Факты и даты связаны с источниками; иллюстрации и социальные перспективы обозначены как реконструкции.</p></div>
          <ol className="source-list">
            {sources.map((source, index) => (
              <li key={source.url}><span>{String(index + 1).padStart(2, '0')}</span><div><a href={source.url} target="_blank" rel="noreferrer">{source.title} <i aria-hidden="true">↗</i></a><p>{source.note}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <div className="chapter-return page-wrap"><Link to="/#atlas"><span aria-hidden="true">←</span> Вернуться к атласу</Link><span>FRANKFVRTVM · 1519</span></div>
    </main>
  )
}

export default FrankfurtPage
