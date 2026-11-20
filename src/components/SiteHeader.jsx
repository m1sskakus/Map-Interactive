import { Link } from 'react-router-dom'

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="1519 — Across the Empire, на главную">
          <span className="brand-seal" aria-hidden="true">15<br />19</span>
          <span className="brand-copy"><strong>1519</strong><small>Across the Empire</small></span>
        </Link>
        <nav className="main-nav" aria-label="Основная навигация">
          <Link className="nav-link is-current" to="/#atlas">Атлас <span>01</span></Link>
          <Link className="nav-link" to="/#about">О проекте</Link>
        </nav>
        <Link className="header-action" to="/#atlas"><span>Начать путешествие</span><b aria-hidden="true">↘</b></Link>
      </div>
    </header>
  )
}

export default SiteHeader
