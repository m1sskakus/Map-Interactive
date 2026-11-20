function CoronationChapterNavigation({ chapters, currentId, completed, challengeCompleted = [], onSelect, compact = false }) {
  return <nav className={'chapter-navigation'+(compact?' is-compact':'')} aria-label="Главы коронационного путешествия"><span className="chapter-nav-label">ПУТЬ К КОРОНЕ</span><ol>{chapters.map((chapter,index)=>{
    const isDone=challengeCompleted.includes(chapter.id)
    const isVisited=completed.includes(chapter.id)
    const isLocked=index>0&&!completed.includes(chapters[index-1].id)
    return <li key={chapter.id}><button type="button" className={(currentId===chapter.id?'is-current ':'')+(isDone?'is-complete ':'')+(isVisited&&!isDone?'is-visited ':'')+(isLocked?'is-locked':'')} disabled={isLocked} aria-current={currentId===chapter.id?'step':undefined} aria-label={`${chapter.number}. ${chapter.title}${isDone?', испытание завершено':isVisited?', глава посещена':''}${isLocked?', заблокирована':''}`} onClick={()=>onSelect(chapter.id)}><span className="chapter-step-mark">{isDone?'✓':chapter.number}</span><span className="chapter-step-copy"><small>{isDone?'ИСПЫТАНИЕ ПРОЙДЕНО':isVisited?'ГЛАВА ПРОЙДЕНА':`ГЛАВА ${chapter.number}`}</small><strong>{compact?chapter.shortTitle:chapter.title}</strong></span><i aria-hidden="true">{isDone?'✓':isLocked?'·':'↗'}</i></button></li>
  })}</ol><div className="chapter-progress-label"><span>ИСПЫТАНИЯ</span><strong>{challengeCompleted.length} / {chapters.length}</strong></div><div className="chapter-progress-track" role="progressbar" aria-label="Прогресс испытаний" aria-valuemin="0" aria-valuemax={chapters.length} aria-valuenow={challengeCompleted.length}><span style={{width:`${challengeCompleted.length/chapters.length*100}%`}}/></div></nav>
}

export default CoronationChapterNavigation
