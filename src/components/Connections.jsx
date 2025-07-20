import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {    
      const result = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(result.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No Connections Yet</h2>
            <p className="text-gray-300 text-sm sm:text-base">Start building your network by connecting with people!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            My Connections
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mb-4">
            Building meaningful professional relationships
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Connection Counter */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium text-sm sm:text-base">
              {connections.length} {connections.length === 1 ? 'Connection' : 'Connections'}
            </span>
          </div>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {connections.map((connection, index) => {
            const { _id, firstName, lastName, profileImage, age, gender, skills, about } = connection;

            return (
              <div
                key={_id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-white/20 group-hover:ring-pink-400/50 transition-all duration-300">
                      <img
                        src={
                          profileImage
                            ? `${BASE_URL}/uploads/${profileImage}`
                            : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                        }
                        alt={`${firstName} ${lastName}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                    {firstName} {lastName}
                  </h3>

                  {/* Age & Gender */}
                  {age && gender && (
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-pink-400/20">
                        <span className="text-pink-300 text-sm font-medium">
                          {age} • {gender}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 justify-center">
                      {skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-400/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* About */}
                  {about && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {about.length > 100 ? `${about.substring(0, 100)}...` : about}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-1/2 mt-auto">
                    <button className="flex-1 group/btn relative px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400/50">
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-xs sm:text-sm">Message</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Connections;
