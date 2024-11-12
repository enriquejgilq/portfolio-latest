import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600">
      <div className="border-b border-gray-300 px-8 py-3">Your Location</div>
      <div className="flex justify-between px-8 py-3">
        <div className="flex space-x-6">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#projects" className="hover:underline">
            Projects
          </a>
          <a href="#skills" className="hover:underline">
            Skills
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <a href="#settings" className="hover:underline">
            Settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
