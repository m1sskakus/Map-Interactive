function WorkshopFeedback({ option, onContinue }) {
  if (!option) return <div className="workshop-feedback is-empty"><span aria-hidden="true">✳</span><p>Осмотри варианты и выбери один. Подсказка появится здесь.</p></div>
  return <div className={'workshop-feedback ' + (option.correct ? 'is-correct' : 'is-retry')} aria-live="polite">
    <span className="feedback-mark" aria-hidden="true">{option.correct ? '✦' : '↺'}</span>
    <div><strong>{option.correct ? 'Выбор подходит' : 'Подумай о связи материала и работы'}</strong><p>{option.feedback}</p>{option.correct ? <button type="button" className="workshop-next" onClick={onContinue}>Продолжить <span aria-hidden="true">→</span></button> : <small>Попробуй другой вариант — предыдущие этапы останутся сохранены.</small>}</div>
  </div>
}

export default WorkshopFeedback
