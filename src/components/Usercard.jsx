import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { User, Calendar, Users, Code2 } from 'lucide-react';
import { Heart, X, MapPin, Star, Sparkles } from 'lucide-react';
import { FcAbout } from "react-icons/fc";
const Usercard = ({ user }) => {
  const dispatch = useDispatch();
  const {
    _id,
    firstName,
    lastName,
  profileImage, 
    photoUrl,
    age,
    gender,
    createdAt,
    skills = [],
    about = ""
  } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric"
  });
  
  return (
    <div className="bg-base-200 shadow-md rounded-xl overflow-hidden w-full max-w-md mx-auto transition hover:shadow-xl">
      <img
         src={
    profileImage
      ? `${BASE_URL}/uploads/${profileImage}`
      : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  }
        className="w-full h-72  object-cover object-top"
      />
     
       <div className="absolute top-4 right-4  bg-opacity-90 backdrop-blur-sm rounded-full p-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          
      <div className="p-5 bg-gray-800">
        <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
          <User className="h-5 w-5 text-purple-400" />
          {firstName} {lastName}
        </h2>

        <p className="text-gray-300 flex items-center gap-2 mb-1">
          <Users className="h-4 w-4" />
          {gender}, {age} years
        </p>

        <p className="text-gray-300 flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4" />
          Joined on {formattedDate}
        </p>

        {skills.length > 0 && (
          <div className="mb-2 flex gap-x-2.5">
            <p className="text-sm text-gray-300 font-semibold flex items-center gap-2">
              <Code2 className="h-4 w-4" /> Skills:
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-600/20 text-purple-400  font-semibold text-sm px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
           
          </div>
        )}

        {about && (
          <p className="text-gray-300 text-sm mt-3">
            <div className=' flex  gap-x-2 px-1.5 font-semibold'>
              <FcAbout className="h-4 w-4 mt-0.5" />
            {about.length > 100 ? about.substring(0, 100) + '...' : about}
            </div>
          </p>
        )}

        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            className=" flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-5 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
           
            onClick={() => handleSendRequest("intrested", _id)}
          >
            <Heart className="w-5 h-5" /> Interested
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            onClick={() => handleSendRequest("ignore", _id)}
          >
           <X className="w-5 h-5" />  Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
