import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import logo from "../../assets/ix.jpg";
import { ChatContext } from "../ChatContext";
import useStyles from './styles';

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
  );
  
  const Navbar = () => {
    const [toggleMobile, setToggleMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const { open } = useContext(ChatContext)
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem('user')));
    }, [location])

  const logout = () => {
    dispatch({ type: LOGOUT });

    setUser(null);
    window.location.reload();

    if(toggleMobile) {
      setToggleMobile(false);
    }
  };

  const clearCache = () => {
    setLoading(true)
    dispatch({ type: CLEAR_CACHE, data: { file: user?.result?.email + ".json" } });
    setLoading(false)
    
  }

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.49] flex-initial justify-center items-center">
        {user &&(
          <Button startIcon={<MdDelete />} variant="contained" className={classes.clearButton} disabled={loading} onClick={clearCache}>Clear Cache</Button>
        )}
      </div>
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
      <img src={logo} />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[""].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
          ))}
      </ul>
      <div className="">
        {!toggleMobile && (
          <HiMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMobile(true)} />
        )}
        {toggleMobile && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMobile(false)} />
        )}
        {toggleMobile && (
          <ul className="z-10 fixed -top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in">
          <li className="text-xl w-full my-2">
            <AiOutlineClose className="cursor-pointer" onClick={() => setToggleMobile(false)} />
          </li>
          <div className="flex flex-col items-center justify-center space-y-4 mt-4">
            
          </div>
        </ul>
        
        )}
      </div>
    </nav>
  );
};

export default Navbar;
