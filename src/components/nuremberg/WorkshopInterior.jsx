function WorkshopInterior({ craft, answers = {}, stageIndex = 0, completed = false }) {
  const material = craft.stages.material.find((item) => item.id === answers.material)
  const tool = craft.stages.tool.find((item) => item.id === answers.tool)
  const process = craft.stages.process.find((item) => item.id === answers.process)

  return <div className={'workshop-interior workshop-tone-' + craft.tone}>
    <svg viewBox="0 0 960 440" role="img" aria-labelledby="workshop-room-title workshop-room-desc">
      <title id="workshop-room-title">Иллюстративная реконструкция ремесленной мастерской</title>
      <desc id="workshop-room-desc">Рабочая комната с деревянными балками, окном, полками, инструментами и верстаком. Детали условны, интерьер не является документальной реконструкцией.</desc>
      <defs>
        <linearGradient id="workshop-wall" x2="0" y2="1"><stop stopColor="#554537"/><stop offset="1" stopColor="#352f29"/></linearGradient>
        <linearGradient id="workshop-window" x2="1" y2="1"><stop stopColor="#c6b587"/><stop offset="1" stopColor="#788274"/></linearGradient>
        <linearGradient id="workshop-board" x2="0" y2="1"><stop stopColor="#966b49"/><stop offset="1" stopColor="#61422f"/></linearGradient>
        <pattern id="wood-grain" width="105" height="28" patternUnits="userSpaceOnUse"><path d="M0 8c22-6 38 7 61 0s29 2 44-3M12 20c24-5 35 4 53-1" fill="none" stroke="#d6b07b" strokeOpacity=".16" strokeWidth="1"/></pattern>
      </defs>
      <rect width="960" height="440" fill="url(#workshop-wall)"/>
      <path d="M0 0h960v35H0zM0 0h34v440H0zm926 0h34v440h-34z" fill="#241f1b"/>
      <path d="M0 0h960v49H0z" fill="#70523b"/><path d="M0 41h960" stroke="#b28a5d" strokeWidth="3" opacity=".7"/>
      <path d="M74 78h204v175H74z" fill="#302b26" stroke="#a7895f" strokeWidth="7"/><path d="M87 91h178v148H87z" fill="url(#workshop-window)"/><path d="M176 91v148M87 165h178" stroke="#66543c" strokeWidth="9"/><path d="M97 100q43 18 70 4v56q-30-10-70 1Zm92 0q37 13 66 4v56q-33-13-66-1Z" fill="#dfd2af" opacity=".6"/>
      <path d="M335 103h264v15H335zm18 19v96m223-96v96M334 225h266" fill="none" stroke="#987351" strokeWidth="9"/>
      <path d="M369 191h39v33h-39zm73-12h49v45h-49zm88 20h34v26h-34z" fill="#c4ae83" opacity=".8"/><path d="M375 199h27m48-7h36m-36 12h30m80 0h22" stroke="#47382c" strokeWidth="3" opacity=".72"/>
      <g className="workshop-wall-tools" fill="none" stroke="#c0a77a" strokeWidth="5" strokeLinecap="round"><path d="M670 82v71m-14-1h28m-21 0-15 35m29-35 18 29m-25-27 2 50"/><path d="M759 78v62m-16-5 33-1m-30 2 13 42m17-44-17 40"/><path d="M844 85v74m-22-50h44m-23 0-18 40m19-39 18 38"/></g>
      <path d="M0 274h960v166H0z" fill="#292521"/><path d="M77 282h806v30H77z" fill="url(#workshop-board)" stroke="#c09461" strokeWidth="3"/><path d="M77 312h806v105H77z" fill="#533b2c" stroke="#2d2520" strokeWidth="4"/><path d="M77 282h806v30H77z" fill="url(#wood-grain)"/><path d="M125 312v125m688-125v125" stroke="#38291f" strokeWidth="25"/><path d="M112 433h52m633 0h49" stroke="#bd9865" strokeWidth="7"/>
      <path d="M264 262h385v15H264z" fill="#40342b"/><path d="M291 255v-31m66 31v-31m66 31v-31m66 31v-31m66 31v-31m66 31v-31" stroke="#987653" strokeWidth="4"/>
      <g className={'workpiece ' + (completed ? 'is-complete' : '')}>
        {craft.id === 'metal' && <g><path d={completed ? 'M433 255l23-20h61l21 20-9 11h-88Z' : stageIndex >= 2 ? 'M438 262l15-24h67l15 24Z' : 'M444 262h78l-10 8h-58Z'} fill={completed ? '#b98b58' : '#8b7657'} stroke="#e1c58c" strokeWidth="3"/><path d="M453 247h59m-49 8h45" stroke="#503c2b" strokeWidth="2" opacity=".75"/></g>}
        {craft.id === 'printing' && <g><path d={completed ? 'M426 233h108v43H426z' : stageIndex >= 2 ? 'M435 241h91v35h-91z' : 'M444 249h74v27h-74z'} fill="#e1d3b3" stroke="#b58e5d" strokeWidth="3"/><path d="M446 248h64m-64 7h52m-52 7h57" stroke="#594334" strokeWidth="3"/><rect x="477" y="229" width="15" height="15" fill="#7c4437"/></g>}
        {craft.id === 'woodworking' && <g><path d={completed ? 'M430 237h102v35H430z' : stageIndex >= 2 ? 'M439 244h84v31h-84z' : 'M447 253h68v23h-68z'} fill="#9a714c" stroke="#d1a76b" strokeWidth="3"/><path d="M438 244v-12h86v12m-43-12v39" fill="none" stroke="#d1a76b" strokeWidth="3"/><path d="M454 250h50" stroke="#5b412d" strokeWidth="2"/></g>}
      </g>
      {material && <g className="workbench-token material-token"><circle cx="354" cy="265" r="26" fill="#312923" stroke="#cfad76" strokeWidth="2"/><text x="354" y="274" textAnchor="middle">{material.glyph}</text><title>Выбран материал: {material.name}</title></g>}
      {process && <g className="workbench-token process-token"><circle cx="480" cy="265" r="26" fill="#312923" stroke="#cfad76" strokeWidth="2"/><text x="480" y="274" textAnchor="middle">{process.glyph}</text><title>Выбран общий этап: {process.name}</title></g>}
      {tool && <g className="workbench-token tool-token"><circle cx="602" cy="265" r="26" fill="#312923" stroke="#cfad76" strokeWidth="2"/><text x="602" y="274" textAnchor="middle">{tool.glyph}</text><title>Выбран инструмент: {tool.name}</title></g>}
      {stageIndex >= 3 && <path d="M375 250q20-26 42 0m126 0q20-26 42 0" fill="none" stroke="#d69c55" strokeWidth="3" opacity=".9"/>}
      <text x="480" y="424" textAnchor="middle" className="workshop-svg-caption">{completed ? 'OPVS PERFECTVM · ГОТОВАЯ РАБОТА' : 'MENSА OPIFICIS · РАБОЧИЙ ВЕРСТАК'}</text>
    </svg>
    <div className="workbench-status" aria-live="polite">
      <span><small>МАТЕРИАЛ</small><b>{material?.name || 'ожидает выбора'}</b></span>
      <i aria-hidden="true">·</i>
      <span><small>ИНСТРУМЕНТ</small><b>{tool?.name || 'ожидает выбора'}</b></span>
      <i aria-hidden="true">·</i>
      <span><small>ЭТАП</small><b>{process?.name || 'ожидает выбора'}</b></span>
      <i aria-hidden="true">·</i>
      <span><small>РАБОТА</small><b>{completed ? 'завершена' : stageIndex >= 2 ? 'почти готова' : 'продолжается'}</b></span>
    </div>
  </div>
}

export default WorkshopInterior
