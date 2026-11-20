import { useEffect, useRef, useState } from 'react'
import { artifacts } from '../../data/frankfurt.js'

function ArtifactIllustration({ kind, large = false }) {
  return (
    <svg className={'artifact-illustration' + (large ? ' is-large' : '')} viewBox="0 0 180 150" role="img" aria-label="Стилизованная иллюстрация исторического предмета">
      <path d="M17 132c36-9 109-9 146 0" className="artifact-ground" />
      {kind === 'ledger' && <g className="artifact-ledger"><path d="m42 35 61-15 33 18-4 82-65 13-29-19Z" /><path d="m42 35 26 15 1 83m0-83 67-12M58 60l29-7m-29 17 46-12m-46 22 48-12m-49 23 41-11m7-40v51m8-55v49" /><path d="m45 37 24 13 62-12" className="artifact-cover" /><path d="M52 106c12 6 25 8 38 5m-37 4 37-7" className="artifact-script" /></g>}
      {kind === 'weight' && <g className="artifact-weight"><path d="M90 31v73M52 48h76M90 34l-38 14m38-14 38 14M51 50l-13 37h28L51 50Zm77 0-14 37h28l-14-37ZM77 106h26M69 119h42" /><path d="M41 88c3 10 23 10 27 0m41 0c4 10 24 10 28 0" className="artifact-shade" /></g>}
      {kind === 'coin' && <g className="artifact-coin"><circle cx="91" cy="77" r="47" /><circle cx="91" cy="77" r="38" /><path d="M91 47v60m-12-46c7-8 22-5 23 4 1 7-9 10-17 13s-12 9-8 16c4 9 19 10 26 2M70 77h42m-39 19h37" /><path d="M91 21v8m0 96v8m-58-56h8m100 0h8" className="artifact-rays" /></g>}
      {kind === 'document' && <g className="artifact-document"><path d="m55 23 63 7-7 88-68-6 8-89Z" /><path d="m56 32 55 6m-55 7 43 5m-45 5 48 5m-49 5 36 5m-37 6 45 5m-46 6 34 5m-35 5 45 5" /><path d="m103 92 22 2-2 21-20-3Z" className="artifact-seal" /><path d="m111 97 5 4-5 6-5-4Z" className="artifact-seal-mark" /></g>}
      <path d="M27 135h126" className="artifact-base-line" />
    </svg>
  )
}

function ArtifactExplorer() {
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!selected || !dialog) return undefined
    if (!dialog.open) dialog.showModal()
    closeButtonRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [selected])

  function closeDialog() {
    if (dialogRef.current?.open) dialogRef.current.close()
    setSelected(null)
  }

  return (
    <>
      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <button className={'artifact-object artifact-' + artifact.kind} type="button" key={artifact.id} onClick={() => setSelected(artifact)} aria-haspopup="dialog">
            <span className="artifact-object-index">{artifact.number}</span>
            <span className="artifact-object-art"><ArtifactIllustration kind={artifact.kind} /></span>
            <span className="artifact-object-copy"><small>{artifact.category}</small><strong>{artifact.title}</strong><span className="artifact-open">Рассмотреть предмет <i aria-hidden="true">↗</i></span></span>
          </button>
        ))}
      </div>
      <p className="artifact-caveat">Иллюстрации показывают типы предметов, а не конкретные атрибутированные находки.</p>

      <dialog className="artifact-dialog" ref={dialogRef} onCancel={(event) => { event.preventDefault(); closeDialog() }} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) closeDialog() }} aria-labelledby="artifact-dialog-title">
        {selected && (
          <div className="artifact-dialog-inner">
            <button ref={closeButtonRef} className="artifact-close" type="button" onClick={closeDialog} aria-label="Закрыть подробности предмета">×</button>
            <div className="artifact-dialog-art"><ArtifactIllustration kind={selected.kind} large /></div>
            <div className="artifact-dialog-copy">
              <p className="eyebrow">{selected.category}</p>
              <h3 id="artifact-dialog-title">{selected.title}</h3>
              <p className="artifact-date">{selected.date}</p>
              <dl><div><dt>Материал</dt><dd>{selected.material}</dd></div></dl>
              <p>{selected.context}</p>
              <div className="artifact-detail-columns"><div><strong>Как использовали</strong><p>{selected.use}</p></div><div><strong>Что это открывает</strong><p>{selected.reveals}</p></div></div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}

export default ArtifactExplorer
