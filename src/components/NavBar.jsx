import { useState } from 'react';
//mport { MenuIcon, XIcon } from '@heroicons/react/outline'; // You can use any icon library
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  //NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
//import { googleLogout } from '@react-oauth/google';
// import { Separator } from "@/components/ui/separator"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const signInData = JSON.parse(sessionStorage.getItem('SignIn'));
  const token = signInData?.data?.tokens?.accessToken || "N/A";
  const userName = signInData?.data?.firstName || "N/A";
  // console.log(userName)

  function signUserOut() {
    sessionStorage.clear();
    localStorage.clear();
    //googleLogout();
  }

  const handleLogOut = () => {
    sessionStorage.clear()
    localStorage.clear()

  }

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
                      <Link to="/ServiceEr">
                        Emergency Response
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                      <Link to="/ServiceAmb">
                        Ambulance Standby
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                      <Link to="/ServiceAgt">
                        Ambulance Transport
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                      <Link to="/ServiceUg">
                        Urgent care
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className=' w-[220px] hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                      <Link to="/ServiceAfterLife">
                        AfterLife Transport
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
          <Link to="/OtherBookings">
            <li className={`cursor-pointer ${isActive('/Contact') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>Contact</li>
          </Link>
          <Link to="/ems-week">
            <li className={`cursor-pointer ${isActive('/ems-week') ? 'border-b-2 border-ev-700 px-1 text-ev-700 font-semibold' : ''}`}>EMS Week</li>
          </Link>
          {token == "N/A" &&
            <span className='flex items-center gap-6'>
              <Link to="/SignIn">
                <li className={`cursor-pointer ${isActive('/SignIn') ? '  px-1 text-ev-700 font-semibold' : ''} border-l pl-5 border-[#E4E3E5]-700`}>Sign In</li>
              </Link>
              <Link to="/CreateAccount">
                <li className="cursor-pointer">
                  <button className={`px-5 py-3 text-sm font-brsemi rounded-[61px] cursor-pointer flex items-center gap-1 ${isActive('/CreateAccount') ? ' rounded-[61px]  px-1  font-semibold' : '  '} hover:text-ev-700 hover:border hover:bg-white hover:border-ev-700  bg-ev-700  text-white`}>
                    Create Account
                  </button>
                </li>
              </Link>
            </span>
          }
          {token !== "N/A" &&
            <span className='flex items-center gap-6'>
              <Link to="/OrderHistory">
                <li className={`cursor-pointer ${isActive('/OrderHistory') ? '  px-1 text-ev-700 font-semibold' : ''} border-l pl-5 border-[#E4E3E5]-700`}>Order History</li>
              </Link>
              <Link to="/CreateAccount">
                <li className="cursor-pointer">

                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex py-1 pr-3 pl-1 gap-1 rounded-[47px] border-none outline-none bg-ev-50  items-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2890_25988)">
                          <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#D9CFFF" />
                          <path d="M4 24.0723C6.58763 26.4981 10.1134 27.9999 14 27.9999C17.8866 27.9999 21.4124 26.4981 24 24.0723C23.2666 21.3498 21.2032 19.0929 18.4389 17.9091C19.9867 16.6713 20.9956 14.8275 20.9956 12.7423C20.9956 9.02476 17.8571 5.99992 14 5.99992C10.1429 5.99992 7.00442 9.02476 7.00442 12.7423C7.00442 14.8275 8.01325 16.6713 9.56112 17.9091C6.79676 19.0929 4.73343 21.3498 4 24.0723Z" fill="#8540FF" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2890_25988">
                            <rect width="28" height="28" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>{userName || ''}</p>
                      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.94 9.72699L4 10.667L8 14.667L12 10.667L11.06 9.72699L8 12.7803L4.94 9.72699Z" fill="black" />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded">
                      {/* <DropdownMenuItem>
                     <div>some future feature</div>
                          </DropdownMenuItem> */}
                      {/* <DropdownMenuSeparator />
                             <Separator className="w-full border-[1px] bg-[#181719]" /> */}
                      <DropdownMenuItem>
                        <div onClick={handleLogOut} className=" flex gap-1   font-brmedium text-sm text-[#F9091D]">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5332 12.1837L16.6665 10.0503L14.5332 7.91699" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.1333 10.0498H16.6083" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.79997 16.6663C6.11663 16.6663 3.1333 14.1663 3.1333 9.99967C3.1333 5.83301 6.11663 3.33301 9.79997 3.33301" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Log Out
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </li>
              </Link>
            </span>
          }
        </ul>
      </div>
      <div className='md:hidden'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <p>x</p>
          ) : (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7.78888H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12.7889H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 17.7889H21" stroke="#181719" strokeWidth="1.5" strokeLinecap="round" />
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

              {token !== "N/A" &&
                <span className='flex flex-col items-end gap-6'>
                  <Link to="/CreateAccount">
                    <li className="cursor-pointer">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex py-1 pr-3 pl-1 gap-1 rounded-[47px] border-none outline-none bg-ev-50  items-center">
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2890_25988)">
                              <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#D9CFFF" />
                              <path d="M4 24.0723C6.58763 26.4981 10.1134 27.9999 14 27.9999C17.8866 27.9999 21.4124 26.4981 24 24.0723C23.2666 21.3498 21.2032 19.0929 18.4389 17.9091C19.9867 16.6713 20.9956 14.8275 20.9956 12.7423C20.9956 9.02476 17.8571 5.99992 14 5.99992C10.1429 5.99992 7.00442 9.02476 7.00442 12.7423C7.00442 14.8275 8.01325 16.6713 9.56112 17.9091C6.79676 19.0929 4.73343 21.3498 4 24.0723Z" fill="#8540FF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2890_25988">
                                <rect width="28" height="28" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className='font-brmedium text-sm'>{userName || ''}</p>
                          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.94 9.72699L4 10.667L8 14.667L12 10.667L11.06 9.72699L8 12.7803L4.94 9.72699Z" fill="black" />
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white rounded">
                          {/* <DropdownMenuItem>

                     <div>some future feature</div>
                          </DropdownMenuItem> */}
                          {/* <DropdownMenuSeparator />
                             <Separator className="w-full border-[1px] bg-[#181719]" /> */}
                          <DropdownMenuItem>
                            <div onClick={signUserOut} className=" flex gap-1   font-brmedium text-sm text-[#F9091D]">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5332 12.1837L16.6665 10.0503L14.5332 7.91699" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.1333 10.0498H16.6083" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.79997 16.6663C6.11663 16.6663 3.1333 14.1663 3.1333 9.99967C3.1333 5.83301 6.11663 3.33301 9.79997 3.33301" stroke="#F9091D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Log Out
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </li>
                  </Link>
                </span>
              }
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
                          <Link to="/ServiceEr">
                            Emergency Response
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                          <Link to="/ServiceAmb">
                            Ambulance Standby
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                          <Link to="/ServiceAgt">
                            Ambulance Transport
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                          <Link to="/ServiceUg">
                            Urgent care
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink className=' w-full hover:bg-ev-500 hover:text-white p-1 rounded-[4px]'>
                          <Link to="/ServiceAfterLife">
                            AfterLife Transport
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
              <Link to="/ems-week">
                <li className='cursor-pointer'>EMS Week</li>
              </Link>
              {token == "N/A" &&
                <span className='flex flex-col gap-6 items-end'>
                  <Link to="/SignIn">
                    <li className='cursor-pointer'>Sign In</li>
                  </Link>
                  <Link to="/CreateAccount">
                    <li className="cursor-pointer">
                      <button className={`px-5 py-3 text-lg font-brsemi rounded-[61px] cursor-pointer flex items-center gap-1 ${isActive('/CreateAccount') ? ' rounded-[61px]  px-1  font-semibold' : '  '} hover:text-ev-700 hover:border hover:bg-white hover:border-ev-700  bg-ev-700  text-white`}>
                        Create Account
                      </button>
                    </li>
                  </Link>
                </span>
              }
              {token !== "N/A" &&
                <span className='flex flex-col items-end gap-6'>
                  <Link to="/OrderHistory">
                    <li className={`cursor-pointer ${isActive('/OrderHistory') ? '  px-1 text-ev-700 font-semibold' : ''} border-l pl-5 border-[#E4E3E5]-700`}>Order History</li>
                  </Link>
                </span>
              }
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
