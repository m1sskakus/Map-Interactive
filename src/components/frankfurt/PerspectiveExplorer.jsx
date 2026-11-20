import { useState } from 'react'
import { perspectives } from '../../data/frankfurt.js'

function PerspectiveExplorer() {
  const [activeId, setActiveId] = useState(perspectives[0].id)
  const [active, setActive] = useState(0)
  const selected = perspectives.find((item) => item.id === activeId) || perspectives[0]

  function choosePerspective(id, index) {
    setActiveId(id)
    setActive(index)
  }

  function handleTabKeyDown(event) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    let next = active
    if (event.key === 'ArrowRight') next = (active + 1) % perspectives.length
    if (event.key === 'ArrowLeft') next = (active - 1 + perspectives.length) % perspectives.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = perspectives.length - 1
    choosePerspective(perspectives[next].id, next)
    document.getElementById('perspective-tab-' + perspectives[next].id)?.focus()
  }

  return (
    <div className="perspective-explorer">
      <div className="perspective-tabs" role="tablist" aria-label="Выбрать историческую перспективу">
        {perspectives.map((person, index) => (
          <button
            key={person.id}
            id={'perspective-tab-' + person.id}
            className={'perspective-tab' + (person.id === activeId ? ' is-active' : '')}
            type="button"
            role="tab"
            aria-selected={person.id === activeId}
            aria-controls="perspective-panel"
            tabIndex={person.id === activeId ? 0 : -1}
            onClick={() => choosePerspective(person.id, index)}
            onKeyDown={handleTabKeyDown}
          >
            <span>{person.number}</span><strong>{person.title}</strong>
          </button>
        ))}
      </div>
      <article className="perspective-panel" id="perspective-panel" role="tabpanel" aria-labelledby={'perspective-tab-' + selected.id} key={selected.id}>
        <div className="perspective-panel-head">
          <div><p className="perspective-role">{selected.role}</p><h3>{selected.title}</h3></div>
          <span className="perspective-mark">{selected.mark}</span>
        </div>
        <p className="reconstruction-label"><span aria-hidden="true">✳</span> Иллюстративная историческая перспектива</p>
        <p className="perspective-scene">{selected.scene}</p>
        <div className="perspective-notes">
          <div><span>ЧТО МОГЛО БЫТЬ ВОКРУГ</span><p>{selected.senses}</p></div>
          <div><span>ВОЗМОЖНОСТИ И ГРАНИЦЫ</span><p>{selected.limits}</p></div>
        </div>
      </article>
    </div>
  )
}

export default PerspectiveExplorer
