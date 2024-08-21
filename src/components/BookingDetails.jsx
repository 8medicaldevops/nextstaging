import {
    Sheet,
    SheetContent,
  } from "@/components/ui/sheet"
  
import { parseISO, parse, format, isValid  } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";

import Status from "./Status";
import EditContact from "./EditContact";
import EditSchedule from "./EditSchedule";
import EditVenue from "./EditVenue";
import EditAmbulance from "./EditAmbulance";
  


export default function BookingDetails (props) {
    const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('admindata')));
    const [bookingData, setBookingData] = useState({});
    const [callerData, setCallerData] = useState({});
    const [eventData, setEventData] = useState({});
    const [schedule, setSchedule] = useState({});
    const [ambulanceData, setAmbulanceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editContactDetails, setEditContactDetails] = useState(false);
    const [editScheduleDetails, setEditScheduleDetails] = useState(false);
    const [editEventDetails, setEditEventDetails] = useState(false);
    const [editAmbulanceDetails, setEditAmbulanceDetails] = useState(false);

    // console.log(bookingData)
      
   

    useEffect(() => {
      const fetchData = async () => {
        const storedTokenData = localStorage.getItem('token');
        if (!storedTokenData) {
          console.error('Token not found in local storage');
          return;
        }
    
        const accessToken = JSON.parse(storedTokenData).accessToken;
    
        try {
          setIsLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_ORDER_API}${props.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          // Handle the response
          setBookingData(response.data.data);
         // console.log(response.data);
        } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching (optional for cleanup)
        }
      };
    
      if (props.id) {
        fetchData();
      } else {
       // console.log('props.id is not available yet.');
      }
    }, [props.id,editContactDetails,editAmbulanceDetails,editEventDetails,editScheduleDetails]);
    

 useEffect(() => {
    if (bookingData && bookingData.ambulances) {
      setCallerData({
        fullName: bookingData.callerDetails?.fullName || '',
        emailAddress: bookingData.callerDetails?.email || '',
        phoneNumber: bookingData.callerDetails?.phone || '',
        companyName: bookingData.callerDetails?.company || '',
      });
  
      setEventData({
        venueName: bookingData.ambulances?.eventLocationName || '',
        venueAddress: bookingData.ambulances?.eventAddress || '',
        guests: bookingData.ambulances?.estimatedNumberOfGuests || 0,
        eventType: bookingData.ambulances?.eventType || '',
        description: bookingData.ambulances?.description || '',
      });
  
      setSchedule({
        startDate: bookingData.ambulances?.startDate || '',
        endDate: bookingData.ambulances?.endDate || '',
        eventEndsSameDay: bookingData.ambulances?.eventEndOnTheSameDay || false,
        startTime: bookingData.ambulances?.startTime || '',
        endTime: bookingData.ambulances?.endTime || '',
      });
  
      setAmbulanceData({
        smallAmbulanceCount: bookingData.ambulances?.smallAmbulance || 0,
        largeAmbulanceCount: bookingData.ambulances?.largeAmbulance || 0,
        medicsCount: bookingData.ambulances?.noOfMedic || 0,
        estimatedFee: bookingData.price || 0,
      });
    }
  }, [bookingData]);
  
  const storedCallerData = callerData;
  //console.log(storedCallerData);
  const storedEventData = eventData;
  //console.log(storedEventData);
  const storedScheduleData = schedule;
  //console.log(storedScheduleData);
  const storedAmbulanceData = ambulanceData;
  //format fee
  const formattedFee = new Intl.NumberFormat().format(storedAmbulanceData.estimatedFee);
  // Validate and format data
  const startDate = storedScheduleData.startDate ? parseISO(storedScheduleData.startDate) : null;
  const endDate = storedScheduleData.endDate ? parseISO(storedScheduleData.endDate) : null;
  
  const formattedStartDate = startDate ? format(startDate, "do") : '';
  const formattedEndDate = endDate ? format(endDate, "do MMMM, yyyy") : '';
  const formattedDateRange = startDate && endDate ? `${formattedStartDate} - ${formattedEndDate}` : '';
  
  const parseTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') {
      return null; // Return null if timeStr is invalid
    }
    const parsedTime = parse(timeStr, 'HH:mm', new Date());
    return isValid(parsedTime) ? parsedTime : null; // Validate parsed time
  };
  
  // Parse the time strings to Date objects
  const startTime = parseTime(storedScheduleData.startTime);
  const endTime = parseTime(storedScheduleData.endTime);
  
  // Format the Date objects to the desired string format
  const formattedStartTime = startTime ? format(startTime, 'h:mm a') : 'Invalid time';
  const formattedEndTime = endTime ? format(endTime, 'h:mm a') : 'Invalid time';
  
  const formattedTimeRange = startTime && endTime ? `${formattedStartTime} - ${formattedEndTime}` : 'Invalid time range';
  
    return(

        <Sheet open={props.open} >
        <SheetContent className="  w-[640px] sm:max-w-lg  border-none pt-0 px-0 overflow-auto">
      
            <div className="">
                <div>
                    {isLoading?(
                        <p>Loading Data</p>
                    ):(
                        <div> 
                            <div className="flex justify-end py-4 ">
                        <div onClick={props.close} className="bg-white mx-3 font-brreg text-lg flex cursor-pointer items-center px-2 py-1 gap-1 rounded-mm" >close 
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1659_21726"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                        <rect width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1659_21726)">
                        <path d="M2.7078 14.7913C2.53058 14.7913 2.38217 14.7314 2.26259 14.6115C2.14287 14.4918 2.08301 14.3434 2.08301 14.1663V5.83301C2.08301 5.65592 2.14294 5.50752 2.2628 5.3878C2.38266 5.26794 2.53113 5.20801 2.70822 5.20801C2.88544 5.20801 3.03384 5.26794 3.15342 5.3878C3.27315 5.50752 3.33301 5.65592 3.33301 5.83301V14.1663C3.33301 14.3434 3.27308 14.4918 3.15322 14.6115C3.03335 14.7314 2.88488 14.7913 2.7078 14.7913ZM15.5301 10.6247H5.78488C5.6078 10.6247 5.4594 10.5647 5.33967 10.4449C5.21981 10.325 5.15988 10.1765 5.15988 9.99947C5.15988 9.82224 5.21981 9.67384 5.33967 9.55426C5.4594 9.43454 5.6078 9.37467 5.78488 9.37467H15.5222L12.7736 6.59738C12.6584 6.48197 12.5999 6.34044 12.5982 6.1728C12.5967 6.00502 12.6579 5.8587 12.7818 5.73384C12.8954 5.6194 13.04 5.56217 13.2155 5.56217C13.3911 5.56217 13.5365 5.61988 13.652 5.7353L17.389 9.47238C17.4671 9.55044 17.5221 9.63308 17.554 9.7203C17.5861 9.80752 17.6022 9.90099 17.6022 10.0007C17.6022 10.1004 17.5861 10.1936 17.554 10.2801C17.5221 10.3666 17.4671 10.4489 17.389 10.527L13.6438 14.2722C13.5298 14.3875 13.3872 14.4451 13.2161 14.4451C13.0452 14.4451 12.8977 14.3875 12.7736 14.2722C12.6445 14.1481 12.5812 13.9996 12.5838 13.8265C12.5865 13.6535 12.6497 13.505 12.7736 13.3811L15.5301 10.6247Z" fill="#181719"/>
                        </g>
                        </svg>
                        </div>
                        </div>
                        <div className="pt-9 max-w-[640px] max-lg:w-full   rounded-2xl flex flex-col gap-12 bg-white p-9 mr-2 max-lg:p-4">
                        <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-2xl text-[#1F1D21]">{storedCallerData.fullName}</p>
                        
                        <span onClick={()=>setEditContactDetails(true)} className="flex cursor-pointer items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9"/>
                        </svg>
                        Edit
                        </span>
                       
                    </span>
                    <div className="flex flex-wrap gap-3 justify-between">
                   
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Email Address</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.emailAddress}</p>
                    </span>
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Phone Number</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.phoneNumber}</p>
                    </span>
                    {storedCallerData.companyName &&
                    <span className="flex flex-col justify-between w-[278px] py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719]">Company Name</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.companyName}</p>
                    </span>
                    }
                     <span className="flex flex-col justify-between w-[278px]  py-3  rounded-xl  max-lg:w-full ">
                        <p className=" font-brmedium text-[#181719] ">Booking Status</p>
                        <div className="font-brreg  w-[160px]"><Status id={props.id}  row={bookingData.missionStatus}/></div>
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
                        
                        <span onClick={()=>setEditScheduleDetails(true)} className="flex cursor-pointer items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9"/>
                        </svg>
                        Edit
                        </span>
                        
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719] ">Date</p>
                        <p className="font-semibold text-[#181719]">{formattedDateRange}</p>
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719]">Time</p>
                        <p className=" font-brmedium text-[#181719]">{formattedTimeRange}</p>
                    </span>
                  </section>

                  <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-lg text-ev-950">Number of Ambulance and Medics</p>
                        
                        <span onClick={()=>setEditAmbulanceDetails(true)} className="flex cursor-pointer items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9"/>
                        </svg>
                        Edit
                        </span>
                        
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719] ">Small Ambulance</p>
                        <p className="font-semibold text-[#181719]">{storedAmbulanceData.smallAmbulanceCount}</p>
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719]">Large Ambulance</p>
                        <p className=" font-brmedium text-[#181719]">{storedAmbulanceData.largeAmbulanceCount}</p>
                    </span>
                    <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                        <p className=" font-brmedium text-[#181719]">No. of Medics</p>
                        <p className=" font-brmedium text-[#181719]">{storedAmbulanceData.medicsCount}</p>
                    </span>
                  </section>

                 

                  <section className="flex flex-col gap-4">
                    <span className="flex justify-between items-center">
                        <p className="font-brsemi text-lg text-ev-950">About Event</p>
                        
                        <span onClick={()=>setEditEventDetails(true)} className="flex cursor-pointer items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9"/>
                        </svg>
                        Edit
                        </span>
                        
                    </span>
                    <div className="flex flex-wrap gap-3 justify-between">
                    <span className="flex flex-col justify-between w-full  py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719] ">Venue Name</p>
                        <p className="font-brreg text-[#6D6D6D]">{storedEventData.venueName}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Venue Address</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedEventData.venueAddress}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Estimated No. Guest</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedEventData.guests}</p>
                    </span>
                    <span className="flex flex-col justify-between w-full py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Event Type</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedEventData.eventType}</p>
                    </span>
                    { storedEventData.description &&
                    <span className="flex flex-col  w-[568px] h-[143px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                        <p className=" font-brmedium text-[#181719]">Description</p>
                        <p className=" font-brreg text-[#6D6D6D]">{storedEventData.description}</p>
                    </span>
                    }
                    </div>
                  </section>
           </div>
           </div>
           )}
           </div>
        
            </div>

           
            <EditContact open={editContactDetails} id={props.id} bookingData={bookingData} close={()=>setEditContactDetails(false)} />
            <EditSchedule open={editScheduleDetails} id={props.id} bookingData={bookingData} close={()=>setEditScheduleDetails(false)} />
            <EditVenue open={editEventDetails} id={props.id} bookingData={bookingData} close={()=>setEditEventDetails(false)} />
            <EditAmbulance open={editAmbulanceDetails} id={props.id} bookingData={bookingData} close={()=>setEditAmbulanceDetails(false)} />
  </SheetContent>
</Sheet>
        
    )
}