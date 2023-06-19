import { Button } from '@mui/base'
import { TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../Base/Base'

export default function Editnotes({userData,setUserData}) {
  const {id,token} = useParams();
  const navigate=useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [packages, setPackages] = useState("")
  const [location, setLocation] = useState("")
  const [poistion, setPoistion] = useState("")
  const [skills, setSkills] = useState("")
  const [questions, setQuestions] = useState("")
  const [error, setError] = useState("")
  const [sucessMsg, setSucessMessage] = useState("")
  useEffect(()=>{
       const data = userData?.find((data)=>data._id===id)
       console.log(data)
       if(data){
        setCompanyName(data.companyName)
        setPackages(data.package)
        setLocation(data.location)
        setPoistion(data.poistion)
        setSkills(data.skills)
        setQuestions(data.questions)
       }
  },[id,userData])


  async function  handleEditNotes(){
    const editnotes = {
      companyName,
      package : packages,
      location,
      poistion,
      skills,
      questions
  }
  const response = await fetch(`https://interview-backend-v4np-praveenive.vercel.app/api/notes/edit/${id}`,{
      method:"PUT",
      body:JSON.stringify(editnotes),
      headers:{
          "Content-Type":"application/json",
          "x-auth-token":token
      }
  });
  const data = await response.json();
  console.log(data)
  if(!data.data){
      setError(data.message)
      setSucessMessage("")
  }
  const userindex = userData?.findIndex((data, idx)=>data._id === id);
  userData[userindex] = data.data;
   await setUserData([...userData])
   console.log(userData)
   setSucessMessage(data.message)
}
    
  return (
    <Base>
        <form>
          <TextField label="Company Name" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the Company Name"
        value={companyName}
        onChange={(e)=>setCompanyName(e.target.value)}
        type="text"/>
        <TextField label="Packages" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the package"
        type="text"
        value={packages}
        onChange={(e)=>setPackages(e.target.value)}
        />
             <TextField label="Location" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the location"
        type="text"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        />
             <TextField label="Positions" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the position"
        type="text"
        value={poistion}
        onChange={(e)=>setPoistion(e.target.value)}
        />
        <TextField label="Skills" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the skills"
        type="text"
        value={skills}
        onChange={(e)=>setSkills(e.target.value)}
        />
       <TextField label="Questions" 
       variant="outlined" fullWidth sx={{ m: 1}}
       inputProps={{sx:{height: 100}}}
        placeholder="Enter the questions"
        type="text"
        value={questions}
        onChange={(e)=>setQuestions(e.target.value)}
        />

        <Button
        type="submit"   
        variant ="contained"
       onClick={handleEditNotes}
        >Editnotes</Button>
        <Button
        type="submit"   
        variant ="contained"
       onClick={()=>navigate("/myaccount")}
        >MyAccount</Button>

       {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }
        
       {sucessMsg? 
        <Typography color={"danger"}>
           {sucessMsg}
        </Typography> : "" }

</form></Base>
  )
     
       }