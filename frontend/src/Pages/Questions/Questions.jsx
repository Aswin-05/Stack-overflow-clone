import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../Components/HomeMainbar/HomeMainbar'
import RightSideBar from '../../Components/RightSidebar/RightSidebar'

const Questions = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}  />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Questions
