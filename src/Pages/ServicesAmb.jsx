import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ambulance from "../assets/images/ambulancetransport.png";
import emergency from "../assets/images/playersemergency.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
//import air from "../../public/air.png"




export default function ServicesAmb() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    });
    return(
        <div>
            <NavBar />
            <div className="px-[128px] max-xl:px-6   max-lg:px-4">
                <section className="flex items-center justify-between py-9 max-lg:flex-col max-lg:gap-12">
                    <main className="flex flex-col gap-9">
                        <div className="flex flex-col max-lg:flex max-lg:items-center  gap-6">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="64" rx="10.6667" fill="#F4FEE6"/>
                        <g clipPath="url(#clip0_1146_11354)">
                        <path d="M24.3823 44.1901C24.3823 43.3488 24.0846 42.6305 23.4894 42.0353C22.8942 41.4401 22.1759 41.1424 21.3346 41.1424C20.4934 41.1424 19.7751 41.4401 19.1799 42.0353C18.5846 42.6305 18.287 43.3488 18.287 44.1901C18.287 45.0313 18.5846 45.7496 19.1799 46.3448C19.7751 46.9401 20.4934 47.2377 21.3346 47.2377C22.1759 47.2377 22.8942 46.9401 23.4894 46.3448C24.0846 45.7496 24.3823 45.0313 24.3823 44.1901ZM15.2394 31.9996H24.3823V25.9043H20.6203C20.3981 25.9361 20.2235 26.0075 20.0965 26.1186L15.4537 30.7615C15.3426 30.952 15.2711 31.1266 15.2394 31.2853V31.9996ZM45.7156 44.1901C45.7156 43.3488 45.418 42.6305 44.8227 42.0353C44.2275 41.4401 43.5092 41.1424 42.668 41.1424C41.8267 41.1424 41.1084 41.4401 40.5132 42.0353C39.918 42.6305 39.6203 43.3488 39.6203 44.1901C39.6203 45.0313 39.918 45.7496 40.5132 46.3448C41.1084 46.9401 41.8267 47.2377 42.668 47.2377C43.5092 47.2377 44.2275 46.9401 44.8227 46.3448C45.418 45.7496 45.7156 45.0313 45.7156 44.1901ZM48.7632 28.1901V23.6186C48.7632 23.3964 48.6918 23.2139 48.5489 23.071C48.4061 22.9282 48.2235 22.8567 48.0013 22.8567H42.668V17.5234C42.668 17.3012 42.5965 17.1186 42.4537 16.9758C42.3108 16.8329 42.1283 16.7615 41.9061 16.7615H37.3346C37.1124 16.7615 36.9299 16.8329 36.787 16.9758C36.6442 17.1186 36.5727 17.3012 36.5727 17.5234V22.8567H31.2394C31.0172 22.8567 30.8346 22.9282 30.6918 23.071C30.5489 23.2139 30.4775 23.3964 30.4775 23.6186V28.1901C30.4775 28.4123 30.5489 28.5948 30.6918 28.7377C30.8346 28.8805 31.0172 28.952 31.2394 28.952H36.5727V34.2853C36.5727 34.5075 36.6442 34.6901 36.787 34.8329C36.9299 34.9758 37.1124 35.0472 37.3346 35.0472H41.9061C42.1283 35.0472 42.3108 34.9758 42.4537 34.8329C42.5965 34.6901 42.668 34.5075 42.668 34.2853V28.952H48.0013C48.2235 28.952 48.4061 28.8805 48.5489 28.7377C48.6918 28.5948 48.7632 28.4123 48.7632 28.1901ZM54.8584 15.2377V42.6662C54.8584 43.0789 54.7077 43.4361 54.4061 43.7377C54.1045 44.0393 53.7473 44.1901 53.3346 44.1901H48.7632C48.7632 45.8726 48.168 47.3091 46.9775 48.4996C45.787 49.6901 44.3505 50.2853 42.668 50.2853C40.9854 50.2853 39.5489 49.6901 38.3584 48.4996C37.168 47.3091 36.5727 45.8726 36.5727 44.1901H27.4299C27.4299 45.8726 26.8346 47.3091 25.6442 48.4996C24.4537 49.6901 23.0172 50.2853 21.3346 50.2853C19.6521 50.2853 18.2156 49.6901 17.0251 48.4996C15.8346 47.3091 15.2394 45.8726 15.2394 44.1901H12.1918C11.7791 44.1901 11.4219 44.0393 11.1203 43.7377C10.8188 43.4361 10.668 43.0789 10.668 42.6662C10.668 42.2535 10.8188 41.8964 11.1203 41.5948C11.4219 41.2932 11.7791 41.1424 12.1918 41.1424V31.2377C12.1918 30.825 12.295 30.3647 12.5013 29.8567C12.7077 29.3488 12.9616 28.944 13.2632 28.6424L17.9775 23.9282C18.2791 23.6266 18.6838 23.3726 19.1918 23.1662C19.6997 22.9599 20.16 22.8567 20.5727 22.8567H24.3823V15.2377C24.3823 14.825 24.533 14.4678 24.8346 14.1662C25.1362 13.8647 25.4934 13.7139 25.9061 13.7139H53.3346C53.7473 13.7139 54.1045 13.8647 54.4061 14.1662C54.7077 14.4678 54.8584 14.825 54.8584 15.2377Z" fill="#6AB106"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1146_11354">
                        <rect width="42.6667" height="42.6667" fill="white" transform="translate(10.666 10.6665)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <p className="text-[40px] w-[448px] text-[#2E0469] font-brbold max-lg:flex max-lg:justify-center max-lg:w-full max-lg:text-4xl max-lg:text-center">Ambulance Standby</p>
                        <p className="w-[448px] text-[#666666] font-brreg max-lg:flex max-lg:text-center text-lg max-lg:w-full ">From small pop-up gatherings to high-profile conferences and weddings, all events carry the potential for unforeseen emergencies. Our comprehensive ambulance standby services ensure that your event is covered by and equipped with the best emergency response team money can buy. Most importantly, we ensure that you and your event are free from liability.</p>
                        </div>
                        <div className="max-lg:flex max-lg:justify-center">
                            {import.meta.env.VITE_READY_TO_LAUNCH === 'Ready' &&
                        <button onClick={()=>navigate("/StandBy")} className="font-brbold text-white text-lg py-3 px-5 bg-ev-700 flex items-center gap-1 rounded-mm  ">
                        Book Now
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.61914 3.95337L13.6658 8.00004L9.61914 12.0467" stroke="white" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.33398 8H13.554" stroke="white" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        }
                           {import.meta.env.VITE_READY_TO_LAUNCH === 'notReady' &&
                        <button onClick={()=>navigate("/OtherBookings")} className="font-brbold text-white text-lg py-3 px-5 bg-ev-700 flex items-center gap-1 rounded-mm  ">
                        Book Now
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.61914 3.95337L13.6658 8.00004L9.61914 12.0467" stroke="white" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.33398 8H13.554" stroke="white" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        }
                        </div>
                    </main>
                    <aside>
                        <img src={ambulance} alt="A picture of ambulance recieving emergency response from 8medical" />
                    </aside>
                </section>
                <section className="py-12 flex flex-col gap-20" >
                    <span className="flex justify-center gap-2 text-[#181719] text-center font-brsemi text-[40px] items-center max-lg:flex-col max-lg:text-4xl">
                        <p>How to Book an</p>
                        <p className="text-ev-700">Ambulance Standby</p>
                    </span>
                    <div className="flex justify-center gap-12 flex-wrap items-center max-lg:flex-col max-lg:items-center max-lg:gap-16">
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">1</div>
                                <p className="font-brbold text-[20px] text-[#181719]">State Standby Location</p>
                                <span className="flex flex-col gap-2">
                            <p className="font-brmedium text-[#636066]">Input the event venue and address for the standby. </p>
                            {/* <p className="font-brmedium text-ev-700">+2348098888763<small className="text-[#636066]">or</small></p>
                            <p className="font-brmedium text-ev-700">hello@8medical.co</p> */}
                            </span>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">2</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Schedule Standby Date and Time Duration</p>
                            <p className="font-brmedium text-center text-[#636066]">Enter the date and the time duration of your event for the standby.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">3</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Specify Number of Ambulance and Medical Personnel</p>
                            <p className="font-brmedium text-[#636066]">Enter the number of medics and ambulances you want at your event location.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">4</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Confirm Your Details and Make Payments</p>
                            <p className="font-brmedium text-[#636066]">Review the information you provided to ensure accuracy before proceeding to payment.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">5</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Prepare for our Arrival</p>
                            <p className="font-brmedium text-[#636066]">Reserve a space for providing care at your event.</p>
                        </span>
                    </div>
                    <span className="py-12 px-16 max-sm:px-4 flex flex-col gap-6 justify-center bg-[url(./assets/images/line.png)] bg-no-repeat bg-cover bg-ev-700 rounded-3xl items-center">
                        <div className="flex flex-col gap-1 ">
                    <p className="font-brbold text-4xl text-white max-lg:text-center max-lg:text-2xl">Book an ambulance to standby at your event today</p>
                    {/* <p className="font-brbold text-4xl text-center text-[#B8FB5A] max-lg:text-2xl">+2348098888763</p> */}
                    </div>
                    {import.meta.env.VITE_READY_TO_LAUNCH === 'Ready' &&
                    <button onClick={()=>navigate("/StandBy")} className="py-3 px-6 bg-[#B8FB5A] text-lg font-brsemi text-ev-700 rounded-[41px]">Book Ambulance Standby</button>
                    }
                     {import.meta.env.VITE_READY_TO_LAUNCH === 'notReady' &&
                    <button onClick={()=>navigate("/OtherBookings")} className="py-3 px-6 bg-[#B8FB5A] text-lg font-brsemi text-ev-700 rounded-[41px]">Book Ambulance Standby</button>
                    }
                </span>
                </section>
                
                <section className="bg-white   flex flex-col gap-3 p-6 w-full">
                    <p className="font-brsemi text-2xl text-[#181719]">Booking Policies</p>
                    <div className="flex flex-wrap gap-3 justify-between">
                    <div className=" bg-[#FEF0E6] w-[45%]  rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">Cancellation</p>
                <span className="text-sm text-[#636066] font-brreg ">
                Cancellations for any reason are allowed up to One hour in before the scheduled time.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-[45%] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">No-Cash Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                We do not take cash as a form of payment. Kindly make payment for your service via POS or Transfers only.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-[45%] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full">
                <p className="text-[#F96D09] font-brbold">Arrival Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                We operate an appointment only service. Please arrive at least 10 mins early for your scheduled appointment. Please note that we provide a 15 mins grace period for appointment times. Should you arrive any time after this we may not be able to guarantee a service.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-[45%] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">Refund Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                For any situation where the service booked has to be cancelled, only 75% of the fee paid shall be refunded after cancellation.
                </span>
                    </div>
                    </div>
                </section>
                
                <section className="py-20 flex flex-col gap-9">
                    <p className="font-brsemi text-[#181719] text-[40px] max-lg:text-4xl ">Other Services</p>
                    <div className="flex flex-wrap justify-between max-md:flex-col max-lg:gap-24 max-md:gap-9">
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                            <Link to="/ServiceAgt">
                            <div className="h-[180px] w-[309.33px] max-md:w-full max-lg:h-full">
                            <img  className="w-full" src='air.png' alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Air and Ground Ambulance Transport</p>
                            <span className="flex items-center gap-2">
                            <p className="text-sm font-brreg text-ev-700">Learn more</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </span>
                            </Link>
                        </span>
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                        <Link to="/ServiceEr">
                        <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                            <img className="w-full h-full max-lg:h-[180px] max-lg:rounded-xl  object-center object-cover rounded-mm"  src={emergency} alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Emergency Response</p>
                            <span className="flex items-center gap-2">
                            <p className="text-sm font-brreg text-ev-700">Learn more</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
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
                            <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
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