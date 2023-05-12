/* eslint-disable no-unused-vars */
import React from 'react'
import HeroBanner from './HeroBanner/HeroBanner'
import Trending from '../../Pages/Home/tending/Trending'
import Popular from '../../Pages/Home/Popular/Popular'
import TopRated from '../../Pages/Home/TopRated/TopRated'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home