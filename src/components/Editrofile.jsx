import React from 'react'
import { useState } from 'react';
import Usercard from './Usercard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Camera } from 'lucide-react';
const  EditProfile = ({user}) => {
    const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
 
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills || []);
  const [about,setAbout]=useState(user.about);
  const [profileImage,setProfileImage]=useState(user.profileImage);
  const createdAt=user.createdAt;
    const [showToast, setShowToast] = useState(false);
const [imageFile, setImageFile] = useState(user.profileImage || null);
  const dispatch=useDispatch();


  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File must be less than 5MB");
    }
  };

   const saveProfile=async()=>{
    const formData = new FormData();
     if (imageFile) {
      formData.append("profileImage", imageFile);
    }
    try{
        
         const updat=await axios.post(BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
         
          age,
          gender,
         createdAt,
          skills,
    about ,
  profileImage, 

        },
        {
          withCredentials: true,
        }
    );

     dispatch(addUser(updat.data.data));
       setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    catch(err){
        console.log("err is"+ err);
    }
   }
//   const [error, setError] = useState("");
  return (
    <>
   <div className=" flex flex-wrap md:ml-24  justify-center items-center my-12 ">
        <div className="card bg-base-300 w-96 shadow-sm mx-10">
   <div className="card-body">
    <h2 className="card-title m-auto">Edit your profile</h2>
    <div>

    {/* <fieldset>
       <div className="max-w-md mx-auto p-4">
      <label
        htmlFor="profile-upload"
        className="block text-sm font-medium text-white mb-2"
      >
        Profile Picture
      </label>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="profile-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800 border-gray-600 hover:bg-gray-700 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
             <Camera className=' h-10 w-8'/>
              <p className="mb-1 text-sm text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
          <input
            id="profile-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      </div>

      
    </fieldset> */}
  <fieldset className="fieldset">
  <legend className="fieldset-legend">firstName:</legend>
  <input type="text" className="input" placeholder="Type here" 
    value={firstName}
    onChange={(e)=>setFirstname(e.target.value)}
  />
  
    </fieldset>
    <fieldset className="fieldset my-2.5">
  <legend className="fieldset-legend">lastName:</legend>
  <input type="text" className="input" placeholder="Type here"
   value={lastName} 
   onChange={(e)=>setLastName(e.target.value)}
   />
  </fieldset>

     <fieldset className="fieldset my-2.5">
  <legend className="fieldset-legend">Age</legend>
  <input type="text" className="input" placeholder="Type here"
   value={age} 
   onChange={(e)=>setAge(e.target.value)}
   />
  </fieldset>
   <fieldset className="fieldset my-2.5">
  <legend className="fieldset-legend">Gender:</legend>
  <input type="text" className="input" placeholder="Type here"
   value={gender} 
   onChange={(e)=>setGender(e.target.value)}
   />
  </fieldset>
   <fieldset className="fieldset my-2.5">
  <legend className="fieldset-legend">Skills:</legend>
  <input
    type="text"
    className="input"
    placeholder="e.g. HTML, CSS, JS"
    value={skills.join(", ")}  // show array as comma-separated string
    onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
  />
</fieldset>

  

  <fieldset className="fieldset my-2.5">
  <legend className="fieldset-legend">About:</legend>
  <textarea   className="input min-h-[80px] resize-none" 
             placeholder="Tell us about yourself..."
                                    value={about} 
                                    onChange={(e) => setAbout(e.target.value)}
                                />
  </fieldset>

    </div>
    <div className="card-actions  justify-center mt-4">
      <button className="btn btn-primary" onClick={saveProfile}>Save profile</button>
    </div>
  </div>
</div>
  <Usercard
          user={{ firstName, lastName, profileImage,  age, gender, about , skills , createdAt}}
        />
      </div>
  
        {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
      </>
  )
}

export default EditProfile
