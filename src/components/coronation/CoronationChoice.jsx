function CoronationChoice({ chapter, answer, onAnswer }) {
  const selected=answer===null?null:chapter.choices[answer]
  return <section className="coronation-choice" aria-labelledby="choice-title"><p className="game-eyebrow">ВОПРОС ИССЛЕДОВАТЕЛЮ</p><h3 id="choice-title">{chapter.question}</h3><div className="choice-options">{chapter.choices.map((choice,index)=><button key={choice.label} type="button" className={answer===index?'is-selected':''} aria-pressed={answer===index} onClick={()=>onAnswer(index)}><span className="choice-letter">{String.fromCharCode(65+index)}</span><span>{choice.label}</span><i aria-hidden="true">↗</i></button>)}</div>{selected&&<div className={'choice-feedback '+(selected.correct?'is-insight':'')} role="status"><span>{selected.correct?'Историческая связь':'Проверьте контекст'}</span><p>{selected.feedback}</p></div>}</section>
}

export default CoronationChoice
