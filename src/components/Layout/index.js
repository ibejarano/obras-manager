import React from "react";

import SideBar from "./sidebar";

function UserIcon({ isOpen, setIsOpen }) {
  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2"></div>
      <div className="relative w-1/2 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
        </button>
        {isOpen && (
          <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Sign Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Layout({ children, isOpen, setIsOpen }) {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <SideBar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <UserIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </div>
  );
}
