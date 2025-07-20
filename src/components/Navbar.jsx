import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, Users, UserPlus, LogOut, Bell } from "lucide-react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post(BASE_URL + "/logout");
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-base-300/80 border-b border-white/10">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex-1 flex items-center gap-x-2">
          <Link to="/" className="flex items-center gap-x-2 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Developer Hub
            </span>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search developers, skills, companies..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white"
            />
          </div>
        </div> */}

        {/* Desktop Navigation */}
        {!user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-lg text-white"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-purple-400 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105 text-white"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <span className="text-gray-300 font-medium">Welcome, {user.firstName}</span>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-purple-400 transition-all">
                  <div className="w-10 rounded-full ring-2 ring-purple-400">
                   <img
                      alt="Profile"
                      src={
                    user?.profileImage
                     ? `${BASE_URL}/uploads/${user.profileImage}`
                    : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                       }
                className="rounded-full object-cover"
              />

                  </div>
                </div> 
                <ul className="menu menu-sm text-2xl font-semibold dropdown-content bg-base-100/95 backdrop-blur-lg rounded-xl z-10 mt-3 w-64 p-2 shadow-xl border border-white/10">
                  <li>
                    <Link to="/profile" className="flex items-center gap-4 p-2 hover:bg-purple-500/20 rounded-lg">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connection" className="flex items-center gap-4 p-2 hover:bg-purple-500/20 rounded-lg">
                      <Users className="h-4 w-4" />
                     My Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="flex items-center gap-4 p-2 hover:bg-purple-500/20 rounded-lg">
                      <UserPlus className="h-4 w-4" />
                     Connection Requests
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler} className="flex items-center gap-4 p-2 hover:bg-red-500/20 text-red-400 rounded-lg w-full">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Search Toggle */}
          {/* <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Search className="h-5 w-5 text-gray-300" />
          </button> */}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {/* {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search developers, skills, companies..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white"
            />
          </div>
        </div>
      )} */}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-base-300/95 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-center text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full px-4 py-3 border-2 border-purple-400 rounded-lg font-semibold text-center text-white hover:bg-purple-400 transition-all"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full ring-2 ring-purple-400 overflow-hidden">
                   <img
  alt="Profile"
  src={
    user?.profileImage
      ? `${BASE_URL}/uploads/${user.profileImage}`
      : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  }
  className="rounded-full object-cover"
/>

                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-white"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    to="/connection"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-white"
                  >
                    <Users className="h-5 w-5" />
                   My Connections
                  </Link>
                  <Link
                    to="/requests"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-white"
                  >
                    <UserPlus className="h-5 w-5" />
                    Connection Requests
                  </Link>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-white">
                    <Bell className="h-5 w-5" />
                    Notifications
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                  <button
                    onClick={() => {
                      logoutHandler();
                      closeMobileMenu();
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;