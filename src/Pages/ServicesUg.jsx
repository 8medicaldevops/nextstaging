import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import urgentCare from "../assets/images/urgentcare.png";
import emergency from "../assets/images/playersemergency.png";
import { Link, useNavigate } from "react-router-dom";
//import air from "../../public/air.png"




export default function ServicesUg() {
    const navigate = useNavigate();
    return(
        <div>
            <NavBar />
            <div className="px-[128px] max-xl:px-6 max-lg:px-4 ">
                <section className="flex items-center justify-between py-9 max-lg:flex-col max-lg:gap-12">
                    <main className="flex flex-col gap-9">
                        <div className="flex flex-col max-lg:flex max-lg:items-center gap-6">
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.6673 26.0005C40.6676 24.773 40.3291 23.5693 39.6889 22.522C39.0488 21.4746 38.1319 20.6244 37.0393 20.0649C35.9468 19.5054 34.721 19.2584 33.497 19.3511C32.273 19.4439 31.0984 19.8727 30.1026 20.5904C29.1068 21.3082 28.3285 22.2868 27.8535 23.4187C27.3784 24.5505 27.2251 25.7915 27.4103 27.0049C27.5956 28.2183 28.1123 29.357 28.9034 30.2956C29.6945 31.2341 30.7294 31.9359 31.894 32.3238C31.6679 33.3652 31.0923 34.2978 30.2627 34.9667C29.4331 35.6356 28.3996 36.0004 27.334 36.0005H23.334C22.0963 36.0005 20.9093 35.5088 20.0342 34.6337C19.159 33.7585 18.6673 32.5715 18.6673 31.3338V25.1505C23.9557 24.1872 28.0007 19.4688 28.0007 13.8622V7.33382C28.0007 6.89608 27.9144 6.46263 27.7469 6.05821C27.5794 5.65379 27.3339 5.28633 27.0243 4.9768C26.7148 4.66727 26.3473 4.42174 25.9429 4.25422C25.5385 4.08671 25.1051 4.00049 24.6673 4.00049H22.0007C21.4702 4.00049 20.9615 4.2112 20.5864 4.58627C20.2114 4.96135 20.0007 5.47006 20.0007 6.00049C20.0007 6.53092 20.2114 7.03963 20.5864 7.4147C20.9615 7.78978 21.4702 8.00049 22.0007 8.00049H24.0007V13.8622C24.0007 17.9288 20.7556 21.2822 16.7656 21.3338C15.7944 21.3468 14.8302 21.1668 13.9291 20.8041C13.028 20.4414 12.2079 19.9033 11.5165 19.221C10.8251 18.5388 10.2761 17.7259 9.90146 16.8297C9.52679 15.9335 9.3339 14.9718 9.33398 14.0005V8.00049H11.334C11.8644 8.00049 12.3731 7.78978 12.7482 7.4147C13.1233 7.03963 13.334 6.53092 13.334 6.00049C13.334 5.47006 13.1233 4.96135 12.7482 4.58627C12.3731 4.2112 11.8644 4.00049 11.334 4.00049H8.66732C7.78326 4.00049 6.93542 4.35168 6.3103 4.9768C5.68517 5.60192 5.33398 6.44977 5.33398 7.33382V14.0005C5.33409 16.6593 6.26901 19.2335 7.9752 21.2727C9.68138 23.3119 12.0502 24.6863 14.6673 25.1555V31.3338C14.67 33.6316 15.5839 35.8344 17.2086 37.4592C18.8334 39.0839 21.0363 39.9978 23.334 40.0005H27.334C29.4504 39.998 31.4929 39.222 33.0771 37.8186C34.6613 36.4152 35.6779 34.4811 35.9356 32.3805C37.3033 31.9635 38.501 31.1186 39.3528 29.9702C40.2045 28.8217 40.6653 27.4303 40.6673 26.0005ZM34.0006 28.6672C33.4732 28.6672 32.9577 28.5108 32.5191 28.2177C32.0806 27.9247 31.7388 27.5083 31.537 27.021C31.3351 26.5337 31.2823 25.9975 31.3852 25.4803C31.4881 24.963 31.7421 24.4878 32.115 24.1149C32.488 23.7419 32.9631 23.488 33.4804 23.3851C33.9977 23.2822 34.5339 23.335 35.0211 23.5368C35.5084 23.7386 35.9249 24.0804 36.2179 24.519C36.5109 24.9575 36.6673 25.4731 36.6673 26.0005C36.6673 26.7077 36.3864 27.386 35.8863 27.8861C35.3862 28.3862 34.7079 28.6672 34.0006 28.6672Z" fill="#F96D09"/>
                        </svg>

                        <p className="text-[40px] w-[448px] text-[#2E0469] font-brbold max-lg:flex max-lg:justify-center max-lg:w-full max-lg:text-4xl">Urgent Care</p>
                        <p className="w-[448px] text-[#666666] font-brreg text-lg max-lg:flex max-lg:text-center max-lg:w-full ">Book for medical care according to your needs or doctor’s prescription.
                        We offer both in-home and in-hospital appointments.</p>
                        </div>
                        <div className="max-lg:flex max-lg:justify-center">
                        <button onClick={()=>navigate("/OtherBookings")} className="font-brbold text-white text-lg py-3 px-5 bg-ev-700 flex items-center gap-1 rounded-mm  ">
                        Book Now
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.61914 3.95337L13.6658 8.00004L9.61914 12.0467" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.33398 8H13.554" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </button>
                        </div>
                    </main>
                    <aside>
                        <img src={urgentCare} alt="A picture of urgentCare recieving emergency response from 8medical" />
                    </aside>
                </section>
                <section className="py-12 flex flex-col gap-20" >
                    <span className="flex justify-center gap-2 text-[#181719] font-brsemi text-[40px] items-center max-lg:flex-col max-lg:text-4xl">
                        <p>How to Order an</p>
                        <p className="text-ev-700">Urgent Care</p>
                    </span>
                    <div className="flex justify-center gap-12 flex-wrap items-center max-lg:flex-col max-lg:items-center max-lg:gap-16">
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] w-[325.33px] py-9 px-6">
                            <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">1</div>
                                <p className="font-brbold text-[20px] text-[#181719]">Contact Us</p>
                                <span className="flex flex-col gap-2">
                            <p className="font-brmedium text-[#636066]">Contact us directly at  </p>
                            <p className="font-brmedium text-ev-700">+2348098888763<small className="text-[#636066]">or</small></p>
                            <p className="font-brmedium text-ev-700">hello@8medical.co</p>
                            </span>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">2</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Provide Patient’s Details</p>
                            <p className="font-brmedium text-center text-[#636066]">Give us the required personal and medical information of the patient(s).</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">3</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Schedule Appointment</p>
                            <p className="font-brmedium text-[#636066]">Choose a desired date and time for the care to be administered in your home or a medical facility.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">4</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Confirm Your Details and Make Payments</p>
                            <p className="font-brmedium text-[#636066]">Review your information before proceeding to payment.</p>
                        </span>
                        <span className="bg-[#F9F9FA] rounded-xl text-center flex flex-col gap-5 h-[225px] w-[325.33px] py-9 px-6">
                        <div className="h-10 w-10 bg-ev-700 rounded-full flex items-center justify-center self-center -mt-14 font-brreg text-xl text-white">5</div>
                            <p className="font-brbold text-[20px] text-[#181719]">Prepare for our Arrival</p>
                            <p className="font-brmedium text-[#636066]">Get the patient ready for care. We will arrive 30mins before the selected time.</p>
                        </span>
                    </div>
                    <span className="py-12 px-16 flex flex-col gap-6 justify-center bg-[url(./assets/images/line.png)] bg-no-repeat bg-cover bg-ev-700 rounded-3xl items-center">
                        <div className="flex flex-col gap-1 ">
                    <p className="font-brbold text-4xl text-white max-lg:text-center max-lg:text-2xl">Get the medical care that suits your health needs today</p>
                    {/* <p className="font-brbold text-4xl text-center text-[#B8FB5A] max-lg:text-2xl">+2348098888763</p> */}
                    </div>
                    <button className="py-3 px-6 bg-[#B8FB5A] text-lg font-brsemi text-ev-700 rounded-[41px]">Book Urgent Care</button>
                </span>
                </section>
                
                <section className="bg-white   flex flex-col gap-3 p-6 w-full">
                    <p className="font-brsemi text-2xl text-[#181719]">Booking Policies</p>
                    <div className="flex flex-wrap gap-3 justify-between">
                    <div className=" bg-[#FEF0E6] w-3/12  rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">Duration of Cover Policy</p>
                <span className="text-sm text-[#636066] font-brreg ">
                Duration of cover is between  3, 6, 9 or 12 hours. For extended periods,  hourly rate of  N10,000  applies thereafter.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-3/12 rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">Confirmation & Cancellation Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                1. 75% payment confirms booking
                <br/> 2.Cancellations for any reason are allowed up to Two hours in before the scheduled time.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-3/12 rounded-xl p-6 flex flex-col gap-0 max-lg:w-full">
                <p className="text-[#F96D09] font-brbold">Arrival & Departure Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                We arrive at least one (1) hour before your scheduled start time and depart one (1) hour after your scheduled end time.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-3/12 rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                <p className="text-[#F96D09] font-brbold">No-Cash Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                We do not accept payment via cash. We accept payment via wire transfers or online banking.
                </span>
                    </div>
                    <div className=" bg-[#FEF0E6] w-3/12 h-full rounded-xl p-6 flex flex-col gap-0 max-lg:w-full max-lg:h-[330px] ">
                <p className="text-[#F96D09] font-brbold">Refund Policy</p>
                <span className="text-sm text-[#636066] font-brreg">
                    1. Notification not received or received 1 days or less before the event or appointment, 100% of the quoted event or appointment fee applies.
                <br/> 2. Notification received 8-14 days before the event or appointment, 50% of the quoted event fee applies.
                <br/> 3. Notification reviewed 15 days or more before the event or appointment - no fee applies
                </span>
                    </div>
                    </div>
                </section>
                
                <section className="py-20 flex flex-col gap-9">
                    <p className="font-brsemi text-[#181719] text-[40px] max-lg:text-4xl ">Other Services</p>
                    <div className="flex flex-wrap justify-between max-lg:flex-col max-lg:gap-9">
                        <span className="flex flex-col gap-6 w-[309.33px] max-lg:w-full">
                            <Link to="/ServiceAgt" >
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
                        <span className="flex flex-col gap-6 w-[309.33px] max-lg:w-full ">
                        <Link to="/ServiceAmb" >
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
                        <span className="flex flex-col gap-6 w-[309.33px] max-lg:w-full">
                        <Link to="/ServiceEr" >
                        <div className="h-[180px] w-[309.33px] max-lg:w-full max-lg:h-full">
                            <img className="w-full h-full max-lg:h-[180px] max-lg:rounded-xl  object-center object-cover rounded-mm"  src={emergency} alt="air and ambulance transport" />
                            </div>
                            <p className="font-brsemi text-[20px] text-[#181719]">Emergency Response</p>
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