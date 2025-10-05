import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <p className="text-gray-500">&copy; 2025 AutoPoster AI. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer