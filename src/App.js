import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Addnotes from './Components/Addnotes';
import Signuppage from './Components/Signuppage';
import Loginpage from './Components/Loginpage';
import Myaccount from './Components/Myaccount';
import { useState } from 'react';
import Editnotes from './Components/Editnotes';

function App() {
  const [userData,setUserData]= useState([])
  return (
    <div className="App">
        <Routes>
          <Route exact path="/"
          element={<Dashboard/>}>
          </Route>
          <Route path="/login"
        element={<Loginpage/>}
       />

      <Route path="/signup"
        element={<Signuppage/>}
       /> 

    <Route path="/addnotes/:token"
        element={<Addnotes 
          userData={userData}
          setUserData={setUserData}/>}
       />
        <Route path="/edit/:id/:token"
        element={<Editnotes 
          userData={userData}
          setUserData={setUserData}/>}/>
       <Route path="/myaccount"
       element={<Myaccount 
        userData={userData}
        setUserData={setUserData}/>}/>
        </Routes>
    </div>
  );
}

export default App;
