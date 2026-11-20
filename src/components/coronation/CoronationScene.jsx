const motifs = {
  arrival: <><path d="M30 285h440M70 285v-90l52-45 52 45v90m180 0V122l58-55 58 55v163M205 285V175l45-48 45 48v110"/><path d="M211 126q39-63 78 0M340 122q40-54 80 0"/><path d="M30 300q90-30 170 0t170 0 140 0"/><circle cx="250" cy="248" r="27"/><path d="M250 275v-51m-16 29h32"/></>,
  city: <><path d="M48 292V155l70-54 70 54v137m-120-98h100m-83-39v-28h66v28m-47 137v-55q0-25 22-25t22 25v55"/><path d="M202 292V139q48-62 96 0v153m-85-147q37-45 74 0m-66 28h58m-50 42h42m-69 59h92"/><path d="M330 292V175l55-48 55 48v117m-107-89h104m-79-24v-28h48v28m-30 141v-53q0-21 20-21t20 21v53"/><path d="M30 302h440"/></>,
  symbols: <><path d="m250 55 34 39 42-4-4 42 39 34-39 34 4 42-42-4-34 39-34-39-42 4 4-42-39-34 39-34-4-42 42 4Z"/><path d="M210 165h80v78h-80zm-12-18h104m-89-20q37-55 74 0m-44 56v48m20-48v48"/><circle cx="250" cy="194" r="16"/><path d="M170 277h160M185 291h130"/></>,
  ceremony: <><path d="M70 296V156h360v140M90 156l160-94 160 94M110 156v140m280-140v140M180 296V186q0-54 70-54t70 54v110"/><path d="M213 185h74v40h-74zm9-18q28-37 56 0m-53 77h68m-83 20h98"/><path d="M155 296v-70m190 70v-70"/><circle cx="250" cy="203" r="10"/></>,
  meaning: <><circle cx="250" cy="190" r="120"/><circle cx="250" cy="190" r="98"/><path d="M250 55v270M115 190h270M155 95l190 190m0-190L155 285"/><path d="m250 97 20 24h28l-3 29 25 20-25 20 3 29h-28l-20 24-20-24h-28l3-29-25-20 25-20-3-29h28Z"/><path d="M227 187h46v54h-46zm-9-10h64m-49-12q17-28 34 0"/></>,
}

function CoronationScene({ chapter, discovered, activeNote, onDiscover }) {
  return <section className={'coronation-scene scene-'+chapter.tone} aria-label={chapter.scene}>
    <div className="scene-engraving" aria-hidden="true"><svg viewBox="0 0 500 350"><defs><pattern id="scene-hatch" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 10 0" stroke="currentColor" strokeOpacity=".12"/></pattern></defs><rect x="12" y="12" width="476" height="326" fill="url(#scene-hatch)"/><g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">{motifs[chapter.id]}</g><rect x="12" y="12" width="476" height="326" fill="none" stroke="currentColor" strokeOpacity=".5"/><path d="M22 22h20M22 22v20m456-20h-20m20 0v20M22 328h20m-20 0v-20m456 20h-20m20 0v-20" fill="none" stroke="currentColor" strokeWidth="2"/></svg><span className="scene-orbit orbit-one"/><span className="scene-orbit orbit-two"/></div>
    {chapter.id==='city'&&<div className="scene-hotspots" aria-label="Точки архитектурного исследования">{chapter.sceneNotes.map((note,index)=><button key={note.title} type="button" style={{left:note.x,top:note.y}} className={discovered.includes(index)?'is-found':''} aria-label={`Исследовать: ${note.title}`} aria-pressed={activeNote===index} onClick={()=>onDiscover(index)}><span>{discovered.includes(index)?'✓':String(index+1).padStart(2,'0')}</span><small>{note.title}</small></button>)}</div>}
    <div className="scene-topline"><span>{chapter.place}</span><span>{chapter.number} · V</span></div><p className="scene-caption">{chapter.scene}</p>
    <div className={'scene-discoveries'+(chapter.id==='city'?' is-city-discoveries':'')} aria-label="Исследовать исторические детали">{chapter.sceneNotes.map((note,index)=><button type="button" key={note.title} className={discovered.includes(index)?'is-read':''} aria-pressed={activeNote===index} onClick={()=>onDiscover(index)}><span>{['✥','✣','✶'][index%3]}</span><small>{note.title}</small></button>)}</div>
    {activeNote!==null&&<div className="scene-note" aria-live="polite"><b>{chapter.sceneNotes[activeNote].title}</b><p>{chapter.sceneNotes[activeNote].text}</p></div>}
    <small className="scene-reconstruction">{chapter.id==='city'?'Схематическая перспектива · не план улиц': 'Иллюстративная схема · не реконструкция точной сцены'}</small>
  </section>
}

export default CoronationScene

