import { useState } from 'react'
import { createCraftProgress, workshopCrafts, workshopStagesList } from '../../data/nurembergWorkshop.js'
import CraftSelector from './CraftSelector.jsx'
import WorkshopInterior from './WorkshopInterior.jsx'
import WorkshopResult from './WorkshopResult.jsx'
import WorkshopStage from './WorkshopStage.jsx'
import './WorkshopSection.css'

function WorkshopSection() {
  const [entered, setEntered] = useState(false)
  const [activeCraftId, setActiveCraftId] = useState(null)
  const [showCraftSelector, setShowCraftSelector] = useState(false)
  const [progressByCraft, setProgressByCraft] = useState({})
  const [revisionNotice, setRevisionNotice] = useState(false)
  const craft = workshopCrafts.find((item) => item.id === activeCraftId) || null
  const progress = craft ? (progressByCraft[craft.id] || createCraftProgress()) : createCraftProgress()
  const stage = workshopStagesList[Math.min(progress.stepIndex, workshopStagesList.length - 1)]

  function chooseCraft(craftId) {
    setActiveCraftId(craftId)
    setProgressByCraft((current) => current[craftId] ? current : { ...current, [craftId]: createCraftProgress() })
    setShowCraftSelector(false)
    setRevisionNotice(false)
    requestAnimationFrame(() => document.getElementById('workshop-stage-title')?.focus())
  }

  function updateProgress(updater) {
    if (!craft) return
    setProgressByCraft((current) => {
      const existing = current[craft.id] || createCraftProgress()
      return { ...current, [craft.id]: updater(existing) }
    })
  }

  function chooseOption(optionId) {
    const stageOptions = craft.stages[stage.id]
    const selected = stageOptions.find((item) => item.id === optionId)
    const hadLaterAnswers = workshopStagesList.slice(progress.stepIndex + 1).some((later) => progress.answers[later.id])
    const isChangingAnswer = progress.answers[stage.id] && progress.answers[stage.id] !== optionId
    setRevisionNotice(Boolean(isChangingAnswer && hadLaterAnswers))
    updateProgress((current) => {
      const answers = { ...current.answers, [stage.id]: optionId }
      if (isChangingAnswer) workshopStagesList.slice(progress.stepIndex + 1).forEach((later) => { delete answers[later.id] })
      return { ...current, answers }
    })
    if (!selected) setRevisionNotice(false)
  }

  function continueStage() {
    if (!craft || !progress.answers[stage.id]) return
    const selected = craft.stages[stage.id].find((item) => item.id === progress.answers[stage.id])
    if (!selected?.correct) return
    setRevisionNotice(false)
    updateProgress((current) => ({ ...current, stepIndex: current.stepIndex + 1, complete: current.stepIndex >= workshopStagesList.length - 1 }))
    requestAnimationFrame(() => {
      const resultTitle = document.getElementById('workshop-result-title')
      const stageTitle = document.getElementById('workshop-stage-title')
      const titleToFocus = resultTitle || stageTitle
      titleToFocus?.focus()
    })
  }

  function goBack() {
    if (progress.stepIndex === 0) return
    setRevisionNotice(false)
    updateProgress((current) => ({ ...current, stepIndex: current.stepIndex - 1, complete: false }))
    requestAnimationFrame(() => document.getElementById('workshop-stage-title')?.focus())
  }

  function restartCraft() {
    updateProgress(() => createCraftProgress())
    setRevisionNotice(false)
  }

  function returnToChapter() {
    setEntered(false)
    setActiveCraftId(null)
    setShowCraftSelector(false)
    setRevisionNotice(false)
    requestAnimationFrame(() => document.getElementById('n-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function progressStatus(index) {
    if (progress.complete || index < progress.stepIndex) return 'done'
    if (index === progress.stepIndex) return 'current'
    return 'waiting'
  }

  return <section className="n-workshop" id="n-workshop" aria-labelledby="workshop-title">
    <div className="page-wrap workshop-wrap">
      <div className="workshop-heading"><div><p className="eyebrow"><span>VII</span> IN OFFICINA · 1519</p><h2 id="workshop-title">Мастерская <em>ремесленника</em></h2></div><p>Небольшая учебная реконструкция о том, как в Нюрнберге материал, инструменты и навыки соединялись в полезные вещи.</p></div>

      {!entered ? <div className="workshop-entrance">
        <WorkshopInterior craft={workshopCrafts[0]}/>
        <div className="workshop-entrance-copy"><div><p className="eyebrow">ОТ РУКИ К ВЕЩИ</p><h3>Войти в мастерскую</h3><p>Осмотрись: верстак, инструменты и заготовки собраны в иллюстративную реконструкцию. Выбери ремесло, затем пройди путь материала, инструмента и общего этапа работы.</p><p className="workshop-narrator"><span>ГОЛОС ПРОЕКТА</span> «Предмет начинается с выбора — и с понимания свойств материала».</p><small className="workshop-reconstruction-label">Интерьер и фраза — авторская реконструкция проекта, не подлинная мастерская или историческая цитата.</small></div><button type="button" className="workshop-enter" onClick={() => { setEntered(true); setShowCraftSelector(true) }}>Войти в мастерскую <span aria-hidden="true">→</span></button></div>
      </div> : <div className="workshop-active">
        {showCraftSelector || !craft ? <CraftSelector crafts={workshopCrafts} progressByCraft={progressByCraft} onChoose={chooseCraft}/> : <>
          <div className="workshop-console-top"><div><p className="eyebrow">{craft.subtitle.toUpperCase()} · ПУТЬ РЕМЕСЛА</p><h3>{craft.title}</h3></div><button type="button" className="workshop-switch-craft" onClick={() => { setShowCraftSelector(true); setRevisionNotice(false) }}>← Все ремёсла</button></div>
          <WorkshopInterior craft={craft} answers={progress.answers} stageIndex={progress.stepIndex} completed={progress.complete}/>
          <div className="workshop-instruction"><span className="instruction-mark" aria-hidden="true">✳</span><p>{craft.narrator}</p></div>
          <div className="workshop-progress-block"><div className="workshop-progress-label"><strong>ХОД РАБОТЫ</strong><span>{progress.complete ? '4 из 4 · завершено' : (progress.stepIndex + 1) + ' из 4 · текущий этап'}</span></div><div className="workshop-progress-track" role="progressbar" aria-label="Прогресс ремесленного пути" aria-valuemin="0" aria-valuemax="4" aria-valuenow={progress.complete ? 4 : progress.stepIndex + 1}><span style={{ width: (progress.complete ? 100 : (progress.stepIndex + 1) * 25) + '%' }}/></div><ol className="workshop-step-list">{[...workshopStagesList.map((item) => item.title), 'Предмет'].map((label,index)=><li className={'step-' + progressStatus(index)} aria-current={progressStatus(index)==='current'?'step':undefined} key={label}><span>{progressStatus(index)==='done'?'✓':String(index+1).padStart(2,'0')}</span><small>{label}</small></li>)}</ol></div>
        {progress.complete ? <WorkshopResult craft={craft} answers={progress.answers} onRestart={restartCraft} onReturn={returnToChapter} onChangeCraft={() => { setShowCraftSelector(true); setRevisionNotice(false) }}/> : <WorkshopStage craft={craft} stage={stage} stageIndex={progress.stepIndex} answerId={progress.answers[stage.id]} onChoose={chooseOption} onContinue={continueStage} onBack={goBack} onChangeCraft={() => { setShowCraftSelector(true); setRevisionNotice(false) }} hasLaterAnswers={revisionNotice}/>}
        </>}
      </div>}
      <p className="workshop-safety-note">Учебная модель показывает только общие связи между материалами и ремёслами. Это не руководство по практическому изготовлению предметов.</p>
    </div>
  </section>
}

export default WorkshopSection
