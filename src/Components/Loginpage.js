import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/Base'

export default function Loginpage() {
  const navigate = useNavigate()
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [error, setError] = useState("");

  const handleLogin = async()=>{
    const userDetails ={
      email,password
    }
console.log("working")
    const response = await fetch(`https://interview-backend-v4np-praveenive.vercel.app/api/user/login`,{
      method:"POST",
      body:JSON.stringify(userDetails),
      headers:{
        "Content-type":"application/json"
      }
    });

    const data = await response.json();
    if(data.token){
      setError("")
      localStorage.setItem("token",data.token)
     navigate("/")
    }
    else{
      setError(data.message)
    }

  }
  return (
    <Base>
     <TextField label="Email" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the email"
        type="email"  value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField label="Password" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
        type="submit"
        variant ="contained"
        onClick={handleLogin}
        >Login</Button>
        {error ?
        <Typography color={"danger"}>{error}
        </Typography>:""}
        
    </Base>
  )
}
