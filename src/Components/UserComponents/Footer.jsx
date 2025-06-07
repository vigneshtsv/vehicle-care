import React from 'react';
import { Mail,Facebook,Instagram,MessageCircle,Home,Phone } from "lucide-react";
import { useLogout } from '../Layout/useLogout';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../Redux/Slice/authSlice';


const SocialIcon = ({ href, icon: Icon }) => (
  <a 
    href={href}
    className="transform hover:scale-110 transition-all duration-300 text-white hover:text-blue-200 p-3 bg-gray-700 rounded-full mx-2"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="w-6 h-6" />
  </a>
);

const QuickLinkItem = ({ href, children }) => (
  <li className="mb-3">
    <a 
      href={href}
      className="relative text-gray-700 hover:text-gray-900 transition-colors duration-300
                 before:content-[''] before:absolute before:w-0 before:h-0.5 
                 before:bottom-0 before:left-0 before:bg-gray-600
                 before:transition-all before:duration-300
                 hover:before:w-full"
    >
      {children}
    </a>
  </li>
);

const ContactItem = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-3 mb-4 group">
    <div className="p-2 bg-gray-600 rounded-lg group-hover:bg-gray-700 transition-colors duration-300">
      <Icon className="text-white w-5 h-5" />
    </div>
    <span className="text-gray-700">{children}</span>
  </div>
);

const Footer = () => {
  const logout = useLogout();
  const dispatch = useDispatch();


  const handleLogout = () => {
    logout();
    dispatch(signOutSuccess());
  };
  const socialLinks = [
    { href: "mailto:vigneshts27@gmail.com", icon: Mail },
    { href: "https://www.facebook.com/profile.php?id=100011227996704&mibextid=ZbWKwL", icon: Facebook },
    { href: "https://www.instagram.com/vig9904?utm_source=qr&igsh=MXUyajNxc3o3ZTJqeA==", icon: Instagram },
    { href: "https://wa.me/917373358187", icon: MessageCircle }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-200 to-slate-300 shadow-lg">
      {/* Social Media Banner */}
      <div className="bg-gradient-to-l from-orange-500 via-green-500 to-indigo-500 relative p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-white text-xl font-semibold">
              Get connected with us on social networks
            </h2>
            <div className="flex items-center gap-2">
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} {...link} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 inline-block">
              About Us
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ipsum 
              sit amet odio feugiat iaculis vel in risus.  
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <QuickLinkItem href="/">Home</QuickLinkItem>
              <QuickLinkItem><button onClick={handleLogout}>Logout</button></QuickLinkItem>
              <QuickLinkItem href="/track">Track Your Order</QuickLinkItem>
              <QuickLinkItem href="/cart">Cart</QuickLinkItem>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300 inline-block">
              Contact Us
            </h3>
            <div className="space-y-3">
              <ContactItem icon={Home}>
                7/82 Eswaran Kovil Street,<br />
                Paramakudi - 623 707
              </ContactItem>
              <ContactItem icon={Mail}>
                vigneshts27@gmail.com
              </ContactItem>
              <ContactItem icon={Phone}>
                +91 7373358187
              </ContactItem>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gradient-to-l from-orange-500 via-green-500 to-indigo-500 relative py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <span>&copy; 2024 Copyright: </span>
          <a 
            href="/" 
            className="font-semibold hover:text-blue-200 transition-colors duration-300"
          >
            Vehicle-Care
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;