function CraftSelector({ crafts, progressByCraft, onChoose }) {
  return <div className="workshop-craft-select">
    <div className="workshop-panel-heading"><p className="eyebrow">ARS ET OPIFICIVM</p><h3>Какой труд исследуем?</h3><p>Каждый путь — короткая учебная реконструкция: от материала к предмету.</p></div>
    <div className="workshop-craft-options">
      {crafts.map((craft, index) => {
        const progress = progressByCraft[craft.id]
        return <button type="button" className={'workshop-craft-option craft-option-' + craft.tone} key={craft.id} onClick={() => onChoose(craft.id)}>
          <span className="craft-option-number">0{index + 1}</span>
          <span className="craft-option-glyph" aria-hidden="true">{craft.glyph}</span>
          <span className="craft-option-copy"><strong>{craft.title}</strong><small>{craft.subtitle}</small><span>{craft.intro}</span><em>{craft.importance}</em></span>
          <span className="craft-option-progress">{progress?.complete ? 'ЗАВЕРШЕНО ✓' : progress ? 'ПРОГРЕСС СОХРАНЁН' : 'НАЧАТЬ ПУТЬ'} <b aria-hidden="true">↗</b></span>
        </button>
      })}
    </div>
  </div>
}

export default CraftSelector
