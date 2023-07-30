import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineChartSquareBar,HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine,RiAlbumFill } from 'react-icons/ri';
import { FiTrendingUp } from 'react-icons/fi';
import { FcAbout } from 'react-icons/fc';
import UseAnimations from 'react-useanimations';
import {PiMusicNoteLight } from 'react-icons/Pi'
import github from 'react-useanimations/lib/github'
import infinity from 'react-useanimations/lib/infinity'
import skipBack from 'react-useanimations/lib/skipBack'
import Link from 'next/link'
// import { logo } from '../assets';
import { Icon } from '@rsuite/icons';
const links = [
  { name: 'Home', href : '/', icon: HiOutlineHome },
  { name: 'Trending', href : '/Trending', icon: FiTrendingUp },
  { name: 'Albums', href : '/Albums', icon: RiAlbumFill },
  { name: 'Top Charts', href : '/Charts', icon: HiOutlineChartSquareBar },
  { name: 'About', href : '/about', icon: FcAbout },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10 mr-5">
    {links.map((item) => (
      <Link 
        key={item.name}
        href={item.href}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-light-1 hover:text-dark-2"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </Link>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-dark-1">
        <div className="flex justify-between">
        <UseAnimations animation={github} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        <UseAnimations animation={skipBack} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        <UseAnimations animation={infinity} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        
        </div>
       
        {/* <img src='https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F6f%2FLogo_of_Twitter.svg%2F512px-Logo_of_Twitter.svg.png%3F20220821125553&tbnid=HwHbPW3dYmTKhM&vet=12ahUKEwj-ovPG67KAAxVl7DgGHY2-D3gQMygHegUIARCAAg..i&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ALogo_of_Twitter.svg&docid=a1CrifKNjUq-HM&w=512&h=421&q=svg&client=opera&ved=2ahUKEwj-ovPG67KAAxVl7DgGHY2-D3gQMygHegUIARCAAg' alt="logo" className="w-full h-14 object-contain" /> */}
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-8 h-8 mr-2 text-light-2" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-8 h-8 mr-2 text-light-2" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#8b863d] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
      <div className="flex justify-between">
        <UseAnimations animation={github} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        <UseAnimations animation={skipBack} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        <UseAnimations animation={infinity} size={56} strokeColor='#ffae00' fillColor='#ffae00' autoplay loop/>
        </div>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
