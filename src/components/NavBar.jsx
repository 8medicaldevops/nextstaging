import { useState } from 'react';
//mport { MenuIcon, XIcon } from '@heroicons/react/outline'; // You can use any icon library
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  return (
    <div className='flex justify-between px-6 py-4 items-center bg-white shadow-md'>
      <div>
        <Link to='/'>
        <img src={logo} alt='Logo' className='h-8 w-auto' />
        </Link>
      </div>
      <div className='hidden md:flex'>
        <ul className='flex gap-6 font-light font-brreg text-sm text-[#636066]'>
          <li className='border-b-2 border-ev-700 px-1 text-ev-700 font-semibold cursor-pointer'>Home</li>
          <li className='cursor-pointer'>About Us</li>
          <li className='flex gap-1 items-center cursor-pointer'>
            Services
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.7653 3.26529L4.2653 5.76529C4.23046 5.80025 4.18906 5.82799 4.14348 5.84692C4.0979 5.86584 4.04903 5.87559 3.99967 5.87559C3.95032 5.87559 3.90145 5.86584 3.85587 5.84692C3.81029 5.82799 3.76889 5.80025 3.73405 5.76529L1.23405 3.26529C1.1636 3.19484 1.12402 3.09929 1.12402 2.99967C1.12402 2.90004 1.1636 2.80449 1.23405 2.73404C1.3045 2.66359 1.40005 2.62402 1.49967 2.62402C1.5993 2.62402 1.69485 2.66359 1.7653 2.73404L3.99999 4.96873L6.23467 2.73373C6.30512 2.66328 6.40067 2.6237 6.5003 2.6237C6.59993 2.6237 6.69548 2.66328 6.76592 2.73373C6.83637 2.80418 6.87595 2.89972 6.87595 2.99935C6.87595 3.09898 6.83637 3.19453 6.76592 3.26498L6.7653 3.26529Z" fill="#636066"/>
            </svg>
          </li>
          <li className='cursor-pointer'>Impact</li>
          <li className='cursor-pointer'>Blog</li>
          <li className='cursor-pointer'>Contact</li>
        </ul>
      </div>
      <div className='md:hidden'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <p>x</p>
          ) : (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.78888H21" stroke="#181719" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M3 12.7889H21" stroke="#181719" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M3 17.7889H21" stroke="#181719" stroke-width="1.5" stroke-linecap="round"/>
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
            className={`fixed top-0 right-0 h-full rounded-l-mm w-1/2 bg-white transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? '' : 'translate-x-full'}`}
          > 
            <button
              className='absolute top-4 right-4 text-gray-700'
              onClick={() => setIsMenuOpen(false)}
            >
            </button>
            <ul className='flex flex-col gap-6 font-light justify-center items-center font-brreg text-lg text-[#636066] mt-16'>
                <Link to='/'>
              <li className='border-b-2 border-ev-700 px-1 text-ev-700 font-semibold cursor-pointer'>Home</li>
                </Link>
              <li className='cursor-pointer'>About Us</li>
              <li className='flex gap-1 items-center cursor-pointer'>
                Services
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.7653 3.26529L4.2653 5.76529C4.23046 5.80025 4.18906 5.82799 4.14348 5.84692C4.0979 5.86584 4.04903 5.87559 3.99967 5.87559C3.95032 5.87559 3.90145 5.86584 3.85587 5.84692C3.81029 5.82799 3.76889 5.80025 3.73405 5.76529L1.23405 3.26529C1.1636 3.19484 1.12402 3.09929 1.12402 2.99967C1.12402 2.90004 1.1636 2.80449 1.23405 2.73404C1.3045 2.66359 1.40005 2.62402 1.49967 2.62402C1.5993 2.62402 1.69485 2.66359 1.7653 2.73404L3.99999 4.96873L6.23467 2.73373C6.30512 2.66328 6.40067 2.6237 6.5003 2.6237C6.59993 2.6237 6.69548 2.66328 6.76592 2.73373C6.83637 2.80418 6.87595 2.89972 6.87595 2.99935C6.87595 3.09898 6.83637 3.19453 6.76592 3.26498L6.7653 3.26529Z" fill="#636066"/>
                </svg>
              </li>
              <li className='cursor-pointer'>Impact</li>
              <li className='cursor-pointer'>Blog</li>
              <li className='cursor-pointer'>Contact</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
