import { Heart } from "lucide-react";
const Footer=()=>{
    return(
        <div className=" flex flex-wrap ">
        <footer className="footer  sm:footer-horizontal bg-base-200 text-base-content p-10 bottom-0">
  <aside>
   
  <div className="flex justify-center ml-1.5 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg ">
                <span className="text-white font-bold text-sm">DH</span> 
              
              </div>
               <p className=" text-pink-400 font-bold">Developer Hub</p>
              <p className="text-gray-300 mb-4 font-bold">
              Built with <Heart className="inline h-4 w-4 text-red-600" /> by Rayees Alam
            </p>
   
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
        </div>
    )
}

export default Footer;