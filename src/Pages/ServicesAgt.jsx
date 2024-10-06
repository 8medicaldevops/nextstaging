import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import air from "../assets/images/airtransport.png";
import emergency from "../assets/images/playersemergency.png";
import { Link } from "react-router-dom";
import BookServiceModal from "@/components/BookServiceModal";
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
//import air from "../../public/air.png"


export default function ServicesAgt() {

    useEffect(() => {
        window.scrollTo(0, 0)
    });

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/ServiceAgt",
            title: "Air and Ground ambulance TP",
        })
    }, [])

    const [bookingModal, setBookingModal] = useState(false);


    return (
        <div>
            <NavBar />
            <div className="px-[128px] max-xl:px-6 max-lg:px-4">
                <section className="flex items-center justify-between py-9 max-lg:flex-col max-lg:gap-12">
                    <main className="flex flex-col gap-9">
                        <div className="flex flex-col max-lg:flex max-lg:items-center gap-6">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="64" height="64" rx="10.6667" fill="#F8F4FE" />
                                <g clipPath="url(#clip0_1146_11117)">
                                    <path d="M24.3823 44.1904C24.3823 43.3492 24.0846 42.6309 23.4894 42.0357C22.8942 41.4404 22.1759 41.1428 21.3346 41.1428C20.4934 41.1428 19.7751 41.4404 19.1799 42.0357C18.5846 42.6309 18.287 43.3492 18.287 44.1904C18.287 45.0317 18.5846 45.7499 19.1799 46.3452C19.7751 46.9404 20.4934 47.238 21.3346 47.238C22.1759 47.238 22.8942 46.9404 23.4894 46.3452C24.0846 45.7499 24.3823 45.0317 24.3823 44.1904ZM15.2394 31.9999H24.3823V25.9047H20.6203C20.3981 25.9365 20.2235 26.0079 20.0965 26.119L15.4537 30.7619C15.3426 30.9523 15.2711 31.1269 15.2394 31.2857V31.9999ZM45.7156 44.1904C45.7156 43.3492 45.418 42.6309 44.8227 42.0357C44.2275 41.4404 43.5092 41.1428 42.668 41.1428C41.8267 41.1428 41.1084 41.4404 40.5132 42.0357C39.918 42.6309 39.6203 43.3492 39.6203 44.1904C39.6203 45.0317 39.918 45.7499 40.5132 46.3452C41.1084 46.9404 41.8267 47.238 42.668 47.238C43.5092 47.238 44.2275 46.9404 44.8227 46.3452C45.418 45.7499 45.7156 45.0317 45.7156 44.1904ZM48.7632 28.1904V23.619C48.7632 23.3968 48.6918 23.2142 48.5489 23.0714C48.4061 22.9285 48.2235 22.8571 48.0013 22.8571H42.668V17.5238C42.668 17.3015 42.5965 17.119 42.4537 16.9761C42.3108 16.8333 42.1283 16.7619 41.9061 16.7619H37.3346C37.1124 16.7619 36.9299 16.8333 36.787 16.9761C36.6442 17.119 36.5727 17.3015 36.5727 17.5238V22.8571H31.2394C31.0172 22.8571 30.8346 22.9285 30.6918 23.0714C30.5489 23.2142 30.4775 23.3968 30.4775 23.619V28.1904C30.4775 28.4126 30.5489 28.5952 30.6918 28.738C30.8346 28.8809 31.0172 28.9523 31.2394 28.9523H36.5727V34.2857C36.5727 34.5079 36.6442 34.6904 36.787 34.8333C36.9299 34.9761 37.1124 35.0476 37.3346 35.0476H41.9061C42.1283 35.0476 42.3108 34.9761 42.4537 34.8333C42.5965 34.6904 42.668 34.5079 42.668 34.2857V28.9523H48.0013C48.2235 28.9523 48.4061 28.8809 48.5489 28.738C48.6918 28.5952 48.7632 28.4126 48.7632 28.1904ZM54.8584 15.238V42.6666C54.8584 43.0793 54.7077 43.4365 54.4061 43.738C54.1045 44.0396 53.7473 44.1904 53.3346 44.1904H48.7632C48.7632 45.873 48.168 47.3095 46.9775 48.4999C45.787 49.6904 44.3505 50.2857 42.668 50.2857C40.9854 50.2857 39.5489 49.6904 38.3584 48.4999C37.168 47.3095 36.5727 45.873 36.5727 44.1904H27.4299C27.4299 45.873 26.8346 47.3095 25.6442 48.4999C24.4537 49.6904 23.0172 50.2857 21.3346 50.2857C19.6521 50.2857 18.2156 49.6904 17.0251 48.4999C15.8346 47.3095 15.2394 45.873 15.2394 44.1904H12.1918C11.7791 44.1904 11.4219 44.0396 11.1203 43.738C10.8188 43.4365 10.668 43.0793 10.668 42.6666C10.668 42.2539 10.8188 41.8968 11.1203 41.5952C11.4219 41.2936 11.7791 41.1428 12.1918 41.1428V31.238C12.1918 30.8253 12.295 30.365 12.5013 29.8571C12.7077 29.3492 12.9616 28.9444 13.2632 28.6428L17.9775 23.9285C18.2791 23.6269 18.6838 23.373 19.1918 23.1666C19.6997 22.9603 20.16 22.8571 20.5727 22.8571H24.3823V15.238C24.3823 14.8253 24.533 14.4682 24.8346 14.1666C25.1362 13.865 25.4934 13.7142 25.9061 13.7142H53.3346C53.7473 13.7142 54.1045 13.865 54.4061 14.1666C54.7077 14.4682 54.8584 14.8253 54.8584 15.238Z" fill="#6D09F9" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1146_11117">
                                        <rect width="42.6667" height="42.6667" fill="white" transform="translate(10.666 10.6666)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <p className="text-[40px] w-[448px] text-[#2E0469] font-brbold max-lg:flex max-lg:justify-center max-lg:text-center max-lg:w-full max-lg:text-4xl">Air and Ground Ambulance Transport</p>
                            <p className="w-[448px] text-[#666666] font-brreg max-lg:flex max-lg:text-center text-lg max-lg:w-full ">For both ground and air Transport, we provide bed-to-bed transfers of patients from both homes and hospitals. Experience peace of mind with our accomplished medical professionals and cutting-edge ambulances, ensuring seamless patient transport for any health condition.
                                In partnership with trusted allies featuring emergency-ready jets and helicopters, our team of dedicated doctors and paramedics guarantees safe and expert air transportation.</p>
                        </div>
                        <div className="max-lg:flex max-lg:justify-center">
                            <button className="font-brbold text-white text-lg py-3 px-5 bg-ev-700 flex items-center gap-1 rounded-mm  ">
                                <Link to="/AmbulanceTp">
                                    Book Now
                                </Link>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.61914 3.95337L13.6658 8.00004L9.61914 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.33398 8H13.554" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </main>
                    <aside>
                        <img src={air} alt="A picture of air recieving emergency response from 8medical" />
                    </aside>
                </section>
                <BookServiceModal isModalOpen={bookingModal} isModalClosed={() => setBookingModal(false)} />
                <section className="py-12 flex flex-col gap-20" >
                    <span className="flex justify-center text-center gap-2 text-[#181719] font-brsemi text-[40px] items-center max-lg:flex-col max-lg:text-4xl">
                        <p>How to Book an</p>
                        <p className="text-ev-700">Ambulance Transport</p>
                    </span>
                    <div className="flex justify-center gap-12 flex-wrap items-center max-lg:flex-col max-lg:items-center max-lg:gap-16">
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">1</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Contact Us</p>
                            <span className="flex flex-col gap-2">
                                <p className="font-brmedium text-[#636066]">Contact us directly via call at </p>
                                <p className="font-brmedium text-ev-700">+2348098888763<small className="text-[#636066]">or</small></p>
                                <p className="font-brmedium text-ev-700">hello@8medical.co</p>
                            </span>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">2</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Provide Information about the Transport</p>
                            <p className="font-brmedium text-center text-[#636066]">Provide us with useful information such as the type of transport, pickup and drop off points e.t.c.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">3</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Schedule Date and Time for Transport </p>
                            <p className="font-brmedium text-[#636066]">Inform us of your preferred date and time for the patient’s transport.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">4</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Confirm Your Details and Make Payments</p>
                            <p className="font-brmedium text-[#636066]">Review your information before proceeding to payment.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] max-sm:w-full w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">5</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Prepare for Transport</p>
                            <p className="font-brmedium text-[#636066]">Get the patient ready for transport, we will arrive 30mins before selected time.</p>
                        </span>
                    </div>
                    <span className="py-12 px-16 max-sm:px-4 flex flex-col gap-6 justify-center bg-[url(./assets/images/line.png)] bg-no-repeat bg-cover bg-ev-700 rounded-3xl items-center">
                        <div className="flex flex-col gap-1 ">
                            <p className="font-brbold text-4xl text-white max-lg:text-center max-lg:text-2xl">Book our Ambulance Transport Service Today</p>
                            {/* <p className="font-brbold text-4xl text-center text-[#B8FB5A] max-lg:text-2xl">+2348098888763</p> */}
                        </div>
                        <button onClick={() => setBookingModal(true)} className="py-3 px-6 bg-[#B8FB5A] text-lg font-brsemi text-ev-700 rounded-[41px]">Book Ambulance Transport</button>
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

                <section className="py-20 flex flex-col  gap-9">
                    <p className="font-brsemi text-[#181719] text-[40px] max-lg:text-4xl ">Other Services</p>
                    <div className="flex flex-wrap justify-between   max-md:flex-col max-lg:gap-14 max-md:gap-9">

                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                            <Link to="/ServiceEr" >
                                <div className="h-[180px] w-[309.33px] max-md:w-full max-lg:h-full">
                                    <img className="w-full h-full max-lg:h-[180px] max-lg:rounded-xl object-center object-cover rounded-mm" src={emergency} alt="air and ambulance transport" />
                                </div>
                                <p className="font-brsemi text-[20px] text-[#181719]">Emergency Response</p>
                                <span className="flex items-center gap-2">
                                    <p className="text-sm font-brreg text-ev-700">Learn more</p>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </span>
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full ">
                            <Link to="/ServiceAmb" >
                                <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                                    <img className="w-full h-full max-lg:h-[180px]" src='ServiceImage.png' alt="air and ambulance transport" />
                                </div>
                                <p className="font-brsemi text-[20px] text-[#181719]">Ambulance Standby</p>
                                <span className="flex items-center gap-2">
                                    <p className="text-sm font-brreg text-ev-700">Learn more</p>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </span>
                        <span className="flex flex-col gap-6 w-[309.33px] max-md:w-full">
                            <Link to="/ServiceUg" >
                                <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                                    <img className="w-full" src='ugtwo.png' alt="air and ambulance transport" />
                                </div>
                                <p className="font-brsemi text-[20px] text-[#181719]">Urgent Care</p>
                                <span className="flex items-center gap-2">
                                    <p className="text-sm font-brreg text-ev-700">Learn more</p>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1.66602 7.99976H12.7993" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
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