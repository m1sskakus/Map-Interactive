import { useEffect, useRef, useState } from 'react'
import { apprenticeScenes } from '../../data/nurembergApprenticeDay.js'
import ApprenticeDayIllustration from './ApprenticeDayIllustration.jsx'
import './ApprenticeDayStory.css'

function ApprenticeDayStory() {
  const [started, setStarted] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const headingRef = useRef(null)
  const scene = apprenticeScenes[sceneIndex]
  const selectedChoiceId = answers[scene.id]
  const selectedChoice = scene.choices?.find((item) => item.id === selectedChoiceId)
  const isEnding = sceneIndex === apprenticeScenes.length - 1

  useEffect(() => {
    if (started) headingRef.current?.focus()
  }, [sceneIndex, started])

  function startStory() {
    setStarted(true)
    setSceneIndex(0)
  }

  function chooseOption(choiceId) {
    setAnswers((current) => ({ ...current, [scene.id]: choiceId }))
  }

  function goToScene(index) {
    if (index < 0 || index >= apprenticeScenes.length || index > sceneIndex) return
    setSceneIndex(index)
  }

  function continueStory() {
    if (scene.choices && !selectedChoiceId) return
    setSceneIndex((current) => Math.min(current + 1, apprenticeScenes.length - 1))
  }

  function restartStory() {
    setAnswers({})
    setSceneIndex(0)
  }

  const chosenFocuses = apprenticeScenes
    .map((item) => item.choices?.find((choice) => choice.id === answers[item.id])?.focus)
    .filter(Boolean)

  return <section className="apprentice-day" id="n-apprentice-day" aria-labelledby="apprentice-day-title">
    <div className="page-wrap apprentice-day-wrap">
      <div className="apprentice-day-heading">
        <div><p className="eyebrow"><span>VI</span> DIES ARTIFICIS · 1519</p><h2 id="apprentice-day-title">Один день <em>ученика</em></h2></div>
        <p>История города — это ещё и ежедневный труд людей, чьих имён хроники могли не сохранить.</p>
      </div>

      {!started ? <div className="apprentice-intro">
        <ApprenticeDayIllustration scene={apprenticeScenes[0]}/>
        <div className="apprentice-intro-copy">
          <p className="eyebrow">HISTORIA VIVIT · ИЛЛЮСТРАТИВНАЯ ИСТОРИЯ</p>
          <h3>Прожить день в Нюрнберге</h3>
          <p>Пройди через мастерскую, городской рынок и общие пространства глазами безымянного ученика около 1519 года.</p>
          <p className="apprentice-fiction-note">Персонаж и личные события вымышлены. Исторический контекст основан на исследованиях; точный распорядок дня, маршрут и разговоры неизвестны.</p>
          <button type="button" className="apprentice-primary" onClick={startStory}>Начать день <span aria-hidden="true">→</span></button>
        </div>
      </div> : <div className="apprentice-reader">
        <div className="apprentice-reader-top">
          <span>ИСТОРИЯ · {String(sceneIndex + 1).padStart(2, '0')} / {String(apprenticeScenes.length).padStart(2, '0')}</span>
          <span>{scene.period}</span>
        </div>
        <div className="apprentice-progress" role="progressbar" aria-label="Прогресс истории об ученике" aria-valuemin={1} aria-valuemax={apprenticeScenes.length} aria-valuenow={sceneIndex + 1}>
          <span style={{ width: ((sceneIndex + 1) / apprenticeScenes.length * 100) + '%' }}/>
        </div>
        <nav className="apprentice-scene-nav" aria-label="Сцены истории">
          {apprenticeScenes.map((item, index) => <button key={item.id} type="button" disabled={index > sceneIndex} aria-current={index === sceneIndex ? 'step' : undefined} onClick={() => goToScene(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span><b>{item.period}</b>
          </button>)}
        </nav>

        <div className="apprentice-scene-layout">
          <ApprenticeDayIllustration scene={scene}/>
          <article className="apprentice-scene-copy" aria-live="polite">
            <p className="eyebrow">{scene.period} · НЮРНБЕРГ</p>
            <h3 ref={headingRef} tabIndex={-1}>{scene.title}</h3>
            <div className="apprentice-prose">{scene.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>

            {scene.choices && <div className="apprentice-choice-group">
              <p className="apprentice-choice-prompt">{scene.prompt}</p>
              <div className="apprentice-choice-list">{scene.choices.map((choice, index) => <button key={choice.id} type="button" aria-pressed={selectedChoiceId === choice.id} onClick={() => chooseOption(choice.id)}>
                <span>{String.fromCharCode(65 + index)}</span>{choice.label}<b aria-hidden="true">{selectedChoiceId === choice.id ? '✓' : '↗'}</b>
              </button>)}</div>
              {selectedChoice && <p className="apprentice-choice-response" aria-live="polite"><strong>Твой взгляд меняет акцент:</strong> {selectedChoice.response}</p>}
            </div>}

            {isEnding && <div className="apprentice-ending-reflection" aria-live="polite"><small>ТЫ ЗАМЕТИЛ В ЭТОТ ДЕНЬ</small><p>{chosenFocuses.join(' · ')}.</p><span>Выборы определили акценты рассказа; исторические события и общий финал для всех одинаковы.</span></div>}

            <aside className="apprentice-historical-note"><span aria-hidden="true">✳</span><p>{scene.historicalNote}</p></aside>
            {scene.link && <div className="apprentice-crosslink"><a href={scene.link.href}>{scene.link.label} <span aria-hidden="true">↗</span></a><p>{scene.link.note}</p></div>}
          </article>
        </div>

        <div className="apprentice-reader-controls">
          {isEnding ? <>
            <button type="button" className="apprentice-back" onClick={() => goToScene(sceneIndex - 1)}>← Предыдущая сцена</button>
            <div className="apprentice-ending-actions"><button type="button" className="apprentice-restart" onClick={restartStory}>Начать заново ↺</button><a href="#n-title" className="apprentice-return">Вернуться к главе Нюрнберга ↑</a></div>
          </> : <>
            <button type="button" className="apprentice-back" onClick={() => goToScene(sceneIndex - 1)} disabled={sceneIndex === 0}>← Предыдущая сцена</button>
            <div className="apprentice-next-wrap">{scene.choices && !selectedChoiceId && <span>Выбери, на что обратить внимание, чтобы продолжить.</span>}<button type="button" className="apprentice-primary" onClick={continueStory} disabled={Boolean(scene.choices && !selectedChoiceId)}>Продолжить <span aria-hidden="true">→</span></button></div>
          </>}
        </div>
      </div>}
      <p className="apprentice-footer-note">Учебный рассказ с авторскими иллюстрациями. Образ героя, личные события, последовательность сцен и визуальные детали — реконструкция проекта.</p>
    </div>
  </section>
}

export default ApprenticeDayStory
