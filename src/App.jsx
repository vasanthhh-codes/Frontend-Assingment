import React, { useMemo, useState } from 'react'
import { DashboardProvider, useDashboard } from './context/DashboardContext'
import Dashboard from './components/Dashboard'

function AppShell() {
  const { search, setSearch, searchResults } = useDashboard()
  const [showResults, setShowResults] = useState(false)

  const results = useMemo(() => {
    if (!search) return []
    return searchResults(search)
  }, [search, searchResults])

  return (
    <div className="container">
      <div className="app-title"><span className="logo"></span> Dynamic Dashboard</div>
      <div className="topbar">
        <input
          className="searchbar"
          placeholder="Search widgets across all categories..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowResults(true) }}
        />
        <span className="pill">{results.length} result{results.length!==1 ? 's' : ''}</span>
      </div>

      {showResults && search && (
        <div className="results">
          {results.map(r => (
            <div key={r.widget.id} className="item">
              <div>
                <div style={{fontWeight:700}}>{r.widget.title}</div>
                <div className="muted">{r.widget.text}</div>
              </div>
              <div className="muted">in <b>{r.category.name}</b></div>
            </div>
          ))}
        </div>
      )}

      <Dashboard />
    </div>
  )
}

export default function App() {
  return (
    <DashboardProvider>
      <AppShell />
    </DashboardProvider>
  )
}