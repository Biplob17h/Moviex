/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './style.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDatafromApi } from '../../utils/api'
import noResults from '../../assets/no-results.png';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/spinner/Spinner';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import MovieCard from '../../Components/MovieCard/MovieCard';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNun, setPageNun] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDatafromApi(`/search/multi?query=${query}&page=${pageNun}`)
      .then(res => {
        setData(res)
        setPageNun((prev) => prev + 1)
        setLoading(false)
      })
  }

  const fetchNextPageData = () => {
    fetchDatafromApi(`/search/multi?query=${query}&page=${pageNun}`)
      .then(res => {
        if (data?.results) {
          setData({
            ...data, results: [...data?.results, ...res.results]
          })
        }
        else {
          setData(res)
        }
        setPageNun((prev) => prev + 1)
      })
  }

  useEffect(() => {
    setPageNun(1);
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}></Spinner>}
      {!loading && <ContentWrapper>
        {data?.results?.length > 0 ? (<>
        <div className="pageTitle">
          {`Search ${data?.total_results > 1 ? "Results" : "Result"} of '${query}'`}
        </div>
        <InfiniteScroll 
        className='content'
        dataLength={data?.results.length || []}
        next={fetchNextPageData}
        hasMore={ pageNun <= data?.total_pages}
        loader={<Spinner/>}
        >
          {data?.results?.map((item, index) => {
            if(item.media_type === "person") return;
            return (
              <MovieCard
              key={index}
              data={item}
              fromSearch={true}
              >

              </MovieCard>
            )
          })}
        </InfiniteScroll>
        </>) : (<span className='resultNotFound'>
          Sorry, Result not found!
        </span>)}
      </ContentWrapper>}
    </div>
  )
}

export default SearchResult