import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import {  useSelector } from 'react-redux';
import Usercard from './Usercard';
import { ArrowRight, Users, Github, Zap, Target, Globe, Shield, Rocket, Star, Quote } from 'lucide-react';
import { Link } from "react-router-dom";
const Home = () => {
  const user = useSelector((store) => store.user);
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Connect. Collaborate. Sucesss";

  
 // Testimonials data
   // Testimonials data
  const testimonials = [
    {
      name: "Md abdullah",
      role: "Frontend Developer at Google",
      avatar: "https://media.licdn.com/dms/image/v2/C4D03AQE4a3TIg4l99w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660936001651?e=1758153600&v=beta&t=mj3UWGGt4gPsixP4Fc5VthUwjIWvfTM7Y2HU3uQZ1b8",
      content: "Developer Hub connected me with amazing opportunities. I found my dream job at Google through the platform!",
      rating: 5
    },
    {
      name: "Aditya Anand Kashayp",
      role: "Full Stack Developer at Meta",
      avatar: "https://media.licdn.com/dms/image/v2/C4D03AQFD_zvSd3fgtQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1656832750342?e=1758153600&v=beta&t=EivQ1bfiu3ByUHLq0oVDsk0bqgH5OtmmbOR14LMCYr4",
      content: "The networking features are incredible. I've built lasting professional relationships with developers worldwide.",
      rating: 3
    },
    {
      name: "Md Saddam",
      role: "Backend Engineer at Netflix",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHKSDmxxGKn5w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724778215392?e=1758153600&v=beta&t=LcA996osJxFGODAhhFEAYgn7lw0Rpb4VkzsfLYJBM0o",
      content: "Showcasing my projects has never been easier. The platform helped me land multiple interview opportunities.",
      rating: 4
    },
    {
      name: "Ankit Kumar Sinha",
      role: "DevOps Engineer at Amazon",
      avatar: "https://media.licdn.com/dms/image/v2/D5635AQENr71-NgLK3Q/profile-framedphoto-shrink_800_800/B56ZVwZA4UHEAo-/0/1741347360677?e=1753088400&v=beta&t=288THSkBEP4svs2CWU2Po6_7On3aHBOii254tlG4xZ4",
      content: "The community is supportive and the job matching system is spot-on. Highly recommended for any developer!",
      rating: 5
    },
    {
      name: "Suraj Kumar Sah",
      role: "Mobile Developer at Uber",
      avatar: "https://images.unsplash.com",
      content: "From freelance to full-time, this platform opened doors I never knew existed. Game-changer for my career!",
      rating: 3
    },
    {
      name: "Asmit raj",
      role: "AI Engineer at Tesla",
      avatar: "https://media.licdn.com/dms/image/v2/D5603AQEyeCWqoVRIug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730817417590?e=1758153600&v=beta&t=pq-3_1G9m-Z4wWFqI6dWu8VdSekXX2MOcpmCPOq4DPo",
      content: "The skill-based matching system is phenomenal. Connected with the right people at the right time.",
      rating: 4
    },
    {
      name: "Md Asher",
      role: "Cloud Architect at Microsoft",
      avatar: "https://media.licdn.com/dms/image/v2/D5603AQFj-YGpOYdPaA/profile-displayphoto-shrink_800_800/B56ZeJzuqEHEAg-/0/1750363729420?e=1758153600&v=beta&t=QjtKcAlppsNfP6cS7l2atR3Ooa396WMLlRO3Z-qJfAM",
      content: "Developer Hub isn't just a platform, it's a career accelerator. The opportunities are endless here!",
      rating: 5
    },
    {
      name: "Satish Kumar Thakur",
      role: "Security Engineer at Apple",
      avatar: "https://media.licdn.com/dms/image/v2/D5635AQF4Sh9Wjlsa9g/profile-framedphoto-shrink_800_800/B56ZVhhtHiHoAg-/0/1741097980763?e=1753088400&v=beta&t=ggVjjJ9hCZJtiE9ZuWr6bPUgN3EoZV8uhXCl6inMb6s",
      content: "The quality of connections and opportunities here is unmatched. Best investment in my career growth.",
      rating: 4
    }
  ];

 
  
  useEffect(() => {
    if (!user) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [user]);

  // ✅ JSX should return one parent element, so wrap everything in a div or fragment
  return (
    <div className="text-center my-10">
      {!user && (
        <>
          {/* Hero Section */}
          <div className="relative z-10 container mx-auto px-6 py-12">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
                Developer Hub
              </h1>
              <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center">
                <span className="border-r-2 border-purple-400 pr-2 animate-pulse">
                  {typedText}
                </span>
              </div>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers worldwide. Share your profile, discover new opportunities, 
                and build meaningful connections in the tech community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                
<Link 
  to="/signup" 
  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-lg flex items-center"
>
  Get Started
  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
</Link>
                <Link to="/login" className="px-8 py-4 border-2 border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 container mx-auto px-6 py-8">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Developer Hub?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Users className="h-12 w-12 text-purple-400" />,
                  title: "Connect with Developers",
                  description: "Network with like-minded developers from around the world and build lasting professional relationships."
                },
                {
                  icon: <Github className="h-12 w-12 text-pink-400" />,
                  title: "Showcase Your Work",
                  description: "Create stunning profiles to display your projects, skills, and achievements to potential collaborators."
                },
                {
                  icon: <Zap className="h-12 w-12 text-blue-400" />,
                  title: "Find Opportunities",
                  description: "Discover job opportunities, freelance, and collaboration requests tailored to your skills."
                }
              ].map((feature, index) => (
                <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Companies Section */}
        <div className="relative z-10 container mx-auto px-6 py-20 overflow-hidden">
  <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    Top Companies Where Our Developers Work
  </h2>
  {/* Scrolling Logo Row */}
  
 <div className="overflow-hidden whitespace-nowrap">
    <div className="flex gap-12 animate-scroll w-max">
      {[
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBLoZC_9b_6CZT9WsMYzHZ7jFf8oeucvuUMA&s",
        "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo-700x394.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
        "https://cdn.worldvectorlogo.com/logos/logo-spotify.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Airtel_logo.svg/1959px-Airtel_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
        "https://cdn.worldvectorlogo.com/logos/myntra-1.svg",
        "https://crystalpng.com/wp-content/uploads/2025/05/Goldman-Sachs-Logo.png",
        "https://i.pinimg.com/736x/65/25/ea/6525ea3430a2145e472ce030dd98bdcb.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/LinkedIn_2021.svg/2560px-LinkedIn_2021.svg.png"



      ].map((src, i) => (
        <img key={i} src={src} alt="Company" className="h-12 w-auto" />
      ))}
    </div>
  </div>

</div>
          {/* Stats Section */}
          <div className="relative z-10 container mx-auto px-6 py-20">
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {[
                { number: "10K+", label: "Developers" },
                { number: "⭐ 4.5/5", label: "Avg User Rating" },
                { number: "50+", label: "Countries" },
                { number: "99%", label: "Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

             {/* Testimonials Section */}
          <div className="relative z-10 container mx-auto px-6 py-20 bg-white/5 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Developers Say
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-6 w-6 text-purple-400 mb-2" />
                  <p className="text-gray-300 text-sm leading-relaxed">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>

        </>
      ) 
      }
    </div>
  );
};

export default Home;
