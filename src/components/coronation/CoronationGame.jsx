import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { coronationChapters, coronationSources } from '../../data/coronation.js'
import CoronationChallenge from './CoronationChallenge.jsx'
import CoronationChapterNavigation from './CoronationChapterNavigation.jsx'
import CoronationIntro from './CoronationIntro.jsx'
import CoronationEpilogue from './CoronationEpilogue.jsx'
import CoronationScene from './CoronationScene.jsx'
import './CoronationGame.css'

const storageKey='across-empire:aachen-coronation:v1'
const historicalAnchors={arrival:'aachen-coronation-timeline',city:'aachen-chapel',symbols:'aachen-discoveries',ceremony:'aachen-coronation-timeline',meaning:'aachen-coronation-timeline'}
const historyLinkLabels={arrival:'Сопоставить с временной шкалой Аахена',city:'Вернуться к архитектуре и местам города',symbols:'Вернуться к предметам и открытиям',ceremony:'Открыть хронологию коронаций',meaning:'Перечитать историческое объяснение'}
const initialState={started:false,currentId:coronationChapters[0].id,completed:[],answers:{},discovered:{},challengeState:{},challengesCompleted:[]}

function loadProgress(){
  try {
    const saved=JSON.parse(sessionStorage.getItem(storageKey)||'null')
    if(!saved)return initialState
    return {started:Boolean(saved.started),currentId:coronationChapters.some((item)=>item.id===saved.currentId)?saved.currentId:initialState.currentId,completed:Array.isArray(saved.completed)?saved.completed.filter((id)=>coronationChapters.some((item)=>item.id===id)):[],answers:saved.answers&&typeof saved.answers==='object'?saved.answers:{},discovered:saved.discovered&&typeof saved.discovered==='object'?saved.discovered:{},challengeState:saved.challengeState&&typeof saved.challengeState==='object'?saved.challengeState:{},challengesCompleted:Array.isArray(saved.challengesCompleted)?saved.challengesCompleted.filter((id)=>coronationChapters.some((item)=>item.id===id)):[]}
  } catch { return initialState }
}

