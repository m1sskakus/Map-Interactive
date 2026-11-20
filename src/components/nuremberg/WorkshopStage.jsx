import WorkshopFeedback from './WorkshopFeedback.jsx'

function WorkshopStage({ craft, stage, stageIndex, answerId, onChoose, onContinue, onBack, onChangeCraft, hasLaterAnswers }) {
  const options = craft.stages[stage.id]
  const selected = options.find((option) => option.id === answerId)
  return <section className="workshop-stage" aria-labelledby="workshop-stage-title">
    <div className="workshop-stage-head"><div><p className="eyebrow">{stage.eyebrow} · {craft.title.toUpperCase()}</p><h3 id="workshop-stage-title" tabIndex="-1">{stage.title}</h3><p>{stage.prompt}</p></div><span className="stage-index-stamp">{String(stageIndex + 1).padStart(2, '0')}<i>/ 04</i></span></div>
    {hasLaterAnswers && <p className="workshop-dependency-note" role="status">Ты изменил предыдущий выбор. Следующие этапы нужно подтвердить заново; другие ремёсла и эта часть пути сохранены.</p>}
    <div className="workshop-choice-grid" role="group" aria-label={'Варианты: ' + stage.title}>
      {options.map((option) => <button type="button" className={'workshop-choice ' + (answerId === option.id ? 'is-selected ' + (option.correct ? 'is-valid' : 'is-invalid') : '')} key={option.id} onClick={() => onChoose(option.id)} aria-pressed={answerId === option.id}>
        <span className="choice-glyph" aria-hidden="true">{option.glyph}</span><span className="choice-copy"><strong>{option.name}</strong><small>{option.detail}</small></span><span className="choice-check" aria-hidden="true">{answerId === option.id ? (option.correct ? '✓' : '↺') : '＋'}</span>
      </button>)}
    </div>
    <WorkshopFeedback option={selected} onContinue={onContinue}/>
    <div className="workshop-stage-actions"><button type="button" className="workshop-back" onClick={onBack} disabled={stageIndex===0}>← Предыдущий этап</button><button type="button" className="workshop-change-craft" onClick={onChangeCraft}>Сменить ремесло</button></div>
  </section>
}

export default WorkshopStage
