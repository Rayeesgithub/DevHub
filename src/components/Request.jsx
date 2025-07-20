import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from "../utils/requestSlice"

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
     const result = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`)
        {}, {
        withCredentials: true,
      }
      );
      console.log(result);
      dispatch(removeRequest(_id));
    }
    catch (err) {
      console.log(err);
    }
  }

  const Requests = async () => {
    try {
      const result = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      })
      dispatch(addRequests(result.data.data));
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Requests();
  }, [])

  if (!requests) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No Connection Requests</h2>
            <p className="text-gray-300 text-sm sm:text-base">You don't have any pending connection requests at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Connection Requests
          </h1>
          <p className="text-gray-300 text-sm sm:text-base px-4">Review and manage your pending connection requests</p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Requests Counter */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <div className="w-3 h-3 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium text-sm sm:text-base">
              {requests.length} {requests.length === 1 ? 'Request' : 'Requests'} Pending
            </span>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4 sm:space-y-6">
          {requests.map((request, index) => {
            const { _id, firstName, lastName, profileImage, skills, about } = request.formUserId;

            return (
              <div
                key={_id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  {/* User Info Section - Mobile */}
                  <div className="flex items-start space-x-4 mb-4">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-white/20 group-hover:ring-pink-400/50 transition-all duration-300">
                        <img
                          src={
                            profileImage
                              ? `${BASE_URL}/uploads/${profileImage}`
                              : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                          }
                          alt={`${firstName} ${lastName}`}
                          className="w-12 h-12 object-cover object-top"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20"></div>
                    </div>

                    {/* User Details - Mobile */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1 truncate">
                        {firstName} {lastName}
                      </h3>
                      
                      {/* Skills - Mobile */}
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {skills.slice(0, 3).map((singleSkill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-400/20"
                            >
                              {singleSkill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="text-xs text-gray-400">+{skills.length - 3} more</span>
                          )}
                        </div>
                      )}
                      
                      {/* About - Mobile */}
                      {about && (
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {about.length > 80 ? `${about.substring(0, 80)}...` : about}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">Accept</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button
                      className="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm">Reject</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                  {/* User Info Section - Desktop */}
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden ring-4 ring-white/20 group-hover:ring-pink-400/50 transition-all duration-300">
                        <img
                          src={
                            profileImage
                              ? `${BASE_URL}/uploads/${profileImage}`
                              : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                          }
                          alt={`${firstName} ${lastName}`}
                          className="w-14 h-14 lg:w-16 lg:h-16 object-cover object-top"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/20"></div>
                    </div>

                    {/* User Details - Desktop */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1 truncate">
                        {firstName} {lastName}
                      </h3>
                      
                      {/* Skills - Desktop */}
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skills.map((singleSkill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-400/20"
                            >
                              {singleSkill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* About - Desktop */}
                      {about && (
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md lg:max-w-lg">
                          {about.length > 120 ? `${about.substring(0, 120)}...` : about}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Desktop */}
                  <div className="flex space-x-2 lg:space-x-3 flex-shrink-0">
                    <button
                      className="group/btn relative px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      <span className="relative z-10 flex items-center">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm lg:text-base">Accept</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button
                      className="group/btn relative px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      <span className="relative z-10 flex items-center">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm lg:text-base">Reject</span>
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-400 text-sm px-4">
            Review each request carefully before making a decision
          </p>
        </div>
      </div>
    </div>
  );
}

export default Request;
