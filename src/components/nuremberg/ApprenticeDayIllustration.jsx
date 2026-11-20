function ApprenticeDayIllustration({ scene }) {
  return <figure className={'apprentice-illustration art-' + scene.illustration}>
    <svg viewBox="0 0 760 310" role="img" aria-labelledby={'day-art-title-' + scene.id}>
      <title id={'day-art-title-' + scene.id}>{scene.title} — авторская иллюстрация проекта</title>
      <rect width="760" height="310" fill="var(--day-art-bg)"/>
      <path d="M17 18h726v274H17z" fill="none" stroke="var(--day-art-ink)" strokeWidth="2"/>
      <path d="M25 26h710v258H25z" fill="none" stroke="var(--day-art-accent)" strokeWidth="1"/>
      <g className="day-art-scene" stroke="var(--day-art-ink)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {scene.illustration === 'morning' && <>
          <circle cx="576" cy="85" r="35" fill="#b87b45" stroke="none"/><path d="M0 213 92 150l76 62 98-90 92 87 94-64 96 71 105-99 107 84v99H0Z" fill="#7b6850"/>
          <path d="M0 245h760v45H0Z" fill="#4c4a3d" stroke="none"/><path d="m95 208 72-63 75 63v82H95Zm198 0 65-52 68 52v82H293Zm220-2 62-65 66 65v81H513Z" fill="#b59567"/>
          <path d="m85 210 82-76 83 76m35 0 73-64 76 64m68-3 69-77 71 77" fill="#684c3a"/><path d="M127 241h23v49h-23m73-49h20v49h-20m102-45h20v45h-20m57-45h19v45h-19m95-51h21v51h-21m67-51h20v51h-20" fill="#464338"/>
          <path d="M41 61h117M61 47v30m-19-15h37m590-2h-47m24-24v50" fill="none" stroke="#74593c" strokeWidth="2"/>
        </>}
        {scene.illustration === 'workshop' && <>
          <path d="M76 240h610v24H76Zm43-17v-99h517v99M155 126h445" fill="#78543b"/>
          <path d="M206 126V70h106v56m-92 0V82h78v44" fill="#b38d5e"/><path d="M227 241v39m310-39v39m69-39v39" fill="#674730"/>
          <path d="m230 198 111-28m-94 51 137-42m72 34 74-83m-25-13 26 14-6 25m74 13-33-44-17 53m48-55 34 52" fill="none" stroke="#38382f" strokeWidth="8"/>
          <path d="M335 224q25-19 50 0t50 0" fill="none" stroke="#a36643" strokeWidth="9"/><circle cx="466" cy="180" r="19" fill="#c59457"/><path d="M463 160v-37m-11 7 11-19 11 19" fill="none" stroke="#a66d40" strokeWidth="3"/>
        </>}
        {scene.illustration === 'craft' && <>
          <path d="M111 252h538" stroke="#78543b" strokeWidth="18"/><path d="M158 243V92h190v151m-172 0V111h154v132" fill="#b59a70"/>
          <path d="M192 147h116v80H192Z" fill="#dfd0b0"/><path d="M214 210v-44h72v44m-64-12h56" fill="none" stroke="#6a4c37"/>
          <path d="M430 92h171v151H430Z" fill="#d9c8a5"/><path d="M464 123h100v102H464Z" fill="#efe4cd"/><path d="m478 200 25-52 25 35 22-18v48h-72Z" fill="#7a4f3e"/>
          <path d="M394 106v111m-26-15h52m-42 0 16 52 16-52" fill="none" stroke="#684a35" strokeWidth="8"/><circle cx="394" cy="111" r="23" fill="none" stroke="#986c43" strokeWidth="5"/>
          <path d="M99 269h571" stroke="#4d4538" strokeWidth="2"/>
        </>}
        {scene.illustration === 'market' && <>
          <path d="M66 248h628v36H66Zm37-5V131h170v112m186 0V131h170v112" fill="#896544"/>
          <path d="M86 136h204l-18-48H106Zm354 0h204l-19-48H457Z" fill="#8c493b"/><path d="m117 92 25 44m23-44 24 44m24-44 24 44m245-44 25 44m23-44 24 44m24-44 24 44" stroke="#ead8b6" strokeWidth="3"/>
          <path d="M77 241h206m151 0h207" stroke="#45382a" strokeWidth="5"/><path d="M126 193q18-29 36 0m-27 0q18-28 36 0m244 0q18-29 36 0m-27 0q18-28 36 0" fill="#a25e3c" stroke="#63412e"/>
          <circle cx="179" cy="182" r="15" fill="#758050"/><circle cx="216" cy="184" r="13" fill="#b08040"/><circle cx="501" cy="181" r="15" fill="#8b493b"/><circle cx="540" cy="185" r="13" fill="#77804a"/>
          <path d="M319 240v-77m-19 17q19-37 38 0m-19-28v-24" fill="none" stroke="#4f4030" strokeWidth="8"/><circle cx="319" cy="143" r="18" fill="#c2a47a"/><path d="M297 222h45" stroke="#524130" strokeWidth="7"/>
        </>}
        {scene.illustration === 'community' && <>
          <path d="M69 250h622v39H69Z" fill="#71614a"/><path d="M118 249V111h190v138Z" fill="#c1a477"/><path d="m103 114 111-72 110 72" fill="#76543c"/><path d="M170 180h86v69h-86Zm-36-27h25v34h-25m143-34h18v34h-18" fill="#4d4538"/>
          <path d="M447 249V146h132v103Z" fill="#d2ba8d"/><path d="m434 148 79-49 79 49" fill="#83563b"/><path d="M481 175h62v74h-62Z" fill="#eee2c7"/><path d="M511 175v74m-30-38h62" stroke="#836541" strokeWidth="2"/>
          <path d="M399 265q-30-37-60 0m60 0q30-37 60 0" fill="none" stroke="#9e6945" strokeWidth="4"/><circle cx="399" cy="234" r="10" fill="#9e6945"/>
          <path d="M214 42V19m-13 13h26m357 18V28m-13 11h26" fill="none" stroke="#8b6a45" strokeWidth="2"/>
        </>}
        {scene.illustration === 'evening' && <>
          <circle cx="560" cy="112" r="48" fill="#a85d42" stroke="none"/><path d="M0 223 79 174l65 37 99-93 100 99 82-67 76 73 93-116 83 93 83-52v139H0Z" fill="#68614c"/>
          <path d="M0 245h760v45H0Z" fill="#3e423b" stroke="none"/><path d="m82 230 74-54 75 54v60H82Zm194 0 65-44 68 44v60H276Zm195 0 57-65 61 65v60H471Zm174 0 48-40 50 40v60h-98Z" fill="#9b7853"/>
          <path d="m71 231 85-69 87 69m20 0 77-57 78 57m41 0 64-75 64 75m44 0 58-51 60 51" fill="#493b32"/><path d="M115 250h23v40h-23m113-41h19v41h-19m87-44h20v44h-20m73-44h20v44h-20m87-43h20v43h-20m67-43h20v43h-20m64-41h19v41h-19" fill="#413f38"/>
          <path d="M31 286h698" stroke="#b18b57" strokeWidth="2"/><path d="M40 270h80m-55-8v35m629-27h-80m56-8v35" fill="none" stroke="#8d6e46" strokeWidth="2"/>
        </>}
      </g>
      <text x="40" y="54" className="day-art-inscription">NORIMBERGA · 1519</text>
    </svg>
    <figcaption>Авторская иллюстрация · художественная реконструкция</figcaption>
  </figure>
}

export default ApprenticeDayIllustration
