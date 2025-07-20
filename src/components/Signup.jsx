import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff, Mail, Lock, User, Calendar, Briefcase, Users, AlertCircle, ArrowRight, Github, Chrome, Camera, Upload, X } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    skills: "",
    about: "",
    profileImage: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setError("Image size should be less than 5MB");
        return;
      }

      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      profileImage: null
    }));
    setImagePreview(null);
  };

  const validateStep1 = () => {
    const { firstName, lastName, emailId, password, confirmPassword } = formData;
    if (!firstName || !lastName || !emailId || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    const { age, gender, skills } = formData;
    if (!age || !gender || !skills) {
      setError("Please fill in all required fields");
      return false;
    }
    if (isNaN(age) || age < 16 || age > 100) {
      setError("Please enter a valid age between 16 and 100");
      return false;
    }
     setError("");
  return true; // ✅ this line was missing
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setError("");
  };

  const handleSignup = async () => {
    if (!validateStep2()) return;
    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('emailId', formData.emailId);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('about', formData.about);
      
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      const res = await axios.post(
        BASE_URL + "/signup",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    {console.log(res.data.data)};
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } 
  };

  const renderImageUpload = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Profile Picture
      </label>
      
      {imagePreview ? (
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg">
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">Click the X to remove</p>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed ${
            isDragOver ? 'border-purple-400 bg-purple-500/10' : 'border-white/20'
          } rounded-xl p-6 text-center transition-all cursor-pointer hover:border-purple-400 hover:bg-white/5`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload').click()}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
              <Camera className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-300 text-sm mb-1">
              {isDragOver ? 'Drop your image here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
     

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            First Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="firstName"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Last Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="lastName"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="email"
            value={formData.emailId}
            onChange={(e) => handleInputChange('emailId', e.target.value)}
            placeholder="enter your email"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Confirm Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
     {/* Profile Image Upload */}
      {renderImageUpload()}
      {/* Age and Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Age <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="25"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Gender <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-gray-800">Select Gender</option>
              <option value="male" className="bg-gray-800">Male</option>
              <option value="female" className="bg-gray-800">Female</option>
              <option value="other" className="bg-gray-800">Other</option>
              <option value="prefer-not-to-say" className="bg-gray-800">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Skills <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="JavaScript, React, Node.js, Python..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Separate skills with commas</p>
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          About You
        </label>
        <textarea
          value={formData.about}
          onChange={(e) => handleInputChange('about', e.target.value)}
          placeholder="Tell us about yourself, your experience, and what you're looking for..."
          rows="4"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">Optional - but helps others connect with you</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-8">

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Join Developer Hub</h1>
          <p className="text-gray-300">Create your account to start connecting</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Step {currentStep} of 2</span>
            <span className="text-sm text-gray-300">{currentStep === 1 ? 'Account Details' : 'Profile Information'}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 ? renderStep1() : renderStep2()}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-6">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep === 2 && (
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/10 text-white py-3 px-4 rounded-xl font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  Back
                </button>
              )}
              
              {currentStep === 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Next Step
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
               <button onClick={handleSignup}
      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none 
  focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  Create Account
  <ArrowRight className="h-5 w-5" />
</button>

              )}
            </div>

            {/* Social Signup - Only on Step 1 */}
            {currentStep === 1 && (
              <>
                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-400">Or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-300 hover:bg-white/10 transition-all">
                    <Github className="h-5 w-5" />
                    GitHub
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-300 hover:bg-white/10 transition-all">
                    <Chrome className="h-5 w-5" />
                    Google
                  </button>
                </div>
              </>
            )}
          </form>
          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-purple-300 font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;