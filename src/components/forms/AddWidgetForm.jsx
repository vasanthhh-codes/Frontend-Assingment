import React, { useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'

export default function AddWidgetForm({ open, onClose, category }) {
  const { addWidget } = useDashboard()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    addWidget(category.id, { title: title.trim(), text: text.trim() || '—' })
    setTitle('')
    setText('')
    onClose()
  }

  return (
    <div className="drawer open" role="dialog" aria-modal="true">
      <div className="drawer-head">
        <div style={{fontWeight:700}}>Add Widget to “{category.name}”</div>
        <button onClick={onClose}>✕</button>
      </div>
      <form className="drawer-body" onSubmit={submit}>
        <label>
          <div className="muted" style={{marginBottom: 6}}>Widget Name</div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Compliance Overview" required />
        </label>
        <label>
          <div className="muted" style={{marginBottom: 6}}>Widget Text</div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Random text for the widget..." rows={4} />
        </label>
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button type="button" className="ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary">Add Widget</button>
        </div>
      </form>
    </div>
  )
}