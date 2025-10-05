import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-gray-500">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center text-white">
          <p className="text-white">&copy; 2025 AutoPoster AI. All rights reserved.</p>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-blue-500">Privacy</a>
            <a href="#" className="hover:text-blue-500">Terms</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer