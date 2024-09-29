import React, { useEffect } from 'react'
import { toast } from "react-toastify";

const Hero = () => {

  return (
    <section className='hero-section'>
        <div className="container content flex">
            <div className="header">
            <span>ELITE EDGE FITNESS</span>
            </div>
            <div className="hero-title">
                <h1 className='t-white'>LET'S</h1>
                <h1 className='t-white'>GET'S</h1>
                <h1 className='t-white'>MOVING</h1>
            </div>
            <div className="hero-subtitle">
                <p className="t-white">Your Journey to Fitness Starts Here</p>
                <p className="primary-text">Unleash Your Potential</p>
            </div>
            <div className="hero-btns">
                <button className="hero-btn">Start Your Journey</button>
                <button className="hero-btn">Discover Your Plan</button>
            </div>
        </div>
    </section>
  )
}

export default Hero