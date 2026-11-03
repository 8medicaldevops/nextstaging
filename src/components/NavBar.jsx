"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import logo__asset from '../assets/images/logo.png';
const logo = logo__asset.src ?? logo__asset;
import { Link } from "@/lib/router-compat";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/AboutUs" },
  // "Services" dropdown is rendered between these
  { label: "Impact", to: "/Impact" },
  { label: "Contact", to: "/OtherBookings" },
  { label: "EMS Week", to: "/ems-week" },
];

const SERVICE_LINKS = [
  { label: "Emergency Response", to: "/ServiceEr" },
  { label: "Ambulance Standby", to: "/ServiceAmb" },
  { label: "Ambulance Transport", to: "/ServiceAgt" },
  { label: "Urgent care", to: "/ServiceUg" },
  { label: "AfterLife Transport", to: "/ServiceAfterLife" },
];

function UserAvatar() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#D9CFFF" />
      <path d="M4 24.0723C6.58763 26.4981 10.1134 27.9999 14 27.9999C17.8866 27.9999 21.4124 26.4981 24 24.0723C23.2666 21.3498 21.2032 19.0929 18.4389 17.9091C19.9867 16.6713 20.9956 14.8275 20.9956 12.7423C20.9956 9.02476 17.8571 5.99992 14 5.99992C10.1429 5.99992 7.00442 9.02476 7.00442 12.7423C7.00442 14.8275 8.01325 16.6713 9.56112 17.9091C6.79676 19.0929 4.73343 21.3498 4 24.0723Z" fill="#8540FF" />
    </svg>
  );
}

function LogOutItem({ onLogOut }) {
  return (
    <DropdownMenuItem>
      <button onClick={onLogOut} className="flex items-center gap-1 font-brmedium text-sm text-alarm">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M14.5332 12.1837L16.6665 10.0503L14.5332 7.91699" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.1333 10.0498H16.6083" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.79997 16.6663C6.11663 16.6663 3.1333 14.1663 3.1333 9.99967C3.1333 5.83301 6.11663 3.33301 9.79997 3.33301" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Log Out
      </button>
    </DropdownMenuItem>
  );
}

