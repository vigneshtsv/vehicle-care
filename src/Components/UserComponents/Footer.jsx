import React from 'react'
import { FaFacebook,FaHome,FaInstagram,FaMobile,FaWhatsapp } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";


function Footer() {
  return <>
   <footer className="footer bg-slate-300 mt-96"> 
       {/* Footer Heading */}
        <section className='flex justify-center p-6 bg-gray-600 text-white'>
          <div className='text-xl'>
            <span><b>Get connected with us on your social networks :   </b></span>
          </div>
          <div className='flex justify-center  ps-6'>
          <a href="mailto:vignesh@gmail.com" className='me-4 text-3xl' target='blank'>
            <TfiEmail />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100011227996704&mibextid=ZbWKwL" className='me-4 text-3xl' target='blank'>
            <FaFacebook />
            </a>
            <a href="https://www.instagram.com/vig9904?utm_source=qr&igsh=MXUyajNxc3o3ZTJqeA==" className='me-4 text-3xl' target='blank'>
            <FaInstagram />
            </a>
            <a href="" className='me-4 text-3xl' target='blank'>
            <FaWhatsapp />
            </a>
          </div>
        </section>

        <div>
        {/* Footer Column 1 */}
        <span className='grid justify-items-start'>
          <h1><b>About Us</b></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </span>

        {/* Footer Column 2 */}
        <span className="grid justify-items-center">
          <h1><b>Quick Links</b></h1>
          <ul>
            <li><a href="/" >Home</a></li>
            <li><a href="/" >Login</a></li>
            <li><a href="" >Track Your Order</a></li>
            <li><a href="" >Cart</a></li>
          </ul>
        </span>

        {/* Footer Column 3 */}
        <span className="grid justify-items-end">
          <h1><b>Contact Us</b></h1>
          <p><FaHome />7/80 Eswaran Kovil Street,<br />Paramakudi - 623 707.</p>
          <p><TfiEmail />vigneshts27@gmail.com</p>
          <p><FaMobile />+91 7373358187</p>
        </span>
        </div>

      {/* Footer Bottom */}
      <div className='text-center p-4 bg-gray-600 text-white'>
      &copy; 2024 CopyRight : &nbsp;
      <a href="http://localhost:5000/">Vehicle-Care</a>
      </div>
    </footer>
  </>
}

export default Footer