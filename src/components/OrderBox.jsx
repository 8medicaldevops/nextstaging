"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "@/lib/router-compat";
import { parseISO, parse, format } from "date-fns";
import axios from "axios";
import PaymentLinkModal from "./PaymentLinkModal";
import { BarLoader } from "react-spinners";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  

export default function OrderBox({
    id,
    eventLocationName,
    startDate,
    startTime,
    price,
    endDate,
    endTime,
    largeAmbulance,
    noOfMedic,
    pendingOrder,
    color,
}) {
    const formatBackendDate = (date) => {

        if (!date || isNaN(new Date(date))) {
          return 'N/A';
        }
        
        const formattedDate = new Date(date).toISOString().slice(0, 10); // Extracts 'YYYY-MM-DD'
        return formattedDate;
    };

    const [orderData, setOrderData] = useState({});
    //console.log(orderData)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [checkoutLink, setCheckoutLink] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
   //Format stored date
    const formatDate = (dateStr) => {
        if (!dateStr || isNaN(new Date(dateStr))) return 'N/A';
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if month is single digit
        const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if day is single digit
        return `${year}-${month}-${day}`;
    };
    
    const formatTime = (timeStr) => {
        if (!timeStr) return 'N/A';
        const [hour, minute] = timeStr.split(':');
        if (!hour || !minute) return 'N/A';
        let hours = parseInt(hour, 10);
        if (hours < 10) hours = `0${hours}`; // Ensure two digits for hours
        return `${hours}:${minute}`;
    };
    //Format displayed date
    const formatDispDate = (dateStr) => {
        if (!dateStr || isNaN(new Date(dateStr))) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', {

            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };
    
    const formatDispTime = (timeStr) => {
        if (!timeStr) return 'N/A';
        const [hour, minute] = timeStr.split(':');
        if (!hour || !minute) return 'N/A';
        let hours = parseInt(hour, 10);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minute} ${suffix}`;
    }; 

     
        // Helper function to parse and format time strings
    const parseAndFormatTime = (time) => {
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hour, minute);
        return format(date, 'h:mm a');
    };
    // Format fee
    const formattedFee = new Intl.NumberFormat().format(orderData?.price);

    // Map over the schedule data array to format each entry
    // Main function to format the schedule data
    const formatScheduleData = (data) => {
        const ambulances = data.ambulances || [];

        return ambulances.map((ambulance) => {
            const { events, startDate, endDate, startTime, endTime } = ambulance;

            // If events exist, map over them
            if (events && Array.isArray(events)) {
                return events.map((event) => {
                    const eventStartDate = parseISO(event.startDate);
                    const eventEndDate = parseISO(event.endDate);

                    // Format dates
                    const fullStartDate = format(eventStartDate, "do MMMM, yyyy");
                    const formattedStartDate = format(eventStartDate, "do");
                    const formattedEndDate = format(eventEndDate, "do MMMM, yyyy");
                    const formattedDateRange =
                        fullStartDate === formattedEndDate
                            ? fullStartDate
                            : `${formattedStartDate} - ${formattedEndDate}`;

                    // Format times
                    const formattedStartTime = parseAndFormatTime(event.startTime);
                    const formattedEndTime = parseAndFormatTime(event.endTime);
                    const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

                    return {
                        formattedBackendStartDate: format(eventStartDate, 'yyyy-MM-dd') || 'N/A',
                        formattedBackendEndDate: format(eventEndDate, 'yyyy-MM-dd') || 'N/A',
                        formattedDateRange,
                        formattedTimeRange,
                    };
                });
            } else {
                // Process single schedule data
                const singleStartDate = parseISO(startDate);
                const singleEndDate = parseISO(endDate);

                // Format dates
                const fullStartDate = format(singleStartDate, "do MMMM, yyyy");
                const formattedStartDate = format(singleStartDate, "do");
                const formattedEndDate = format(singleEndDate, "do MMMM, yyyy");
                const formattedDateRange =
                    fullStartDate === formattedEndDate
                        ? fullStartDate
                        : `${formattedStartDate} - ${formattedEndDate}`;

                // Format times
                const formattedStartTime = parseAndFormatTime(startTime);
                const formattedEndTime = parseAndFormatTime(endTime);
                const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

                return {
                    formattedBackendStartDate: format(singleStartDate, 'yyyy-MM-dd') || 'N/A',
                    formattedBackendEndDate: format(singleEndDate, 'yyyy-MM-dd') || 'N/A',
                    formattedDateRange,
                    formattedTimeRange,
                };
            }
        }).flat(); // Flatten the results in case of nested arrays from events
    };
    const formattedScheduleData = formatScheduleData(orderData);

    // Handle submit and save data to local storage
    const handleFetchData = async (id) => {
        const signInData = JSON.parse(sessionStorage.getItem('SignIn'));
        const token = signInData.data.tokens.accessToken || '';    
        const accessToken = token;
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.VITE_ORDER_API}${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            
            const data = response.data.data;
            if (!data) {
                throw new Error('Empty response data received from API');
            }
            setOrderData(data);

            const caller = data.callerDetails || {};
            const ambulance = data.ambulances?.[0] || {};
            const events = ambulance.events || [];
      
            const callerData = {
              fullName: caller.fullName || "",
              emailAddress: caller.email || "",
              phoneNumber: caller.phone || "",
              companyName: caller.company || "",
            };
      
            const eventData = {
              venueName: ambulance.eventLocationName || "",
              venueAddress: ambulance.eventAddress || "",
              guests: ambulance.estimatedNumberOfGuests || 0,
              eventType: ambulance.eventType || "",
              description: ambulance.description || "",
            };
      
            const schedule = events.map((event) => ({
              startDate: formatDate(event.startDate),
              endDate: formatDate(event.endDate),
              eventEndsSameDay: event.eventEndsSameDay || false,
              startTime: formatTime(event.startTime),
              endTime: formatTime(event.endTime),
              totalHours: event.hours?.totalHours || 0,
              totalMinutes: event.hours?.totalMinutes || 0,
            }));
      
            const ambulanceData = {
              smallAmbulanceCount: ambulance.smallAmbulance || 0,
              largeAmbulanceCount: ambulance.largeAmbulance || 0,
              medicsCount: ambulance.noOfMedic || 0,
              estimatedFee: data.price || 0,
            };
      
            if (pendingOrder) {
            // Save data to local storage
            localStorage.setItem("callerData", JSON.stringify(callerData));
            localStorage.setItem("eventData", JSON.stringify(eventData));
            localStorage.setItem("schedule", JSON.stringify(schedule));
            localStorage.setItem("ambulanceData", JSON.stringify(ambulanceData));
            localStorage.setItem(
              "smallAmbulanceTotal",
              data.smallAmbulanceCost?.toString()
            );
            localStorage.setItem(
              "largeAmbulanceTotal",
              data.largeAmbulanceCost?.toString()
            );
            localStorage.setItem("medicsTotal", data.medicCost?.toString());
            localStorage.setItem("bookingid", JSON.stringify(id));
        }

        if (!pendingOrder) {
            console.log('not a pendning order')
        }
    
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            if(pendingOrder){
            navigate("/StandBy/Nigeria/Event/Schedule/Ambulance%20Size/Confirm%20order");
            }
            
        }
    };

    return(
        <div onClick={()=>handleFetchData(id)} className="rounded-2xl cursor-pointer bg-white p-6 w-[378px] border border-[#ECEBED] shadow-card transition-colors duration-200 hover:border-ev-300">
            <div className="flex flex-col gap-3">
                <p className="font-brsemi text-[24px] text-[#181719]">{eventLocationName}</p>
                <p className="font-brmedium text-[#181719]">{formatDispDate(startDate)}, {formatDispTime(startTime)}</p>
                <span className="flex gap-1 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2890_31127)">
                <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 9.5V14.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 9.5V14.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2890_31127">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p style={{ color }} className="font-brsemi text-xl">₦ {price.toLocaleString()}</p>
                </span>
            </div>
            <div className="bg-[#F4F6FA] p-4 flex flex-col gap-2 rounded-mm">
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Date</p>
                    <p className="text-sm font-brreg text-[#181719]">{formatDispDate(endDate) || 'NA'}</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Time</p>
                    <p className="text-sm font-brreg text-[#181719]">{formatDispTime(startTime)} - {formatDispTime(endTime) || 'NA'}</p>
                </span>
                
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Large Ambulance</p>
                    <p className="text-sm font-brreg text-[#181719]">{largeAmbulance}</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">No. of Medics</p>
                    <p className="text-sm font-brreg text-[#181719]">{noOfMedic}</p>
                </span>
            </div>
            {pendingOrder  &&
            <span className="flex justify-end font-brmedium text-ev-700 cursor-pointer mt-1">
                    <div onClick={()=>handleFetchData(id)} className="flex items-center">
                    <p>Complete Booking</p>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.94043 13.78L10.2871 9.43337C10.8004 8.92003 10.8004 8.08003 10.2871 7.5667L5.94043 3.22003" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                {/* {iaFlag == 'ADMIN' ?
                (
                    <div onClick={handlePaymentLink} className="flex items-center">
                    <p>Generate payment Link</p>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.94043 13.78L10.2871 9.43337C10.8004 8.92003 10.8004 8.08003 10.2871 7.5667L5.94043 3.22003" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>)
                :
                (
                    <div onClick={handleSubmit} className="flex items-center">
                    <p>Complete Booking</p>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.94043 13.78L10.2871 9.43337C10.8004 8.92003 10.8004 8.08003 10.2871 7.5667L5.94043 3.22003" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                )
                } */}
            </span>
            }
            <PaymentLinkModal open={modalOpen} close={()=>setModalOpen(false)} checkoutLink={checkoutLink} />
            <BarLoader 
             size={75}
             color="#6D09F9"
             loading={loading} />
             <Sheet>
                {!pendingOrder &&
                <span className="flex justify-end">
                <SheetTrigger onClick={()=>handleFetchData(id)} className="flex justify-end font-brmedium text-ev-700 cursor-pointer mt-1 items-center">
                    View Booking
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.94043 13.78L10.2871 9.43337C10.8004 8.92003 10.8004 8.08003 10.2871 7.5667L5.94043 3.22003" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>   
                </SheetTrigger>
                </span>
                    
                }
            
            <SheetContent className="overflow-auto bg-none border-none w-full p-0 ">
                <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription>
                <div> 
                    <div className="flex justify-end py-4 overscroll-auto">
                        <SheetClose>
                        <div className="bg-white mx-3 font-brreg text-lg flex cursor-pointer items-center px-2 py-1 gap-1 rounded-mm" >close 
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1659_21726"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                        <rect width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1659_21726)">
                        <path d="M2.7078 14.7913C2.53058 14.7913 2.38217 14.7314 2.26259 14.6115C2.14287 14.4918 2.08301 14.3434 2.08301 14.1663V5.83301C2.08301 5.65592 2.14294 5.50752 2.2628 5.3878C2.38266 5.26794 2.53113 5.20801 2.70822 5.20801C2.88544 5.20801 3.03384 5.26794 3.15342 5.3878C3.27315 5.50752 3.33301 5.65592 3.33301 5.83301V14.1663C3.33301 14.3434 3.27308 14.4918 3.15322 14.6115C3.03335 14.7314 2.88488 14.7913 2.7078 14.7913ZM15.5301 10.6247H5.78488C5.6078 10.6247 5.4594 10.5647 5.33967 10.4449C5.21981 10.325 5.15988 10.1765 5.15988 9.99947C5.15988 9.82224 5.21981 9.67384 5.33967 9.55426C5.4594 9.43454 5.6078 9.37467 5.78488 9.37467H15.5222L12.7736 6.59738C12.6584 6.48197 12.5999 6.34044 12.5982 6.1728C12.5967 6.00502 12.6579 5.8587 12.7818 5.73384C12.8954 5.6194 13.04 5.56217 13.2155 5.56217C13.3911 5.56217 13.5365 5.61988 13.652 5.7353L17.389 9.47238C17.4671 9.55044 17.5221 9.63308 17.554 9.7203C17.5861 9.80752 17.6022 9.90099 17.6022 10.0007C17.6022 10.1004 17.5861 10.1936 17.554 10.2801C17.5221 10.3666 17.4671 10.4489 17.389 10.527L13.6438 14.2722C13.5298 14.3875 13.3872 14.4451 13.2161 14.4451C13.0452 14.4451 12.8977 14.3875 12.7736 14.2722C12.6445 14.1481 12.5812 13.9996 12.5838 13.8265C12.5865 13.6535 12.6497 13.505 12.7736 13.3811L15.5301 10.6247Z" fill="#181719"/>
                        </g>
                        </svg>
                        </div>
                        </SheetClose>
                    </div>
                        <div className="pt-9 max-w-[640px] max-lg:w-full max-md:text-left  rounded-2xl flex flex-col gap-12 bg-white p-9 mr-2 max-lg:p-4">
                        <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-2xl text-[#1F1D21]">{orderData?.callerDetails?.fullName}</p>  
                    </span>
                    <div className="flex flex-wrap gap-3 justify-between">
                   
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Email Address</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.callerDetails?.email}</p>
                    </span>
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Phone Number</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.callerDetails?.phone}</p>
                    </span>
                    {orderData?.callerDetails?.companyName &&
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Company Name</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.callerDetails?.companyName}</p>
                    </span>
                    }
                     <span className="flex flex-col justify-between w-[278px]  py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719] ">Payment Status</p>
                        <div className="font-brreg  w-[160px]">
                            {orderData?.paymentStatus}
                          {/* <Status id={props.id}  row={bookingData.missionStatus}/> */}
                        <span>
                          {/* {renderContent(bookingData.missionStatus)} */}
                        </span>
                        </div>
                    </span>
                    </div>
                  </section>
                    
                    <section className="flex flex-col gap-2">
                    <p className="font-brsemi text-lg text-ev-950 ">Estimated Fee</p>
                        <div className="flex items-center gap-1 py-2 px-3 rounded-mm w-[175px] bg-[#F8F4FE] border-[1px] text-[#6D09F9] font-brsemi text-xl border-ev-700 ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1600_15209)">
                        <path d="M17 20.5012H7C4 20.5012 2 19.0012 2 15.5012V8.50122C2 5.00122 4 3.50122 7 3.50122H17C20 3.50122 22 5.00122 22 8.50122V15.5012C22 19.0012 20 20.5012 17 20.5012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15.0012C13.6569 15.0012 15 13.6581 15 12.0012C15 10.3444 13.6569 9.00122 12 9.00122C10.3431 9.00122 9 10.3444 9 12.0012C9 13.6581 10.3431 15.0012 12 15.0012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1600_15209">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.0012207)"/>
                        </clipPath>
                        </defs>
                        </svg>
                            <p>₦ {formattedFee}</p>
                        </div>
                    </section>
                  <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-lg text-ev-950">Event Schedule</p>    
                    </span>
                    <span className="flex flex-col justify-between items-start py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        {formattedScheduleData.map((schedule, index) => (
                        <div key={index} className="flex flex-col justify-between text-left py-3 px-0 rounded-xl bg-[#F9F9FA] flex-wrap">
                            {/* Date Range */}
                            <span>

                            <p className="font-semibold text-[#181719]">
                                {schedule.formattedDateRange || "N/A"}
                            </p>
                            <p className="font-brmedium text-[#181719]">
                                {schedule.formattedTimeRange || "N/A"}
                            </p>
                            </span>
                        </div>
                    ))}
                    </span>
                  </section>

                  <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-lg text-ev-950">Number of Ambulance and Medics</p>
                       
                       
                        
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719] ">Small Ambulance</p>
                        <p className="font-semibold text-[#181719]">{orderData?.ambulances?.[0]?.smallAmbulance}</p>
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719]">Large Ambulance</p>
                        <p className=" font-brmedium text-[#181719]">{orderData?.ambulances?.[0]?.largeAmbulance}</p>
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719]">No. of Medics</p>
                        <p className=" font-brmedium text-[#181719]">{orderData?.ambulances?.[0]?.noOfMedic}</p>
                    </span>
                  </section>

                 

                  <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-lg text-ev-950">About Event</p>
                    </span>
                    <div className="flex flex-wrap gap-3 justify-between">
                    <span className="flex flex-col justify-between w-full  py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719] ">Venue Name</p>
                        <p className="font-brreg text-[#6D6D6D]">{orderData?.ambulances?.[0]?.eventLocationName}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Venue Address</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.ambulances?.[0]?.eventAddress}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Estimated No. Guest</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.ambulances?.[0]?.estimatedNumberOfGuests}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Event Type</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.ambulances?.[0]?.eventType}</p>
                    </span>
                    {orderData?.ambulances?.[0]?.description &&
                    <span className="flex flex-col  w-[568px] h-[143px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Description</p>
                        <p className=" font-brreg text-[#6D6D6D]">{orderData?.ambulances?.[0]?.description}</p>
                    </span>
                    }
                    </div>
                  </section>
           </div>
           </div>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>
        </div>
    )
}