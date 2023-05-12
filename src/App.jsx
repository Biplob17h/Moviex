/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { fetchDatafromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/home/Home'
import Details from './Pages/details/Details'
import SearchResult from './Pages/searchResult/SearchResult'
import Explore from './Pages/explore/Explore'
import PageNotFound from './Pages/404/PageNotFound'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { getGenres } from './store/homeSlice'

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) =>
    state.home
  )
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])


  const fetchApiConfig = () =>{
    fetchDatafromApi("/configuration").then(res => {
      console.log(res);
      const url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async() =>{
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}
    endPoints.forEach((url)=>{
      promises.push(fetchDatafromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    data.map(({genres}) =>{
      return genres.map((item) =>(allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres));
  }

  return (
  <BrowserRouter>
  <Header></Header>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/:mediaType/:id' element={<Details></Details>}></Route>
    <Route path='/search/:query' element={<SearchResult></SearchResult>}></Route>
    <Route path='/expolore/:mediaType' element={<Explore></Explore>}></Route>
    <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
  </Routes>
  <Footer></Footer>
  </BrowserRouter>
  )
}

export default App
