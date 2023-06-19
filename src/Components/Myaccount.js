import { Paper, Typography,Button  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/Base'

export default function Myaccount({userData,setUserData}) {
    const navigate = useNavigate()
     const [error,setError] = useState("")
     const [ tokenId,setTokenId]= useState("")
  useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
        navigate("/login", {replace:true})
    }
let token = localStorage.getItem("token")
setTokenId(token)
console.log("tokenid:",tokenId)
const fetchUserData = async()=>{
    const response = await fetch(`https://interview-backend-v4np-praveenive.vercel.app/api/notes/mynotes`,{
        method:"GET",
        headers:{
            "x-auth-token":token
        }
    });
    const data = await response.json()
    if(!data.data)
    {
        setError(data.message)
    }
    setUserData(data.data)
    console.log(userData)

}
fetchUserData()

  },[])

  return (
    <Base>
    <div className='last'>
        <Button variant="contained"
    edge="end" 
    color="inherit" 
    aria-label="add students" 
    onClick={()=>navigate(`/addnotes/${tokenId}`)}
    sx={{ mr: 2 }}>  
     Add Notes
    </Button>
        </div>

        {userData && (
             <div>
                {userData?.map((data, index)=>(
                   <Paper 
                   elevation={3}
                   key={data._id}
                   >
                     <p>company name : {data.companyName}</p>
                     <p>date : {data.date}</p>
                     <p>location : {data.location}</p>
                     <p>poistion : {data.poistion}</p>
                     <p>questions : {data.questions}</p>
                     <p>package : {data.package}</p>
                     <p>skills : {data.skills}</p>
                     <p>posted by: {data.user.name}</p>
                     <Button variant="contained" onClick={()=>navigate(`/edit/${data._id}/${tokenId}`)}>Edit</Button> {"  "} 
                  <Button variant="contained">Delete</Button>
                   </Paper>
                ))}
             </div>
             
        )}

     {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
    </Base>
  )
}
