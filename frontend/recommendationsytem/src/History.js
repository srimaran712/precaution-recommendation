import React from 'react'
import {useState,useEffect} from 'react'
import {db} from './firebaseinit'
import { collection, getDocs } from "firebase/firestore";

const History = (props) => {
    const[history,setHistory]=useState([])
    // console.log(newsItems.doc.id, " => ", newsItems.doc.data())

    const fetchData=async ()=>{
      const snapShot= await getDocs(collection(db,"news"))
      const newsdata=snapShot.docs.map((newsItems)=>{
       return {
        id:newsItems.id,
        ...newsItems.data()
       }
      })
      setHistory(newsdata)
    }

    useEffect(()=>{
      fetchData()
    },[])
  return (
    <div className="w-96 shadow-md">
      <button className="text-xl px-2 py-1 font-semibold border mt-2 ml-4" onClick={()=>props.setOpenTab(false)}>X</button>

      <h2 className="text-lg text-gray-900 font-bold text-center">Search History</h2>
      {history.map((items)=>{
        return (
          <div className="px-2 py-4">
          <h2 className="font-semibold p-1">{items.createdAt}</h2>
          <p className="text-md text-gray-500">{items.newsResults}</p></div>
        )
      })}
    </div>
  )
}

export default History
