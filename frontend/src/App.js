
import './App.css'

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";



function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login/>}>

        </Route>
       
       <Route path="/home" element={<Home/>}>

       </Route>
       
       <Route path="/signup" element={<SignUp/>}>

      </Route>
         
      </Routes>
      </Router>
      <ToastContainer
        toastClassName="min-w-40"
        className={""}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
