import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name,setName] = useState("")
  const [contact,setContact ] = useState("")
  const [email,setEmail ] = useState("")
  const [password,setPassword] = useState("")
  const [success,setSuccess] = useState("")
  async function handleSignup(){
    const newEmployee = {
     name,email,contact,password
    }
    const response = await fetch(`https://interview-backend-v4np-praveenive.vercel.app/api/user/signup`,{
      method:"POST",
      body:JSON.stringify(newEmployee),
      headers:{
        "Content-type":"application/json"
      }

    });
      const data = await response.json();
      if(data.data){
        setSuccess(data.message)
      }
  }
  const navigate = useNavigate()
  return (
    <div className='loginpage'> 
    <h5>Welcome</h5>
    <p>Please enter your  details</p>
    <TextField id="name" label="Enter your  name" variant="filled" value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
    <TextField id="email" label="Enter your email" variant="filled" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
    <TextField id="password" label="Enter Password" variant="filled" value={password} onChange={(e)=>setPassword(e.target.value)}/>  <br/><br/>
    <TextField id="Contact" label="Enter your Contact details" variant="filled" value={contact} onChange={(e)=>setContact(e.target.value)}/><br/><br/>
    <Button variant="contained" onClick={handleSignup}>Signup</Button>
    <p>Already have  account?</p>
    <Button variant="text"  onClick={()=>navigate("/login")}>Login</Button>
{success?<Typography>{success}</Typography>:" "}
    </div>
  )
}