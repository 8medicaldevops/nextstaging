import { useState } from 'react';
//mport { MenuIcon, XIcon } from '@heroicons/react/outline'; // You can use any icon library
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";





export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;



  return (
    <div className='flex justify-between px-6 py-4 items-center bg-white shadow-md'>
      <div>
        <Link to='/'>
        <img src={logo} alt='Logo' className='h-8 w-auto' />
        </Link>
      </div>
      <div className='hidden md:flex'>
        <ul className='flex items-center gap-6 font-light font-brreg text-sm text-[#636066]'>
          <Link to="/"
          >
          <li className={`cursor-pointer ${isActive('/') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Home</li>
          </Link>
          <Link to="/AboutUs" >
          <li className={`cursor-pointer ${isActive('/AboutUs') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>About Us</li>
          </Link>

          <li >
            <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`cursor-pointer p-0 ${isActive('/ServiceEr') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white rounded-[15px] gap-4 flex flex-col py-[40px] px-4">
                  <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                    <Link to="/ServiceAmb">
                  Ambulance Standby
                  </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceAgt">
                  Air and Ground Transport
                  </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceEr">
                  Emergency Response
                  </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceUg">
                  Urgent care
                  </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          </li>
          <Link to="/Impact">
          <li className={`cursor-pointer ${isActive('/Impact') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Impact</li>
          </Link>
          {/* <li className={`cursor-pointer ${isActive('/Blog') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Blog</li> */}
          <Link to= "/OtherBookings">
          <li className={`cursor-pointer ${isActive('/Contact') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Contact</li>
          </Link>
        </ul>
      </div>
      <div className='md:hidden'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <p>x</p>
          ) : (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.78888H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 12.7889H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 17.7889H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 h-full rounded-l-mm w-2/3 bg-white transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? '' : 'translate-x-full'}`}
          > 
            <button
              className='absolute top-4 right-4 text-gray-700'
              onClick={() => setIsMenuOpen(false)}
            >
            </button>
            <ul className='flex flex-col gap-6 font-light justify-center items-end px-8 font-brreg text-lg text-[#636066] mt-16'>
                <Link to='/'>
              <li className={`cursor-pointer ${isActive('/') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Home</li>
                </Link>
                <Link to='AboutUs'>
                
              <li className={`cursor-pointer ${isActive('/AboutUs') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>About Us</li>
              </Link>
              <li className='flex gap-1 items-center cursor-pointer'>
              <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-brreg text-lg p-0 text-[#636066]">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white rounded-[15px] gap-4 flex flex-col  fixed   text-right ease-in-out  top-[200px]  py-[40px] px-4">
                  <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceAmb">
                  Ambulance Standby
                  </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceAgt">
                  Air and Ground Transport
                  </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceEr">
                  Emergency Response
                  </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                  <Link to="/ServiceUg">
                  Urgent care
                  </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
              </li>
              <Link to="/Impact">
              <li className='cursor-pointer'>Impact</li>
              </Link>
              {/* <li className='cursor-pointer'>Blog</li> */}
              <Link to="/OtherBookings">
              <li className='cursor-pointer'>Contact</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
