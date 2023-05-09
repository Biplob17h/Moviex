/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { fetchDatafromApi } from './utils/api'

function App() {
useEffect(()=>{
  apiTesting()
},[])

  const apiTesting = () =>{
    fetchDatafromApi("/movie/popular")
    .then(res => console.log(res))
  }
  return (
    <>
      <h1>app</h1>
    </>
  )
}

export default App