function CoronationGame(){
  const [progress,setProgress]=useState(loadProgress)
  const [mobileNavOpen,setMobileNavOpen]=useState(false)
  const [selectedNotes,setSelectedNotes]=useState({})
  const chapter=useMemo(()=>coronationChapters.find((item)=>item.id===progress.currentId)||coronationChapters[0],[progress.currentId])
  const discoveries=progress.discovered[chapter.id]||[]
  const challengeState=progress.challengeState[chapter.id]||{}
  const completed=progress.completed
  const challengesCompleted=progress.challengesCompleted
  const chapterIndex=coronationChapters.findIndex((item)=>item.id===chapter.id)
  const isFinal=chapterIndex===coronationChapters.length-1
  const journeyFinished=isFinal&&completed.includes(chapter.id)&&coronationChapters.every((item)=>challengesCompleted.includes(item.id))
  const challengePassed=challengesCompleted.includes(chapter.id)
  const canComplete=challengePassed&&(!isFinal||coronationChapters.every((item)=>challengesCompleted.includes(item.id)))

  useEffect(()=>{try{sessionStorage.setItem(storageKey,JSON.stringify(progress))}catch{/* Session storage can be unavailable in private contexts. */}},[progress])

  function selectChapter(id){
    const index=coronationChapters.findIndex((item)=>item.id===id)
    if(index<0||(index>0&&!completed.includes(coronationChapters[index-1].id)))return
    setProgress((old)=>({...old,started:true,currentId:id}))
    setMobileNavOpen(false)
    window.scrollTo({top:0,behavior:'smooth'})
  }
  function updateChallenge(value){setProgress((old)=>({...old,challengeState:{...old.challengeState,[chapter.id]:value}}))}
  function markChallengePassed(){setProgress((old)=>({...old,challengesCompleted:old.challengesCompleted.includes(chapter.id)?old.challengesCompleted:[...old.challengesCompleted,chapter.id]}))}
  function discoverScene(index){setSelectedNotes((old)=>({...old,[chapter.id]:index}));setProgress((old)=>{const found=Array.from(new Set([...(old.discovered[chapter.id]||[]),index]));const challenges=chapter.id==='city'&&found.length===chapter.sceneNotes.length&&!old.challengesCompleted.includes(chapter.id)?[...old.challengesCompleted,chapter.id]:old.challengesCompleted;return {...old,discovered:{...old.discovered,[chapter.id]:found},challengesCompleted:challenges}})}
  function completeChapter(){
    if(!challengePassed)return
    const next=coronationChapters[chapterIndex+1]
    setProgress((old)=>({...old,completed:old.completed.includes(chapter.id)?old.completed:[...old.completed,chapter.id],currentId:next?.id||chapter.id}))
    if(next)window.scrollTo({top:0,behavior:'smooth'})
  }
  function resetJourney(){setProgress({...initialState,started:true});window.scrollTo({top:0,behavior:'smooth'})}

  if(!progress.started)return <CoronationIntro started={completed.length>0||Object.keys(progress.discovered).length>0||Object.keys(progress.answers).length>0} completedCount={completed.length} onStart={()=>setProgress((old)=>({...old,started:true}))}/>

  return <main className="coronation-game">
    <header className="game-header"><Link className="game-wordmark" to="/place/aachen"><span className="wordmark-seal">A<br/>✥</span><span><strong>CHRONICA AQUISGRANI</strong><small>КОРОНАЦИЯ КАРЛА V · 1520</small></span></Link><div className="game-header-center"><span>ИСТОРИЧЕСКОЕ ПУТЕШЕСТВИЕ</span><i>✥</i><span>ААХЕН</span></div><Link className="game-exit" to="/place/aachen#aachen-coronation-timeline">К исторической главе <span aria-hidden="true">↗</span></Link></header>
    <div className="game-mobile-toolbar"><button type="button" aria-expanded={mobileNavOpen} aria-controls="game-chapter-nav" onClick={()=>setMobileNavOpen((open)=>!open)}>{mobileNavOpen?'Скрыть главы':'Главы пути'}<span>{challengesCompleted.length}/5　{mobileNavOpen?'−':'+'}</span></button></div>
    <div className="game-layout"><aside id="game-chapter-nav" className={'game-sidebar'+(mobileNavOpen?' is-open':'')}><CoronationChapterNavigation chapters={coronationChapters} currentId={chapter.id} completed={completed} challengeCompleted={challengesCompleted} onSelect={selectChapter}/><div className="sidebar-return"><span className="sidebar-rune">✥</span><p>Избрание — во Франкфурте.<br/>Коронация — в Аахене.</p><Link to="/place/aachen#aachen-places">Исследовать места города ↗</Link></div></aside>
      <div className="game-content"><div className="game-chapter-topline"><span>КНИГА II · {chapter.place.toUpperCase()}</span><button type="button" onClick={()=>setProgress((old)=>({...old,started:false}))}>К началу <span aria-hidden="true">↗</span></button></div><div className="game-chapter-heading" key={chapter.id}><div><p className="game-eyebrow">ГЛАВА {chapter.number} · {chapter.shortTitle.toUpperCase()}</p><h1>{chapter.title}</h1></div><span className="chapter-seal">{chapter.number}<small>· MDXX ·</small></span></div>
      <p className="game-chapter-lead">{chapter.lead}</p>
      <div className="game-chapter-grid" key={chapter.id}><div className="game-reading-column"><CoronationScene chapter={chapter} discovered={discoveries} activeNote={selectedNotes[chapter.id]??(discoveries.length?discoveries[discoveries.length-1]:null)} onDiscover={discoverScene}/><div className="game-narrative"><span className="narrative-initial" aria-hidden="true">{chapter.number}</span><div>{chapter.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div></div></div><aside className="game-choice-column"><div className="game-field-note"><span className="field-note-mark">✣</span><small>ЗАМЕТКА ИССЛЕДОВАТЕЛЯ</small><p>Каждое испытание можно перепройти. Ошибка показывает, что ещё стоит изучить; она не меняет исторический исход.</p></div><CoronationChallenge chapter={chapter} value={challengeState} onChange={updateChallenge} onPass={markChallengePassed} passed={challengePassed} discovered={discoveries}/><div className="game-evidence"><small>ИСТОЧНИКИ ЭТОЙ ГЛАВЫ</small>{chapter.id==='ceremony'?<a href={coronationSources[3].url} target="_blank" rel="noreferrer">Хартман Маурус · описание 1523 года ↗</a>:chapter.id==='arrival'?<><a href={coronationSources[6].url} target="_blank" rel="noreferrer">DHM · выборы 1519 года ↗</a><a href={coronationSources[7].url} target="_blank" rel="noreferrer">Rijksmuseum · Максимилиан I ↗</a></>:<a href={coronationSources[0].url} target="_blank" rel="noreferrer">Centre Charlemagne · Карл V в Аахене ↗</a>}<a href={coronationSources[1].url} target="_blank" rel="noreferrer">Аахенский собор · историческая справка ↗</a><Link className="game-history-link" to={`/place/aachen#${historicalAnchors[chapter.id]}`}>{historyLinkLabels[chapter.id]} ↗</Link></div></aside></div>
      <div className="game-continue-row"><div className="game-readiness" aria-live="polite"><span className={challengePassed?'is-ready':''}>{challengePassed?'✦':'◌'}</span>{journeyFinished?'Все пять испытаний завершены. Источники остаются доступны ниже.':challengePassed&&!isFinal?'Испытание пройдено — можно продолжить':challengePassed&&isFinal?'Финальное испытание пройдено. Вернитесь к непройденным главам или завершите весь путь.':chapter.id==='city'?`Открыто мест: ${discoveries.length} / ${chapter.sceneNotes.length}`:'Выполните испытание, чтобы открыть следующую главу.'}</div><button type="button" className="coronation-primary-button game-continue" disabled={!canComplete||journeyFinished} onClick={completeChapter}>{journeyFinished?'Путешествие завершено':chapter.completeLabel}<span aria-hidden="true">{journeyFinished?'✓':'→'}</span></button></div>
      {journeyFinished&&<CoronationEpilogue onReplay={resetJourney}/>}
      <footer className="game-footer"><span>ИСТОРИЯ · ИСТОЧНИКИ · РЕКОНСТРУКЦИЯ</span><span>Иллюстрации — авторские схемы; не точные изображения событий.</span><details><summary>Все источники</summary><ul>{coronationSources.map((source)=><li key={source.title}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><p>{source.note}</p></li>)}</ul></details></footer>
      </div></div>
  </main>
}

export default CoronationGame
