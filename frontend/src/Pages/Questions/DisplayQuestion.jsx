import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import RightSideBar from '../../Components/RightSidebar/RightSidebar'
import Question from './Question'

const DisplayQuestion = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <Question />
        <RightSideBar />
      </div>
    </div>
  )
}

export default DisplayQuestion
