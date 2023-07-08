import React from 'react'
import {useState,useEffect,useContext} from 'react'
import './Login.css'
import {useNavigate}  from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'



function Login() {
  const navigate=useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  

 

  async function  handleLogin(e){
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    
    e.preventDefault(); 
    try{
    if(password !== '' && email !== '')
    {
      
    const  result = await axios.post("http://localhost:8000/api/user/login",
     { username:email, password },
     config
    );
    if (result) {
      console.log(result.status);
        if (result.status !== 401) {
          const tk = result.data.token;
          toast.success('Yeaahhhh!!');

          sessionStorage.setItem("tk", tk);
          navigate('/home')

         

          console.log(JSON.stringify(result.data));
        }
        else{
          console.log('password or username is wrong');
        }   
    }
   }
    else{
        console.log(' Enter password or username'); 
   }
  }
  catch(error){
     
     toast.error(error.message);
  }

  }   

    // onSubmit({ email, password, confirmPassword });
  



  
  return (
    <div >
      <div className="loginParentDiv">
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={(e)=>{handleLogin(e)}}
            
           >Login</button>
        </form>
        <a onClick={()=>{
            navigate('/signup')
        }}> Signup</a>
      </div>
    </div>
  )
}

export default Login
