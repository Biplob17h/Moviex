/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import './style.scss'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/Carousel/Carousel'

const TopRated  = () => {
    const [endpoint, setEndpoint] = useState("movie")

    const {data, loading} = useFetch(`/${endpoint}/top_rated`)

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }
    
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">
                    Top Rated
                </span>
                <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div> 
    )
}

export default  TopRated;