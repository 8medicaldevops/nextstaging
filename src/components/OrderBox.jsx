import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, parse, format } from "date-fns";
import axios from "axios";
import PaymentLinkModal from "./PaymentLinkModal";

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
    smallAmbulanceCount,
    largeAmbulanceCount,
    estimatedFee,
    venueAddress,
    guests,
    eventType,
    description,
    fullName,
    emailAddress,
    phoneNumber,
    companyName,
    smallAmbulanceCost,
    largeAmbulanceCost,
    medicCost,
    eventEndsSameDay,
    token,
    iaFlag
}) {
        
    const [callerData, setCallerData] = useState({
        fullName: fullName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        companyName: companyName

    });
    const [eventData, setEventData] = useState({
        venueName: eventLocationName,
        venueAddress: venueAddress,
        guests: guests,
        eventType: eventType,
        description: description,
    })
    const [schedule, setSchedule] = useState({
        startDate: startDate,
        endDate: endDate,
        eventEndsSameDay: eventEndsSameDay,
        startTime: startTime,
        endTime: endTime,
      });
      const [ambulanceData, setAmbulanceData] = useState({
        smallAmbulanceCount :smallAmbulanceCount,
        largeAmbulanceCount:largeAmbulanceCount,
        medicsCount:noOfMedic,
        estimatedFee:estimatedFee
      })
        const [loading, setLoading] = useState(false); // Loading state
        const navigate = useNavigate();
        const [checkoutLink, setCheckoutLink] = useState('');
        const [modalOpen, setModalOpen] = useState(false);
        // Format date and time if needed (example format)
        const formatDate = (dateStr) => {
            if (!dateStr) return 'N/A'; // Return a default value if dateStr is undefined or null
            return new Date(dateStr).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            });
        };
        const formatTime = (timeStr) => {
            if (!timeStr) return 'N/A'; // Return a default value if timeStr is undefined or null
        
            const [hour, minute] = timeStr.split(':');
            let hours = parseInt(hour, 10);
            const suffix = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        
            hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
            const formattedTime = `${hours}:${minute} ${suffix}`;
        
            return formattedTime;
        };
        //const ogstartDate = parseISO(startDate);
        //const ogendDate = parseISO(endDate);
        //const formattedBackendStartDate = format(ogstartDate, 'yyyy-MM-dd'); // Format date to "YYYY-MM-DD"
        //const formattedBackendEndDate = format(ogendDate, 'yyyy-MM-dd'); // Format date to "YYYY-MM-DD"
        
        //console.log(callerData,eventData,schedule,smallAmbulanceCount,largeAmbulanceCount,noOfMedic,estimatedFee)
        const handleSubmit = () => {
        // Save the current state to local storage
        localStorage.setItem('callerData', JSON.stringify(callerData));
        localStorage.setItem('eventData', JSON.stringify(eventData));
        localStorage.setItem('schedule', JSON.stringify(schedule));
        localStorage.setItem('ambulanceData', JSON.stringify(ambulanceData));
        localStorage.setItem('smallAmbulanceTotal', smallAmbulanceCost.toString());
        localStorage.setItem('largeAmbulanceTotal', largeAmbulanceCost.toString());
        localStorage.setItem('medicsTotal', medicCost.toString());
        localStorage.setItem('bookingid',JSON.stringify(id));
        navigate("/StandBy/Nigeria/Event/Schedule/Ambulance%20Size/Confirm%20order")
        }

        // const handlePaymentLink = async() => {
        //         setLoading(!loading)
        //         const data = {
        //             callerDetails: {
        //                 fullName: fullName,
        //                 email: emailAddress,
        //                 phone: phoneNumber,
        //                 company: companyName,
        //             },
        //             ambulances: {
        //                 eventLocationName: eventLocationName,
        //                 eventAddress: venueAddress,
        //                 estimatedNumberOfGuests: guests,
        //                 eventType: eventType,
        //                 description: description,
        //                 eventEndOnTheSameDay: eventEndsSameDay,
        //                 startDate: formattedBackendStartDate,
        //                 endDate: formattedBackendEndDate,
        //                 startTime: startTime,
        //                 endTime: endTime,
        //                 smallAmbulance: smallAmbulanceCount,
        //                 largeAmbulance: largeAmbulanceCount,
        //                 noOfMedic: noOfMedic,
        //             },
        //             country: "NG",
                    
        //         };
        
        //         try {
        //             const response = await axios.post(import.meta.env.VITE_GENERATE_PAYMENT_LINK, data,
        //                 {
        //                     headers: {
        //                       Authorization: `Bearer ${token}`, 
        //                     },
        //                   }
        //             );
        //             console.log("Response:", response.data);
        //             setCheckoutLink(response.data.data.paymentLink);
        //             setModalOpen(true);
        //             //navigate("/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order/Booking successful");
        //         } catch (error) {
        //             //console.error("Error:", error);
        //             //navigate("/BookingError");
        //             alert('Outdated standby date or time cannot generate link')
        //         } finally {
        //             setLoading(false);
        //         }
              
        // }
    return(
        <div onClick={()=>handleSubmit()} className="rounded-3xl cursor-pointer bg-white p-6 w-[378px] drop-shadow">
            <div className="flex flex-col gap-3">
                <p className="font-brsemi text-[24px] text-[#181719]">{eventLocationName}</p>
                <p className="font-brmedium text-[#181719]">{formatDate(startDate)}, {formatTime(startTime)}</p>
                <span className="flex gap-1 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2890_31127)">
                <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#F34197" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#F34197" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 9.5V14.5" stroke="#F34197" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 9.5V14.5" stroke="#F34197" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2890_31127">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p className="font-brsemi text-xl">₦ {price.toLocaleString()}</p>
                </span>
            </div>
            <div className="bg-[#F4F6FA] p-4 flex flex-col gap-2 rounded-mm">
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Date</p>
                    <p className="text-sm font-brreg text-[#181719]">{formatDate(endDate)}</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Time</p>
                    <p className="text-sm font-brreg text-[#181719]">{formatTime(startTime)} - {formatTime(endTime)}</p>
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
            <span className="flex justify-end font-brmedium text-ev-700 cursor-pointer mt-1">
                    <div onClick={handleSubmit} className="flex items-center">
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
            <PaymentLinkModal open={modalOpen} close={()=>setModalOpen(false)} checkoutLink={checkoutLink} />
        </div>
    )
}