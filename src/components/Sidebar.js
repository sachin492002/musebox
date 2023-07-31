import React, {useState} from 'react';

import {HiOutlineChartSquareBar, HiOutlineHome, HiOutlineMenu} from 'react-icons/hi';
import {RiAlbumFill, RiCloseLine} from 'react-icons/ri';
import {FiTrendingUp} from 'react-icons/fi';
import {FcAbout} from 'react-icons/fc';
import UseAnimations from 'react-useanimations';

import github from 'react-useanimations/lib/github'
import infinity from 'react-useanimations/lib/infinity'
import skipBack from 'react-useanimations/lib/skipBack'
import {BiSolidPlaylist} from 'react-icons/bi'
import Link from 'next/link'

const links = [
  { name: 'Home', href : '/', icon: HiOutlineHome },
  { name: 'Trending', href : '/Trending', icon: FiTrendingUp },
    {name:'Top Playlists',href:'/playlists',icon:BiSolidPlaylist},
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


        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-8 h-8 ml-2 text-light-1" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-8 h-8 ml-2 text-light-1" onClick={() => setMobileMenuOpen(false)} />
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
