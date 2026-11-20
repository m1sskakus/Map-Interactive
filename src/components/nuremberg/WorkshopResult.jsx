function WorkshopResult({ craft, answers, onRestart, onReturn, onChangeCraft }) {
  const getAnswer = (stageId) => craft.stages[stageId].find((option) => option.id === answers[stageId])
  return <section className="workshop-result" aria-labelledby="workshop-result-title">
    <div className="result-seal">FACTVM<br/><strong>✦</strong></div>
    <p className="eyebrow">OPVS · {craft.title.toUpperCase()}</p>
    <h3 id="workshop-result-title" tabIndex="-1">Путь от материала<br/><em>к готовому предмету</em></h3>
    <div className="result-product"><span aria-hidden="true">{craft.product.glyph}</span><div><small>РЕЗУЛЬТАТ УЧЕБНОЙ РЕКОНСТРУКЦИИ</small><strong>{craft.product.name}</strong><p>{craft.product.description}</p></div></div>
    <ol className="result-sequence">{[{ id:'material', label:'Материал' },{ id:'tool', label:'Инструмент' },{ id:'process', label:'Процесс' }].map((step,index)=><li key={step.id}><span>0{index+1}</span><div><small>{step.label}</small><strong>{getAnswer(step.id)?.name}</strong></div></li>)}</ol>
    <div className="result-history"><small>ЧТО ЭТО ПОКАЗЫВАЕТ</small><p>{craft.importance} Модель объясняет взаимосвязь выбора материала, навыка и инструмента; точная технология зависела от изделия и мастерской.</p></div>
    <div className="workshop-result-actions"><button className="workshop-restart" type="button" onClick={onRestart}>Пройти этот путь снова ↺</button><button className="workshop-return" type="button" onClick={onChangeCraft}>Выбрать другое ремесло</button><button className="workshop-return" type="button" onClick={onReturn}>Вернуться к главе Нюрнберга</button></div>
  </section>
}

export default WorkshopResult
