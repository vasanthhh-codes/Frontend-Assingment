import React from 'react'
import { useDashboard } from '../context/DashboardContext'

export default function Widget({ categoryId, widget }) {
  const { removeWidget } = useDashboard()
  return (
    <div>
      <button
        aria-label="Remove widget"
        className="close"
        onClick={() => removeWidget(categoryId, widget.id)}
        title="Remove widget"
      >
        ✕
      </button>
      <h4>{widget.title}</h4>
      <p>{widget.text}</p>
    </div>
  )
}