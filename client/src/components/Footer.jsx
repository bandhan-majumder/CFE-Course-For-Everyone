import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Bandhan Majumder. All rights reserved.
        </p>
        <div>
        <NavLink to="/" className="text-gray-400 hover:text-gray-300 mx-2">Home</NavLink>
        |
          <NavLink to="/about" className="text-gray-400 hover:text-gray-300 mx-2">About</NavLink>
          |
          <NavLink to="/contact" className="text-gray-400 hover:text-gray-300 mx-2">Contact</NavLink>
        </div>
        <div className="flex justify-center space-x-4 py-4">
      <NavLink to='https://github.com/bandhan-majumder/CFE-Course-For-Everyone' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiFillGithub className="h-10 w-10 mr-2" />
      </NavLink>
      <NavLink to='https://x.com/@MEbandhan' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiOutlineTwitter className="h-10 w-10 mr-2" />
      </NavLink>
      <NavLink to='https://www.linkedin.com/in/bandhan-majumder-5a10a1248/' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiFillLinkedin className="h-10 w-10 mr-2" />
      </NavLink>
    </div>
      </div>
    </footer>
  );
};

export default Footer;