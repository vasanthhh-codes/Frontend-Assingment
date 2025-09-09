import React, { createContext, useContext, useMemo, useState } from 'react'
import seed from '../data/dashboardData.json'

const DashboardCtx = createContext(null)

export function DashboardProvider({ children }) {
  const [categories, setCategories] = useState(seed.categories)
  const [search, setSearch] = useState('')

  // Add widget to a category
  function addWidget(categoryId, widget) {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat
      const nextId = Math.max(0, ...cat.widgets.map(w => w.id)) + 1
      return { ...cat, widgets: [...cat.widgets, { id: nextId, ...widget }] }
    }))
  }

  // Remove widget by id from a category
  function removeWidget(categoryId, widgetId) {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat
      return { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
    }))
  }

  // Uncheck/remove via manage list (checkboxes)
  function setWidgetIncluded(categoryId, widgetId, included) {
    if (included) return // in this simple app, widgets exist only if included
    removeWidget(categoryId, widgetId)
  }

  // Search across all widgets
  const searchResults = (q) => {
    const query = q.toLowerCase().trim()
    if (!query) return []
    const res = []
    for (const cat of categories) {
      for (const w of cat.widgets) {
        if (
          w.title.toLowerCase().includes(query) ||
          w.text.toLowerCase().includes(query)
        ) {
          res.push({ category: { id: cat.id, name: cat.name }, widget: w })
        }
      }
    }
    return res
  }

  const value = useMemo(() => ({
    categories,
    addWidget,
    removeWidget,
    setWidgetIncluded,
    search,
    setSearch,
    searchResults
  }), [categories, search])

  return <DashboardCtx.Provider value={value}>{children}</DashboardCtx.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardCtx)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}