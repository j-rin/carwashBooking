import React  from 'react'
import {useState,useContext} from 'react'
import './SignUp.css'
import   {useNavigate} from 'react-router-dom'
import axios from 'axios'



function SignUp() {

  const navigate=useNavigate();
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[password,setPassword]=useState('');
  
  async function handleSignUp(e){
    

  
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  e.preventDefault(); 
  const  result  = await axios.post("http://localhost:8000/api/user/",
   { username:email, password, name },
   config
 );
  if(result.status=='201'){
    console.log(result.data.token)
    const tk = result.date.token;

    sessionStorage.setItem("tk", tk);

    navigate('/home')

    
  }


  }
  
  return (
    <div>
        <div className="signupParentDiv">
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>{setEmail(e.target.value);  }}
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button onClick={(e)=>{handleSignUp(e)}}>Signup</button>
        </form>
        <a onClick={()=>{
            navigate('/')
        }}>Login</a>
        </div>
    </div>
  )
}

export default SignUp
