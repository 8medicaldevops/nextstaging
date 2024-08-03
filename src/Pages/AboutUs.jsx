import NavBar from "@/components/NavBar";
import abtPeeps from '../assets/images/abt-peeps.png'
import team from '../assets/images/team.png'
import teamTwo from '../assets/images/teamtwo.png'
import Footer from "@/components/Footer";



 export default function AboutUs () {
    return(
        <div>
            <NavBar />
            <div className="bg-[url(./assets/images/abt-bg.jpeg)]  bg-[#43039C61]/50 accent-[#37018330] bg-blend-overlay max-2xl:bg-[center_bottom_-22rem] max-xl:bg-[center_bottom_-7rem] max-lg:h-[40vh]  max-lg:bg-[center_top_-6rem] max-md:h-[30vh] max-md:bg-[center_top_-1rem] bg-[center_bottom_-38rem] bg-cover bg-no-repeat h-[50vh] flex items-end max-lg:justify-center px-10 pb-[80px] max-md:pb-10">
            <p className="text-white text-[56px] font-brbold max-lg:text-5xl">
                About Us
               </p>
            </div>
            <div className="flex justify-between gap-[128px] bg-[#F9F9FA] items-center py-[80px] px-[148px] max-xl:px-16 max-lg:flex-col max-lg:py-12 max-lg:px-4 ">
                <main className="flex flex-col gap-9">
                    <p className="text-4xl text-ev-950 font-brsemi">Our Story</p>
                    <p className="font-brmedium text-[#666666] w-[508px] max-xl:w-[400px] max-lg:w-[95%] ">
                        Our story is one woven with passion, Innovation and commitment to transforming emergency care response in Nigeria and Africa at large. Our Journey was birthed
                        from a place of pain and loss of loved ones which fuels our vision to make access to care
                        easier.
                        We are an end to end platform that identifies and connects hospital, personnel, care, information
                        and credit to users in 10 mins or less, we ensure accessibility, Improved patient care, and
                        streamlined processes to care.
                        Our team consists of health care personnel, product enthusiasts, who are continually building
                        the operating system for accessing care.
                        Join us in our mission to empower the African health care system.
                    </p>
                </main>
                <aside>
                <img src={abtPeeps} alt="a picture of 8medical staffs" />
                </aside>
            </div>
            <div className="bg-ev-700 ">
                <div className="w-[248px] rounded-ee-full h-[248px] bg-[#09F96D]"></div>
                <div className="justify-center  flex flex-col items-center">
                <span className="flex flex-col items-center">
                    <div className="flex items-center">
                    <p className="text-5xl font-brbold text-[#09F96D] max-lg:text-[40px]">OUR</p>
                    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.5 6H42.5V4C42.5 2.8946 41.6044 2 40.5 2C39.3956 2 38.5 2.8946 38.5 4V7.035C37.3924 7.8618 36.3238 8.7272 35.2858 9.6236C32.2756 7.3594 28.548 6 24.5 6C14.5752 6 6.5 14.0742 6.5 24C6.5 33.9258 14.5752 42 24.5 42C34.4248 42 42.5 33.9258 42.5 24C42.5 19.9518 41.1406 16.2242 38.8764 13.2142C39.7728 12.1762 40.6382 11.1076 41.465 10H44.5C45.6044 10 46.5 9.1054 46.5 8C46.5 6.8946 45.6044 6 44.5 6ZM38.5 24C38.5 31.7188 32.2198 38 24.5 38C16.7802 38 10.5 31.7188 10.5 24C10.5 16.2812 16.7802 10 24.5 10C27.3714 10 30.0418 10.8714 32.2658 12.3602C31.684 12.9136 31.1054 13.4702 30.5334 14.0334C30.1212 14.4472 29.7172 14.869 29.3106 15.2882C27.8768 14.4928 26.2526 14 24.5 14C18.9864 14 14.5 18.4864 14.5 24C14.5 29.5136 18.9864 34 24.5 34C30.0136 34 34.5 29.5136 34.5 24C34.5 22.2474 34.0072 20.6232 33.2116 19.1894C33.631 18.7828 34.0528 18.3788 34.4664 17.9666C35.0296 17.3946 35.5862 16.816 36.1396 16.234C37.6286 18.4582 38.5 21.1288 38.5 24ZM30.5 24C30.5 27.3086 27.8086 30 24.5 30C21.1914 30 18.5 27.3086 18.5 24C18.5 20.6914 21.1914 18 24.5 18C25.1916 18 25.8458 18.1412 26.4646 18.3574C25.2796 19.7082 24.1418 21.1062 23.0858 22.5858C22.5986 23.2708 22.57 24.219 23.0858 24.9416C23.7364 25.853 25.0026 26.0646 25.9142 25.4142C27.3938 24.3582 28.7918 23.2204 30.1426 22.0354C30.3588 22.6542 30.5 23.3084 30.5 24Z" fill="#09F96D"/>
                    </svg>
                    </div>
                    <p className="text-white font-brbold text-[64px] max-lg:text-[40px]">MISSION</p>
                </span>
                <p className="text-white w-[720px] font-brlight text-center text-2xl max-lg:text-lg max-lg:w-[95%]">To provide and ensure rapid access to life saving medical intervention by empowering smarter emergency response.</p>
                </div>
                <div className="flex justify-end">
                <div className="w-[248px] flex justify-self-end rounded-ss-full h-[248px] bg-[#F96D09]"></div>
                </div>
            </div>
            <div className="bg-[#F8F4FE]">
            <div className="flex justify-end">
                <div className="w-[248px] flex justify-self-end rounded-es-full h-[248px] bg-[#95F909]"></div>
                </div>
            
                <div className="justify-center flex flex-col items-center">
                    <span className="flex flex-col items-center">
                    <div className="flex items-center">
                    <p className="text-5xl font-brbold text-ev-700 max-lg:text-[40px]">OUR</p>
                    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.6875 28.2468C45.6875 28.2468 45.6875 28.2468 45.6875 28.2374C45.5526 27.8592 45.3942 27.4897 45.2131 27.1312L37.4244 9.40869C37.3119 9.15348 37.1529 8.92141 36.9556 8.72431C36.3288 8.09728 35.5846 7.59988 34.7655 7.26053C33.9464 6.92117 33.0685 6.7465 32.1819 6.7465C31.2953 6.7465 30.4173 6.92117 29.5982 7.26053C28.7792 7.59988 28.0349 8.09728 27.4081 8.72431C26.9872 9.14571 26.7505 9.71682 26.75 10.3124V14.2499H22.25V10.3124C22.25 9.71617 22.0133 9.1443 21.5919 8.72244C20.965 8.09541 20.2208 7.59801 19.4017 7.25865C18.5827 6.9193 17.7047 6.74463 16.8181 6.74463C15.9315 6.74463 15.0536 6.9193 14.2345 7.25865C13.4154 7.59801 12.6712 8.09541 12.0444 8.72244C11.8471 8.91954 11.6881 9.15161 11.5756 9.40681L3.78687 27.1312C3.60582 27.4897 3.44738 27.8592 3.3125 28.2374C3.3125 28.2374 3.3125 28.2374 3.3125 28.2468C2.83682 29.5858 2.65958 31.0127 2.7932 32.4274C2.92681 33.8421 3.36804 35.2105 4.086 36.4368C4.80396 37.663 5.78129 38.7176 6.94956 39.5265C8.11784 40.3355 9.44881 40.8793 10.8493 41.1198C12.2498 41.3604 13.6859 41.292 15.0572 40.9193C16.4285 40.5466 17.7017 39.8786 18.7877 38.9622C19.8737 38.0459 20.7463 36.9031 21.3444 35.6141C21.9425 34.3251 22.2515 32.9209 22.25 31.4999V18.7499H26.75V31.4999C26.7484 32.9209 27.0575 34.3251 27.6556 35.6141C28.2536 36.9031 29.1262 38.0459 30.2123 38.9622C31.2983 39.8786 32.5715 40.5466 33.9428 40.9193C35.314 41.292 36.7502 41.3604 38.1507 41.1198C39.5512 40.8793 40.8821 40.3355 42.0504 39.5265C43.2187 38.7176 44.196 37.663 44.914 36.4368C45.6319 35.2105 46.0732 33.8421 46.2068 32.4274C46.3404 31.0127 46.1632 29.5858 45.6875 28.2468ZM15.5 11.6774C15.8215 11.4441 16.199 11.3 16.5942 11.2598C16.9894 11.2196 17.3881 11.2848 17.75 11.4487V23.2893C15.7551 22.0092 13.3616 21.5011 11.0187 21.8606L15.5 11.6774ZM12.5 36.7499C11.4616 36.7499 10.4466 36.442 9.58325 35.8652C8.71989 35.2883 8.04699 34.4683 7.64963 33.509C7.25227 32.5497 7.1483 31.4941 7.35087 30.4757C7.55344 29.4573 8.05346 28.5219 8.78768 27.7876C9.52191 27.0534 10.4574 26.5534 11.4758 26.3508C12.4942 26.1482 13.5498 26.2522 14.5091 26.6496C15.4684 27.0469 16.2883 27.7198 16.8652 28.5832C17.4421 29.4466 17.75 30.4616 17.75 31.4999C17.75 32.8923 17.1969 34.2277 16.2123 35.2122C15.2277 36.1968 13.8924 36.7499 12.5 36.7499ZM31.25 11.4487C31.6121 11.2859 32.0107 11.2214 32.4056 11.2616C32.8006 11.3017 33.178 11.4452 33.5 11.6774L37.9756 21.8606C35.6327 21.5011 33.2392 22.0092 31.2444 23.2893L31.25 11.4487ZM36.5 36.7499C35.4616 36.7499 34.4466 36.442 33.5832 35.8652C32.7199 35.2883 32.047 34.4683 31.6496 33.509C31.2523 32.5497 31.1483 31.4941 31.3509 30.4757C31.5534 29.4573 32.0535 28.5219 32.7877 27.7876C33.5219 27.0534 34.4574 26.5534 35.4758 26.3508C36.4942 26.1482 37.5498 26.2522 38.5091 26.6496C39.4684 27.0469 40.2883 27.7198 40.8652 28.5832C41.4421 29.4466 41.75 30.4616 41.75 31.4999C41.75 32.8923 41.1969 34.2277 40.2123 35.2122C39.2277 36.1968 37.8924 36.7499 36.5 36.7499Z" fill="#6D09F9"/>
                    </svg>
                    </div>
                    <p className="text-[#2E0469] font-brbold text-[64px] max-lg:text-[40px]">VISION</p>
                </span>
                <p className="text-[#636066] w-[720px] font-brlight text-center text-2xl max-lg:text-lg max-lg:w-[95%]">To be the infrastructural framework for provision and distribution of prompt, affordable, reliable & integrated access to emergency response solutions (medical, fire, security, roadside assistance).</p>
                </div>
                <div className="w-[248px] rounded-se-full h-[248px] bg-[#6D09F9]"></div>
            </div>
            <div className=" bg-[#F9F9FA]  py-[120px] flex flex-col gap-12 items-center">
            <p className="text-5xl font-brbold text-ev-700 max-lg:text-4xl" >Our Values</p>
        
                
                <span className="flex flex-wrap gap-9 max-lg:flex-col max-xl:justify-center">
                    <div className="flex flex-col gap-4 text-center w-[200px] items-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#6D09F9"/>
                    <path d="M35.4286 45L28.5486 35.52H26.9486V45H20.0286V17H32.2286C39.3753 17 42.9486 20.1333 42.9486 26.4C42.9486 31.28 40.6686 34.2 36.1086 35.16L43.7486 45H35.4286ZM34.7886 28.8C35.4286 28.32 35.7486 27.52 35.7486 26.4C35.7486 25.28 35.4419 24.4933 34.8286 24.04C34.2153 23.56 33.2153 23.32 31.8286 23.32H26.9486V29.52H31.8286C33.1886 29.52 34.1753 29.28 34.7886 28.8Z" fill="white"/>
                    </svg>
                    <p className="text-ev-950 font-brbold text-[28px]">RELIABLE</p>
                    <p className="text-[#666666] font-brmedium  ">We give no excuses. We will be there when you call.</p>
                    </div>
                    <div className="flex flex-col gap-4 text-center w-[200px] items-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#6D09F9"/>
                    <path d="M29.847 39.72H43.967V46H22.927V18H43.567V24.28H29.847V28.76H42.527V34.96H29.847V39.72Z" fill="white"/>
                    </svg>

                    <p className="text-ev-950 font-brbold text-[28px]">Excellent</p>
                    <p className="text-[#666666] font-brmedium  ">We are continuously in the pursuit of excellence.</p>
                    </div>
                    <div className="flex flex-col gap-4 text-center w-[200px] items-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#6D09F9"/>
                    <path d="M40.2363 44L38.3562 38.56H27.6363L25.7563 44H18.3963L28.9563 16H37.0363L47.5963 44H40.2363ZM29.6763 32.72H36.3163L32.9963 23.16L29.6763 32.72Z" fill="white"/>
                    </svg>

                    <p className="text-ev-950 font-brbold text-[28px]">Available</p>
                    <p className="text-[#666666] font-brmedium  ">We take no day off. We are available round the clock</p>
                    </div>
                    <div className="flex flex-col gap-4 text-center w-[200px] items-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#6D09F9"/>
                    <path d="M33.4911 46.56C29.1711 46.56 25.6511 45.2 22.9311 42.48C20.2378 39.76 18.8911 36.28 18.8911 32.04C18.8911 27.8 20.2244 24.3067 22.8911 21.56C25.5844 18.8133 29.1178 17.44 33.4911 17.44C36.4244 17.44 38.9978 18.12 41.2111 19.48C43.4244 20.8133 45.0911 22.7467 46.2111 25.28L40.1711 28.36C38.8911 25.4533 36.6778 24 33.5311 24C31.3444 24 29.5578 24.7467 28.1711 26.24C26.8111 27.7333 26.1311 29.6533 26.1311 32C26.1311 34.3467 26.8111 36.2667 28.1711 37.76C29.5578 39.2533 31.3444 40 33.5311 40C36.6778 40 38.8911 38.5467 40.1711 35.64L46.2111 38.72C45.0911 41.2533 43.4244 43.2 41.2111 44.56C38.9978 45.8933 36.4244 46.56 33.4911 46.56Z" fill="white"/>
                    </svg>

                    <p className="text-ev-950 font-brbold text-[28px]">Committed</p>
                    <p className="text-[#666666] font-brmedium  ">We are committed to keeping you alive and healthy</p>
                    </div>
                    <div className="flex flex-col gap-4 text-center w-[200px] items-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#6D09F9"/>
                    <path d="M28.6576 47V25.44H20.7376V19H43.5376V25.44H35.6176V47H28.6576Z" fill="white"/>
                    </svg>

                    <p className="text-ev-950 font-brbold text-[28px]">Timely</p>
                    <p className="text-[#666666] font-brmedium  ">We are always on time regardless of the situation</p>
                    </div>
                    
                    </span>
                    
                <div className="flex flex-col items-center gap-12 py-[80px] max-lg:px-4 max-lg:text-center  ">
                    <p className="text-ev-950 font-brbold text-[40px] max-lg:text-4xl">The EightMedical Team</p>
                    <div className="flex justify-between items-center gap-6 max-lg:flex-col">
                    <main>
                     <img src={team} alt="team members image" />
                    </main>
                    <aside className="max-lg:w-full">
                        <img className=" max-lg:w-full" src={teamTwo} alt="team members image" /> 
                    </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
 }