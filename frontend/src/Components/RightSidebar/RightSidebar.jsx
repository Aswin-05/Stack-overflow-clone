import React from 'react'
import "./RightSidebr.css"
import Widget from './Widget'
import WidgetTags from './WidgetTags'

const RightSideBar = () => {
  return (
    <aside className="right-sidebar">
      <Widget />
      <WidgetTags />
    </aside>
  )
}

export default RightSideBar
