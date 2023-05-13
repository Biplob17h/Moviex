/* eslint-disable no-unused-vars */
import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from '../../Pages/Details/DetailsBanner/DetailsBanner'
import Cast from '../../Pages/Details/Cast/Cast'
import VideosSection from '../../Pages/Details/videoSection/VideoSection'
import Similar from '../../Pages/Details/Carousels/Similar'
import Recommendation from '../../Pages/Details/Carousels/Recommendation'


const Details = () => {
    const { mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data:credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast } loading={creditsLoading}></Cast>
      <VideosSection data={data} loading={loading}></VideosSection>
      <Similar mediaType={mediaType} id={id}></Similar>
      <Recommendation mediaType={mediaType} id={id}></Recommendation>
    </div>
  )
}

export default Details