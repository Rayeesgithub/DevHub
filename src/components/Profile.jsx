import React from 'react'
import { useSelector } from 'react-redux'
import Editrofile from './Editrofile';

const Profile = () => {
    const user=useSelector((store)=>store.user);
  return (
   user &&( <div >
       <Editrofile user={user}/>
    </div>
  )
)
}

export default Profile
