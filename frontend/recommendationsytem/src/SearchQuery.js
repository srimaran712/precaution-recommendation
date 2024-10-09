import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import Output from './Output'

function SearchQuery() {
    const[email,setEmail]=useState('')
    const[query,setQuery]=useState('')
    const[content,setContent]=useState('')
    const[loading,setLoading]=useState(false)
    const[show,setShow]=useState(false)
    
    const searchQuery= async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const response= await axios.post('http://localhost:8080/news',{email,query})
            console.log(response.data.news)
            setContent(response.data.news)
            setLoading(false)
            setShow(true)
            setTimeout(()=>{
              setEmail('')
              setQuery('')
              
            },2000)
        }catch(error){
                 console.log(error)
                 setLoading(false)
        }
    }
    
  return (
    <div className="flex flex-col  justify-start min-h-screen bg-gray-100 ">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2 text-center">Precaution Recommendation System</h1>
    <div className="  rounded-lg p-8 w-full ">
      <form onSubmit={searchQuery} className="space-y-6 w-full">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">Type Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type your email"
            required
            className="mt-1  block w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
    <label htmlFor="query" className="block text-lg font-medium text-gray-700 text-center mb-2">Write your Query here</label>
    
    <div className="flex justify-center mt-2"> 
        <div className="w-1/2 flex space-x-2"> 
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type your query"
                required
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
                type="submit"
                className="border-none text-white bg-black py-2 px-4 rounded-md"
            >
                Search
            </button>
        </div>
    </div>
</div>

      </form>
    </div>
    {loading?<p className="text-center">Loading your query please wait.....</p>:(show && <Output content={content}/>)
    }

  </div>
  
  )
}

export default SearchQuery
