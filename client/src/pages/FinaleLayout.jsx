import Navbar from '@/components/layout/Navbar';
import React from 'react'


const FinaleLayout = ({ children, isLogin, setIsLogin }) => {
  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <div setIsLogin={setIsLogin} >{children}</div>
    </>
  );
}

export default FinaleLayout