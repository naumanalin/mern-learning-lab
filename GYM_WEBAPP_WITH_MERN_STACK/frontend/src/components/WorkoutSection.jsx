import React from 'react'
import WorkoutImage from '/img5.jpg'

const WorkoutSection = () => {
  return (
    <div className='container workout-section '>
        <div className="half-wrapper">
            <h1 className="wo-heading">TOP WORKOUT SESSION</h1>
            <p className="secondary-text wo-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quisquam. Eaque alias, blanditiis quidem maiores illo unde ipsam!
            </p>
            <div className="wo-img-div">
              <img src={WorkoutImage} alt="" className="wo-img" />
            </div>
        </div>

        <div className="half-wrapper">
          <h1 className="wo-heading">FEATURED BOOTCAMPS</h1>
          <p className="secondary-text wo-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quisquam. Eaque alias, blanditiis quidem maiores illo unde ipsam!
          </p>

          <div className="bootcamps">       
          <div> {/* 1 */}
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
            <p className='secondary-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              saepe repellendus nemo sit facere ipsam!
            </p>
          </div>
          <div> {/* 2 */}
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
            <p className='secondary-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              saepe repellendus nemo sit facere ipsam!
            </p>
          </div>
          <div> {/* 3 */}
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
            <p className='secondary-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              saepe repellendus nemo sit facere ipsam!
            </p>
          </div>
          <div> {/* 4 */}
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
            <p className='secondary-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              saepe repellendus nemo sit facere ipsam!
            </p>
          </div>
          </div>

        </div>
            
    </div>
  )
}

export default WorkoutSection