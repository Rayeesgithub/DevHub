import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user)
  const fetchUser= async()=>{
    try{
     // const res=await axios.get(`${BASE_URL}/profile/view`), {
      const res=await axios.get(BASE_URL+"/profile/view" , {
      withCredentials:true,
     });
     dispatch(addUser(res.data));
    }
    catch(err){
 if(err.status===401){
  navigate("/login");
 }
 console.log(err);
    }
  };
  useEffect(()=>{
   if(!userData){
    fetchUser();
   }
  },[])
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default Body
