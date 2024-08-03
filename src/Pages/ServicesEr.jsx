import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import players from "../assets/images/playersemergency.png";
import { Link , useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookServiceModal from "@/components/BookServiceModal";
//import air from "../../public/air.png"




export default function ServicesEr() {
    const [bookingModal, setBookingModal] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    });
    return(
        <div>
            <NavBar />
            <div className="px-[128px] max-xl:px-6 max-lg:px-4">
                <section className="flex items-center justify-between py-9 max-lg:flex-col max-lg:gap-12">
                    <main className="flex flex-col text-center gap-9">
                        <div className="flex flex-col max-lg:flex max-lg:items-center gap-6">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="64" rx="10.6667" fill="#FEE6E8"/>
                        <g clip-path="url(#clip0_1146_10710)">
                        <path d="M30 14V12.6666C30 12.1362 30.2107 11.6275 30.5858 11.2524C30.9609 10.8773 31.4696 10.6666 32 10.6666C32.5304 10.6666 33.0391 10.8773 33.4142 11.2524C33.7893 11.6275 34 12.1362 34 12.6666V14C34 14.5304 33.7893 15.0391 33.4142 15.4142C33.0391 15.7892 32.5304 16 32 16C31.4696 16 30.9609 15.7892 30.5858 15.4142C30.2107 15.0391 30 14.5304 30 14ZM44 20C44.2627 20.0002 44.5229 19.9486 44.7657 19.8482C45.0085 19.7479 45.2291 19.6006 45.415 19.415L46.7483 18.0816C46.9344 17.8956 47.0819 17.6747 47.1826 17.4317C47.2833 17.1886 47.3351 16.9281 47.3351 16.665C47.3351 16.4019 47.2833 16.1413 47.1826 15.8983C47.0819 15.6552 46.9344 15.4343 46.7483 15.2483C46.5623 15.0623 46.3414 14.9147 46.0984 14.814C45.8553 14.7133 45.5948 14.6615 45.3317 14.6615C45.0686 14.6615 44.808 14.7133 44.565 14.814C44.3219 14.9147 44.101 15.0623 43.915 15.2483L42.5817 16.5816C42.3003 16.8614 42.1085 17.2185 42.0306 17.6075C41.9528 17.9966 41.9924 18.4 42.1444 18.7665C42.2965 19.1329 42.5541 19.4459 42.8845 19.6655C43.215 19.8852 43.6032 20.0016 44 20ZM18.585 19.415C18.9607 19.7907 19.4703 20.0018 20.0017 20.0018C20.533 20.0018 21.0426 19.7907 21.4183 19.415C21.7941 19.0392 22.0051 18.5296 22.0051 17.9983C22.0051 17.4669 21.7941 16.9573 21.4183 16.5816L20.085 15.2483C19.7093 14.8726 19.1997 14.6615 18.6683 14.6615C18.137 14.6615 17.6274 14.8726 17.2517 15.2483C16.8759 15.624 16.6649 16.1336 16.6649 16.665C16.6649 17.1963 16.8759 17.7059 17.2517 18.0816L18.585 19.415ZM50 40V44C50 44.884 49.6488 45.7319 49.0237 46.357C48.3986 46.9821 47.5507 47.3333 46.6667 47.3333H17.3333C16.4493 47.3333 15.6014 46.9821 14.9763 46.357C14.3512 45.7319 14 44.884 14 44V40C13.9998 39.2315 14.2652 38.4866 14.7511 37.8914C15.2371 37.2961 15.9138 36.887 16.6667 36.7333V34C16.6667 29.9333 18.2821 26.0332 21.1577 23.1577C24.0333 20.2821 27.9333 18.6666 32 18.6666H32.1183C40.5 18.73 47.3333 25.6833 47.3333 34.1666V36.7333C48.0862 36.887 48.7629 37.2961 49.2489 37.8914C49.7348 38.4866 50.0002 39.2315 50 40ZM20.6667 34V36.6666H43.3333V34.1666C43.3333 27.8716 38.2883 22.7133 32.0867 22.6666H32C28.9942 22.6666 26.1115 23.8607 23.9861 25.9861C21.8607 28.1115 20.6667 30.9942 20.6667 34ZM46 40.6666H18V43.3333H46V40.6666ZM33.4 29.5466C34.1173 29.772 34.7694 30.1673 35.3011 30.6989C35.8327 31.2305 36.228 31.8827 36.4533 32.6C36.6125 33.1061 36.9661 33.5283 37.4365 33.7736C37.9069 34.019 38.4555 34.0674 38.9617 33.9083C39.4678 33.7492 39.89 33.3955 40.1353 32.9251C40.3807 32.4547 40.4291 31.9061 40.27 31.4C39.8513 30.069 39.1175 28.8589 38.131 27.8723C37.1444 26.8858 35.9342 26.152 34.6033 25.7333C34.0972 25.5742 33.5486 25.6226 33.0782 25.868C32.6078 26.1133 32.2541 26.5355 32.095 27.0416C31.9359 27.5477 31.9843 28.0964 32.2297 28.5668C32.475 29.0372 32.8972 29.3908 33.4033 29.55L33.4 29.5466Z" fill="#F9091D"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1146_10710">
                        <rect width="42.6667" height="42.6667" fill="white" transform="translate(10.668 10.6666)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <p className="text-[40px] text-[#2E0469] font-brbold max-lg:flex max-lg:justify-center max-lg:w-full max-lg:text-4xl">Emergency Response</p>
                        <p className="w-[448px] text-[#666666] font-brreg text-lg max-lg:flex max-lg:text-center max-lg:w-full ">Our fleet of fully equipped ambucycles and ambulances are on standby, ensuring swift and effective response to emergencies at all times.</p>
                        </div>
                        <div className="max-lg:flex max-lg:justify-center ">
                        <button onClick={()=>setBookingModal(true)} className="font-brbold text-white text-lg py-3 px-5 bg-[#F9091D] flex items-center gap-1 rounded-mm  ">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6294 5.48312L11.6175 5.43778C11.5791 5.44787 11.5396 5.45302 11.4999 5.45312C11.4001 5.45313 11.3032 5.42023 11.224 5.35952C11.1449 5.29883 11.0881 5.21375 11.0622 5.11745C10.863 4.35263 10.4633 3.6548 9.90452 3.09588C9.34572 2.53697 8.64797 2.1372 7.8832 1.93779C7.82568 1.92247 7.77175 1.89596 7.72448 1.85979C7.67718 1.82359 7.63749 1.77842 7.60766 1.72687C7.57783 1.67531 7.55846 1.61838 7.55065 1.55933C7.54284 1.50029 7.54676 1.44028 7.56216 1.38274L7.56216 1.38273C7.57755 1.32523 7.60411 1.27131 7.64033 1.22408C7.67656 1.17684 7.72173 1.1372 7.77328 1.10743C7.82483 1.07766 7.88174 1.05834 7.94076 1.05057C7.99977 1.0428 8.05975 1.04673 8.11724 1.06215L8.11755 1.06223C9.0364 1.30197 9.87473 1.78231 10.5462 2.45379C11.2177 3.12527 11.698 3.9636 11.9378 4.88245L11.9379 4.88276C11.9533 4.94026 11.9572 5.00023 11.9494 5.05925C11.9417 5.11826 11.9223 5.17517 11.8926 5.22672C11.8628 5.27827 11.8232 5.32345 11.7759 5.35967C11.7287 5.3959 11.6748 5.42246 11.6173 5.43784L11.6294 5.48312ZM11.6294 5.48312C11.6928 5.46615 11.7523 5.43684 11.8044 5.39687C11.8566 5.3569 11.9003 5.30705 11.9332 5.25016C11.966 5.19328 11.9873 5.13049 11.9959 5.06536C12.0045 5.00024 12.0001 4.93407 11.9831 4.87062M11.6294 5.48312C11.5871 5.49421 11.5437 5.49988 11.5 5.5C11.3899 5.50003 11.2829 5.46372 11.1955 5.39671C11.1082 5.32969 11.0454 5.23572 11.0169 5.12937L11.9831 4.87062M11.9831 4.87062C11.7413 3.94371 11.2567 3.09801 10.5794 2.42064C9.90199 1.74327 9.0563 1.25871 8.12938 1.01687C8.06594 0.999861 7.99976 0.995519 7.93464 1.00409C7.86951 1.01267 7.80672 1.03399 7.74984 1.06684C7.69296 1.09969 7.64311 1.14343 7.60313 1.19555C7.56316 1.24768 7.53385 1.30717 7.51688 1.37062L11.9831 4.87062ZM9.98313 5.37062C10.0001 5.43407 10.0045 5.50024 9.99591 5.56536C9.98734 5.63049 9.96601 5.69328 9.93316 5.75016C9.90031 5.80705 9.85657 5.8569 9.80445 5.89687C9.75233 5.93684 9.69284 5.96615 9.62938 5.98312M9.98313 5.37062L9.01688 5.62937C9.04537 5.73572 9.10816 5.82969 9.19552 5.89671C9.28287 5.96372 9.38991 6.00003 9.50001 6C9.54367 5.99988 9.58715 5.99421 9.62938 5.98312M9.98313 5.37062C9.66313 4.17312 8.82688 3.33687 7.62938 3.01687L9.98313 5.37062ZM9.62938 5.98312L9.61747 5.93778C9.57909 5.94787 9.53957 5.95302 9.49989 5.95312C9.40015 5.95313 9.30319 5.92023 9.22405 5.85952C9.14488 5.79878 9.08798 5.71362 9.06216 5.61724C8.82783 4.7392 8.26144 4.17216 7.38335 3.93783C7.32586 3.92247 7.27195 3.89594 7.2247 3.85974C7.17746 3.82355 7.13781 3.77841 7.10801 3.72689C7.07822 3.67537 7.05886 3.61849 7.05105 3.55949C7.04324 3.50049 7.04712 3.44053 7.06248 3.38303C7.07784 3.32553 7.10437 3.27162 7.14057 3.22438C7.17676 3.17714 7.22191 3.13749 7.27343 3.10769C7.32494 3.07789 7.38183 3.05854 7.44083 3.05073C7.49982 3.04291 7.55978 3.0468 7.61728 3.06216C8.79858 3.37783 9.62217 4.20142 9.93784 5.38272L9.93785 5.38276C9.95327 5.44026 9.9572 5.50023 9.94943 5.55925C9.94166 5.61826 9.92234 5.67517 9.89257 5.72672C9.8628 5.77827 9.82316 5.82345 9.77592 5.85967C9.72869 5.89589 9.67478 5.92246 9.61727 5.93784L9.62938 5.98312ZM5.33688 5.00062L5.29788 4.97462C5.28776 4.9898 5.27691 5.00413 5.265 5.01902L3.96663 6.56295L3.94694 6.58637L3.96045 6.61382C4.43322 7.57451 5.43586 8.56952 6.4089 9.04216L6.43647 9.05555L6.45979 9.03567L7.98079 7.739C7.98083 7.73897 7.98086 7.73895 7.98089 7.73892C7.99442 7.72755 8.00859 7.71697 8.02334 7.70723L8.02352 7.70712C8.15534 7.61919 8.30701 7.56552 8.46479 7.55096C8.62236 7.53642 8.78107 7.56134 8.9266 7.62346L8.93411 7.62693L8.93459 7.62715L11.879 8.94652L11.8795 8.94674C12.068 9.02861 12.2251 9.16924 12.3272 9.34767C12.4292 9.52603 12.4709 9.73259 12.446 9.93656C12.336 10.7721 11.9257 11.539 11.2916 12.0941C10.6574 12.6493 9.8429 12.9546 9.00009 12.9531H9.00001C4.06339 12.9531 0.0468807 8.93661 0.0468807 4L0.0468806 3.99991C0.0453698 3.15711 0.350705 2.34257 0.905858 1.70843C1.46096 1.07435 2.22788 0.663998 3.0634 0.553999C3.26745 0.52913 3.47408 0.570896 3.65245 0.673069C3.83088 0.775278 3.97148 0.932454 4.05325 1.12113L4.05324 1.12114L4.05349 1.12168L5.37251 4.0619V4.06898L5.37629 4.07782C5.43814 4.22226 5.46333 4.37974 5.44961 4.53626C5.43589 4.69278 5.38369 4.84348 5.29766 4.97495L5.33688 5.00062ZM5.33688 5.00062C5.42715 4.86268 5.48192 4.70457 5.49631 4.54035C5.5107 4.37614 5.48428 4.21091 5.41938 4.05937L5.30126 5.04875C5.31376 5.03312 5.32563 5.0175 5.33688 5.00062ZM8.95376 7.58437L8.94563 7.58062C8.79278 7.51524 8.62603 7.48901 8.46049 7.50428C8.29494 7.51956 8.13581 7.57587 7.99751 7.66812C7.98122 7.67888 7.96557 7.69056 7.95063 7.70312L6.42938 8.99999L8.95376 7.58437ZM5.6554e-06 4C5.6554e-06 8.96249 4.03751 13 9.00001 13L5.6554e-06 4Z" fill="#F8F4FE" stroke="white" stroke-width="0.09375"/>
                        </svg>

                        Report Emergency
                        </button>
                        </div>
                    </main>
                    <aside>
                        <img src={players} alt="A picture of players recieving emergency response from 8medical" />
                    </aside>
                </section>
                <BookServiceModal isModalOpen={bookingModal} isModalClosed={()=>setBookingModal(false)}/>
                <section className="py-12 flex flex-col gap-20" >
                    <span className="flex justify-center text-center gap-2 text-[#181719] font-brsemi text-[40px] items-center max-lg:flex-col max-lg:text-4xl">
                        <p>How to Report an</p>
                        <p className="text-ev-700">Emergency</p>
                    </span>
                    <div className="flex justify-center gap-6 flex-wrap max-lg:flex-col max-lg:items-center max-lg:gap-16">
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">1</div>
                                <p className="font-brbold text-[20px] text-[#181719]">Contact Us</p>
                                <span className="flex flex-col gap-2">
                            <p className="font-brmedium text-[#636066]">Contact us directly via call at </p>
                            <p className="font-brmedium text-ev-700">+2348098888763</p>
                            </span>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">2</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Provide Information about the Emergency</p>
                            <p className="font-brmedium text-center text-[#636066]">Provide us with the following; type of emergency, number of individuals involved and location.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">3</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Await our Arrival</p>
                            <p className="font-brmedium text-[#636066]">Give extra useful information, then provide first aid if capable.</p>
                        </span>
                    </div>
                    <span className="py-12 px-16 max-sm:px-4 flex flex-col gap-6 justify-center bg-[url(./assets/images/line.png)] bg-no-repeat bg-cover bg-ev-700 rounded-3xl items-center">
                        <div className="flex flex-col gap-1 ">
                    <p className="font-brbold text-4xl text-white max-lg:text-center max-lg:text-2xl">Save our Emergency Line</p>
                    <p className="font-brbold text-4xl text-center text-[#B8FB5A] max-lg:text-2xl">+2348098888763</p>
                    </div>
                    <button className="py-3 px-6 bg-[#B8FB5A] text-lg font-brsemi text-ev-700 rounded-[41px]">
                        <a href="tel:+2348098888763">
                        Save Number
                        </a>
                        </button>
                </span>
                </section>

                
                
                <section className="py-20 flex flex-col gap-9">
                    <p className="font-brsemi text-[#181719] text-[40px] max-lg:text-4xl ">Other Services</p>
                    <div className="flex flex-wrap justify-between max-md:flex-col  max-md:gap-9 max-lg:gap-24">
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                            <Link to="/ServiceAgt">
                            <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                            <img  className="w-full" src='air.png' alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Air and Ground Ambulance Transport</p>
                            <span className="flex items-center gap-2">
                            <p className="text-sm font-brreg text-ev-700">Learn more</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                            </Link>
                        </span>
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full ">
                        <Link to="/ServiceAmb">
                        <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                            <img className="w-full" src='ServiceImage.png' alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Ambulance Standby</p>
                            <span className="flex items-center gap-2">
                            <p className="text-sm font-brreg text-ev-700">Learn more</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                            </Link>
                        </span>
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                        <Link to="/ServiceUg">
                        <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                            <img className="w-full" src='ugtwo.png' alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Urgent Care</p>
                            <span className="flex items-center gap-2">
                            <p className="text-sm font-brreg text-ev-700">Learn more</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                            </Link>
                        </span>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
} 