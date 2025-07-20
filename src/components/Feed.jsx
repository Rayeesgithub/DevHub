import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import Usercard from './Usercard';
import Home from './Home';
import { Users, Sparkles, Search, Filter, RefreshCw, Heart, MessageCircle, Star, AlertCircle } from 'lucide-react';
import Navbar from "./Navbar"
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const getFeed = async (forceRefresh = false) => {
    if (feed && feed.length > 0 && !forceRefresh) return;

    setIsLoading(true);
    setError("");

    try {  
     const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    
    } catch (err) {
      console.log("Feed fetch error:", err);
      setError(err.response?.data?.message || "Failed to load feed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getFeed(true);
    setRefreshing(false);
  };

  const filteredFeed = feed?.filter(feedUser => {
   const matchesSearch = !searchTerm || 
  feedUser.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  feedUser.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  feedUser.skills?.join(" ")?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  feedUser.about?.toLowerCase().includes(searchTerm.toLowerCase());


    const matchesFilter = filterBy === "all" || 
      (filterBy === "recent" && feedUser.createdAt) ||
      (filterBy === "skills" && feedUser.skills) ||
      (filterBy === "experienced" && feedUser.age > 25);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (user) {
      getFeed();
    }
  }, [user]);

  if (!user) {
    return <Home />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Welcome Message */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Discover amazing developers and connect with the community
                </p>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 bg-gray-300">
        {/* Search and Filter Section */}
        <div className=" backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
             
              <input
                type="text"
                placeholder="Search developers by name, skills, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-5 pr-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all"
              />
               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
      {console.log("User:", user)}
            {/* Filter Dropdown */}
            <div className="relative">
            
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 transition-all appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Developers</option>
                <option value="recent">Recent Joins</option>
                <option value="skills">With Skills</option>
                <option value="experienced">Experienced</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {filteredFeed && (
            <div className="mt-4 flex items-center gap-2  text-sm text-gray-600">
              <Sparkles className="h-4 w-4" />
              <span>
                {filteredFeed.length === 0 ? 'No developers found' : 
                 filteredFeed.length === 1 ? '1 developer found' : 
                 `${filteredFeed.length} developers found`}
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">Loading amazing developers...</p>
          </div>
        )}

      

        {/* Feed Content */}
        {!isLoading && !error && (
          <>
            {filteredFeed && filteredFeed.length > 0 ? (
              <div className="grid  grid-cols-1 bg-gray-300 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeed.map((feedUser) => (
                  <div key={feedUser._id} className="transform transition-all duration-300 hover:scale-105">
                    <Usercard user={feedUser} />
                  
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {searchTerm || filterBy !== "all" ? "No matching developers found" : "No developers to show"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm || filterBy !== "all" 
                    ? "Try adjusting your search or filter criteria to find more developers."
                    : "It looks like there are no developers in your feed yet. Check back later!"}
                </p>
               
              </div>
            )}
          </>
        )} </div>
    </div>
  );
};
export default Feed;
