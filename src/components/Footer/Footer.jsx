import React from "react";

const Footer = ({ visits }) => {
  return (
    <footer className="w-full fixed bottom-0 bg-white-100 py-3 px-8">
      <div className="flex justify-end">
        <span className="text-gray-600">Hola - Visitas: {visits}</span>
      </div>
    </footer>
  );
};

export default Footer;
