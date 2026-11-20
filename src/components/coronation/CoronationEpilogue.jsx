import { Link } from 'react-router-dom'

function CoronationEpilogue({ onReplay }) {
  return <section className="coronation-epilogue" aria-labelledby="epilogue-title">
    <div className="epilogue-engraving">
      <svg viewBox="0 0 1000 430" role="img" aria-labelledby="epilogue-art-title epilogue-art-desc">
        <title id="epilogue-art-title">Аахенский собор и коронационный трон</title>
        <desc id="epilogue-art-desc">Авторская схема соборного интерьера: восьмиугольная капелла, аркады, трон и корона под расходящимися лучами.</desc>
        <defs>
          <linearGradient id="epilogue-stone" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d8c79b"/><stop offset="1" stopColor="#706c58"/></linearGradient>
          <radialGradient id="epilogue-light"><stop stopColor="#c5a563" stopOpacity=".35"/><stop offset="1" stopColor="#c5a563" stopOpacity="0"/></radialGradient>
          <pattern id="epilogue-hatch" width="11" height="11" patternUnits="userSpaceOnUse"><path d="M0 11 11 0" stroke="#e3d1a6" strokeOpacity=".1"/></pattern>
        </defs>
        <rect width="1000" height="430" fill="url(#epilogue-light)"/>
        <g fill="none" stroke="url(#epilogue-stone)" strokeWidth="4" strokeLinejoin="round">
          <path d="M46 400V185q0-105 142-105t142 105v215M64 191q0-83 124-83t124 83M82 205q0-59 106-59t106 59"/>
          <path d="M352 400V130q0-79 148-79t148 79v270M373 139q0-59 127-59t127 59M397 156q0-38 103-38t103 38"/>
          <path d="M652 400V185q0-105 142-105t142 105v215M670 191q0-83 124-83t124 83M688 205q0-59 106-59t106 59"/>
          <path d="M46 350h248m58 0h296m58 0h238M110 400V228q0-54 58-54t58 54v172m76 0V228q0-54 58-54t58 54v172m256 0V228q0-54 58-54t58 54v172m76 0V228q0-54 58-54t58 54v172"/>
        </g>
        <circle cx="500" cy="149" r="119" fill="url(#epilogue-light)"/>
        <g fill="none" stroke="#c9ad70" strokeWidth="2" opacity=".8">
          <path d="M500 34v64M438 47l34 57m-93-20 62 41m-86 30 68 5m239-106-34 57m93-20-62 41m86 30-68 5"/>
          <circle cx="500" cy="151" r="83" strokeDasharray="2 8"/>
        </g>
        <g fill="#b39453" stroke="#ead9ad" strokeWidth="2" strokeLinejoin="round">
          <path d="m465 195 9-38 19 23 7-45 13 45 19-23 9 38Zm2 0h64v9h-64zm9 14v47h46v-47m-56 47h66v10h-66z"/>
          <circle cx="474" cy="154" r="4"/><circle cx="500" cy="130" r="4"/><circle cx="526" cy="154" r="4"/>
        </g>
        <path d="M18 18h964v394H18z" fill="url(#epilogue-hatch)" stroke="#c5a563" strokeOpacity=".45"/>
        <path d="M31 31h938v368H31z" fill="none" stroke="#d6c398" strokeOpacity=".28"/>
        <text x="50" y="64" fill="#e5d5ad" fontFamily="serif" fontSize="13" letterSpacing="4">AQVISGRANVM · CORONATIO REGIS · MDXX</text>
        <text x="950" y="385" fill="#dfcea4" fontFamily="serif" fontSize="11" letterSpacing="2" textAnchor="end">SCHEMA ARTISTICVM</text>
      </svg>
    </div>
    <div className="epilogue-copy">
      <p className="game-eyebrow">CHRONICA FINITA · ПУТЬ ПРОЙДЕН</p>
      <h2 id="epilogue-title">Корона завершила обряд.<br/><em>Традиция продолжилась.</em></h2>
      <p className="epilogue-lead">23 октября 1520 года Карл V был коронован в Аахене как король Германии. Это была не церемония избрания и не папская коронация императором.</p>
      <div className="epilogue-date-line" aria-label="Избрание во Франкфурте в 1519 году, коронация в Аахене в 1520 году, императорская коронация в Болонье в 1530 году"><span><small>ФРАНКФУРТ</small><strong>1519</strong><i>избрание</i></span><b aria-hidden="true">→</b><span><small>ААХЕН</small><strong>1520</strong><i>коронация короля</i></span><b aria-hidden="true">→</b><span><small>БОЛОНЬЯ</small><strong>1530</strong><i>императорская коронация</i></span></div>
      <p className="epilogue-meaning">Выбор курфюрстов, религиозный обряд и память о коронационном месте складывались в разные, но связанные основания власти. Посетитель исследовал эту историю — не менял её.</p>
    </div>
    <div className="epilogue-discoveries"><div className="epilogue-discoveries-heading"><span>✥</span><div><small>ВАШИ ИСТОРИЧЕСКИЕ ОТКРЫТИЯ</small><h3>Пять глав одного города</h3></div></div><ol>
      <li><span>I</span><p><strong>Хронология</strong>Смерть Максимилиана → избрание Карла → коронация.</p></li>
      <li><span>II</span><p><strong>Город</strong>Собор, капелла, ратуша, святыни и рынок в разных эпохах.</p></li>
      <li><span>III</span><p><strong>Знаки власти</strong>Регалии и одеяние — в рассказе Мауруса; трон — также часть памяти и традиции.</p></li>
      <li><span>IV</span><p><strong>Обряд</strong>Письменное свидетельство о символах, клятве и возведении на трон.</p></li>
      <li><span>V</span><p><strong>Легитимность</strong>Избрание, коронация короля и императорская коронация — не одно событие.</p></li>
    </ol></div>
    <div className="epilogue-actions"><Link className="epilogue-history-link" to="/place/aachen#aachen-coronation-timeline">Продолжить в исторической главе Аахена <span aria-hidden="true">↗</span></Link><button type="button" onClick={onReplay}>Пройти путешествие снова <span aria-hidden="true">↻</span></button></div>
    <p className="epilogue-caption">Авторская иллюстративная схема · не изображение реального момента коронации</p>
  </section>
}

export default CoronationEpilogue
