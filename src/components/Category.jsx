import React, { useMemo, useState } from 'react'
import Widget from './Widget'
import AddWidgetForm from './forms/AddWidgetForm'
import ManageWidgets from './forms/ManageWidgets'

export default function Category({ category }) {
  const [openAdd, setOpenAdd] = useState(false)
  const [openManage, setOpenManage] = useState(false)

  const count = useMemo(() => category.widgets.length, [category.widgets])

  return (
    <div>
      <div className="category-head">
        <div className="row">
          <div className="category-title">{category.name}</div>
          <span className="pill">{count} widget{count!==1 ? 's' : ''}</span>
        </div>
        <div className="category-actions">
          <button className="ghost" onClick={() => setOpenManage(true)}>Manage</button>
          <button className="primary" onClick={() => setOpenAdd(true)}>+ Add Widget</button>
        </div>
      </div>

      <div className="widgets">
        {category.widgets.length ? category.widgets.map(w => (
          <div key={w.id} className="widget">
            <Widget categoryId={category.id} widget={w} />
          </div>
        )) : <div className="empty" style={{gridColumn: 'span 12'}}>No widgets yet. Click “+ Add Widget”.</div>}
      </div>

      <AddWidgetForm open={openAdd} onClose={() => setOpenAdd(false)} category={category} />
      <ManageWidgets open={openManage} onClose={() => setOpenManage(false)} category={category} />
    </div>
  )
}