// Nav link with an animated underline that grows from the left on hover,
// and stays full-width when the route is active.
function NavLink({ to, label, active, dark, className, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative py-1 text-sm transition-colors duration-200",
        dark
          ? active ? "font-brsemi text-white" : "font-brreg text-white/60 hover:text-white"
          : active ? "font-brsemi text-ink" : "font-brreg text-mute hover:text-ink",
        className
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-[width] duration-300 ease-out-strong",
          dark ? "bg-ev-400" : "bg-ev-700",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}

export default function NavBar({ dark = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const [signInData, setSignInData] = useState(null);

  useEffect(() => {
    try {
      setSignInData(JSON.parse(sessionStorage.getItem('SignIn')));
    } catch (e) {
      /* no stored session */
    }
  }, []);

  const token = signInData?.data?.tokens?.accessToken || "N/A";
  const userName = signInData?.data?.firstName || "N/A";
  const isSignedIn = token !== "N/A";

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  const isServicePage = SERVICE_LINKS.some((s) => isActive(s.to));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md",
        dark ? "border-white/10 bg-night-deep/80" : "border-line bg-white/85"
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="8medical home" className="shrink-0">
          <img
            src={dark ? "/8-medical-logo-white%201.svg" : logo}
            alt="8medical"
            className={dark ? "h-8 w-auto" : "h-7 w-auto"}
          />
        </Link>

        {/* centered desktop nav */}
        <nav className="hidden justify-center md:flex" aria-label="Main">
          <ul className="flex items-center gap-7">
            <li><NavLink dark={dark} to="/" label="Home" active={isActive("/")} /></li>
            <li><NavLink dark={dark} to="/AboutUs" label="About Us" active={isActive("/AboutUs")} /></li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "h-auto bg-transparent p-0 py-1 text-sm transition-colors duration-200",
                        dark
                          ? isServicePage ? "font-brsemi text-white" : "font-brreg font-normal text-white/60 hover:text-white"
                          : isServicePage ? "font-brsemi text-ink hover:text-ink" : "font-brreg font-normal text-mute hover:text-ink"
                      )}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-0.5 rounded-xl border border-line bg-white p-2">
                      {SERVICE_LINKS.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className={cn(
                            "w-[224px] rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 hover:bg-ev-50 hover:text-ev-700",
                            isActive(s.to) ? "bg-ev-50 font-brsemi text-ev-700" : "text-ink"
                          )}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li><NavLink dark={dark} to="/Impact" label="Impact" active={isActive("/Impact")} /></li>
            <li><NavLink dark={dark} to="/OtherBookings" label="Contact" active={isActive("/OtherBookings")} /></li>
            <li><NavLink dark={dark} to="/ems-week" label="EMS Week" active={isActive("/ems-week")} /></li>
          </ul>
        </nav>

        {/* right-side actions */}
        <div className="hidden items-center gap-5 md:flex">
          {!isSignedIn && (
            <>
              <NavLink dark={dark} to="/SignIn" label="Sign In" active={isActive("/SignIn")} />
              <Link
                to="/CreateAccount"
                className="inline-flex items-center rounded-full bg-ev-700 px-4 py-2 font-brsemi text-sm text-white transition-[transform,background-color] duration-200 ease-out-strong hover:bg-ev-800 active:scale-[0.97]"
              >
                Create Account
              </Link>
            </>
          )}
          {isSignedIn && (
            <>
              <NavLink dark={dark} to="/OrderHistory" label="Order History" active={isActive("/OrderHistory")} />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-1 pr-2.5 outline-none transition-colors hover:border-ev-300">
                  <UserAvatar />
                  <p className="text-sm text-ink">{userName || ''}</p>
                  <svg width="14" height="20" viewBox="0 0 16 24" fill="none" aria-hidden="true">
                    <path d="M4.94 9.72699L4 10.667L8 14.667L12 10.667L11.06 9.72699L8 12.7803L4.94 9.72699Z" fill="currentColor" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl border border-line bg-white">
                  <LogOutItem onLogOut={handleLogOut} />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* mobile trigger */}
        <button
          className="justify-self-end md:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true" className={dark ? "text-white" : "text-ink"}>
            <path d="M3 7.78888H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 12.7889H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 17.7889H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-night-deep/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-[340px] flex-col border-l border-line bg-white p-7 animate-in slide-in-from-right duration-300 ease-out-strong">
            <div className="flex items-center justify-between">
              <img src={logo} alt="8medical" className="h-6 w-auto" />
              <button className="p-2 text-ink" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-5 overflow-y-auto" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  active={isActive(link.to)}
                  className="w-fit text-base"
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}

              <div className="border-t border-line pt-5">
                <p className="mb-3 font-brsemi text-xs uppercase tracking-wide text-mute">Services</p>
                <ul className="flex flex-col gap-3">
                  {SERVICE_LINKS.map((s) => (
                    <li key={s.to}>
                      <Link
                        to={s.to}
                        className={cn("text-base", isActive(s.to) ? "font-brsemi text-ev-700" : "text-ink")}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {isSignedIn && (
                <div className="border-t border-line pt-5">
                  <div className="mb-4 flex items-center gap-2">
                    <UserAvatar />
                    <p className="font-brmedium text-sm text-ink">{userName || ''}</p>
                  </div>
                  <Link to="/OrderHistory" className="text-base text-ink" onClick={() => setIsMenuOpen(false)}>
                    Order History
                  </Link>
                  <button onClick={handleLogOut} className="mt-4 flex items-center gap-1 font-brmedium text-sm text-alarm">
                    Log Out
                  </button>
                </div>
              )}
            </nav>

            {!isSignedIn && (
              <div className="flex flex-col gap-3 border-t border-line pt-5">
                <Link
                  to="/CreateAccount"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-ev-700 px-5 py-3 font-brsemi text-base text-white active:scale-[0.97]"
                >
                  Create Account
                </Link>
                <Link
                  to="/SignIn"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 font-brsemi text-base text-ink"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
