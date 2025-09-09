import React from 'react'
import { useDashboard } from '../../context/DashboardContext'

export default function ManageWidgets({ open, onClose, category }) {
  const { setWidgetIncluded } = useDashboard()

  if (!open) return null

  return (
    <div className="drawer open" role="dialog" aria-modal="true">
      <div className="drawer-head">
        <div style={{fontWeight:700}}>Manage Widgets in “{category.name}”</div>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="drawer-body">
        {category.widgets.length === 0 && <div className="empty">No widgets to manage. Add some first.</div>}
        {category.widgets.map(w => (
          <label key={w.id} className="checkbox-row">
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => setWidgetIncluded(category.id, w.id, e.target.checked)}
            />
            <div>
              <div style={{fontWeight:600}}>{w.title}</div>
              <div className="muted">{w.text}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}