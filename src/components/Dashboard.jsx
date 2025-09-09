import React from 'react'
import Category from './Category'
import { useDashboard } from '../context/DashboardContext'

export default function Dashboard() {
  const { categories } = useDashboard()
  return (
    <div className="grid" style={{marginTop: 16}}>
      {categories.map(cat => (
        <div key={cat.id} className="category">
          <Category category={cat} />
        </div>
      ))}
    </div>
  )
}