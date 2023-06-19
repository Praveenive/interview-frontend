import { Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/Base'

export default function Dashboard() {
  const [error,setError] = useState("")
  const [notes,setNotes] = useState([])
const navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.getItem("token")){
    navigate("/login", {replace:true})
  }
  let token = localStorage.getItem("token")
  const fetchAllnotes = async()=>{
    const res = await fetch(`https://interview-backend-v4np-praveenive.vercel.app/api/notes/all`,{
      method:"GET",
      headers:{
        "x-auth-token":token
      }
    });
    const data = await res.json()

    if(!data.data){
      setError(data.message)
      console.log(error)
    }
    setNotes(data.data)
    console.log("Notes",notes)
  }
  fetchAllnotes()
},[])

  return (
    <Base>
    <h1>Dashboard</h1>
 
    {notes &&(
      <div className='arrange'>
      
        {notes?.map((data,index)=>(
          <Card
          key ={data._id}>
            <h4>company name : {data.companyName}</h4>
            <p>date : {data.date}</p>
            <p>location : {data.location}</p>
            <p>poistion : {data.poistion}</p>
            <p>questions : {data.questions}</p>
            <p>package : {data.package}</p>
            <p>skills : {data.skills}</p>
            <p>posted by: {data.user.name}</p>
          </Card>
        ))}
      </div>
    )}
    
    {error ?
        <Typography color={"danger"}>{error}
        </Typography>:""}
    </Base>
  )
}
