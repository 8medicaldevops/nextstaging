import NavBar from "../components/NavBar";
import { parseISO, parse, format, isBefore, isSameDay, set } from "date-fns";
import { PaystackButton } from 'react-paystack';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, } from "react";
import { BeatLoader } from "react-spinners";
import ReactGA from "react-ga4";
import LinkPopup from "@/components/LinkPopup";
import { jwtDecode } from "jwt-decode";
import PaymentLinkModal from "@/components/PaymentLinkModal";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToasts } from 'react-toast-notifications';
import ErrorPopup from "@/components/ErrorPopup";


export default function ConfirmOrder() {
    let [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    // eslint-disable-next-line no-unused-vars
    let [color, setColor] = useState("#6D09F9");
    const [invError, setInvError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [checkoutLink, setCheckoutLink] = useState('');
    const [iaFlag, setIaFlag] = useState('')
    const [token, setToken] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // To hold the specific error message
    const storedCallerData = JSON.parse(localStorage.getItem('callerData'));
    const storedEventData = JSON.parse(localStorage.getItem('eventData'));
    const storedScheduleData = JSON.parse(localStorage.getItem('schedule'));
    const storedAmbulanceData = JSON.parse(localStorage.getItem('ambulanceData'));
    const invId = JSON.parse(localStorage.getItem('bookingid'));
    const siginData = JSON.parse(sessionStorage.getItem('SignIn'));
    const userId = siginData?.data?.id
    const navigate = useNavigate();
    
    //Google analytics
    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order",
            title: "Confirm Order",
        })
    }, [])

    //Feature flags for Internal adin

    useEffect(() => {
        const signInData = JSON.parse(sessionStorage.getItem('SignIn'));

        if (signInData && signInData.data && signInData.data.tokens) {
            const token = signInData.data.tokens.accessToken || '';
            setToken(signInData.data.tokens.accessToken)
            // Check if token exists before decoding
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setIaFlag(decodedToken?.userType || ''); // Set iaFlag only once on mount
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            } else {
                console.error('No access token found.');
            }
        } else {
            console.error('No sign-in data found.');
        }
    }, []); // Empty array ensures this runs only once
    
    //Formatting date, time , fee

    // Helper function to parse time strings into Date objects
    const parseTime = (timeStr) => {
        return parse(timeStr, 'HH:mm', new Date());
    };

    // Format fee
    const formattedFee = new Intl.NumberFormat().format(storedAmbulanceData.estimatedFee);

    // Map over the schedule data array to format each entry
    const formattedScheduleData = storedScheduleData.map((schedule) => {
        // Parse start and end dates
        const startDate = parseISO(schedule.startDate);
        const endDate = parseISO(schedule.endDate);
        const formattedBackendStartDate = format(startDate, 'yyyy-MM-dd') || 'N/A'; // Format date to "YYYY-MM-DD"
        const formattedBackendEndDate = format(endDate, 'yyyy-MM-dd') || 'N/A'; // Format date to "YYYY-MM-DD"

        // Format dates to desired string format
        const formattedStartDate = format(startDate, "do");
        const fullStartDate = format(startDate, "do MMMM, yyyy")
        const formattedEndDate = format(endDate, "do MMMM, yyyy");
        const formattedDateRange = fullStartDate === formattedEndDate ? fullStartDate : `${formattedStartDate} - ${formattedEndDate}`;


        // Parse start and end times
        const startTime = parseTime(schedule.startTime) || 'N/A';
        const endTime = parseTime(schedule.endTime) || 'N/A';

        // Format times to desired string format
        const formattedStartTime = format(startTime, 'h:mm a')|| 'N/A';
        const formattedEndTime = format(endTime, 'h:mm a') || 'N/A';
        const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}` || 'N/A';

        // Return all formatted data for each schedule entry
        return {
            formattedBackendStartDate,
            formattedBackendEndDate,
            formattedDateRange,
            formattedTimeRange,
        };
    });

   // console.log(formattedScheduleData);


     
    
    /// check for invalid dates 
    useEffect(() => {
        const currentDate = new Date();
        let errorMsg = ''; // Initialize error message
    
        storedScheduleData.forEach((schedule) => {
            // Parse dates and times
            const startDate = parseISO(schedule.startDate);
            const endDate = parseISO(schedule.endDate);
            const startTime = parseTime(schedule.startTime);
            const endTime = parseTime(schedule.endTime);
    
            // Check if dates and times are defined
            if (!startDate || !endDate || !startTime || !endTime) return;
    
            // Combine dates and times into single Date objects
            const combinedStartDateTime = new Date(startDate);
            combinedStartDateTime.setHours(startTime.getHours());
            combinedStartDateTime.setMinutes(startTime.getMinutes());
    
            const combinedEndDateTime = new Date(endDate);
            combinedEndDateTime.setHours(endTime.getHours());
            combinedEndDateTime.setMinutes(endTime.getMinutes());
    
            // Check for invalid date conditions
            if (isSameDay(combinedStartDateTime, currentDate)) {
                if (isBefore(combinedStartDateTime, currentDate)) {
                    errorMsg = 'The selected start time is earlier than the current time.';
                }
            } else if (isBefore(combinedStartDateTime, currentDate)) {
                errorMsg = 'The selected start date and time are earlier than the current date.';
            }
    
            if (isBefore(combinedEndDateTime, currentDate)) {
                errorMsg = 'The selected end date is earlier than the current date.';
            }
    
            // Stop further checks if an error message is already set
            if (errorMsg) return;
        });
    
        // Set error message and popup display if any invalid date is found

        if (errorMsg) {
            setErrorMessage(errorMsg);
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    }, [storedScheduleData]);
    



    /// Paystack actions
    const handlePaymentLinkClose = () =>{
        setModalOpen(false);
        localStorage.clear();
        navigate('/OrderHistory')
    }
    // Paystack Config function
    const config = {
        reference: (new Date()).getTime().toString(),
        email: storedCallerData.emailAddress,
        amount: storedAmbulanceData.estimatedFee * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: import.meta.env.VITE_PAYSTACK_KEY,
    };
    // Paystack functions for succes action
    const handlePaystackSuccessAction = async (reference) => {
        setLoading(!loading)
        const data = {
            callerDetails: {
                fullName: storedCallerData.fullName,
                email: storedCallerData.emailAddress,
                phone: storedCallerData.phoneNumber,
                company: storedCallerData.companyName,
            },
            ambulances: {
                eventLocationName: storedEventData.venueName,
                eventAddress: storedEventData.venueAddress,
                estimatedNumberOfGuests: storedEventData.guests,
                eventType: storedEventData.eventType,
                description: storedEventData.description,
                events:storedScheduleData,
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },
            country: "NG",
            transactionReference: reference.reference,
            orderId: invId || "",
            userId: userId || "",
        };

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(import.meta.env.VITE_BOOKING_API, data);
            //console.log("Response:", response.data);
            navigate("/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order/Booking successful");
        } catch (error) {
            //console.error("Error:", error);
            navigate("/BookingError");
        } finally {
            setLoading(false);
        }
    };

    // you can call this function anything 
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    // Paystack paynow button 
    const componentProps = {
        ...config,

        text: <p className="bg-ev-700 text-white font-brsemi gap-1 py-3 px-5 flex items-center rounded-mm">Proceed to Payment
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.62012 3.95337L13.6668 8.00004L9.62012 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.33301 8H13.553" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </p>,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    }
    // cancel incomplete booking/order flow and clear data 
    const toggleCancel = () => {
        localStorage.clear(),
            navigate("/")
    }
      
    // axios post request to generate invoice
      const generateInvoice = async() => {

        setLoading(!loading)
        // create fresh booking/order
        const data = {
            callerDetails: {
                fullName: storedCallerData.fullName,
                email: storedCallerData.emailAddress,
                phone: storedCallerData.phoneNumber,
                company: storedCallerData.companyName,
            },
            ambulances: {
                eventLocationName: storedEventData.venueName,
                eventAddress: storedEventData.venueAddress,
                estimatedNumberOfGuests: storedEventData.guests,
                eventType: storedEventData.eventType,
                description: storedEventData.description,
                // eventEndOnTheSameDay: storedScheduleData.eventEndsSameDay,
                // startDate: formattedBackendStartDate,
                // endDate: formattedBackendEndDate,
                // startTime: storedScheduleData.startTime,
                // endTime: storedScheduleData.endTime,
                events:storedScheduleData,
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },
            country: "NG",
            orderId: invId || "",

            userId:userId || "",

        };
        // patch/update data for already existing invoice/order
        const patchData = {


            callerDetails: {
                fullName: storedCallerData.fullName,
                email: storedCallerData.emailAddress,
                phone: storedCallerData.phoneNumber,
                company: storedCallerData.companyName,
            },
            ambulances: {
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },
            eventDetails: {

                    eventLocationName: storedEventData.venueName,
                    eventAddress: storedEventData.venueAddress,
                    estimatedNumberOfGuests: storedEventData.guests,
                    eventType: storedEventData.eventType,
                    description: storedEventData.description,
            },
             scheduleEvent: storedScheduleData,
            //{
            //         startDate: formattedBackendStartDate,
            //         endDate: formattedBackendEndDate,
            //         startTime: storedScheduleData.startTime,
            //         endTime: storedScheduleData.endTime,
            // }   

        }
        // condition for internal admin/customer to either create or patch order
        const requestData = invId && iaFlag == "ADMIN" ? patchData : data;
        try {

            const apiUrl = iaFlag !== "ADMIN" 
            ? (invId ?
                `${import.meta.env.VITE_UPDATE_INVOICE}${invId}`
                :
                import.meta.env.VITE_GENERATE_INVOICE )

            : (
                invId 
                ? `${import.meta.env.VITE_ORDER_API}${invId}` 
                : import.meta.env.VITE_GENERATE_PAYMENT_LINK
              );
    
        const method = invId? 'patch' : 'post'; // Choose 'patch' if  invId available, otherwise 'post'
        // await function 
        const response = await axios[method](
            apiUrl, 
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
            );
            console.log("Response:", response.data.data.id);
            localStorage.setItem('bookingid', JSON.stringify(response.data.data.id));
            setIsOpen(true);

        } catch (error) {
            setInvError(true);
            //console.error("You are not logged in:", error);
            //navigate("/BookingError");
        } finally {
            setLoading(false);
        }
       
    }

    const deleteOrder = async () => {

        setLoading(!loading)

        const apiUrl = invId && `${import.meta.env.VITE_ORDER_API}${invId}`
        const method = 'delete';
        const id = {
            id: invId
        }
        await axios({
            method: method,
            url: apiUrl,
            data: id,
            headers: {
                "Content-Type": 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data);
            addToast(response?.data.message, {
                appearance: 'success',
            });
            navigate("/OrderHistory")
        });
    }


    const generatePaymentLink = async () => {

        setLoading(!loading)
        const data = {
            callerDetails: {
                fullName: storedCallerData.fullName,
                email: storedCallerData.emailAddress,
                phone: storedCallerData.phoneNumber,
                company: storedCallerData.companyName,
            },
            ambulances: {
                eventLocationName: storedEventData.venueName,
                eventAddress: storedEventData.venueAddress,
                estimatedNumberOfGuests: storedEventData.guests,
                eventType: storedEventData.eventType,
                description: storedEventData.description,
                events:storedScheduleData,
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },
            country: "NG",
            orderId: invId || "",

        };
        const patchData = {

            callerDetails: {
                fullName: storedCallerData.fullName,
                email: storedCallerData.emailAddress,
                phone: storedCallerData.phoneNumber,
                company: storedCallerData.companyName,
            },
            ambulances: {
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },

                eventDetails: {
                    eventLocationName: storedEventData.venueName,
                    eventAddress: storedEventData.venueAddress,
                    estimatedNumberOfGuests: storedEventData.guests,
                    eventType: storedEventData.eventType,
                    description: storedEventData.description,
                },
                scheduleEvent: storedScheduleData,
                // {
                //     startDate: formattedBackendStartDate,
                //     endDate: formattedBackendEndDate,
                //     startTime: storedScheduleData.startTime,
                //     endTime: storedScheduleData.endTime,
                // }
              

        }
        const requestData = invId ? patchData : data;

        try {
            const apiUrl = invId
                ? `${import.meta.env.VITE_ORDER_API}${invId}`
                : import.meta.env.VITE_GENERATE_PAYMENT_LINK;

            const method = invId ? 'patch' : 'post'; // Use PATCH if invId is available, otherwise POST

            const response = await axios[method](
                apiUrl,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );
            console.log("Response:", response.data);
            setCheckoutLink(response.data.data.paymentLink);
            setModalOpen(true);
            //navigate("/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order/Booking successful");
        } catch (error) {
            //console.error("Error:", error);
            //navigate("/BookingError");
        } finally {
            setLoading(false);

        }
    }
    return (
        <div className={loading ? "overflow-y-hidden h-screen" : ""}>
            <NavBar />
            {loading &&
                <div className="absolute bg-black/15 h-dvh bg-blend-darken w-full">
                    <div className="flex justify-center items-center h-screen">
                        <BeatLoader
                            size={75}
                            color={color}
                            loading={loading}
                        />
                    </div>
                </div>
            }

            <div className="flex flex-col  justify-center items-center bg-[#F9F9FA] pt-9 max-md:pb-64 pb-32" >

                <div className="pt-9 max-w-[640px] max-lg:w-full   rounded-2xl flex flex-col gap-12 bg-white p-9 max-lg:p-4">
                    {showPopup && (
                        <Alert variant="destructive" className="border-2 border-red-400 rounded-mm">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-red-300 font-brmedium text-lg">
                                {errorMessage} {/* Display the specific error message */}
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex items-center gap-3">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="52" height="52" rx="8.66667" fill="#F8F4FE" />
                            <g clipPath="url(#clip0_1585_10996)">
                                <path d="M42.2809 24.7753L37.0776 18.7128C36.906 18.5078 36.6916 18.3429 36.4494 18.2298C36.2071 18.1167 35.943 18.0581 35.6757 18.0581H16.9077C16.4229 18.0581 15.9579 18.2507 15.615 18.5936C15.2722 18.9364 15.0796 19.4014 15.0796 19.8862V32.6831C15.0796 33.168 15.2722 33.6329 15.615 33.9758C15.9579 34.3186 16.4229 34.5112 16.9077 34.5112H18.8501C19.0515 35.2977 19.5089 35.9948 20.1502 36.4926C20.7915 36.9904 21.5802 37.2606 22.3921 37.2606C23.2039 37.2606 23.9927 36.9904 24.634 36.4926C25.2753 35.9948 25.7327 35.2977 25.9341 34.5112H31.647C31.8483 35.2977 32.3057 35.9948 32.9471 36.4926C33.5884 36.9904 34.3771 37.2606 35.189 37.2606C36.0008 37.2606 36.7896 36.9904 37.4309 36.4926C38.0722 35.9948 38.5296 35.2977 38.731 34.5112H40.6733C41.1582 34.5112 41.6232 34.3186 41.966 33.9758C42.3089 33.6329 42.5015 33.168 42.5015 32.6831V25.3706C42.5014 25.1522 42.4232 24.941 42.2809 24.7753ZM16.9077 24.4565V19.8862H23.3062V24.4565H16.9077ZM22.3921 35.4253C22.0305 35.4253 21.6771 35.3181 21.3764 35.1172C21.0758 34.9163 20.8415 34.6308 20.7031 34.2968C20.5648 33.9627 20.5286 33.5951 20.5991 33.2405C20.6696 32.8859 20.8437 32.5602 21.0994 32.3045C21.3551 32.0488 21.6808 31.8747 22.0354 31.8042C22.3901 31.7336 22.7576 31.7698 23.0917 31.9082C23.4257 32.0466 23.7112 32.2809 23.9121 32.5815C24.113 32.8821 24.2202 33.2356 24.2202 33.5972C24.2202 34.082 24.0276 34.547 23.6848 34.8898C23.3419 35.2327 22.8769 35.4253 22.3921 35.4253ZM31.5327 24.4565H25.1343V19.8862H31.5327V24.4565ZM35.189 35.4253C34.8274 35.4253 34.4739 35.3181 34.1733 35.1172C33.8727 34.9163 33.6384 34.6308 33.5 34.2968C33.3616 33.9627 33.3254 33.5951 33.396 33.2405C33.4665 32.8859 33.6406 32.5602 33.8963 32.3045C34.152 32.0488 34.4777 31.8747 34.8323 31.8042C35.1869 31.7336 35.5545 31.7698 35.8886 31.9082C36.2226 32.0466 36.5081 32.2809 36.709 32.5815C36.9099 32.8821 37.0171 33.2356 37.0171 33.5972C37.0171 34.082 36.8245 34.547 36.4816 34.8898C36.1388 35.2327 35.6738 35.4253 35.189 35.4253ZM33.3608 24.4565V19.8862H35.6757L39.5982 24.4565H33.3608Z" fill="#6D09F9" />
                                <path d="M42.2809 24.7753L37.0776 18.7128C36.906 18.5078 36.6916 18.3429 36.4494 18.2298C36.2071 18.1167 35.943 18.0581 35.6757 18.0581H16.9077C16.4229 18.0581 15.9579 18.2507 15.615 18.5936C15.2722 18.9364 15.0796 19.4014 15.0796 19.8862V32.6831C15.0796 33.168 15.2722 33.6329 15.615 33.9758C15.9579 34.3186 16.4229 34.5112 16.9077 34.5112H18.8501C19.0515 35.2977 19.5089 35.9948 20.1502 36.4926C20.7915 36.9904 21.5802 37.2606 22.3921 37.2606C23.2039 37.2606 23.9927 36.9904 24.634 36.4926C25.2753 35.9948 25.7327 35.2977 25.9341 34.5112H31.647C31.8483 35.2977 32.3057 35.9948 32.9471 36.4926C33.5884 36.9904 34.3771 37.2606 35.189 37.2606C36.0008 37.2606 36.7896 36.9904 37.4309 36.4926C38.0722 35.9948 38.5296 35.2977 38.731 34.5112H40.6733C41.1582 34.5112 41.6232 34.3186 41.966 33.9758C42.3089 33.6329 42.5015 33.168 42.5015 32.6831V25.3706C42.5014 25.1522 42.4232 24.941 42.2809 24.7753ZM16.9077 24.4565V19.8862H23.3062V24.4565H16.9077ZM22.3921 35.4253C22.0305 35.4253 21.6771 35.3181 21.3764 35.1172C21.0758 34.9163 20.8415 34.6308 20.7031 34.2968C20.5648 33.9627 20.5286 33.5951 20.5991 33.2405C20.6696 32.8859 20.8437 32.5602 21.0994 32.3045C21.3551 32.0488 21.6808 31.8747 22.0354 31.8042C22.3901 31.7336 22.7576 31.7698 23.0917 31.9082C23.4257 32.0466 23.7112 32.2809 23.9121 32.5815C24.113 32.8821 24.2202 33.2356 24.2202 33.5972C24.2202 34.082 24.0276 34.547 23.6848 34.8898C23.3419 35.2327 22.8769 35.4253 22.3921 35.4253ZM31.5327 24.4565H25.1343V19.8862H31.5327V24.4565ZM35.189 35.4253C34.8274 35.4253 34.4739 35.3181 34.1733 35.1172C33.8727 34.9163 33.6384 34.6308 33.5 34.2968C33.3616 33.9627 33.3254 33.5951 33.396 33.2405C33.4665 32.8859 33.6406 32.5602 33.8963 32.3045C34.152 32.0488 34.4777 31.8747 34.8323 31.8042C35.1869 31.7336 35.5545 31.7698 35.8886 31.9082C36.2226 32.0466 36.5081 32.2809 36.709 32.5815C36.9099 32.8821 37.0171 33.2356 37.0171 33.5972C37.0171 34.082 36.8245 34.547 36.4816 34.8898C36.1388 35.2327 35.6738 35.4253 35.189 35.4253ZM33.3608 24.4565V19.8862H35.6757L39.5982 24.4565H33.3608Z" fill="url(#pattern0_1585_10996)" />
                            </g>
                            <defs>
                                <pattern id="pattern0_1585_10996" patternContentUnits="objectBoundingBox" width="5.92593" height="1.52324">
                                    <use xlinkHref="#image0_1585_10996" transform="scale(0.0296296 0.0423122)" />
                                </pattern>
                                <clipPath id="clip0_1585_10996">
                                    <rect width="29.25" height="29.25" fill="white" transform="translate(13.2515 11.6597)" />
                                </clipPath>
                                <image id="image0_1585_10996" width="200" height="36" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAkCAYAAADM3nVnAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAXlSURBVHgB7Z1bUuNGFIZPt+xBnuTBO8A7GGYFMCsAVgC8pRIGzAqwV4DJkFTeBlaAWUGYFcRZQcQOlKrUWL6oO+foMhiXh7Jk9UW2viqX/WC7cLf+c2/BPjZGEp7xkwfCvPgJPCnCJymlzxgbiDD0f5/8OACD/NII2hzYJb5sgn48YOxxIsLuH0HDgxJw6g73OK/tSinakG/NfJDi4lPQuIUS85M7bNU432FCNPGibzHubIOUuB4MH7KVvK0JM2vE5gSyNCQWFI0nRPiFXt8EjUfQSBt/bMj4n/iyBYaIDIYIH9Bo9E0bjXmeRSH3cPP3ID/eRIoPZTEGRLspm9Mg2MHfvsOd2jsGQK9bkMM45BbId77uUcrwC7541CWY00bQY8DOwTwePgapwai57qDnMx80MH9BoFU8gAK8qwR5Xdva6uj6HaswZxB2oKDoomCBvMBHE9vHRX64+brVB4XQ4jDGP4NBb7KI2MuCz1E4oQz/RUvmyVhIME2eX7PMdOEHQRBtNA/DJnecJn5HS2BYUOO1bRGHBXQxtKBYPAzHTnRHBVlIjQKGSUdFGYRFqBTILLFYRHinatGjBRuNOpZ4k9Jiu9cgY+gwZx+NwzFoyEF1CWQWDxO+ruO6fRWbYENuUkakZI8AYddGr0HGbzIcHmMItb9iPpUZEwJJUVoN+ugOj4FxqnS1oOI1fLTG3d+Gbg8sg4QhxtPzFapvK2NSIDN/BbtVIRTyJhjrH7NYKBUv8fHCu8ZiQs+2cMoGYaTYIZAEvJA7YzG9UySUDn7/EVRUwsiAVQJJiHIUFU2pGaHswuaFXtYKgzhrjM+xQNABS4SRYqNAUpQ1qMhShUFwsAk5CiXfUk4f6o3GrY3CiPsXzhX1cMBCbBZIBAfWY1v1rqrNpQ2COE/BCold1msFfAbyDvslfVt7GWSk5GhyiQWCNlgMo2oPzaVwxppC8nfAJDWjbFOzF04nh6rHOU7fjg5AiIOSisUHSY3Z8E5nFz8Pyhq7khqcMOBcPoVCeHhN+9SYpflB4TjReriu67+2NjSvRc+15G9ji940O7rAwNllXEm3NjOUxP/6td4FDSSeBR/4+5ne2vuSYE7B0GDoHe1ZlfPG+KogrxEZBCGnf6sc7WHLvvHn+n873HEobt837GGMDM+RYFKDgXFfS/MaRJaQoSBUXxCqoAKJ4M79KrlG0szUahCWFsgsiVjaBqtBVoxfJ+vQjISDISqKZ1t+c83J+DR7OT49B/6O+HiBpOMF8ZECFEP4FM1tce5PhRiUaZJ2EWc/TI+kCKkRmWvUnqpvYMhL5hLILCY71jpDrorsrJKIk7dgmE+pGklalpUFkmJQKKU7r7AJ5A2pbJsJK0wgKYaEYv149iaRVKnuIVtIZeUeFi6QlORYLI2et0ATVchlnrO3k0u80DsZPhLlGCiMLJ/RhjKBEEZmoBi7dd7UL8pU4VkHoumE8eQKY6TjDB/rO1tvTmzeK6UCSTEQdlV5iUZynMEpTUjMQQNUjnXwgsVFuQM9tOq4YVFnvEIptMYojr9gSXHQiUX0Gu/Lki9q8SCz6PYmVV6ijoz5hi8ZnKi+P0HRaBcIEbtk57PG45N9DLkuqpCrGKJ8YzS5X3b/qHQ7hfCkjOtvRCApWA7saDztV+UlBZB10BCbhBc2HuddFi05yPeg0l44nbyH5BY4iqG85B8KC6AiF3SoiS2fjFMi/qHM4iCMepCUKuSym6z7QyFVza0frkOp3QqBpOgOuVQd7V0nqErFJFBItVRXHL1G19amXx6sEgiRdUNWRtEdVcpOjkFD6ogfrtu4j3UCIQzc/K3yJjPkOPG3tgUQKwVCJKcae7rHVDbZm8Tl2zEJY+kGKzV/a67bXtfRHmsFkqI5LyE83PbrTyWvvmQlafpluh/VuuUbi7BeIIShu7dvRNiVc23XMt9YRCkEQhi8KfVaCiUWhnOZtbRO5+HHIjzclDC0NAJJMfgPc0ovlOcb5jlHeXpONGh4M3Stvo9V0fwPL+jRyZ0AxyEAAAAASUVORK5CYII=" />
                            </defs>
                        </svg>

                        <p className="font-brsemi text-3xl max-sm:text-2xl max-[410px]:text-2xl text-[#181719] ">Ambulance Standby</p>

                    </div>
                    <div className="flex flex-col items-center">
                        <div className="max-md:hidden">
                            <svg width="568" height="51" viewBox="0 0 568 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="45.1998" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask0_1489_5075" maskUnits="userSpaceOnUse" x="48" y="4" width="17" height="16">
                                    <rect x="48.7998" y="4" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_1489_5075)">
                                    <path d="M55.166 14.1L60.816 8.45C60.9493 8.31667 61.1048 8.25 61.2826 8.25C61.4604 8.25 61.616 8.31667 61.7493 8.45C61.8826 8.58333 61.9493 8.74167 61.9493 8.925C61.9493 9.10833 61.8826 9.26667 61.7493 9.4L55.6326 15.5333C55.4993 15.6667 55.3437 15.7333 55.166 15.7333C54.9882 15.7333 54.8326 15.6667 54.6993 15.5333L51.8326 12.6667C51.6993 12.5333 51.6354 12.375 51.641 12.1917C51.6465 12.0083 51.716 11.85 51.8493 11.7167C51.9826 11.5833 52.141 11.5167 52.3243 11.5167C52.5076 11.5167 52.666 11.5833 52.7993 11.7167L55.166 14.1Z" fill="#6D09F9" />
                                </g>
                                <line x1="72.7998" y1="11.5" x2="113.6" y2="11.5" stroke="#6D09F9" />
                                <path d="M28.2533 45L27.3533 42.72H23.3213L22.4213 45H21.3293L24.7493 36.6H25.9253L29.3453 45H28.2533ZM23.7053 41.76H26.9693L25.3373 37.644L23.7053 41.76ZM33.7123 38.76C34.5523 38.76 35.2403 39.06 35.7763 39.66C36.3203 40.252 36.5923 41.02 36.5923 41.964C36.5923 42.908 36.3203 43.68 35.7763 44.28C35.2403 44.872 34.5523 45.168 33.7123 45.168C33.2003 45.168 32.7403 45.052 32.3323 44.82C31.9323 44.588 31.6403 44.276 31.4563 43.884V45H30.4483V36.216H31.4563V40.044C31.6403 39.652 31.9323 39.34 32.3323 39.108C32.7403 38.876 33.2003 38.76 33.7123 38.76ZM31.9723 43.596C32.3563 44.02 32.8563 44.232 33.4723 44.232C34.0883 44.232 34.5843 44.02 34.9603 43.596C35.3443 43.172 35.5363 42.628 35.5363 41.964C35.5363 41.3 35.3443 40.756 34.9603 40.332C34.5843 39.908 34.0883 39.696 33.4723 39.696C32.8563 39.696 32.3563 39.908 31.9723 40.332C31.5963 40.756 31.4083 41.3 31.4083 41.964C31.4083 42.628 31.5963 43.172 31.9723 43.596ZM43.0153 44.232C42.4393 44.856 41.6913 45.168 40.7713 45.168C39.8513 45.168 39.0993 44.856 38.5153 44.232C37.9393 43.608 37.6513 42.852 37.6513 41.964C37.6513 41.076 37.9393 40.32 38.5153 39.696C39.0993 39.072 39.8513 38.76 40.7713 38.76C41.6913 38.76 42.4393 39.072 43.0153 39.696C43.5993 40.32 43.8913 41.076 43.8913 41.964C43.8913 42.852 43.5993 43.608 43.0153 44.232ZM39.2713 43.596C39.6553 44.02 40.1553 44.232 40.7713 44.232C41.3873 44.232 41.8833 44.02 42.2593 43.596C42.6433 43.172 42.8353 42.628 42.8353 41.964C42.8353 41.3 42.6433 40.756 42.2593 40.332C41.8833 39.908 41.3873 39.696 40.7713 39.696C40.1553 39.696 39.6553 39.908 39.2713 40.332C38.8953 40.756 38.7073 41.3 38.7073 41.964C38.7073 42.628 38.8953 43.172 39.2713 43.596ZM49.7704 44.508C49.2984 44.948 48.6664 45.168 47.8744 45.168C47.0824 45.168 46.4464 44.948 45.9664 44.508C45.4944 44.06 45.2584 43.468 45.2584 42.732V38.928H46.2664V42.672C46.2664 43.176 46.4064 43.564 46.6864 43.836C46.9664 44.1 47.3624 44.232 47.8744 44.232C48.3864 44.232 48.7824 44.1 49.0624 43.836C49.3424 43.564 49.4824 43.176 49.4824 42.672V38.928H50.4904V42.732C50.4904 43.468 50.2504 44.06 49.7704 44.508ZM54.5789 45.096C53.9789 45.096 53.5189 44.956 53.1989 44.676C52.8869 44.396 52.7309 43.984 52.7309 43.44V39.792H51.5189V38.928H52.7309V37.128H53.7389V38.928H55.6469V39.792H53.7389V43.368C53.7389 43.664 53.8149 43.88 53.9669 44.016C54.1269 44.144 54.3789 44.208 54.7229 44.208C55.0029 44.208 55.3189 44.172 55.6709 44.1V44.94C55.3269 45.044 54.9629 45.096 54.5789 45.096ZM63.4184 45.168C62.1784 45.168 61.1624 44.752 60.3704 43.92C59.5784 43.088 59.1824 42.048 59.1824 40.8C59.1824 39.552 59.5824 38.512 60.3824 37.68C61.1824 36.848 62.1944 36.432 63.4184 36.432C64.2104 36.432 64.9304 36.616 65.5784 36.984C66.2264 37.352 66.7264 37.888 67.0784 38.592L66.2024 39.096C65.6184 37.976 64.7144 37.416 63.4904 37.416C62.5384 37.416 61.7664 37.732 61.1744 38.364C60.5824 38.996 60.2864 39.808 60.2864 40.8C60.2864 41.792 60.5824 42.604 61.1744 43.236C61.7664 43.868 62.5384 44.184 63.4904 44.184C64.7304 44.184 65.6424 43.624 66.2264 42.504L67.0784 43.008C66.7264 43.712 66.2264 44.248 65.5784 44.616C64.9304 44.984 64.2104 45.168 63.4184 45.168ZM73.0287 38.928H74.0367V45H73.0287V43.884C72.8527 44.276 72.5607 44.588 72.1527 44.82C71.7527 45.052 71.2967 45.168 70.7847 45.168C69.9447 45.168 69.2527 44.872 68.7087 44.28C68.1647 43.68 67.8927 42.908 67.8927 41.964C67.8927 41.02 68.1647 40.252 68.7087 39.66C69.2527 39.06 69.9447 38.76 70.7847 38.76C71.2967 38.76 71.7527 38.876 72.1527 39.108C72.5607 39.34 72.8527 39.652 73.0287 40.044V38.928ZM69.5127 43.596C69.8967 44.02 70.3967 44.232 71.0127 44.232C71.6287 44.232 72.1247 44.02 72.5007 43.596C72.8847 43.172 73.0767 42.628 73.0767 41.964C73.0767 41.3 72.8847 40.756 72.5007 40.332C72.1247 39.908 71.6287 39.696 71.0127 39.696C70.3967 39.696 69.8967 39.908 69.5127 40.332C69.1367 40.756 68.9487 41.3 68.9487 41.964C68.9487 42.628 69.1367 43.172 69.5127 43.596ZM75.9597 45V36.216H76.9677V45H75.9597ZM78.8837 45V36.216H79.8917V45H78.8837ZM87.3038 41.736C87.3038 41.912 87.2918 42.092 87.2678 42.276H82.4078C82.4638 42.884 82.6798 43.364 83.0558 43.716C83.4398 44.06 83.9278 44.232 84.5198 44.232C85.3038 44.232 85.9478 43.916 86.4518 43.284L87.1358 43.86C86.5198 44.732 85.6398 45.168 84.4958 45.168C83.5758 45.168 82.8238 44.872 82.2398 44.28C81.6638 43.688 81.3758 42.92 81.3758 41.976C81.3758 41.04 81.6558 40.272 82.2158 39.672C82.7838 39.064 83.5158 38.76 84.4118 38.76C85.2598 38.76 85.9518 39.036 86.4878 39.588C87.0318 40.14 87.3038 40.856 87.3038 41.736ZM84.4118 39.696C83.8758 39.696 83.4318 39.856 83.0798 40.176C82.7358 40.488 82.5198 40.916 82.4318 41.46H86.2718C86.2238 40.9 86.0318 40.468 85.6958 40.164C85.3678 39.852 84.9398 39.696 84.4118 39.696ZM91.6191 38.832C91.8271 38.832 92.0111 38.86 92.1711 38.916V39.804C91.9951 39.78 91.8191 39.768 91.6431 39.768C91.0511 39.768 90.5911 39.944 90.2631 40.296C89.9351 40.648 89.7711 41.18 89.7711 41.892V45H88.7631V38.928H89.7711V40.068C89.9071 39.676 90.1351 39.372 90.4551 39.156C90.7831 38.94 91.1711 38.832 91.6191 38.832Z" fill="#9C9A9E" />
                                <line x1="113.6" y1="11.5" x2="154.4" y2="11.5" stroke="#6D09F9" />
                                <rect x="158.799" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask1_1489_5075" maskUnits="userSpaceOnUse" x="162" y="4" width="17" height="16">
                                    <rect x="162.399" y="4" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask1_1489_5075)">
                                    <path d="M168.766 14.1L174.416 8.45C174.549 8.31667 174.704 8.25 174.882 8.25C175.06 8.25 175.216 8.31667 175.349 8.45C175.482 8.58333 175.549 8.74167 175.549 8.925C175.549 9.10833 175.482 9.26667 175.349 9.4L169.232 15.5333C169.099 15.6667 168.943 15.7333 168.766 15.7333C168.588 15.7333 168.432 15.6667 168.299 15.5333L165.432 12.6667C165.299 12.5333 165.235 12.375 165.241 12.1917C165.246 12.0083 165.316 11.85 165.449 11.7167C165.582 11.5833 165.741 11.5167 165.924 11.5167C166.107 11.5167 166.266 11.5833 166.399 11.7167L168.766 14.1Z" fill="#6D09F9" />
                                </g>
                                <line x1="186.399" y1="11.5" x2="227.199" y2="11.5" stroke="#6D09F9" />
                                <path d="M142.553 45L141.653 42.72H137.621L136.721 45H135.629L139.049 36.6H140.225L143.645 45H142.553ZM138.005 41.76H141.269L139.637 37.644L138.005 41.76ZM148.012 38.76C148.852 38.76 149.54 39.06 150.076 39.66C150.62 40.252 150.892 41.02 150.892 41.964C150.892 42.908 150.62 43.68 150.076 44.28C149.54 44.872 148.852 45.168 148.012 45.168C147.5 45.168 147.04 45.052 146.632 44.82C146.232 44.588 145.94 44.276 145.756 43.884V45H144.748V36.216H145.756V40.044C145.94 39.652 146.232 39.34 146.632 39.108C147.04 38.876 147.5 38.76 148.012 38.76ZM146.272 43.596C146.656 44.02 147.156 44.232 147.772 44.232C148.388 44.232 148.884 44.02 149.26 43.596C149.644 43.172 149.836 42.628 149.836 41.964C149.836 41.3 149.644 40.756 149.26 40.332C148.884 39.908 148.388 39.696 147.772 39.696C147.156 39.696 146.656 39.908 146.272 40.332C145.896 40.756 145.708 41.3 145.708 41.964C145.708 42.628 145.896 43.172 146.272 43.596ZM157.315 44.232C156.739 44.856 155.991 45.168 155.071 45.168C154.151 45.168 153.399 44.856 152.815 44.232C152.239 43.608 151.951 42.852 151.951 41.964C151.951 41.076 152.239 40.32 152.815 39.696C153.399 39.072 154.151 38.76 155.071 38.76C155.991 38.76 156.739 39.072 157.315 39.696C157.899 40.32 158.191 41.076 158.191 41.964C158.191 42.852 157.899 43.608 157.315 44.232ZM153.571 43.596C153.955 44.02 154.455 44.232 155.071 44.232C155.687 44.232 156.183 44.02 156.559 43.596C156.943 43.172 157.135 42.628 157.135 41.964C157.135 41.3 156.943 40.756 156.559 40.332C156.183 39.908 155.687 39.696 155.071 39.696C154.455 39.696 153.955 39.908 153.571 40.332C153.195 40.756 153.007 41.3 153.007 41.964C153.007 42.628 153.195 43.172 153.571 43.596ZM164.07 44.508C163.598 44.948 162.966 45.168 162.174 45.168C161.382 45.168 160.746 44.948 160.266 44.508C159.794 44.06 159.558 43.468 159.558 42.732V38.928H160.566V42.672C160.566 43.176 160.706 43.564 160.986 43.836C161.266 44.1 161.662 44.232 162.174 44.232C162.686 44.232 163.082 44.1 163.362 43.836C163.642 43.564 163.782 43.176 163.782 42.672V38.928H164.79V42.732C164.79 43.468 164.55 44.06 164.07 44.508ZM168.879 45.096C168.279 45.096 167.819 44.956 167.499 44.676C167.187 44.396 167.031 43.984 167.031 43.44V39.792H165.819V38.928H167.031V37.128H168.039V38.928H169.947V39.792H168.039V43.368C168.039 43.664 168.115 43.88 168.267 44.016C168.427 44.144 168.679 44.208 169.023 44.208C169.303 44.208 169.619 44.172 169.971 44.1V44.94C169.627 45.044 169.263 45.096 168.879 45.096ZM175.018 44.028H179.83V45H173.962V36.6H179.71V37.572H175.018V40.284H179.47V41.244H175.018V44.028ZM185.591 38.928H186.671L184.199 45H183.119L180.647 38.928H181.727L183.659 43.896L185.591 38.928ZM193.049 41.736C193.049 41.912 193.037 42.092 193.013 42.276H188.153C188.209 42.884 188.425 43.364 188.801 43.716C189.185 44.06 189.673 44.232 190.265 44.232C191.049 44.232 191.693 43.916 192.197 43.284L192.881 43.86C192.265 44.732 191.385 45.168 190.241 45.168C189.321 45.168 188.569 44.872 187.985 44.28C187.409 43.688 187.121 42.92 187.121 41.976C187.121 41.04 187.401 40.272 187.961 39.672C188.529 39.064 189.261 38.76 190.157 38.76C191.005 38.76 191.697 39.036 192.233 39.588C192.777 40.14 193.049 40.856 193.049 41.736ZM190.157 39.696C189.621 39.696 189.177 39.856 188.825 40.176C188.481 40.488 188.265 40.916 188.177 41.46H192.017C191.969 40.9 191.777 40.468 191.441 40.164C191.113 39.852 190.685 39.696 190.157 39.696ZM197.628 38.76C198.316 38.76 198.848 38.964 199.224 39.372C199.6 39.78 199.788 40.36 199.788 41.112V45H198.78V41.352C198.78 40.776 198.668 40.356 198.444 40.092C198.22 39.828 197.868 39.696 197.388 39.696C196.844 39.696 196.396 39.852 196.044 40.164C195.692 40.468 195.516 40.876 195.516 41.388V45H194.508V38.928H195.516V39.96C195.684 39.576 195.952 39.28 196.32 39.072C196.696 38.864 197.132 38.76 197.628 38.76ZM203.884 45.096C203.284 45.096 202.824 44.956 202.504 44.676C202.192 44.396 202.036 43.984 202.036 43.44V39.792H200.824V38.928H202.036V37.128H203.044V38.928H204.952V39.792H203.044V43.368C203.044 43.664 203.12 43.88 203.272 44.016C203.432 44.144 203.684 44.208 204.028 44.208C204.308 44.208 204.624 44.172 204.976 44.1V44.94C204.632 45.044 204.268 45.096 203.884 45.096Z" fill="#9C9A9E" />
                                <line x1="227.2" y1="11.5" x2="268" y2="11.5" stroke="#6D09F9" />
                                <rect x="272.4" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask2_1489_5075" maskUnits="userSpaceOnUse" x="276" y="4" width="16" height="16">
                                    <rect x="276" y="4" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask2_1489_5075)">
                                    <path d="M282.366 14.1L288.016 8.45C288.149 8.31667 288.305 8.25 288.483 8.25C288.661 8.25 288.816 8.31667 288.949 8.45C289.083 8.58333 289.149 8.74167 289.149 8.925C289.149 9.10833 289.083 9.26667 288.949 9.4L282.833 15.5333C282.699 15.6667 282.544 15.7333 282.366 15.7333C282.188 15.7333 282.033 15.6667 281.899 15.5333L279.033 12.6667C278.899 12.5333 278.836 12.375 278.841 12.1917C278.847 12.0083 278.916 11.85 279.049 11.7167C279.183 11.5833 279.341 11.5167 279.524 11.5167C279.708 11.5167 279.866 11.5833 279.999 11.7167L282.366 14.1Z" fill="#6D09F9" />
                                </g>
                                <line x1="300" y1="11.5" x2="340.8" y2="11.5" stroke="#6D09F9" />
                                <path d="M261.607 45.168C260.759 45.168 260.039 44.996 259.447 44.652C258.863 44.308 258.451 43.828 258.211 43.212L259.063 42.72C259.527 43.712 260.379 44.208 261.619 44.208C262.251 44.208 262.747 44.076 263.107 43.812C263.467 43.54 263.647 43.18 263.647 42.732C263.647 42.388 263.527 42.108 263.287 41.892C263.055 41.668 262.679 41.492 262.159 41.364L260.803 41.04C259.243 40.664 258.463 39.916 258.463 38.796C258.463 38.092 258.735 37.524 259.279 37.092C259.831 36.652 260.567 36.432 261.487 36.432C262.231 36.432 262.871 36.576 263.407 36.864C263.951 37.144 264.327 37.512 264.535 37.968L263.707 38.472C263.283 37.752 262.535 37.392 261.463 37.392C260.863 37.392 260.391 37.516 260.047 37.764C259.711 38.004 259.543 38.344 259.543 38.784C259.543 39.12 259.659 39.392 259.891 39.6C260.123 39.808 260.511 39.976 261.055 40.104L262.411 40.428C263.219 40.62 263.807 40.904 264.175 41.28C264.551 41.648 264.739 42.12 264.739 42.696C264.739 43.44 264.459 44.04 263.899 44.496C263.347 44.944 262.583 45.168 261.607 45.168ZM268.839 45.168C267.911 45.168 267.159 44.868 266.583 44.268C266.007 43.668 265.719 42.9 265.719 41.964C265.719 41.028 266.007 40.26 266.583 39.66C267.159 39.06 267.911 38.76 268.839 38.76C269.991 38.76 270.839 39.2 271.383 40.08L270.591 40.632C270.207 40.008 269.627 39.696 268.851 39.696C268.235 39.696 267.735 39.904 267.351 40.32C266.967 40.736 266.775 41.284 266.775 41.964C266.775 42.644 266.967 43.192 267.351 43.608C267.735 44.024 268.235 44.232 268.851 44.232C269.627 44.232 270.207 43.92 270.591 43.296L271.383 43.848C270.839 44.728 269.991 45.168 268.839 45.168ZM275.769 38.76C276.457 38.76 276.989 38.964 277.365 39.372C277.741 39.78 277.929 40.36 277.929 41.112V45H276.921V41.352C276.921 40.776 276.809 40.356 276.585 40.092C276.361 39.828 276.009 39.696 275.529 39.696C274.985 39.696 274.537 39.852 274.185 40.164C273.833 40.468 273.657 40.876 273.657 41.388V45H272.649V36.216H273.657V39.96C273.825 39.576 274.093 39.28 274.461 39.072C274.837 38.864 275.273 38.76 275.769 38.76ZM285.3 41.736C285.3 41.912 285.288 42.092 285.264 42.276H280.404C280.46 42.884 280.676 43.364 281.052 43.716C281.436 44.06 281.924 44.232 282.516 44.232C283.3 44.232 283.944 43.916 284.448 43.284L285.132 43.86C284.516 44.732 283.636 45.168 282.492 45.168C281.572 45.168 280.82 44.872 280.236 44.28C279.66 43.688 279.372 42.92 279.372 41.976C279.372 41.04 279.652 40.272 280.212 39.672C280.78 39.064 281.512 38.76 282.408 38.76C283.256 38.76 283.948 39.036 284.484 39.588C285.028 40.14 285.3 40.856 285.3 41.736ZM282.408 39.696C281.872 39.696 281.428 39.856 281.076 40.176C280.732 40.488 280.516 40.916 280.428 41.46H284.268C284.22 40.9 284.028 40.468 283.692 40.164C283.364 39.852 282.936 39.696 282.408 39.696ZM291.463 36.216H292.471V45H291.463V43.884C291.279 44.276 290.983 44.588 290.575 44.82C290.175 45.052 289.719 45.168 289.207 45.168C288.367 45.168 287.675 44.872 287.131 44.28C286.595 43.68 286.327 42.908 286.327 41.964C286.327 41.02 286.595 40.252 287.131 39.66C287.675 39.06 288.367 38.76 289.207 38.76C289.719 38.76 290.175 38.876 290.575 39.108C290.983 39.34 291.279 39.652 291.463 40.044V36.216ZM287.947 43.596C288.331 44.02 288.831 44.232 289.447 44.232C290.063 44.232 290.559 44.02 290.935 43.596C291.319 43.172 291.511 42.628 291.511 41.964C291.511 41.3 291.319 40.756 290.935 40.332C290.559 39.908 290.063 39.696 289.447 39.696C288.831 39.696 288.331 39.908 287.947 40.332C287.571 40.756 287.383 41.3 287.383 41.964C287.383 42.628 287.571 43.172 287.947 43.596ZM298.786 44.508C298.314 44.948 297.682 45.168 296.89 45.168C296.098 45.168 295.462 44.948 294.982 44.508C294.51 44.06 294.274 43.468 294.274 42.732V38.928H295.282V42.672C295.282 43.176 295.422 43.564 295.702 43.836C295.982 44.1 296.378 44.232 296.89 44.232C297.402 44.232 297.798 44.1 298.078 43.836C298.358 43.564 298.498 43.176 298.498 42.672V38.928H299.506V42.732C299.506 43.468 299.266 44.06 298.786 44.508ZM301.302 45V36.216H302.31V45H301.302ZM309.723 41.736C309.723 41.912 309.711 42.092 309.687 42.276H304.827C304.883 42.884 305.099 43.364 305.475 43.716C305.859 44.06 306.347 44.232 306.939 44.232C307.723 44.232 308.367 43.916 308.871 43.284L309.555 43.86C308.939 44.732 308.059 45.168 306.915 45.168C305.995 45.168 305.243 44.872 304.659 44.28C304.083 43.688 303.795 42.92 303.795 41.976C303.795 41.04 304.075 40.272 304.635 39.672C305.203 39.064 305.935 38.76 306.831 38.76C307.679 38.76 308.371 39.036 308.907 39.588C309.451 40.14 309.723 40.856 309.723 41.736ZM306.831 39.696C306.295 39.696 305.851 39.856 305.499 40.176C305.155 40.488 304.939 40.916 304.851 41.46H308.691C308.643 40.9 308.451 40.468 308.115 40.164C307.787 39.852 307.359 39.696 306.831 39.696Z" fill="#9C9A9E" />
                                <line x1="340.8" y1="11.5" x2="381.6" y2="11.5" stroke="#6D09F9" />
                                <rect x="386" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask3_1489_5075" maskUnits="userSpaceOnUse" x="389" y="4" width="17" height="16">
                                    <rect x="389.6" y="4" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask3_1489_5075)">
                                    <path d="M395.966 14.1L401.616 8.45C401.749 8.31667 401.905 8.25 402.082 8.25C402.26 8.25 402.416 8.31667 402.549 8.45C402.682 8.58333 402.749 8.74167 402.749 8.925C402.749 9.10833 402.682 9.26667 402.549 9.4L396.432 15.5333C396.299 15.6667 396.144 15.7333 395.966 15.7333C395.788 15.7333 395.632 15.6667 395.499 15.5333L392.632 12.6667C392.499 12.5333 392.435 12.375 392.441 12.1917C392.446 12.0083 392.516 11.85 392.649 11.7167C392.782 11.5833 392.941 11.5167 393.124 11.5167C393.307 11.5167 393.466 11.5833 393.599 11.7167L395.966 14.1Z" fill="#6D09F9" />
                                </g>
                                <line x1="413.6" y1="11.5" x2="454.4" y2="11.5" stroke="#6D09F9" />
                                <path d="M359.426 45L358.526 42.72H354.494L353.594 45H352.502L355.922 36.6H357.098L360.518 45H359.426ZM354.878 41.76H358.142L356.51 37.644L354.878 41.76ZM368.665 38.76C369.337 38.76 369.849 38.964 370.201 39.372C370.561 39.772 370.741 40.344 370.741 41.088V45H369.733V41.328C369.733 40.76 369.629 40.348 369.421 40.092C369.221 39.828 368.897 39.696 368.449 39.696C367.929 39.696 367.505 39.852 367.177 40.164C366.849 40.468 366.685 40.876 366.685 41.388V45H365.677V41.328C365.677 40.76 365.573 40.348 365.365 40.092C365.165 39.828 364.841 39.696 364.393 39.696C363.873 39.696 363.449 39.852 363.121 40.164C362.793 40.468 362.629 40.876 362.629 41.388V45H361.621V38.928H362.629V39.948C362.797 39.572 363.057 39.28 363.409 39.072C363.761 38.864 364.169 38.76 364.633 38.76C365.593 38.76 366.221 39.18 366.517 40.02C366.677 39.636 366.945 39.332 367.321 39.108C367.705 38.876 368.153 38.76 368.665 38.76ZM375.871 38.76C376.711 38.76 377.399 39.06 377.935 39.66C378.479 40.252 378.751 41.02 378.751 41.964C378.751 42.908 378.479 43.68 377.935 44.28C377.399 44.872 376.711 45.168 375.871 45.168C375.359 45.168 374.899 45.052 374.491 44.82C374.091 44.588 373.799 44.276 373.615 43.884V45H372.607V36.216H373.615V40.044C373.799 39.652 374.091 39.34 374.491 39.108C374.899 38.876 375.359 38.76 375.871 38.76ZM374.131 43.596C374.515 44.02 375.015 44.232 375.631 44.232C376.247 44.232 376.743 44.02 377.119 43.596C377.503 43.172 377.695 42.628 377.695 41.964C377.695 41.3 377.503 40.756 377.119 40.332C376.743 39.908 376.247 39.696 375.631 39.696C375.015 39.696 374.515 39.908 374.131 40.332C373.755 40.756 373.567 41.3 373.567 41.964C373.567 42.628 373.755 43.172 374.131 43.596ZM384.634 44.508C384.162 44.948 383.53 45.168 382.738 45.168C381.946 45.168 381.31 44.948 380.83 44.508C380.358 44.06 380.122 43.468 380.122 42.732V38.928H381.13V42.672C381.13 43.176 381.27 43.564 381.55 43.836C381.83 44.1 382.226 44.232 382.738 44.232C383.25 44.232 383.646 44.1 383.926 43.836C384.206 43.564 384.346 43.176 384.346 42.672V38.928H385.354V42.732C385.354 43.468 385.114 44.06 384.634 44.508ZM387.151 45V36.216H388.159V45H387.151ZM394.779 38.928H395.787V45H394.779V43.884C394.603 44.276 394.311 44.588 393.903 44.82C393.503 45.052 393.047 45.168 392.535 45.168C391.695 45.168 391.003 44.872 390.459 44.28C389.915 43.68 389.643 42.908 389.643 41.964C389.643 41.02 389.915 40.252 390.459 39.66C391.003 39.06 391.695 38.76 392.535 38.76C393.047 38.76 393.503 38.876 393.903 39.108C394.311 39.34 394.603 39.652 394.779 40.044V38.928ZM391.263 43.596C391.647 44.02 392.147 44.232 392.763 44.232C393.379 44.232 393.875 44.02 394.251 43.596C394.635 43.172 394.827 42.628 394.827 41.964C394.827 41.3 394.635 40.756 394.251 40.332C393.875 39.908 393.379 39.696 392.763 39.696C392.147 39.696 391.647 39.908 391.263 40.332C390.887 40.756 390.699 41.3 390.699 41.964C390.699 42.628 390.887 43.172 391.263 43.596ZM400.83 38.76C401.518 38.76 402.05 38.964 402.426 39.372C402.802 39.78 402.99 40.36 402.99 41.112V45H401.982V41.352C401.982 40.776 401.87 40.356 401.646 40.092C401.422 39.828 401.07 39.696 400.59 39.696C400.046 39.696 399.598 39.852 399.246 40.164C398.894 40.468 398.718 40.876 398.718 41.388V45H397.71V38.928H398.718V39.96C398.886 39.576 399.154 39.28 399.522 39.072C399.898 38.864 400.334 38.76 400.83 38.76ZM407.552 45.168C406.624 45.168 405.872 44.868 405.296 44.268C404.72 43.668 404.432 42.9 404.432 41.964C404.432 41.028 404.72 40.26 405.296 39.66C405.872 39.06 406.624 38.76 407.552 38.76C408.704 38.76 409.552 39.2 410.096 40.08L409.304 40.632C408.92 40.008 408.34 39.696 407.564 39.696C406.948 39.696 406.448 39.904 406.064 40.32C405.68 40.736 405.488 41.284 405.488 41.964C405.488 42.644 405.68 43.192 406.064 43.608C406.448 44.024 406.948 44.232 407.564 44.232C408.34 44.232 408.92 43.92 409.304 43.296L410.096 43.848C409.552 44.728 408.704 45.168 407.552 45.168ZM416.835 41.736C416.835 41.912 416.823 42.092 416.799 42.276H411.939C411.995 42.884 412.211 43.364 412.587 43.716C412.971 44.06 413.459 44.232 414.051 44.232C414.835 44.232 415.479 43.916 415.983 43.284L416.667 43.86C416.051 44.732 415.171 45.168 414.027 45.168C413.107 45.168 412.355 44.872 411.771 44.28C411.195 43.688 410.907 42.92 410.907 41.976C410.907 41.04 411.187 40.272 411.747 39.672C412.315 39.064 413.047 38.76 413.943 38.76C414.791 38.76 415.483 39.036 416.019 39.588C416.563 40.14 416.835 40.856 416.835 41.736ZM413.943 39.696C413.407 39.696 412.963 39.856 412.611 40.176C412.267 40.488 412.051 40.916 411.963 41.46H415.803C415.755 40.9 415.563 40.468 415.227 40.164C414.899 39.852 414.471 39.696 413.943 39.696ZM423.688 45.168C422.84 45.168 422.12 44.996 421.528 44.652C420.944 44.308 420.532 43.828 420.292 43.212L421.144 42.72C421.608 43.712 422.46 44.208 423.7 44.208C424.332 44.208 424.828 44.076 425.188 43.812C425.548 43.54 425.728 43.18 425.728 42.732C425.728 42.388 425.608 42.108 425.368 41.892C425.136 41.668 424.76 41.492 424.24 41.364L422.884 41.04C421.324 40.664 420.544 39.916 420.544 38.796C420.544 38.092 420.816 37.524 421.36 37.092C421.912 36.652 422.648 36.432 423.568 36.432C424.312 36.432 424.952 36.576 425.488 36.864C426.032 37.144 426.408 37.512 426.616 37.968L425.788 38.472C425.364 37.752 424.616 37.392 423.544 37.392C422.944 37.392 422.472 37.516 422.128 37.764C421.792 38.004 421.624 38.344 421.624 38.784C421.624 39.12 421.74 39.392 421.972 39.6C422.204 39.808 422.592 39.976 423.136 40.104L424.492 40.428C425.3 40.62 425.888 40.904 426.256 41.28C426.632 41.648 426.82 42.12 426.82 42.696C426.82 43.44 426.54 44.04 425.98 44.496C425.428 44.944 424.664 45.168 423.688 45.168ZM429.241 37.464C429.113 37.592 428.949 37.656 428.749 37.656C428.549 37.656 428.381 37.592 428.245 37.464C428.117 37.328 428.053 37.16 428.053 36.96C428.053 36.76 428.117 36.596 428.245 36.468C428.381 36.332 428.549 36.264 428.749 36.264C428.949 36.264 429.113 36.332 429.241 36.468C429.377 36.596 429.445 36.76 429.445 36.96C429.445 37.16 429.377 37.328 429.241 37.464ZM428.245 45V38.928H429.253V45H428.245ZM431.948 44.112H435.548V45H430.7V44.232L434.252 39.816H430.796V38.928H435.5V39.696L431.948 44.112ZM442.342 41.736C442.342 41.912 442.33 42.092 442.306 42.276H437.446C437.502 42.884 437.718 43.364 438.094 43.716C438.478 44.06 438.966 44.232 439.558 44.232C440.342 44.232 440.986 43.916 441.49 43.284L442.174 43.86C441.558 44.732 440.678 45.168 439.534 45.168C438.614 45.168 437.862 44.872 437.278 44.28C436.702 43.688 436.414 42.92 436.414 41.976C436.414 41.04 436.694 40.272 437.254 39.672C437.822 39.064 438.554 38.76 439.45 38.76C440.298 38.76 440.99 39.036 441.526 39.588C442.07 40.14 442.342 40.856 442.342 41.736ZM439.45 39.696C438.914 39.696 438.47 39.856 438.118 40.176C437.774 40.488 437.558 40.916 437.47 41.46H441.31C441.262 40.9 441.07 40.468 440.734 40.164C440.406 39.852 439.978 39.696 439.45 39.696Z" fill="#9C9A9E" />
                                <line x1="454.4" y1="11.5" x2="495.2" y2="11.5" stroke="#6D09F9" />
                                <rect x="499.6" y="0.4" width="23.2" height="23.2" rx="11.6" fill="#39C574" />
                                <rect x="499.6" y="0.4" width="23.2" height="23.2" rx="11.6" stroke="#39C574" strokeWidth="0.8" />
                                <path d="M511.603 10.124C512.443 10.124 513.115 10.364 513.619 10.844C514.123 11.316 514.375 11.968 514.375 12.8C514.375 13.696 514.079 14.4 513.487 14.912C512.895 15.416 512.095 15.668 511.087 15.668C510.479 15.668 509.923 15.568 509.419 15.368C508.923 15.16 508.463 14.844 508.039 14.42L509.023 13.232C509.631 13.808 510.307 14.096 511.051 14.096C511.539 14.096 511.923 13.984 512.203 13.76C512.483 13.536 512.623 13.228 512.623 12.836C512.623 12.452 512.495 12.148 512.239 11.924C511.983 11.7 511.639 11.588 511.207 11.588C510.703 11.588 510.235 11.744 509.803 12.056L508.519 11.408V7.1H513.847V8.648H510.139V10.46C510.555 10.236 511.043 10.124 511.603 10.124Z" fill="white" />
                                <path d="M475.01 45.168C473.738 45.168 472.702 44.756 471.902 43.932C471.102 43.108 470.702 42.064 470.702 40.8C470.702 39.544 471.102 38.504 471.902 37.68C472.702 36.848 473.738 36.432 475.01 36.432C475.842 36.432 476.586 36.624 477.242 37.008C477.898 37.392 478.398 37.948 478.742 38.676L477.434 39.372C476.938 38.364 476.142 37.86 475.046 37.86C474.23 37.86 473.566 38.136 473.054 38.688C472.55 39.24 472.298 39.944 472.298 40.8C472.298 41.656 472.55 42.36 473.054 42.912C473.566 43.464 474.23 43.74 475.046 43.74C476.15 43.74 476.95 43.236 477.446 42.228L478.742 42.924C478.398 43.652 477.898 44.208 477.242 44.592C476.586 44.976 475.842 45.168 475.01 45.168ZM482.5 45.168C481.548 45.168 480.772 44.86 480.172 44.244C479.58 43.62 479.284 42.856 479.284 41.952C479.284 41.04 479.58 40.276 480.172 39.66C480.764 39.036 481.54 38.724 482.5 38.724C483.46 38.724 484.236 39.036 484.828 39.66C485.42 40.276 485.716 41.04 485.716 41.952C485.716 42.856 485.42 43.62 484.828 44.244C484.236 44.86 483.46 45.168 482.5 45.168ZM481.252 43.32C481.564 43.664 481.98 43.836 482.5 43.836C483.02 43.836 483.436 43.664 483.748 43.32C484.06 42.968 484.216 42.512 484.216 41.952C484.216 41.384 484.06 40.928 483.748 40.584C483.436 40.232 483.02 40.056 482.5 40.056C481.98 40.056 481.564 40.232 481.252 40.584C480.94 40.928 480.784 41.384 480.784 41.952C480.784 42.512 480.94 42.968 481.252 43.32ZM490.36 38.724C491.024 38.724 491.544 38.928 491.92 39.336C492.296 39.736 492.484 40.304 492.484 41.04V45H491.02V41.412C491.02 40.948 490.924 40.608 490.732 40.392C490.548 40.176 490.256 40.068 489.856 40.068C489.408 40.068 489.048 40.196 488.776 40.452C488.512 40.7 488.38 41.048 488.38 41.496V45H486.916V38.892H488.356V39.828C488.524 39.484 488.784 39.216 489.136 39.024C489.488 38.824 489.896 38.724 490.36 38.724ZM494.482 45V40.176H493.306V38.892H494.482V38.1C494.482 36.772 495.19 36.108 496.606 36.108C496.958 36.108 497.29 36.144 497.602 36.216V37.452C497.322 37.404 497.082 37.38 496.882 37.38C496.554 37.38 496.314 37.448 496.162 37.584C496.018 37.712 495.946 37.924 495.946 38.22V38.892H497.59V40.176H495.946V45H494.482ZM499.227 37.872C498.947 37.872 498.719 37.788 498.543 37.62C498.375 37.444 498.291 37.224 498.291 36.96C498.291 36.696 498.375 36.48 498.543 36.312C498.719 36.136 498.947 36.048 499.227 36.048C499.499 36.048 499.719 36.136 499.887 36.312C500.063 36.48 500.151 36.696 500.151 36.96C500.151 37.224 500.063 37.444 499.887 37.62C499.719 37.788 499.499 37.872 499.227 37.872ZM498.495 45V38.892H499.959V45H498.495ZM504.788 38.784C504.98 38.784 505.156 38.812 505.316 38.868V40.236C505.06 40.196 504.836 40.176 504.644 40.176C503.556 40.176 503.012 40.78 503.012 41.988V45H501.548V38.892H502.988V39.912C503.14 39.56 503.372 39.284 503.684 39.084C504.004 38.884 504.372 38.784 504.788 38.784ZM513.584 38.724C514.232 38.724 514.736 38.928 515.096 39.336C515.456 39.736 515.636 40.3 515.636 41.028V45H514.172V41.388C514.172 40.932 514.084 40.6 513.908 40.392C513.74 40.176 513.472 40.068 513.104 40.068C512.68 40.068 512.336 40.196 512.072 40.452C511.816 40.7 511.688 41.044 511.688 41.484V45H510.224V41.388C510.224 40.932 510.136 40.6 509.96 40.392C509.792 40.176 509.524 40.068 509.156 40.068C508.732 40.068 508.392 40.196 508.136 40.452C507.88 40.7 507.752 41.044 507.752 41.484V45H506.288V38.892H507.728V39.816C507.896 39.48 508.152 39.216 508.496 39.024C508.84 38.824 509.228 38.724 509.66 38.724C510.58 38.724 511.192 39.12 511.496 39.912C511.656 39.552 511.92 39.264 512.288 39.048C512.664 38.832 513.096 38.724 513.584 38.724ZM526.837 43.92C526.021 44.752 524.977 45.168 523.705 45.168C522.433 45.168 521.385 44.752 520.561 43.92C519.745 43.08 519.337 42.04 519.337 40.8C519.337 39.56 519.745 38.524 520.561 37.692C521.385 36.852 522.433 36.432 523.705 36.432C524.977 36.432 526.021 36.852 526.837 37.692C527.661 38.524 528.073 39.56 528.073 40.8C528.073 42.04 527.661 43.08 526.837 43.92ZM521.701 42.912C522.213 43.464 522.881 43.74 523.705 43.74C524.529 43.74 525.197 43.464 525.709 42.912C526.221 42.36 526.477 41.656 526.477 40.8C526.477 39.944 526.221 39.24 525.709 38.688C525.197 38.136 524.529 37.86 523.705 37.86C522.881 37.86 522.213 38.136 521.701 38.688C521.189 39.24 520.933 39.944 520.933 40.8C520.933 41.656 521.189 42.36 521.701 42.912ZM532.609 38.784C532.801 38.784 532.977 38.812 533.137 38.868V40.236C532.881 40.196 532.657 40.176 532.465 40.176C531.377 40.176 530.833 40.78 530.833 41.988V45H529.369V38.892H530.809V39.912C530.961 39.56 531.193 39.284 531.505 39.084C531.825 38.884 532.193 38.784 532.609 38.784ZM538.34 36.216H539.804V45H538.364V44.028C538.188 44.388 537.912 44.668 537.536 44.868C537.16 45.068 536.74 45.168 536.276 45.168C535.452 45.168 534.776 44.872 534.248 44.28C533.728 43.68 533.468 42.904 533.468 41.952C533.468 41 533.732 40.224 534.26 39.624C534.788 39.024 535.46 38.724 536.276 38.724C536.732 38.724 537.144 38.824 537.512 39.024C537.88 39.216 538.156 39.484 538.34 39.828V36.216ZM535.436 43.32C535.748 43.664 536.164 43.836 536.684 43.836C537.204 43.836 537.62 43.664 537.932 43.32C538.244 42.968 538.4 42.512 538.4 41.952C538.4 41.384 538.244 40.928 537.932 40.584C537.62 40.232 537.204 40.056 536.684 40.056C536.164 40.056 535.748 40.232 535.436 40.584C535.124 40.928 534.968 41.384 534.968 41.952C534.968 42.512 535.124 42.968 535.436 43.32ZM547.081 41.82C547.081 42.004 547.069 42.192 547.045 42.384H542.497C542.577 42.872 542.769 43.248 543.073 43.512C543.385 43.768 543.793 43.896 544.297 43.896C544.993 43.896 545.561 43.64 546.001 43.128L546.877 43.992C546.269 44.776 545.393 45.168 544.249 45.168C543.273 45.168 542.489 44.876 541.897 44.292C541.305 43.708 541.009 42.936 541.009 41.976C541.009 41.024 541.293 40.244 541.861 39.636C542.437 39.028 543.185 38.724 544.105 38.724C544.993 38.724 545.709 39.008 546.253 39.576C546.805 40.144 547.081 40.892 547.081 41.82ZM544.117 39.996C543.669 39.996 543.305 40.12 543.025 40.368C542.753 40.608 542.577 40.948 542.497 41.388H545.617C545.585 40.94 545.437 40.596 545.173 40.356C544.909 40.116 544.557 39.996 544.117 39.996ZM551.494 38.784C551.686 38.784 551.862 38.812 552.022 38.868V40.236C551.766 40.196 551.542 40.176 551.35 40.176C550.262 40.176 549.718 40.78 549.718 41.988V45H548.254V38.892H549.694V39.912C549.846 39.56 550.078 39.284 550.39 39.084C550.71 38.884 551.078 38.784 551.494 38.784Z" fill="#1F1D21" />
                            </svg>
                        </div>

                        <div className="md:hidden max-[410px]:hidden">
                            <svg width="396" height="49" viewBox="0 0 396 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="27.9996" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask0_1535_7222" maskUnits="userSpaceOnUse" x="31" y="4" width="17" height="17">
                                    <rect x="31.5996" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_1535_7222)">
                                    <path d="M37.9658 14.8888L43.6158 9.23882C43.7491 9.10549 43.9047 9.03882 44.0824 9.03882C44.2602 9.03882 44.4158 9.10549 44.5491 9.23882C44.6824 9.37215 44.7491 9.53049 44.7491 9.71382C44.7491 9.89715 44.6824 10.0555 44.5491 10.1888L38.4324 16.3222C38.2991 16.4555 38.1435 16.5222 37.9658 16.5222C37.788 16.5222 37.6324 16.4555 37.4991 16.3222L34.6324 13.4555C34.4991 13.3222 34.4352 13.1638 34.4408 12.9805C34.4463 12.7972 34.5158 12.6388 34.6491 12.5055C34.7824 12.3722 34.9408 12.3055 35.1241 12.3055C35.3074 12.3055 35.4658 12.3722 35.5991 12.5055L37.9658 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="55.5996" y1="12.2888" x2="79.1996" y2="12.2888" stroke="#6D09F9" />
                                <path d="M15.8111 43.7888L15.0611 41.8888H11.7011L10.9511 43.7888H10.0411L12.8911 36.7888H13.8711L16.7211 43.7888H15.8111ZM12.0211 41.0888H14.7411L13.3811 37.6588L12.0211 41.0888ZM20.3602 38.5888C21.0602 38.5888 21.6336 38.8388 22.0802 39.3388C22.5336 39.8322 22.7602 40.4722 22.7602 41.2588C22.7602 42.0455 22.5336 42.6888 22.0802 43.1888C21.6336 43.6822 21.0602 43.9288 20.3602 43.9288C19.9336 43.9288 19.5502 43.8322 19.2102 43.6388C18.8769 43.4455 18.6336 43.1855 18.4802 42.8588V43.7888H17.6402V36.4688H18.4802V39.6588C18.6336 39.3322 18.8769 39.0722 19.2102 38.8788C19.5502 38.6855 19.9336 38.5888 20.3602 38.5888ZM18.9102 42.6188C19.2302 42.9722 19.6469 43.1488 20.1602 43.1488C20.6736 43.1488 21.0869 42.9722 21.4002 42.6188C21.7202 42.2655 21.8802 41.8122 21.8802 41.2588C21.8802 40.7055 21.7202 40.2522 21.4002 39.8988C21.0869 39.5455 20.6736 39.3688 20.1602 39.3688C19.6469 39.3688 19.2302 39.5455 18.9102 39.8988C18.5969 40.2522 18.4402 40.7055 18.4402 41.2588C18.4402 41.8122 18.5969 42.2655 18.9102 42.6188ZM28.1127 43.1488C27.6327 43.6688 27.0094 43.9288 26.2427 43.9288C25.4761 43.9288 24.8494 43.6688 24.3627 43.1488C23.8827 42.6288 23.6427 41.9988 23.6427 41.2588C23.6427 40.5188 23.8827 39.8888 24.3627 39.3688C24.8494 38.8488 25.4761 38.5888 26.2427 38.5888C27.0094 38.5888 27.6327 38.8488 28.1127 39.3688C28.5994 39.8888 28.8427 40.5188 28.8427 41.2588C28.8427 41.9988 28.5994 42.6288 28.1127 43.1488ZM24.9927 42.6188C25.3127 42.9722 25.7294 43.1488 26.2427 43.1488C26.7561 43.1488 27.1694 42.9722 27.4827 42.6188C27.8027 42.2655 27.9627 41.8122 27.9627 41.2588C27.9627 40.7055 27.8027 40.2522 27.4827 39.8988C27.1694 39.5455 26.7561 39.3688 26.2427 39.3688C25.7294 39.3688 25.3127 39.5455 24.9927 39.8988C24.6794 40.2522 24.5227 40.7055 24.5227 41.2588C24.5227 41.8122 24.6794 42.2655 24.9927 42.6188ZM33.742 43.3788C33.3487 43.7455 32.822 43.9288 32.162 43.9288C31.502 43.9288 30.972 43.7455 30.572 43.3788C30.1787 43.0055 29.982 42.5122 29.982 41.8988V38.7288H30.822V41.8488C30.822 42.2688 30.9387 42.5922 31.172 42.8188C31.4054 43.0388 31.7354 43.1488 32.162 43.1488C32.5887 43.1488 32.9187 43.0388 33.152 42.8188C33.3854 42.5922 33.502 42.2688 33.502 41.8488V38.7288H34.342V41.8988C34.342 42.5122 34.142 43.0055 33.742 43.3788ZM37.7491 43.8688C37.2491 43.8688 36.8657 43.7522 36.5991 43.5188C36.3391 43.2855 36.2091 42.9422 36.2091 42.4888V39.4488H35.1991V38.7288H36.2091V37.2288H37.0491V38.7288H38.6391V39.4488H37.0491V42.4288C37.0491 42.6755 37.1124 42.8555 37.2391 42.9688C37.3724 43.0755 37.5824 43.1288 37.8691 43.1288C38.1024 43.1288 38.3657 43.0988 38.6591 43.0388V43.7388C38.3724 43.8255 38.0691 43.8688 37.7491 43.8688ZM45.1153 43.9288C44.082 43.9288 43.2353 43.5822 42.5753 42.8888C41.9153 42.1955 41.5853 41.3288 41.5853 40.2888C41.5853 39.2488 41.9186 38.3822 42.5853 37.6888C43.252 36.9955 44.0953 36.6488 45.1153 36.6488C45.7753 36.6488 46.3753 36.8022 46.9153 37.1088C47.4553 37.4155 47.872 37.8622 48.1653 38.4488L47.4353 38.8688C46.9486 37.9355 46.1953 37.4688 45.1753 37.4688C44.382 37.4688 43.7386 37.7322 43.2453 38.2588C42.752 38.7855 42.5053 39.4622 42.5053 40.2888C42.5053 41.1155 42.752 41.7922 43.2453 42.3188C43.7386 42.8455 44.382 43.1088 45.1753 43.1088C46.2086 43.1088 46.9686 42.6422 47.4553 41.7088L48.1653 42.1288C47.872 42.7155 47.4553 43.1622 46.9153 43.4688C46.3753 43.7755 45.7753 43.9288 45.1153 43.9288ZM53.1239 38.7288H53.9639V43.7888H53.1239V42.8588C52.9772 43.1855 52.7339 43.4455 52.3939 43.6388C52.0606 43.8322 51.6806 43.9288 51.2539 43.9288C50.5539 43.9288 49.9772 43.6822 49.5239 43.1888C49.0706 42.6888 48.8439 42.0455 48.8439 41.2588C48.8439 40.4722 49.0706 39.8322 49.5239 39.3388C49.9772 38.8388 50.5539 38.5888 51.2539 38.5888C51.6806 38.5888 52.0606 38.6855 52.3939 38.8788C52.7339 39.0722 52.9772 39.3322 53.1239 39.6588V38.7288ZM50.1939 42.6188C50.5139 42.9722 50.9306 43.1488 51.4439 43.1488C51.9572 43.1488 52.3706 42.9722 52.6839 42.6188C53.0039 42.2655 53.1639 41.8122 53.1639 41.2588C53.1639 40.7055 53.0039 40.2522 52.6839 39.8988C52.3706 39.5455 51.9572 39.3688 51.4439 39.3688C50.9306 39.3688 50.5139 39.5455 50.1939 39.8988C49.8806 40.2522 49.7239 40.7055 49.7239 41.2588C49.7239 41.8122 49.8806 42.2655 50.1939 42.6188ZM55.5664 43.7888V36.4688H56.4064V43.7888H55.5664ZM58.0031 43.7888V36.4688H58.8431V43.7888H58.0031ZM65.0198 41.0688C65.0198 41.2155 65.0098 41.3655 64.9898 41.5188H60.9398C60.9865 42.0255 61.1665 42.4255 61.4798 42.7188C61.7998 43.0055 62.2065 43.1488 62.6998 43.1488C63.3532 43.1488 63.8898 42.8855 64.3098 42.3588L64.8798 42.8388C64.3665 43.5655 63.6332 43.9288 62.6798 43.9288C61.9132 43.9288 61.2865 43.6822 60.7998 43.1888C60.3198 42.6955 60.0798 42.0555 60.0798 41.2688C60.0798 40.4888 60.3132 39.8488 60.7798 39.3488C61.2532 38.8422 61.8632 38.5888 62.6098 38.5888C63.3165 38.5888 63.8932 38.8188 64.3398 39.2788C64.7932 39.7388 65.0198 40.3355 65.0198 41.0688ZM62.6098 39.3688C62.1632 39.3688 61.7932 39.5022 61.4998 39.7688C61.2132 40.0288 61.0332 40.3855 60.9598 40.8388H64.1598C64.1198 40.3722 63.9598 40.0122 63.6798 39.7588C63.4065 39.4988 63.0498 39.3688 62.6098 39.3688ZM68.6159 38.6488C68.7893 38.6488 68.9426 38.6722 69.0759 38.7188V39.4588C68.9293 39.4388 68.7826 39.4288 68.6359 39.4288C68.1426 39.4288 67.7593 39.5755 67.4859 39.8688C67.2126 40.1622 67.0759 40.6055 67.0759 41.1988V43.7888H66.2359V38.7288H67.0759V39.6788C67.1893 39.3522 67.3793 39.0988 67.6459 38.9188C67.9193 38.7388 68.2426 38.6488 68.6159 38.6488Z" fill="#9C9A9E" />
                                <line x1="79.2002" y1="12.2888" x2="102.8" y2="12.2888" stroke="#6D09F9" />
                                <rect x="107.2" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask1_1535_7222" maskUnits="userSpaceOnUse" x="110" y="4" width="17" height="17">
                                    <rect x="110.8" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask1_1535_7222)">
                                    <path d="M117.166 14.8888L122.816 9.23882C122.949 9.10549 123.105 9.03882 123.283 9.03882C123.46 9.03882 123.616 9.10549 123.749 9.23882C123.883 9.37215 123.949 9.53049 123.949 9.71382C123.949 9.89715 123.883 10.0555 123.749 10.1888L117.633 16.3222C117.499 16.4555 117.344 16.5222 117.166 16.5222C116.988 16.5222 116.833 16.4555 116.699 16.3222L113.833 13.4555C113.699 13.3222 113.635 13.1638 113.641 12.9805C113.647 12.7972 113.716 12.6388 113.849 12.5055C113.983 12.3722 114.141 12.3055 114.324 12.3055C114.508 12.3055 114.666 12.3722 114.799 12.5055L117.166 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="134.8" y1="12.2888" x2="158.4" y2="12.2888" stroke="#6D09F9" />
                                <path d="M95.5949 43.7888L94.8449 41.8888H91.4849L90.7349 43.7888H89.8249L92.6749 36.7888H93.6549L96.5049 43.7888H95.5949ZM91.8049 41.0888H94.5249L93.1649 37.6588L91.8049 41.0888ZM100.144 38.5888C100.844 38.5888 101.417 38.8388 101.864 39.3388C102.317 39.8322 102.544 40.4722 102.544 41.2588C102.544 42.0455 102.317 42.6888 101.864 43.1888C101.417 43.6822 100.844 43.9288 100.144 43.9288C99.7174 43.9288 99.334 43.8322 98.994 43.6388C98.6607 43.4455 98.4174 43.1855 98.264 42.8588V43.7888H97.424V36.4688H98.264V39.6588C98.4174 39.3322 98.6607 39.0722 98.994 38.8788C99.334 38.6855 99.7174 38.5888 100.144 38.5888ZM98.694 42.6188C99.014 42.9722 99.4307 43.1488 99.944 43.1488C100.457 43.1488 100.871 42.9722 101.184 42.6188C101.504 42.2655 101.664 41.8122 101.664 41.2588C101.664 40.7055 101.504 40.2522 101.184 39.8988C100.871 39.5455 100.457 39.3688 99.944 39.3688C99.4307 39.3688 99.014 39.5455 98.694 39.8988C98.3807 40.2522 98.224 40.7055 98.224 41.2588C98.224 41.8122 98.3807 42.2655 98.694 42.6188ZM107.897 43.1488C107.417 43.6688 106.793 43.9288 106.027 43.9288C105.26 43.9288 104.633 43.6688 104.147 43.1488C103.667 42.6288 103.427 41.9988 103.427 41.2588C103.427 40.5188 103.667 39.8888 104.147 39.3688C104.633 38.8488 105.26 38.5888 106.027 38.5888C106.793 38.5888 107.417 38.8488 107.897 39.3688C108.383 39.8888 108.627 40.5188 108.627 41.2588C108.627 41.9988 108.383 42.6288 107.897 43.1488ZM104.777 42.6188C105.097 42.9722 105.513 43.1488 106.027 43.1488C106.54 43.1488 106.953 42.9722 107.267 42.6188C107.587 42.2655 107.747 41.8122 107.747 41.2588C107.747 40.7055 107.587 40.2522 107.267 39.8988C106.953 39.5455 106.54 39.3688 106.027 39.3688C105.513 39.3688 105.097 39.5455 104.777 39.8988C104.463 40.2522 104.307 40.7055 104.307 41.2588C104.307 41.8122 104.463 42.2655 104.777 42.6188ZM113.526 43.3788C113.132 43.7455 112.606 43.9288 111.946 43.9288C111.286 43.9288 110.756 43.7455 110.356 43.3788C109.962 43.0055 109.766 42.5122 109.766 41.8988V38.7288H110.606V41.8488C110.606 42.2688 110.722 42.5922 110.956 42.8188C111.189 43.0388 111.519 43.1488 111.946 43.1488C112.372 43.1488 112.702 43.0388 112.936 42.8188C113.169 42.5922 113.286 42.2688 113.286 41.8488V38.7288H114.126V41.8988C114.126 42.5122 113.926 43.0055 113.526 43.3788ZM117.533 43.8688C117.033 43.8688 116.65 43.7522 116.383 43.5188C116.123 43.2855 115.993 42.9422 115.993 42.4888V39.4488H114.983V38.7288H115.993V37.2288H116.833V38.7288H118.423V39.4488H116.833V42.4288C116.833 42.6755 116.896 42.8555 117.023 42.9688C117.156 43.0755 117.366 43.1288 117.653 43.1288C117.886 43.1288 118.15 43.0988 118.443 43.0388V43.7388C118.156 43.8255 117.853 43.8688 117.533 43.8688ZM122.649 42.9788H126.659V43.7888H121.769V36.7888H126.559V37.5988H122.649V39.8588H126.359V40.6588H122.649V42.9788ZM131.46 38.7288H132.36L130.3 43.7888H129.4L127.34 38.7288H128.24L129.85 42.8688L131.46 38.7288ZM137.674 41.0688C137.674 41.2155 137.664 41.3655 137.644 41.5188H133.594C133.641 42.0255 133.821 42.4255 134.134 42.7188C134.454 43.0055 134.861 43.1488 135.354 43.1488C136.008 43.1488 136.544 42.8855 136.964 42.3588L137.534 42.8388C137.021 43.5655 136.288 43.9288 135.334 43.9288C134.568 43.9288 133.941 43.6822 133.454 43.1888C132.974 42.6955 132.734 42.0555 132.734 41.2688C132.734 40.4888 132.968 39.8488 133.434 39.3488C133.908 38.8422 134.518 38.5888 135.264 38.5888C135.971 38.5888 136.548 38.8188 136.994 39.2788C137.448 39.7388 137.674 40.3355 137.674 41.0688ZM135.264 39.3688C134.818 39.3688 134.448 39.5022 134.154 39.7688C133.868 40.0288 133.688 40.3855 133.614 40.8388H136.814C136.774 40.3722 136.614 40.0122 136.334 39.7588C136.061 39.4988 135.704 39.3688 135.264 39.3688ZM141.49 38.5888C142.064 38.5888 142.507 38.7588 142.82 39.0988C143.134 39.4388 143.29 39.9222 143.29 40.5488V43.7888H142.45V40.7488C142.45 40.2688 142.357 39.9188 142.17 39.6988C141.984 39.4788 141.69 39.3688 141.29 39.3688C140.837 39.3688 140.464 39.4988 140.17 39.7588C139.877 40.0122 139.73 40.3522 139.73 40.7788V43.7888H138.89V38.7288H139.73V39.5888C139.87 39.2688 140.094 39.0222 140.4 38.8488C140.714 38.6755 141.077 38.5888 141.49 38.5888ZM146.704 43.8688C146.204 43.8688 145.821 43.7522 145.554 43.5188C145.294 43.2855 145.164 42.9422 145.164 42.4888V39.4488H144.154V38.7288H145.164V37.2288H146.004V38.7288H147.594V39.4488H146.004V42.4288C146.004 42.6755 146.067 42.8555 146.194 42.9688C146.327 43.0755 146.537 43.1288 146.824 43.1288C147.057 43.1288 147.321 43.0988 147.614 43.0388V43.7388C147.327 43.8255 147.024 43.8688 146.704 43.8688Z" fill="#9C9A9E" />
                                <line x1="158.4" y1="12.2888" x2="182" y2="12.2888" stroke="#6D09F9" />
                                <rect x="186.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask2_1535_7222" maskUnits="userSpaceOnUse" x="190" y="4" width="16" height="17">
                                    <rect x="190" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask2_1535_7222)">
                                    <path d="M196.366 14.8888L202.016 9.23882C202.149 9.10549 202.305 9.03882 202.483 9.03882C202.661 9.03882 202.816 9.10549 202.949 9.23882C203.083 9.37215 203.149 9.53049 203.149 9.71382C203.149 9.89715 203.083 10.0555 202.949 10.1888L196.833 16.3222C196.699 16.4555 196.544 16.5222 196.366 16.5222C196.188 16.5222 196.033 16.4555 195.899 16.3222L193.033 13.4555C192.899 13.3222 192.836 13.1638 192.841 12.9805C192.847 12.7972 192.916 12.6388 193.049 12.5055C193.183 12.3722 193.341 12.3055 193.524 12.3055C193.708 12.3055 193.866 12.3722 193.999 12.5055L196.366 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="214" y1="12.2888" x2="237.6" y2="12.2888" stroke="#6D09F9" />
                                <path d="M179.339 43.9288C178.632 43.9288 178.032 43.7855 177.539 43.4988C177.052 43.2122 176.709 42.8122 176.509 42.2988L177.219 41.8888C177.606 42.7155 178.316 43.1288 179.349 43.1288C179.876 43.1288 180.289 43.0188 180.589 42.7988C180.889 42.5722 181.039 42.2722 181.039 41.8988C181.039 41.6122 180.939 41.3788 180.739 41.1988C180.546 41.0122 180.232 40.8655 179.799 40.7588L178.669 40.4888C177.369 40.1755 176.719 39.5522 176.719 38.6188C176.719 38.0322 176.946 37.5588 177.399 37.1988C177.859 36.8322 178.472 36.6488 179.239 36.6488C179.859 36.6488 180.392 36.7688 180.839 37.0088C181.292 37.2422 181.606 37.5488 181.779 37.9288L181.089 38.3488C180.736 37.7488 180.112 37.4488 179.219 37.4488C178.719 37.4488 178.326 37.5522 178.039 37.7588C177.759 37.9588 177.619 38.2422 177.619 38.6088C177.619 38.8888 177.716 39.1155 177.909 39.2888C178.102 39.4622 178.426 39.6022 178.879 39.7088L180.009 39.9788C180.682 40.1388 181.172 40.3755 181.479 40.6888C181.792 40.9955 181.949 41.3888 181.949 41.8688C181.949 42.4888 181.716 42.9888 181.249 43.3688C180.789 43.7422 180.152 43.9288 179.339 43.9288ZM185.366 43.9288C184.593 43.9288 183.966 43.6788 183.486 43.1788C183.006 42.6788 182.766 42.0388 182.766 41.2588C182.766 40.4788 183.006 39.8388 183.486 39.3388C183.966 38.8388 184.593 38.5888 185.366 38.5888C186.326 38.5888 187.033 38.9555 187.486 39.6888L186.826 40.1488C186.506 39.6288 186.023 39.3688 185.376 39.3688C184.863 39.3688 184.446 39.5422 184.126 39.8888C183.806 40.2355 183.646 40.6922 183.646 41.2588C183.646 41.8255 183.806 42.2822 184.126 42.6288C184.446 42.9755 184.863 43.1488 185.376 43.1488C186.023 43.1488 186.506 42.8888 186.826 42.3688L187.486 42.8288C187.033 43.5622 186.326 43.9288 185.366 43.9288ZM191.141 38.5888C191.715 38.5888 192.158 38.7588 192.471 39.0988C192.785 39.4388 192.941 39.9222 192.941 40.5488V43.7888H192.101V40.7488C192.101 40.2688 192.008 39.9188 191.821 39.6988C191.635 39.4788 191.341 39.3688 190.941 39.3688C190.488 39.3688 190.115 39.4988 189.821 39.7588C189.528 40.0122 189.381 40.3522 189.381 40.7788V43.7888H188.541V36.4688H189.381V39.5888C189.521 39.2688 189.745 39.0222 190.051 38.8488C190.365 38.6755 190.728 38.5888 191.141 38.5888ZM199.083 41.0688C199.083 41.2155 199.073 41.3655 199.053 41.5188H195.003C195.05 42.0255 195.23 42.4255 195.543 42.7188C195.863 43.0055 196.27 43.1488 196.763 43.1488C197.417 43.1488 197.953 42.8855 198.373 42.3588L198.943 42.8388C198.43 43.5655 197.697 43.9288 196.743 43.9288C195.977 43.9288 195.35 43.6822 194.863 43.1888C194.383 42.6955 194.143 42.0555 194.143 41.2688C194.143 40.4888 194.377 39.8488 194.843 39.3488C195.317 38.8422 195.927 38.5888 196.673 38.5888C197.38 38.5888 197.957 38.8188 198.403 39.2788C198.857 39.7388 199.083 40.3355 199.083 41.0688ZM196.673 39.3688C196.227 39.3688 195.857 39.5022 195.563 39.7688C195.277 40.0288 195.097 40.3855 195.023 40.8388H198.223C198.183 40.3722 198.023 40.0122 197.743 39.7588C197.47 39.4988 197.113 39.3688 196.673 39.3688ZM204.219 36.4688H205.059V43.7888H204.219V42.8588C204.066 43.1855 203.819 43.4455 203.479 43.6388C203.146 43.8322 202.766 43.9288 202.339 43.9288C201.639 43.9288 201.063 43.6822 200.609 43.1888C200.163 42.6888 199.939 42.0455 199.939 41.2588C199.939 40.4722 200.163 39.8322 200.609 39.3388C201.063 38.8388 201.639 38.5888 202.339 38.5888C202.766 38.5888 203.146 38.6855 203.479 38.8788C203.819 39.0722 204.066 39.3322 204.219 39.6588V36.4688ZM201.289 42.6188C201.609 42.9722 202.026 43.1488 202.539 43.1488C203.053 43.1488 203.466 42.9722 203.779 42.6188C204.099 42.2655 204.259 41.8122 204.259 41.2588C204.259 40.7055 204.099 40.2522 203.779 39.8988C203.466 39.5455 203.053 39.3688 202.539 39.3688C202.026 39.3688 201.609 39.5455 201.289 39.8988C200.976 40.2522 200.819 40.7055 200.819 41.2588C200.819 41.8122 200.976 42.2655 201.289 42.6188ZM210.322 43.3788C209.929 43.7455 209.402 43.9288 208.742 43.9288C208.082 43.9288 207.552 43.7455 207.152 43.3788C206.759 43.0055 206.562 42.5122 206.562 41.8988V38.7288H207.402V41.8488C207.402 42.2688 207.519 42.5922 207.752 42.8188C207.985 43.0388 208.315 43.1488 208.742 43.1488C209.169 43.1488 209.499 43.0388 209.732 42.8188C209.965 42.5922 210.082 42.2688 210.082 41.8488V38.7288H210.922V41.8988C210.922 42.5122 210.722 43.0055 210.322 43.3788ZM212.419 43.7888V36.4688H213.259V43.7888H212.419ZM219.436 41.0688C219.436 41.2155 219.426 41.3655 219.406 41.5188H215.356C215.402 42.0255 215.582 42.4255 215.896 42.7188C216.216 43.0055 216.622 43.1488 217.116 43.1488C217.769 43.1488 218.306 42.8855 218.726 42.3588L219.296 42.8388C218.782 43.5655 218.049 43.9288 217.096 43.9288C216.329 43.9288 215.702 43.6822 215.216 43.1888C214.736 42.6955 214.496 42.0555 214.496 41.2688C214.496 40.4888 214.729 39.8488 215.196 39.3488C215.669 38.8422 216.279 38.5888 217.026 38.5888C217.732 38.5888 218.309 38.8188 218.756 39.2788C219.209 39.7388 219.436 40.3355 219.436 41.0688ZM217.026 39.3688C216.579 39.3688 216.209 39.5022 215.916 39.7688C215.629 40.0288 215.449 40.3855 215.376 40.8388H218.576C218.536 40.3722 218.376 40.0122 218.096 39.7588C217.822 39.4988 217.466 39.3688 217.026 39.3688Z" fill="#9C9A9E" />
                                <line x1="237.6" y1="12.2888" x2="261.2" y2="12.2888" stroke="#6D09F9" />
                                <rect x="265.599" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask3_1535_7222" maskUnits="userSpaceOnUse" x="269" y="4" width="17" height="17">
                                    <rect x="269.199" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask3_1535_7222)">
                                    <path d="M275.565 14.8888L281.215 9.23882C281.349 9.10549 281.504 9.03882 281.682 9.03882C281.86 9.03882 282.015 9.10549 282.149 9.23882C282.282 9.37215 282.349 9.53049 282.349 9.71382C282.349 9.89715 282.282 10.0555 282.149 10.1888L276.032 16.3222C275.899 16.4555 275.743 16.5222 275.565 16.5222C275.388 16.5222 275.232 16.4555 275.099 16.3222L272.232 13.4555C272.099 13.3222 272.035 13.1638 272.04 12.9805C272.046 12.7972 272.115 12.6388 272.249 12.5055C272.382 12.3722 272.54 12.3055 272.724 12.3055C272.907 12.3055 273.065 12.3722 273.199 12.5055L275.565 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="293.199" y1="12.2888" x2="316.799" y2="12.2888" stroke="#6D09F9" />
                                <path d="M245.388 43.7888L244.638 41.8888H241.278L240.528 43.7888H239.618L242.468 36.7888H243.448L246.298 43.7888H245.388ZM241.598 41.0888H244.318L242.958 37.6588L241.598 41.0888ZM253.087 38.5888C253.647 38.5888 254.074 38.7588 254.367 39.0988C254.667 39.4322 254.817 39.9088 254.817 40.5288V43.7888H253.977V40.7288C253.977 40.2555 253.891 39.9122 253.717 39.6988C253.551 39.4788 253.281 39.3688 252.907 39.3688C252.474 39.3688 252.121 39.4988 251.847 39.7588C251.574 40.0122 251.437 40.3522 251.437 40.7788V43.7888H250.597V40.7288C250.597 40.2555 250.511 39.9122 250.337 39.6988C250.171 39.4788 249.901 39.3688 249.527 39.3688C249.094 39.3688 248.741 39.4988 248.467 39.7588C248.194 40.0122 248.057 40.3522 248.057 40.7788V43.7888H247.217V38.7288H248.057V39.5788C248.197 39.2655 248.414 39.0222 248.707 38.8488C249.001 38.6755 249.341 38.5888 249.727 38.5888C250.527 38.5888 251.051 38.9388 251.297 39.6388C251.431 39.3188 251.654 39.0655 251.967 38.8788C252.287 38.6855 252.661 38.5888 253.087 38.5888ZM259.093 38.5888C259.793 38.5888 260.366 38.8388 260.813 39.3388C261.266 39.8322 261.493 40.4722 261.493 41.2588C261.493 42.0455 261.266 42.6888 260.813 43.1888C260.366 43.6822 259.793 43.9288 259.093 43.9288C258.666 43.9288 258.283 43.8322 257.943 43.6388C257.609 43.4455 257.366 43.1855 257.213 42.8588V43.7888H256.373V36.4688H257.213V39.6588C257.366 39.3322 257.609 39.0722 257.943 38.8788C258.283 38.6855 258.666 38.5888 259.093 38.5888ZM257.643 42.6188C257.963 42.9722 258.379 43.1488 258.893 43.1488C259.406 43.1488 259.819 42.9722 260.133 42.6188C260.453 42.2655 260.613 41.8122 260.613 41.2588C260.613 40.7055 260.453 40.2522 260.133 39.8988C259.819 39.5455 259.406 39.3688 258.893 39.3688C258.379 39.3688 257.963 39.5455 257.643 39.8988C257.329 40.2522 257.173 40.7055 257.173 41.2588C257.173 41.8122 257.329 42.2655 257.643 42.6188ZM266.395 43.3788C266.002 43.7455 265.475 43.9288 264.815 43.9288C264.155 43.9288 263.625 43.7455 263.225 43.3788C262.832 43.0055 262.635 42.5122 262.635 41.8988V38.7288H263.475V41.8488C263.475 42.2688 263.592 42.5922 263.825 42.8188C264.058 43.0388 264.388 43.1488 264.815 43.1488C265.242 43.1488 265.572 43.0388 265.805 42.8188C266.038 42.5922 266.155 42.2688 266.155 41.8488V38.7288H266.995V41.8988C266.995 42.5122 266.795 43.0055 266.395 43.3788ZM268.492 43.7888V36.4688H269.332V43.7888H268.492ZM274.849 38.7288H275.689V43.7888H274.849V42.8588C274.702 43.1855 274.459 43.4455 274.119 43.6388C273.786 43.8322 273.406 43.9288 272.979 43.9288C272.279 43.9288 271.702 43.6822 271.249 43.1888C270.796 42.6888 270.569 42.0455 270.569 41.2588C270.569 40.4722 270.796 39.8322 271.249 39.3388C271.702 38.8388 272.279 38.5888 272.979 38.5888C273.406 38.5888 273.786 38.6855 274.119 38.8788C274.459 39.0722 274.702 39.3322 274.849 39.6588V38.7288ZM271.919 42.6188C272.239 42.9722 272.656 43.1488 273.169 43.1488C273.682 43.1488 274.096 42.9722 274.409 42.6188C274.729 42.2655 274.889 41.8122 274.889 41.2588C274.889 40.7055 274.729 40.2522 274.409 39.8988C274.096 39.5455 273.682 39.3688 273.169 39.3688C272.656 39.3688 272.239 39.5455 271.919 39.8988C271.606 40.2522 271.449 40.7055 271.449 41.2588C271.449 41.8122 271.606 42.2655 271.919 42.6188ZM279.891 38.5888C280.465 38.5888 280.908 38.7588 281.221 39.0988C281.535 39.4388 281.691 39.9222 281.691 40.5488V43.7888H280.851V40.7488C280.851 40.2688 280.758 39.9188 280.571 39.6988C280.385 39.4788 280.091 39.3688 279.691 39.3688C279.238 39.3688 278.865 39.4988 278.571 39.7588C278.278 40.0122 278.131 40.3522 278.131 40.7788V43.7888H277.291V38.7288H278.131V39.5888C278.271 39.2688 278.495 39.0222 278.801 38.8488C279.115 38.6755 279.478 38.5888 279.891 38.5888ZM285.494 43.9288C284.72 43.9288 284.094 43.6788 283.614 43.1788C283.134 42.6788 282.894 42.0388 282.894 41.2588C282.894 40.4788 283.134 39.8388 283.614 39.3388C284.094 38.8388 284.72 38.5888 285.494 38.5888C286.454 38.5888 287.16 38.9555 287.614 39.6888L286.954 40.1488C286.634 39.6288 286.15 39.3688 285.504 39.3688C284.99 39.3688 284.574 39.5422 284.254 39.8888C283.934 40.2355 283.774 40.6922 283.774 41.2588C283.774 41.8255 283.934 42.2822 284.254 42.6288C284.574 42.9755 284.99 43.1488 285.504 43.1488C286.15 43.1488 286.634 42.8888 286.954 42.3688L287.614 42.8288C287.16 43.5622 286.454 43.9288 285.494 43.9288ZM293.229 41.0688C293.229 41.2155 293.219 41.3655 293.199 41.5188H289.149C289.196 42.0255 289.376 42.4255 289.689 42.7188C290.009 43.0055 290.416 43.1488 290.909 43.1488C291.563 43.1488 292.099 42.8855 292.519 42.3588L293.089 42.8388C292.576 43.5655 291.843 43.9288 290.889 43.9288C290.123 43.9288 289.496 43.6822 289.009 43.1888C288.529 42.6955 288.289 42.0555 288.289 41.2688C288.289 40.4888 288.523 39.8488 288.989 39.3488C289.463 38.8422 290.073 38.5888 290.819 38.5888C291.526 38.5888 292.103 38.8188 292.549 39.2788C293.003 39.7388 293.229 40.3355 293.229 41.0688ZM290.819 39.3688C290.373 39.3688 290.003 39.5022 289.709 39.7688C289.423 40.0288 289.243 40.3855 289.169 40.8388H292.369C292.329 40.3722 292.169 40.0122 291.889 39.7588C291.616 39.4988 291.259 39.3688 290.819 39.3688ZM298.94 43.9288C298.233 43.9288 297.633 43.7855 297.14 43.4988C296.653 43.2122 296.31 42.8122 296.11 42.2988L296.82 41.8888C297.207 42.7155 297.917 43.1288 298.95 43.1288C299.477 43.1288 299.89 43.0188 300.19 42.7988C300.49 42.5722 300.64 42.2722 300.64 41.8988C300.64 41.6122 300.54 41.3788 300.34 41.1988C300.147 41.0122 299.833 40.8655 299.4 40.7588L298.27 40.4888C296.97 40.1755 296.32 39.5522 296.32 38.6188C296.32 38.0322 296.547 37.5588 297 37.1988C297.46 36.8322 298.073 36.6488 298.84 36.6488C299.46 36.6488 299.993 36.7688 300.44 37.0088C300.893 37.2422 301.207 37.5488 301.38 37.9288L300.69 38.3488C300.337 37.7488 299.713 37.4488 298.82 37.4488C298.32 37.4488 297.927 37.5522 297.64 37.7588C297.36 37.9588 297.22 38.2422 297.22 38.6088C297.22 38.8888 297.317 39.1155 297.51 39.2888C297.703 39.4622 298.027 39.6022 298.48 39.7088L299.61 39.9788C300.283 40.1388 300.773 40.3755 301.08 40.6888C301.393 40.9955 301.55 41.3888 301.55 41.8688C301.55 42.4888 301.317 42.9888 300.85 43.3688C300.39 43.7422 299.753 43.9288 298.94 43.9288ZM303.567 37.5088C303.46 37.6155 303.324 37.6688 303.157 37.6688C302.99 37.6688 302.85 37.6155 302.737 37.5088C302.63 37.3955 302.577 37.2555 302.577 37.0888C302.577 36.9222 302.63 36.7855 302.737 36.6788C302.85 36.5655 302.99 36.5088 303.157 36.5088C303.324 36.5088 303.46 36.5655 303.567 36.6788C303.68 36.7855 303.737 36.9222 303.737 37.0888C303.737 37.2555 303.68 37.3955 303.567 37.5088ZM302.737 43.7888V38.7288H303.577V43.7888H302.737ZM305.823 43.0488H308.823V43.7888H304.783V43.1488L307.743 39.4688H304.863V38.7288H308.783V39.3688L305.823 43.0488ZM314.485 41.0688C314.485 41.2155 314.475 41.3655 314.455 41.5188H310.405C310.452 42.0255 310.632 42.4255 310.945 42.7188C311.265 43.0055 311.672 43.1488 312.165 43.1488C312.818 43.1488 313.355 42.8855 313.775 42.3588L314.345 42.8388C313.832 43.5655 313.098 43.9288 312.145 43.9288C311.378 43.9288 310.752 43.6822 310.265 43.1888C309.785 42.6955 309.545 42.0555 309.545 41.2688C309.545 40.4888 309.778 39.8488 310.245 39.3488C310.718 38.8422 311.328 38.5888 312.075 38.5888C312.782 38.5888 313.358 38.8188 313.805 39.2788C314.258 39.7388 314.485 40.3355 314.485 41.0688ZM312.075 39.3688C311.628 39.3688 311.258 39.5022 310.965 39.7688C310.678 40.0288 310.498 40.3855 310.425 40.8388H313.625C313.585 40.3722 313.425 40.0122 313.145 39.7588C312.872 39.4988 312.515 39.3688 312.075 39.3688Z" fill="#9C9A9E" />
                                <line x1="316.8" y1="12.2888" x2="340.4" y2="12.2888" stroke="#6D09F9" />
                                <rect x="344.799" y="1.18882" width="23.2" height="23.2" rx="11.6" fill="#39C574" />
                                <rect x="344.799" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#39C574" strokeWidth="0.8" />
                                <path d="M356.802 10.9128C357.642 10.9128 358.314 11.1528 358.818 11.6328C359.322 12.1048 359.574 12.7568 359.574 13.5888C359.574 14.4848 359.278 15.1888 358.686 15.7008C358.094 16.2048 357.294 16.4568 356.286 16.4568C355.678 16.4568 355.122 16.3568 354.618 16.1568C354.122 15.9488 353.662 15.6328 353.238 15.2088L354.222 14.0208C354.83 14.5968 355.506 14.8848 356.25 14.8848C356.738 14.8848 357.122 14.7728 357.402 14.5488C357.682 14.3248 357.822 14.0168 357.822 13.6248C357.822 13.2408 357.694 12.9368 357.438 12.7128C357.182 12.4888 356.838 12.3768 356.406 12.3768C355.902 12.3768 355.434 12.5328 355.002 12.8448L353.718 12.1968V7.88882H359.046V9.43682H355.338V11.2488C355.754 11.0248 356.242 10.9128 356.802 10.9128Z" fill="white" />
                                <path d="M326.241 43.9288C325.181 43.9288 324.318 43.5855 323.651 42.8988C322.984 42.2122 322.651 41.3422 322.651 40.2888C322.651 39.2422 322.984 38.3755 323.651 37.6888C324.318 36.9955 325.181 36.6488 326.241 36.6488C326.934 36.6488 327.554 36.8088 328.101 37.1288C328.648 37.4488 329.064 37.9122 329.351 38.5188L328.261 39.0988C327.848 38.2588 327.184 37.8388 326.271 37.8388C325.591 37.8388 325.038 38.0688 324.611 38.5288C324.191 38.9888 323.981 39.5755 323.981 40.2888C323.981 41.0022 324.191 41.5888 324.611 42.0488C325.038 42.5088 325.591 42.7388 326.271 42.7388C327.191 42.7388 327.858 42.3188 328.271 41.4788L329.351 42.0588C329.064 42.6655 328.648 43.1288 328.101 43.4488C327.554 43.7688 326.934 43.9288 326.241 43.9288ZM332.483 43.9288C331.689 43.9288 331.043 43.6722 330.543 43.1588C330.049 42.6388 329.803 42.0022 329.803 41.2488C329.803 40.4888 330.049 39.8522 330.543 39.3388C331.036 38.8188 331.683 38.5588 332.483 38.5588C333.283 38.5588 333.929 38.8188 334.423 39.3388C334.916 39.8522 335.163 40.4888 335.163 41.2488C335.163 42.0022 334.916 42.6388 334.423 43.1588C333.929 43.6722 333.283 43.9288 332.483 43.9288ZM331.443 42.3888C331.703 42.6755 332.049 42.8188 332.483 42.8188C332.916 42.8188 333.263 42.6755 333.523 42.3888C333.783 42.0955 333.913 41.7155 333.913 41.2488C333.913 40.7755 333.783 40.3955 333.523 40.1088C333.263 39.8155 332.916 39.6688 332.483 39.6688C332.049 39.6688 331.703 39.8155 331.443 40.1088C331.183 40.3955 331.053 40.7755 331.053 41.2488C331.053 41.7155 331.183 42.0955 331.443 42.3888ZM339.033 38.5588C339.586 38.5588 340.02 38.7288 340.333 39.0688C340.646 39.4022 340.803 39.8755 340.803 40.4888V43.7888H339.583V40.7988C339.583 40.4122 339.503 40.1288 339.343 39.9488C339.19 39.7688 338.946 39.6788 338.613 39.6788C338.24 39.6788 337.94 39.7855 337.713 39.9988C337.493 40.2055 337.383 40.4955 337.383 40.8688V43.7888H336.163V38.6988H337.363V39.4788C337.503 39.1922 337.72 38.9688 338.013 38.8088C338.306 38.6422 338.646 38.5588 339.033 38.5588ZM342.468 43.7888V39.7688H341.488V38.6988H342.468V38.0388C342.468 36.9322 343.058 36.3788 344.238 36.3788C344.531 36.3788 344.808 36.4088 345.068 36.4688V37.4988C344.834 37.4588 344.634 37.4388 344.468 37.4388C344.194 37.4388 343.994 37.4955 343.868 37.6088C343.748 37.7155 343.688 37.8922 343.688 38.1388V38.6988H345.058V39.7688H343.688V43.7888H342.468ZM346.422 37.8488C346.189 37.8488 345.999 37.7788 345.852 37.6388C345.712 37.4922 345.642 37.3088 345.642 37.0888C345.642 36.8688 345.712 36.6888 345.852 36.5488C345.999 36.4022 346.189 36.3288 346.422 36.3288C346.649 36.3288 346.832 36.4022 346.972 36.5488C347.119 36.6888 347.192 36.8688 347.192 37.0888C347.192 37.3088 347.119 37.4922 346.972 37.6388C346.832 37.7788 346.649 37.8488 346.422 37.8488ZM345.812 43.7888V38.6988H347.032V43.7888H345.812ZM351.056 38.6088C351.216 38.6088 351.363 38.6322 351.496 38.6788V39.8188C351.283 39.7855 351.096 39.7688 350.936 39.7688C350.029 39.7688 349.576 40.2722 349.576 41.2788V43.7888H348.356V38.6988H349.556V39.5488C349.683 39.2555 349.876 39.0255 350.136 38.8588C350.403 38.6922 350.709 38.6088 351.056 38.6088ZM358.386 38.5588C358.926 38.5588 359.346 38.7288 359.646 39.0688C359.946 39.4022 360.096 39.8722 360.096 40.4788V43.7888H358.876V40.7788C358.876 40.3988 358.803 40.1222 358.656 39.9488C358.516 39.7688 358.293 39.6788 357.986 39.6788C357.633 39.6788 357.346 39.7855 357.126 39.9988C356.913 40.2055 356.806 40.4922 356.806 40.8588V43.7888H355.586V40.7788C355.586 40.3988 355.513 40.1222 355.366 39.9488C355.226 39.7688 355.003 39.6788 354.696 39.6788C354.343 39.6788 354.06 39.7855 353.846 39.9988C353.633 40.2055 353.526 40.4922 353.526 40.8588V43.7888H352.306V38.6988H353.506V39.4688C353.646 39.1888 353.86 38.9688 354.146 38.8088C354.433 38.6422 354.756 38.5588 355.116 38.5588C355.883 38.5588 356.393 38.8888 356.646 39.5488C356.78 39.2488 357 39.0088 357.306 38.8288C357.62 38.6488 357.98 38.5588 358.386 38.5588ZM369.43 42.8888C368.75 43.5822 367.88 43.9288 366.82 43.9288C365.76 43.9288 364.887 43.5822 364.2 42.8888C363.52 42.1888 363.18 41.3222 363.18 40.2888C363.18 39.2555 363.52 38.3922 364.2 37.6988C364.887 36.9988 365.76 36.6488 366.82 36.6488C367.88 36.6488 368.75 36.9988 369.43 37.6988C370.117 38.3922 370.46 39.2555 370.46 40.2888C370.46 41.3222 370.117 42.1888 369.43 42.8888ZM365.15 42.0488C365.577 42.5088 366.133 42.7388 366.82 42.7388C367.507 42.7388 368.063 42.5088 368.49 42.0488C368.917 41.5888 369.13 41.0022 369.13 40.2888C369.13 39.5755 368.917 38.9888 368.49 38.5288C368.063 38.0688 367.507 37.8388 366.82 37.8388C366.133 37.8388 365.577 38.0688 365.15 38.5288C364.723 38.9888 364.51 39.5755 364.51 40.2888C364.51 41.0022 364.723 41.5888 365.15 42.0488ZM374.24 38.6088C374.4 38.6088 374.547 38.6322 374.68 38.6788V39.8188C374.467 39.7855 374.28 39.7688 374.12 39.7688C373.214 39.7688 372.76 40.2722 372.76 41.2788V43.7888H371.54V38.6988H372.74V39.5488C372.867 39.2555 373.06 39.0255 373.32 38.8588C373.587 38.6922 373.894 38.6088 374.24 38.6088ZM379.016 36.4688H380.236V43.7888H379.036V42.9788C378.889 43.2788 378.659 43.5122 378.346 43.6788C378.032 43.8455 377.682 43.9288 377.296 43.9288C376.609 43.9288 376.046 43.6822 375.606 43.1888C375.172 42.6888 374.956 42.0422 374.956 41.2488C374.956 40.4555 375.176 39.8088 375.616 39.3088C376.056 38.8088 376.616 38.5588 377.296 38.5588C377.676 38.5588 378.019 38.6422 378.326 38.8088C378.632 38.9688 378.862 39.1922 379.016 39.4788V36.4688ZM376.596 42.3888C376.856 42.6755 377.202 42.8188 377.636 42.8188C378.069 42.8188 378.416 42.6755 378.676 42.3888C378.936 42.0955 379.066 41.7155 379.066 41.2488C379.066 40.7755 378.936 40.3955 378.676 40.1088C378.416 39.8155 378.069 39.6688 377.636 39.6688C377.202 39.6688 376.856 39.8155 376.596 40.1088C376.336 40.3955 376.206 40.7755 376.206 41.2488C376.206 41.7155 376.336 42.0955 376.596 42.3888ZM386.3 41.1388C386.3 41.2922 386.29 41.4488 386.27 41.6088H382.48C382.547 42.0155 382.707 42.3288 382.96 42.5488C383.22 42.7622 383.56 42.8688 383.98 42.8688C384.56 42.8688 385.034 42.6555 385.4 42.2288L386.13 42.9488C385.624 43.6022 384.894 43.9288 383.94 43.9288C383.127 43.9288 382.474 43.6855 381.98 43.1988C381.487 42.7122 381.24 42.0688 381.24 41.2688C381.24 40.4755 381.477 39.8255 381.95 39.3188C382.43 38.8122 383.054 38.5588 383.82 38.5588C384.56 38.5588 385.157 38.7955 385.61 39.2688C386.07 39.7422 386.3 40.3655 386.3 41.1388ZM383.83 39.6188C383.457 39.6188 383.154 39.7222 382.92 39.9288C382.694 40.1288 382.547 40.4122 382.48 40.7788H385.08C385.054 40.4055 384.93 40.1188 384.71 39.9188C384.49 39.7188 384.197 39.6188 383.83 39.6188ZM389.978 38.6088C390.138 38.6088 390.285 38.6322 390.418 38.6788V39.8188C390.205 39.7855 390.018 39.7688 389.858 39.7688C388.951 39.7688 388.498 40.2722 388.498 41.2788V43.7888H387.278V38.6988H388.478V39.5488C388.605 39.2555 388.798 39.0255 389.058 38.8588C389.325 38.6922 389.631 38.6088 389.978 38.6088Z" fill="#1F1D21" />
                            </svg>
                        </div>
                    </div>
                    <div className="min-[410px]:hidden">
                        <div className="flex justify-center">
                            <svg width="310" height="57" viewBox="0 0 310 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="19.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask0_2422_14038" maskUnits="userSpaceOnUse" x="23" y="4" width="16" height="17">
                                    <rect x="23" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_2422_14038)">
                                    <path d="M29.3662 14.8888L35.0162 9.23882C35.1495 9.10549 35.305 9.03882 35.4828 9.03882C35.6606 9.03882 35.8162 9.10549 35.9495 9.23882C36.0828 9.37215 36.1495 9.53049 36.1495 9.71382C36.1495 9.89715 36.0828 10.0555 35.9495 10.1888L29.8328 16.3222C29.6995 16.4555 29.5439 16.5222 29.3662 16.5222C29.1884 16.5222 29.0328 16.4555 28.8995 16.3222L26.0328 13.4555C25.8995 13.3222 25.8356 13.1638 25.8412 12.9805C25.8467 12.7972 25.9162 12.6388 26.0495 12.5055C26.1828 12.3722 26.3412 12.3055 26.5245 12.3055C26.7078 12.3055 26.8662 12.3722 26.9995 12.5055L29.3662 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="47" y1="12.2888" x2="62" y2="12.2888" stroke="#6D09F9" />
                                <path d="M22.3802 41.7888L21.6302 39.8888H18.2702L17.5202 41.7888H16.6102L19.4602 34.7888H20.4402L23.2902 41.7888H22.3802ZM18.5902 39.0888H21.3102L19.9502 35.6588L18.5902 39.0888ZM26.9294 36.5888C27.6294 36.5888 28.2027 36.8388 28.6494 37.3388C29.1027 37.8322 29.3294 38.4722 29.3294 39.2588C29.3294 40.0455 29.1027 40.6888 28.6494 41.1888C28.2027 41.6822 27.6294 41.9288 26.9294 41.9288C26.5027 41.9288 26.1194 41.8322 25.7794 41.6388C25.446 41.4455 25.2027 41.1855 25.0494 40.8588V41.7888H24.2094V34.4688H25.0494V37.6588C25.2027 37.3322 25.446 37.0722 25.7794 36.8788C26.1194 36.6855 26.5027 36.5888 26.9294 36.5888ZM25.4794 40.6188C25.7994 40.9722 26.216 41.1488 26.7294 41.1488C27.2427 41.1488 27.656 40.9722 27.9694 40.6188C28.2894 40.2655 28.4494 39.8122 28.4494 39.2588C28.4494 38.7055 28.2894 38.2522 27.9694 37.8988C27.656 37.5455 27.2427 37.3688 26.7294 37.3688C26.216 37.3688 25.7994 37.5455 25.4794 37.8988C25.166 38.2522 25.0094 38.7055 25.0094 39.2588C25.0094 39.8122 25.166 40.2655 25.4794 40.6188ZM34.6819 41.1488C34.2019 41.6688 33.5785 41.9288 32.8119 41.9288C32.0452 41.9288 31.4185 41.6688 30.9319 41.1488C30.4519 40.6288 30.2119 39.9988 30.2119 39.2588C30.2119 38.5188 30.4519 37.8888 30.9319 37.3688C31.4185 36.8488 32.0452 36.5888 32.8119 36.5888C33.5785 36.5888 34.2019 36.8488 34.6819 37.3688C35.1685 37.8888 35.4119 38.5188 35.4119 39.2588C35.4119 39.9988 35.1685 40.6288 34.6819 41.1488ZM31.5619 40.6188C31.8819 40.9722 32.2985 41.1488 32.8119 41.1488C33.3252 41.1488 33.7385 40.9722 34.0519 40.6188C34.3719 40.2655 34.5319 39.8122 34.5319 39.2588C34.5319 38.7055 34.3719 38.2522 34.0519 37.8988C33.7385 37.5455 33.3252 37.3688 32.8119 37.3688C32.2985 37.3688 31.8819 37.5455 31.5619 37.8988C31.2485 38.2522 31.0919 38.7055 31.0919 39.2588C31.0919 39.8122 31.2485 40.2655 31.5619 40.6188ZM40.3112 41.3788C39.9178 41.7455 39.3912 41.9288 38.7312 41.9288C38.0712 41.9288 37.5412 41.7455 37.1412 41.3788C36.7478 41.0055 36.5512 40.5122 36.5512 39.8988V36.7288H37.3912V39.8488C37.3912 40.2688 37.5078 40.5922 37.7412 40.8188C37.9745 41.0388 38.3045 41.1488 38.7312 41.1488C39.1578 41.1488 39.4878 41.0388 39.7212 40.8188C39.9545 40.5922 40.0712 40.2688 40.0712 39.8488V36.7288H40.9112V39.8988C40.9112 40.5122 40.7112 41.0055 40.3112 41.3788ZM44.3182 41.8688C43.8182 41.8688 43.4349 41.7522 43.1682 41.5188C42.9082 41.2855 42.7782 40.9422 42.7782 40.4888V37.4488H41.7682V36.7288H42.7782V35.2288H43.6182V36.7288H45.2082V37.4488H43.6182V40.4288C43.6182 40.6755 43.6815 40.8555 43.8082 40.9688C43.9415 41.0755 44.1515 41.1288 44.4382 41.1288C44.6715 41.1288 44.9349 41.0988 45.2282 41.0388V41.7388C44.9415 41.8255 44.6382 41.8688 44.3182 41.8688ZM20.9532 53.9288C19.9199 53.9288 19.0732 53.5822 18.4132 52.8888C17.7532 52.1955 17.4232 51.3288 17.4232 50.2888C17.4232 49.2488 17.7565 48.3822 18.4232 47.6888C19.0899 46.9955 19.9332 46.6488 20.9532 46.6488C21.6132 46.6488 22.2132 46.8022 22.7532 47.1088C23.2932 47.4155 23.7099 47.8622 24.0032 48.4488L23.2732 48.8688C22.7865 47.9355 22.0332 47.4688 21.0132 47.4688C20.2199 47.4688 19.5765 47.7322 19.0832 48.2588C18.5899 48.7855 18.3432 49.4622 18.3432 50.2888C18.3432 51.1155 18.5899 51.7922 19.0832 52.3188C19.5765 52.8455 20.2199 53.1088 21.0132 53.1088C22.0465 53.1088 22.8065 52.6422 23.2932 51.7088L24.0032 52.1288C23.7099 52.7155 23.2932 53.1622 22.7532 53.4688C22.2132 53.7755 21.6132 53.9288 20.9532 53.9288ZM28.9618 48.7288H29.8018V53.7888H28.9618V52.8588C28.8151 53.1855 28.5718 53.4455 28.2318 53.6388C27.8985 53.8322 27.5185 53.9288 27.0918 53.9288C26.3918 53.9288 25.8151 53.6822 25.3618 53.1888C24.9085 52.6888 24.6818 52.0455 24.6818 51.2588C24.6818 50.4722 24.9085 49.8322 25.3618 49.3388C25.8151 48.8388 26.3918 48.5888 27.0918 48.5888C27.5185 48.5888 27.8985 48.6855 28.2318 48.8788C28.5718 49.0722 28.8151 49.3322 28.9618 49.6588V48.7288ZM26.0318 52.6188C26.3518 52.9722 26.7685 53.1488 27.2818 53.1488C27.7951 53.1488 28.2085 52.9722 28.5218 52.6188C28.8418 52.2655 29.0018 51.8122 29.0018 51.2588C29.0018 50.7055 28.8418 50.2522 28.5218 49.8988C28.2085 49.5455 27.7951 49.3688 27.2818 49.3688C26.7685 49.3688 26.3518 49.5455 26.0318 49.8988C25.7185 50.2522 25.5618 50.7055 25.5618 51.2588C25.5618 51.8122 25.7185 52.2655 26.0318 52.6188ZM31.4043 53.7888V46.4688H32.2443V53.7888H31.4043ZM33.841 53.7888V46.4688H34.681V53.7888H33.841ZM40.8577 51.0688C40.8577 51.2155 40.8477 51.3655 40.8277 51.5188H36.7777C36.8244 52.0255 37.0044 52.4255 37.3177 52.7188C37.6377 53.0055 38.0444 53.1488 38.5377 53.1488C39.1911 53.1488 39.7277 52.8855 40.1477 52.3588L40.7177 52.8388C40.2044 53.5655 39.4711 53.9288 38.5177 53.9288C37.7511 53.9288 37.1244 53.6822 36.6377 53.1888C36.1577 52.6955 35.9177 52.0555 35.9177 51.2688C35.9177 50.4888 36.1511 49.8488 36.6177 49.3488C37.0911 48.8422 37.7011 48.5888 38.4477 48.5888C39.1544 48.5888 39.7311 48.8188 40.1777 49.2788C40.6311 49.7388 40.8577 50.3355 40.8577 51.0688ZM38.4477 49.3688C38.0011 49.3688 37.6311 49.5022 37.3377 49.7688C37.0511 50.0288 36.8711 50.3855 36.7977 50.8388H39.9977C39.9577 50.3722 39.7977 50.0122 39.5177 49.7588C39.2444 49.4988 38.8877 49.3688 38.4477 49.3688ZM44.4538 48.6488C44.6272 48.6488 44.7805 48.6722 44.9138 48.7188V49.4588C44.7672 49.4388 44.6205 49.4288 44.4738 49.4288C43.9805 49.4288 43.5972 49.5755 43.3238 49.8688C43.0505 50.1622 42.9138 50.6055 42.9138 51.1988V53.7888H42.0738V48.7288H42.9138V49.6788C43.0272 49.3522 43.2172 49.0988 43.4838 48.9188C43.7572 48.7388 44.0805 48.6488 44.4538 48.6488Z" fill="#9C9A9E" />
                                <line x1="62" y1="12.2888" x2="77" y2="12.2888" stroke="#6D09F9" />
                                <rect x="81.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask1_2422_14038" maskUnits="userSpaceOnUse" x="85" y="4" width="16" height="17">
                                    <rect x="85" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask1_2422_14038)">
                                    <path d="M91.3662 14.8888L97.0162 9.23882C97.1495 9.10549 97.305 9.03882 97.4828 9.03882C97.6606 9.03882 97.8162 9.10549 97.9495 9.23882C98.0828 9.37215 98.1495 9.53049 98.1495 9.71382C98.1495 9.89715 98.0828 10.0555 97.9495 10.1888L91.8328 16.3222C91.6995 16.4555 91.5439 16.5222 91.3662 16.5222C91.1884 16.5222 91.0328 16.4555 90.8995 16.3222L88.0328 13.4555C87.8995 13.3222 87.8356 13.1638 87.8412 12.9805C87.8467 12.7972 87.9162 12.6388 88.0495 12.5055C88.1828 12.3722 88.3412 12.3055 88.5245 12.3055C88.7078 12.3055 88.8662 12.3722 88.9995 12.5055L91.3662 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="109" y1="12.2888" x2="124" y2="12.2888" stroke="#6D09F9" />
                                <path d="M84.3802 41.7888L83.6302 39.8888H80.2702L79.5202 41.7888H78.6102L81.4602 34.7888H82.4402L85.2902 41.7888H84.3802ZM80.5902 39.0888H83.3102L81.9502 35.6588L80.5902 39.0888ZM88.9294 36.5888C89.6294 36.5888 90.2027 36.8388 90.6494 37.3388C91.1027 37.8322 91.3294 38.4722 91.3294 39.2588C91.3294 40.0455 91.1027 40.6888 90.6494 41.1888C90.2027 41.6822 89.6294 41.9288 88.9294 41.9288C88.5027 41.9288 88.1194 41.8322 87.7794 41.6388C87.446 41.4455 87.2027 41.1855 87.0494 40.8588V41.7888H86.2094V34.4688H87.0494V37.6588C87.2027 37.3322 87.446 37.0722 87.7794 36.8788C88.1194 36.6855 88.5027 36.5888 88.9294 36.5888ZM87.4794 40.6188C87.7994 40.9722 88.216 41.1488 88.7294 41.1488C89.2427 41.1488 89.656 40.9722 89.9694 40.6188C90.2894 40.2655 90.4494 39.8122 90.4494 39.2588C90.4494 38.7055 90.2894 38.2522 89.9694 37.8988C89.656 37.5455 89.2427 37.3688 88.7294 37.3688C88.216 37.3688 87.7994 37.5455 87.4794 37.8988C87.166 38.2522 87.0094 38.7055 87.0094 39.2588C87.0094 39.8122 87.166 40.2655 87.4794 40.6188ZM96.6819 41.1488C96.2019 41.6688 95.5785 41.9288 94.8119 41.9288C94.0452 41.9288 93.4185 41.6688 92.9319 41.1488C92.4519 40.6288 92.2119 39.9988 92.2119 39.2588C92.2119 38.5188 92.4519 37.8888 92.9319 37.3688C93.4185 36.8488 94.0452 36.5888 94.8119 36.5888C95.5785 36.5888 96.2019 36.8488 96.6819 37.3688C97.1685 37.8888 97.4119 38.5188 97.4119 39.2588C97.4119 39.9988 97.1685 40.6288 96.6819 41.1488ZM93.5619 40.6188C93.8819 40.9722 94.2985 41.1488 94.8119 41.1488C95.3252 41.1488 95.7385 40.9722 96.0519 40.6188C96.3719 40.2655 96.5319 39.8122 96.5319 39.2588C96.5319 38.7055 96.3719 38.2522 96.0519 37.8988C95.7385 37.5455 95.3252 37.3688 94.8119 37.3688C94.2985 37.3688 93.8819 37.5455 93.5619 37.8988C93.2485 38.2522 93.0919 38.7055 93.0919 39.2588C93.0919 39.8122 93.2485 40.2655 93.5619 40.6188ZM102.311 41.3788C101.918 41.7455 101.391 41.9288 100.731 41.9288C100.071 41.9288 99.5412 41.7455 99.1412 41.3788C98.7478 41.0055 98.5512 40.5122 98.5512 39.8988V36.7288H99.3912V39.8488C99.3912 40.2688 99.5078 40.5922 99.7412 40.8188C99.9745 41.0388 100.305 41.1488 100.731 41.1488C101.158 41.1488 101.488 41.0388 101.721 40.8188C101.955 40.5922 102.071 40.2688 102.071 39.8488V36.7288H102.911V39.8988C102.911 40.5122 102.711 41.0055 102.311 41.3788ZM106.318 41.8688C105.818 41.8688 105.435 41.7522 105.168 41.5188C104.908 41.2855 104.778 40.9422 104.778 40.4888V37.4488H103.768V36.7288H104.778V35.2288H105.618V36.7288H107.208V37.4488H105.618V40.4288C105.618 40.6755 105.682 40.8555 105.808 40.9688C105.942 41.0755 106.152 41.1288 106.438 41.1288C106.672 41.1288 106.935 41.0988 107.228 41.0388V41.7388C106.942 41.8255 106.638 41.8688 106.318 41.8688ZM81.2868 52.9788H85.2968V53.7888H80.4068V46.7888H85.1968V47.5988H81.2868V49.8588H84.9968V50.6588H81.2868V52.9788ZM90.0977 48.7288H90.9977L88.9377 53.7888H88.0377L85.9777 48.7288H86.8777L88.4877 52.8688L90.0977 48.7288ZM96.312 51.0688C96.312 51.2155 96.302 51.3655 96.282 51.5188H92.232C92.2787 52.0255 92.4587 52.4255 92.772 52.7188C93.092 53.0055 93.4987 53.1488 93.992 53.1488C94.6454 53.1488 95.182 52.8855 95.602 52.3588L96.172 52.8388C95.6587 53.5655 94.9254 53.9288 93.972 53.9288C93.2054 53.9288 92.5787 53.6822 92.092 53.1888C91.612 52.6955 91.372 52.0555 91.372 51.2688C91.372 50.4888 91.6054 49.8488 92.072 49.3488C92.5454 48.8422 93.1554 48.5888 93.902 48.5888C94.6087 48.5888 95.1854 48.8188 95.632 49.2788C96.0854 49.7388 96.312 50.3355 96.312 51.0688ZM93.902 49.3688C93.4554 49.3688 93.0854 49.5022 92.792 49.7688C92.5054 50.0288 92.3254 50.3855 92.252 50.8388H95.452C95.412 50.3722 95.252 50.0122 94.972 49.7588C94.6987 49.4988 94.342 49.3688 93.902 49.3688ZM100.128 48.5888C100.701 48.5888 101.145 48.7588 101.458 49.0988C101.771 49.4388 101.928 49.9222 101.928 50.5488V53.7888H101.088V50.7488C101.088 50.2688 100.995 49.9188 100.808 49.6988C100.621 49.4788 100.328 49.3688 99.9281 49.3688C99.4748 49.3688 99.1015 49.4988 98.8081 49.7588C98.5148 50.0122 98.3681 50.3522 98.3681 50.7788V53.7888H97.5281V48.7288H98.3681V49.5888C98.5081 49.2688 98.7315 49.0222 99.0381 48.8488C99.3515 48.6755 99.7148 48.5888 100.128 48.5888ZM105.342 53.8688C104.842 53.8688 104.458 53.7522 104.192 53.5188C103.932 53.2855 103.802 52.9422 103.802 52.4888V49.4488H102.792V48.7288H103.802V47.2288H104.642V48.7288H106.232V49.4488H104.642V52.4288C104.642 52.6755 104.705 52.8555 104.832 52.9688C104.965 53.0755 105.175 53.1288 105.462 53.1288C105.695 53.1288 105.958 53.0988 106.252 53.0388V53.7388C105.965 53.8255 105.662 53.8688 105.342 53.8688Z" fill="#9C9A9E" />
                                <line x1="124" y1="12.2888" x2="139" y2="12.2888" stroke="#6D09F9" />
                                <rect x="143.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask2_2422_14038" maskUnits="userSpaceOnUse" x="147" y="4" width="16" height="17">
                                    <rect x="147" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask2_2422_14038)">
                                    <path d="M153.366 14.8888L159.016 9.23882C159.149 9.10549 159.305 9.03882 159.483 9.03882C159.661 9.03882 159.816 9.10549 159.949 9.23882C160.083 9.37215 160.149 9.53049 160.149 9.71382C160.149 9.89715 160.083 10.0555 159.949 10.1888L153.833 16.3222C153.699 16.4555 153.544 16.5222 153.366 16.5222C153.188 16.5222 153.033 16.4555 152.899 16.3222L150.033 13.4555C149.899 13.3222 149.836 13.1638 149.841 12.9805C149.847 12.7972 149.916 12.6388 150.049 12.5055C150.183 12.3722 150.341 12.3055 150.524 12.3055C150.708 12.3055 150.866 12.3722 150.999 12.5055L153.366 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="171" y1="12.2888" x2="186" y2="12.2888" stroke="#6D09F9" />
                                <path d="M136.339 43.9288C135.632 43.9288 135.032 43.7855 134.539 43.4988C134.052 43.2122 133.709 42.8122 133.509 42.2988L134.219 41.8888C134.605 42.7155 135.315 43.1288 136.349 43.1288C136.875 43.1288 137.289 43.0188 137.589 42.7988C137.889 42.5722 138.039 42.2722 138.039 41.8988C138.039 41.6122 137.939 41.3788 137.739 41.1988C137.545 41.0122 137.232 40.8655 136.799 40.7588L135.669 40.4888C134.369 40.1755 133.719 39.5522 133.719 38.6188C133.719 38.0322 133.945 37.5588 134.399 37.1988C134.859 36.8322 135.472 36.6488 136.239 36.6488C136.859 36.6488 137.392 36.7688 137.839 37.0088C138.292 37.2422 138.605 37.5488 138.779 37.9288L138.089 38.3488C137.735 37.7488 137.112 37.4488 136.219 37.4488C135.719 37.4488 135.325 37.5522 135.039 37.7588C134.759 37.9588 134.619 38.2422 134.619 38.6088C134.619 38.8888 134.715 39.1155 134.909 39.2888C135.102 39.4622 135.425 39.6022 135.879 39.7088L137.009 39.9788C137.682 40.1388 138.172 40.3755 138.479 40.6888C138.792 40.9955 138.949 41.3888 138.949 41.8688C138.949 42.4888 138.715 42.9888 138.249 43.3688C137.789 43.7422 137.152 43.9288 136.339 43.9288ZM142.366 43.9288C141.592 43.9288 140.966 43.6788 140.486 43.1788C140.006 42.6788 139.766 42.0388 139.766 41.2588C139.766 40.4788 140.006 39.8388 140.486 39.3388C140.966 38.8388 141.592 38.5888 142.366 38.5888C143.326 38.5888 144.032 38.9555 144.486 39.6888L143.826 40.1488C143.506 39.6288 143.022 39.3688 142.376 39.3688C141.862 39.3688 141.446 39.5422 141.126 39.8888C140.806 40.2355 140.646 40.6922 140.646 41.2588C140.646 41.8255 140.806 42.2822 141.126 42.6288C141.446 42.9755 141.862 43.1488 142.376 43.1488C143.022 43.1488 143.506 42.8888 143.826 42.3688L144.486 42.8288C144.032 43.5622 143.326 43.9288 142.366 43.9288ZM148.141 38.5888C148.714 38.5888 149.157 38.7588 149.471 39.0988C149.784 39.4388 149.941 39.9222 149.941 40.5488V43.7888H149.101V40.7488C149.101 40.2688 149.007 39.9188 148.821 39.6988C148.634 39.4788 148.341 39.3688 147.941 39.3688C147.487 39.3688 147.114 39.4988 146.821 39.7588C146.527 40.0122 146.381 40.3522 146.381 40.7788V43.7888H145.541V36.4688H146.381V39.5888C146.521 39.2688 146.744 39.0222 147.051 38.8488C147.364 38.6755 147.727 38.5888 148.141 38.5888ZM156.083 41.0688C156.083 41.2155 156.073 41.3655 156.053 41.5188H152.003C152.05 42.0255 152.23 42.4255 152.543 42.7188C152.863 43.0055 153.27 43.1488 153.763 43.1488C154.416 43.1488 154.953 42.8855 155.373 42.3588L155.943 42.8388C155.43 43.5655 154.696 43.9288 153.743 43.9288C152.976 43.9288 152.35 43.6822 151.863 43.1888C151.383 42.6955 151.143 42.0555 151.143 41.2688C151.143 40.4888 151.376 39.8488 151.843 39.3488C152.316 38.8422 152.926 38.5888 153.673 38.5888C154.38 38.5888 154.956 38.8188 155.403 39.2788C155.856 39.7388 156.083 40.3355 156.083 41.0688ZM153.673 39.3688C153.226 39.3688 152.856 39.5022 152.563 39.7688C152.276 40.0288 152.096 40.3855 152.023 40.8388H155.223C155.183 40.3722 155.023 40.0122 154.743 39.7588C154.47 39.4988 154.113 39.3688 153.673 39.3688ZM161.219 36.4688H162.059V43.7888H161.219V42.8588C161.066 43.1855 160.819 43.4455 160.479 43.6388C160.146 43.8322 159.766 43.9288 159.339 43.9288C158.639 43.9288 158.062 43.6822 157.609 43.1888C157.162 42.6888 156.939 42.0455 156.939 41.2588C156.939 40.4722 157.162 39.8322 157.609 39.3388C158.062 38.8388 158.639 38.5888 159.339 38.5888C159.766 38.5888 160.146 38.6855 160.479 38.8788C160.819 39.0722 161.066 39.3322 161.219 39.6588V36.4688ZM158.289 42.6188C158.609 42.9722 159.026 43.1488 159.539 43.1488C160.052 43.1488 160.466 42.9722 160.779 42.6188C161.099 42.2655 161.259 41.8122 161.259 41.2588C161.259 40.7055 161.099 40.2522 160.779 39.8988C160.466 39.5455 160.052 39.3688 159.539 39.3688C159.026 39.3688 158.609 39.5455 158.289 39.8988C157.976 40.2522 157.819 40.7055 157.819 41.2588C157.819 41.8122 157.976 42.2655 158.289 42.6188ZM167.322 43.3788C166.928 43.7455 166.402 43.9288 165.742 43.9288C165.082 43.9288 164.552 43.7455 164.152 43.3788C163.758 43.0055 163.562 42.5122 163.562 41.8988V38.7288H164.402V41.8488C164.402 42.2688 164.518 42.5922 164.752 42.8188C164.985 43.0388 165.315 43.1488 165.742 43.1488C166.168 43.1488 166.498 43.0388 166.732 42.8188C166.965 42.5922 167.082 42.2688 167.082 41.8488V38.7288H167.922V41.8988C167.922 42.5122 167.722 43.0055 167.322 43.3788ZM169.419 43.7888V36.4688H170.259V43.7888H169.419ZM176.435 41.0688C176.435 41.2155 176.425 41.3655 176.405 41.5188H172.355C172.402 42.0255 172.582 42.4255 172.895 42.7188C173.215 43.0055 173.622 43.1488 174.115 43.1488C174.769 43.1488 175.305 42.8855 175.725 42.3588L176.295 42.8388C175.782 43.5655 175.049 43.9288 174.095 43.9288C173.329 43.9288 172.702 43.6822 172.215 43.1888C171.735 42.6955 171.495 42.0555 171.495 41.2688C171.495 40.4888 171.729 39.8488 172.195 39.3488C172.669 38.8422 173.279 38.5888 174.025 38.5888C174.732 38.5888 175.309 38.8188 175.755 39.2788C176.209 39.7388 176.435 40.3355 176.435 41.0688ZM174.025 39.3688C173.579 39.3688 173.209 39.5022 172.915 39.7688C172.629 40.0288 172.449 40.3855 172.375 40.8388H175.575C175.535 40.3722 175.375 40.0122 175.095 39.7588C174.822 39.4988 174.465 39.3688 174.025 39.3688Z" fill="#9C9A9E" />
                                <line x1="186" y1="12.2888" x2="201" y2="12.2888" stroke="#6D09F9" />
                                <rect x="205.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#6D09F9" strokeWidth="0.8" />
                                <mask id="mask3_2422_14038" maskUnits="userSpaceOnUse" x="209" y="4" width="16" height="17">
                                    <rect x="209" y="4.78882" width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask3_2422_14038)">
                                    <path d="M215.366 14.8888L221.016 9.23882C221.149 9.10549 221.305 9.03882 221.483 9.03882C221.661 9.03882 221.816 9.10549 221.949 9.23882C222.083 9.37215 222.149 9.53049 222.149 9.71382C222.149 9.89715 222.083 10.0555 221.949 10.1888L215.833 16.3222C215.699 16.4555 215.544 16.5222 215.366 16.5222C215.188 16.5222 215.033 16.4555 214.899 16.3222L212.033 13.4555C211.899 13.3222 211.836 13.1638 211.841 12.9805C211.847 12.7972 211.916 12.6388 212.049 12.5055C212.183 12.3722 212.341 12.3055 212.524 12.3055C212.708 12.3055 212.866 12.3722 212.999 12.5055L215.366 14.8888Z" fill="#6D09F9" />
                                </g>
                                <line x1="233" y1="12.2888" x2="248" y2="12.2888" stroke="#6D09F9" />
                                <path d="M195.916 41.7888L195.166 39.8888H191.806L191.056 41.7888H190.146L192.996 34.7888H193.976L196.826 41.7888H195.916ZM192.126 39.0888H194.846L193.486 35.6588L192.126 39.0888ZM203.616 36.5888C204.176 36.5888 204.602 36.7588 204.896 37.0988C205.196 37.4322 205.346 37.9088 205.346 38.5288V41.7888H204.506V38.7288C204.506 38.2555 204.419 37.9122 204.246 37.6988C204.079 37.4788 203.809 37.3688 203.436 37.3688C203.002 37.3688 202.649 37.4988 202.376 37.7588C202.102 38.0122 201.966 38.3522 201.966 38.7788V41.7888H201.126V38.7288C201.126 38.2555 201.039 37.9122 200.866 37.6988C200.699 37.4788 200.429 37.3688 200.056 37.3688C199.622 37.3688 199.269 37.4988 198.996 37.7588C198.722 38.0122 198.586 38.3522 198.586 38.7788V41.7888H197.746V36.7288H198.586V37.5788C198.726 37.2655 198.942 37.0222 199.236 36.8488C199.529 36.6755 199.869 36.5888 200.256 36.5888C201.056 36.5888 201.579 36.9388 201.826 37.6388C201.959 37.3188 202.182 37.0655 202.496 36.8788C202.816 36.6855 203.189 36.5888 203.616 36.5888ZM209.621 36.5888C210.321 36.5888 210.894 36.8388 211.341 37.3388C211.794 37.8322 212.021 38.4722 212.021 39.2588C212.021 40.0455 211.794 40.6888 211.341 41.1888C210.894 41.6822 210.321 41.9288 209.621 41.9288C209.194 41.9288 208.811 41.8322 208.471 41.6388C208.138 41.4455 207.894 41.1855 207.741 40.8588V41.7888H206.901V34.4688H207.741V37.6588C207.894 37.3322 208.138 37.0722 208.471 36.8788C208.811 36.6855 209.194 36.5888 209.621 36.5888ZM208.171 40.6188C208.491 40.9722 208.908 41.1488 209.421 41.1488C209.934 41.1488 210.348 40.9722 210.661 40.6188C210.981 40.2655 211.141 39.8122 211.141 39.2588C211.141 38.7055 210.981 38.2522 210.661 37.8988C210.348 37.5455 209.934 37.3688 209.421 37.3688C208.908 37.3688 208.491 37.5455 208.171 37.8988C207.858 38.2522 207.701 38.7055 207.701 39.2588C207.701 39.8122 207.858 40.2655 208.171 40.6188ZM216.923 41.3788C216.53 41.7455 216.003 41.9288 215.343 41.9288C214.683 41.9288 214.153 41.7455 213.753 41.3788C213.36 41.0055 213.163 40.5122 213.163 39.8988V36.7288H214.003V39.8488C214.003 40.2688 214.12 40.5922 214.353 40.8188C214.587 41.0388 214.917 41.1488 215.343 41.1488C215.77 41.1488 216.1 41.0388 216.333 40.8188C216.567 40.5922 216.683 40.2688 216.683 39.8488V36.7288H217.523V39.8988C217.523 40.5122 217.323 41.0055 216.923 41.3788ZM219.021 41.7888V34.4688H219.861V41.7888H219.021ZM225.377 36.7288H226.217V41.7888H225.377V40.8588C225.231 41.1855 224.987 41.4455 224.647 41.6388C224.314 41.8322 223.934 41.9288 223.507 41.9288C222.807 41.9288 222.231 41.6822 221.777 41.1888C221.324 40.6888 221.097 40.0455 221.097 39.2588C221.097 38.4722 221.324 37.8322 221.777 37.3388C222.231 36.8388 222.807 36.5888 223.507 36.5888C223.934 36.5888 224.314 36.6855 224.647 36.8788C224.987 37.0722 225.231 37.3322 225.377 37.6588V36.7288ZM222.447 40.6188C222.767 40.9722 223.184 41.1488 223.697 41.1488C224.211 41.1488 224.624 40.9722 224.937 40.6188C225.257 40.2655 225.417 39.8122 225.417 39.2588C225.417 38.7055 225.257 38.2522 224.937 37.8988C224.624 37.5455 224.211 37.3688 223.697 37.3688C223.184 37.3688 222.767 37.5455 222.447 37.8988C222.134 38.2522 221.977 38.7055 221.977 39.2588C221.977 39.8122 222.134 40.2655 222.447 40.6188ZM230.42 36.5888C230.993 36.5888 231.436 36.7588 231.75 37.0988C232.063 37.4388 232.22 37.9222 232.22 38.5488V41.7888H231.38V38.7488C231.38 38.2688 231.286 37.9188 231.1 37.6988C230.913 37.4788 230.62 37.3688 230.22 37.3688C229.766 37.3688 229.393 37.4988 229.1 37.7588C228.806 38.0122 228.66 38.3522 228.66 38.7788V41.7888H227.82V36.7288H228.66V37.5888C228.8 37.2688 229.023 37.0222 229.33 36.8488C229.643 36.6755 230.006 36.5888 230.42 36.5888ZM236.022 41.9288C235.249 41.9288 234.622 41.6788 234.142 41.1788C233.662 40.6788 233.422 40.0388 233.422 39.2588C233.422 38.4788 233.662 37.8388 234.142 37.3388C234.622 36.8388 235.249 36.5888 236.022 36.5888C236.982 36.5888 237.689 36.9555 238.142 37.6888L237.482 38.1488C237.162 37.6288 236.679 37.3688 236.032 37.3688C235.519 37.3688 235.102 37.5422 234.782 37.8888C234.462 38.2355 234.302 38.6922 234.302 39.2588C234.302 39.8255 234.462 40.2822 234.782 40.6288C235.102 40.9755 235.519 41.1488 236.032 41.1488C236.679 41.1488 237.162 40.8888 237.482 40.3688L238.142 40.8288C237.689 41.5622 236.982 41.9288 236.022 41.9288ZM243.758 39.0688C243.758 39.2155 243.748 39.3655 243.728 39.5188H239.678C239.724 40.0255 239.904 40.4255 240.218 40.7188C240.538 41.0055 240.944 41.1488 241.438 41.1488C242.091 41.1488 242.628 40.8855 243.048 40.3588L243.618 40.8388C243.104 41.5655 242.371 41.9288 241.418 41.9288C240.651 41.9288 240.024 41.6822 239.538 41.1888C239.058 40.6955 238.818 40.0555 238.818 39.2688C238.818 38.4888 239.051 37.8488 239.518 37.3488C239.991 36.8422 240.601 36.5888 241.348 36.5888C242.054 36.5888 242.631 36.8188 243.078 37.2788C243.531 37.7388 243.758 38.3355 243.758 39.0688ZM241.348 37.3688C240.901 37.3688 240.531 37.5022 240.238 37.7688C239.951 38.0288 239.771 38.3855 239.698 38.8388H242.898C242.858 38.3722 242.698 38.0122 242.418 37.7588C242.144 37.4988 241.788 37.3688 241.348 37.3688ZM210.614 53.9288C209.908 53.9288 209.308 53.7855 208.814 53.4988C208.328 53.2122 207.984 52.8122 207.784 52.2988L208.494 51.8888C208.881 52.7155 209.591 53.1288 210.624 53.1288C211.151 53.1288 211.564 53.0188 211.864 52.7988C212.164 52.5722 212.314 52.2722 212.314 51.8988C212.314 51.6122 212.214 51.3788 212.014 51.1988C211.821 51.0122 211.508 50.8655 211.074 50.7588L209.944 50.4888C208.644 50.1755 207.994 49.5522 207.994 48.6188C207.994 48.0322 208.221 47.5588 208.674 47.1988C209.134 46.8322 209.748 46.6488 210.514 46.6488C211.134 46.6488 211.668 46.7688 212.114 47.0088C212.568 47.2422 212.881 47.5488 213.054 47.9288L212.364 48.3488C212.011 47.7488 211.388 47.4488 210.494 47.4488C209.994 47.4488 209.601 47.5522 209.314 47.7588C209.034 47.9588 208.894 48.2422 208.894 48.6088C208.894 48.8888 208.991 49.1155 209.184 49.2888C209.378 49.4622 209.701 49.6022 210.154 49.7088L211.284 49.9788C211.958 50.1388 212.448 50.3755 212.754 50.6888C213.068 50.9955 213.224 51.3888 213.224 51.8688C213.224 52.4888 212.991 52.9888 212.524 53.3688C212.064 53.7422 211.428 53.9288 210.614 53.9288ZM215.241 47.5088C215.135 47.6155 214.998 47.6688 214.831 47.6688C214.665 47.6688 214.525 47.6155 214.411 47.5088C214.305 47.3955 214.251 47.2555 214.251 47.0888C214.251 46.9222 214.305 46.7855 214.411 46.6788C214.525 46.5655 214.665 46.5088 214.831 46.5088C214.998 46.5088 215.135 46.5655 215.241 46.6788C215.355 46.7855 215.411 46.9222 215.411 47.0888C215.411 47.2555 215.355 47.3955 215.241 47.5088ZM214.411 53.7888V48.7288H215.251V53.7888H214.411ZM217.498 53.0488H220.498V53.7888H216.458V53.1488L219.418 49.4688H216.538V48.7288H220.458V49.3688L217.498 53.0488ZM226.159 51.0688C226.159 51.2155 226.149 51.3655 226.129 51.5188H222.079C222.126 52.0255 222.306 52.4255 222.619 52.7188C222.939 53.0055 223.346 53.1488 223.839 53.1488C224.493 53.1488 225.029 52.8855 225.449 52.3588L226.019 52.8388C225.506 53.5655 224.773 53.9288 223.819 53.9288C223.053 53.9288 222.426 53.6822 221.939 53.1888C221.459 52.6955 221.219 52.0555 221.219 51.2688C221.219 50.4888 221.453 49.8488 221.919 49.3488C222.393 48.8422 223.003 48.5888 223.749 48.5888C224.456 48.5888 225.033 48.8188 225.479 49.2788C225.933 49.7388 226.159 50.3355 226.159 51.0688ZM223.749 49.3688C223.303 49.3688 222.933 49.5022 222.639 49.7688C222.353 50.0288 222.173 50.3855 222.099 50.8388H225.299C225.259 50.3722 225.099 50.0122 224.819 49.7588C224.546 49.4988 224.189 49.3688 223.749 49.3688Z" fill="#9C9A9E" />
                                <line x1="248" y1="12.2888" x2="263" y2="12.2888" stroke="#6D09F9" />
                                <rect x="267.4" y="1.18882" width="23.2" height="23.2" rx="11.6" fill="#39C574" />
                                <rect x="267.4" y="1.18882" width="23.2" height="23.2" rx="11.6" stroke="#39C574" strokeWidth="0.8" />
                                <path d="M279.403 10.9128C280.243 10.9128 280.915 11.1528 281.419 11.6328C281.923 12.1048 282.175 12.7568 282.175 13.5888C282.175 14.4848 281.879 15.1888 281.287 15.7008C280.695 16.2048 279.895 16.4568 278.887 16.4568C278.279 16.4568 277.723 16.3568 277.219 16.1568C276.723 15.9488 276.263 15.6328 275.839 15.2088L276.823 14.0208C277.431 14.5968 278.107 14.8848 278.851 14.8848C279.339 14.8848 279.723 14.7728 280.003 14.5488C280.283 14.3248 280.423 14.0168 280.423 13.6248C280.423 13.2408 280.295 12.9368 280.039 12.7128C279.783 12.4888 279.439 12.3768 279.007 12.3768C278.503 12.3768 278.035 12.5328 277.603 12.8448L276.319 12.1968V7.88882H281.647V9.43682H277.939V11.2488C278.355 11.0248 278.843 10.9128 279.403 10.9128Z" fill="white" />
                                <path d="M263.869 41.9288C262.809 41.9288 261.945 41.5855 261.279 40.8988C260.612 40.2122 260.279 39.3422 260.279 38.2888C260.279 37.2422 260.612 36.3755 261.279 35.6888C261.945 34.9955 262.809 34.6488 263.869 34.6488C264.562 34.6488 265.182 34.8088 265.729 35.1288C266.275 35.4488 266.692 35.9122 266.979 36.5188L265.889 37.0988C265.475 36.2588 264.812 35.8388 263.899 35.8388C263.219 35.8388 262.665 36.0688 262.239 36.5288C261.819 36.9888 261.609 37.5755 261.609 38.2888C261.609 39.0022 261.819 39.5888 262.239 40.0488C262.665 40.5088 263.219 40.7388 263.899 40.7388C264.819 40.7388 265.485 40.3188 265.899 39.4788L266.979 40.0588C266.692 40.6655 266.275 41.1288 265.729 41.4488C265.182 41.7688 264.562 41.9288 263.869 41.9288ZM270.11 41.9288C269.317 41.9288 268.67 41.6722 268.17 41.1588C267.677 40.6388 267.43 40.0022 267.43 39.2488C267.43 38.4888 267.677 37.8522 268.17 37.3388C268.664 36.8188 269.31 36.5588 270.11 36.5588C270.91 36.5588 271.557 36.8188 272.05 37.3388C272.544 37.8522 272.79 38.4888 272.79 39.2488C272.79 40.0022 272.544 40.6388 272.05 41.1588C271.557 41.6722 270.91 41.9288 270.11 41.9288ZM269.07 40.3888C269.33 40.6755 269.677 40.8188 270.11 40.8188C270.544 40.8188 270.89 40.6755 271.15 40.3888C271.41 40.0955 271.54 39.7155 271.54 39.2488C271.54 38.7755 271.41 38.3955 271.15 38.1088C270.89 37.8155 270.544 37.6688 270.11 37.6688C269.677 37.6688 269.33 37.8155 269.07 38.1088C268.81 38.3955 268.68 38.7755 268.68 39.2488C268.68 39.7155 268.81 40.0955 269.07 40.3888ZM276.66 36.5588C277.214 36.5588 277.647 36.7288 277.96 37.0688C278.274 37.4022 278.43 37.8755 278.43 38.4888V41.7888H277.21V38.7988C277.21 38.4122 277.13 38.1288 276.97 37.9488C276.817 37.7688 276.574 37.6788 276.24 37.6788C275.867 37.6788 275.567 37.7855 275.34 37.9988C275.12 38.2055 275.01 38.4955 275.01 38.8688V41.7888H273.79V36.6988H274.99V37.4788C275.13 37.1922 275.347 36.9688 275.64 36.8088C275.934 36.6422 276.274 36.5588 276.66 36.5588ZM280.095 41.7888V37.7688H279.115V36.6988H280.095V36.0388C280.095 34.9322 280.685 34.3788 281.865 34.3788C282.158 34.3788 282.435 34.4088 282.695 34.4688V35.4988C282.462 35.4588 282.262 35.4388 282.095 35.4388C281.822 35.4388 281.622 35.4955 281.495 35.6088C281.375 35.7155 281.315 35.8922 281.315 36.1388V36.6988H282.685V37.7688H281.315V41.7888H280.095ZM284.05 35.8488C283.816 35.8488 283.626 35.7788 283.48 35.6388C283.34 35.4922 283.27 35.3088 283.27 35.0888C283.27 34.8688 283.34 34.6888 283.48 34.5488C283.626 34.4022 283.816 34.3288 284.05 34.3288C284.276 34.3288 284.46 34.4022 284.6 34.5488C284.746 34.6888 284.82 34.8688 284.82 35.0888C284.82 35.3088 284.746 35.4922 284.6 35.6388C284.46 35.7788 284.276 35.8488 284.05 35.8488ZM283.44 41.7888V36.6988H284.66V41.7888H283.44ZM288.683 36.6088C288.843 36.6088 288.99 36.6322 289.123 36.6788V37.8188C288.91 37.7855 288.723 37.7688 288.563 37.7688C287.657 37.7688 287.203 38.2722 287.203 39.2788V41.7888H285.983V36.6988H287.183V37.5488C287.31 37.2555 287.503 37.0255 287.763 36.8588C288.03 36.6922 288.337 36.6088 288.683 36.6088ZM296.014 36.5588C296.554 36.5588 296.974 36.7288 297.274 37.0688C297.574 37.4022 297.724 37.8722 297.724 38.4788V41.7888H296.504V38.7788C296.504 38.3988 296.43 38.1222 296.284 37.9488C296.144 37.7688 295.92 37.6788 295.614 37.6788C295.26 37.6788 294.974 37.7855 294.754 37.9988C294.54 38.2055 294.434 38.4922 294.434 38.8588V41.7888H293.214V38.7788C293.214 38.3988 293.14 38.1222 292.994 37.9488C292.854 37.7688 292.63 37.6788 292.324 37.6788C291.97 37.6788 291.687 37.7855 291.474 37.9988C291.26 38.2055 291.154 38.4922 291.154 38.8588V41.7888H289.934V36.6988H291.134V37.4688C291.274 37.1888 291.487 36.9688 291.774 36.8088C292.06 36.6422 292.384 36.5588 292.744 36.5588C293.51 36.5588 294.02 36.8888 294.274 37.5488C294.407 37.2488 294.627 37.0088 294.934 36.8288C295.247 36.6488 295.607 36.5588 296.014 36.5588ZM271.766 52.8888C271.086 53.5822 270.216 53.9288 269.156 53.9288C268.096 53.9288 267.222 53.5822 266.536 52.8888C265.856 52.1888 265.516 51.3222 265.516 50.2888C265.516 49.2555 265.856 48.3922 266.536 47.6988C267.222 46.9988 268.096 46.6488 269.156 46.6488C270.216 46.6488 271.086 46.9988 271.766 47.6988C272.452 48.3922 272.796 49.2555 272.796 50.2888C272.796 51.3222 272.452 52.1888 271.766 52.8888ZM267.486 52.0488C267.912 52.5088 268.469 52.7388 269.156 52.7388C269.842 52.7388 270.399 52.5088 270.826 52.0488C271.252 51.5888 271.466 51.0022 271.466 50.2888C271.466 49.5755 271.252 48.9888 270.826 48.5288C270.399 48.0688 269.842 47.8388 269.156 47.8388C268.469 47.8388 267.912 48.0688 267.486 48.5288C267.059 48.9888 266.846 49.5755 266.846 50.2888C266.846 51.0022 267.059 51.5888 267.486 52.0488ZM276.576 48.6088C276.736 48.6088 276.883 48.6322 277.016 48.6788V49.8188C276.803 49.7855 276.616 49.7688 276.456 49.7688C275.549 49.7688 275.096 50.2722 275.096 51.2788V53.7888H273.876V48.6988H275.076V49.5488C275.203 49.2555 275.396 49.0255 275.656 48.8588C275.923 48.6922 276.229 48.6088 276.576 48.6088ZM281.352 46.4688H282.572V53.7888H281.372V52.9788C281.225 53.2788 280.995 53.5122 280.682 53.6788C280.368 53.8455 280.018 53.9288 279.632 53.9288C278.945 53.9288 278.382 53.6822 277.942 53.1888C277.508 52.6888 277.292 52.0422 277.292 51.2488C277.292 50.4555 277.512 49.8088 277.952 49.3088C278.392 48.8088 278.952 48.5588 279.632 48.5588C280.012 48.5588 280.355 48.6422 280.662 48.8088C280.968 48.9688 281.198 49.1922 281.352 49.4788V46.4688ZM278.932 52.3888C279.192 52.6755 279.538 52.8188 279.972 52.8188C280.405 52.8188 280.752 52.6755 281.012 52.3888C281.272 52.0955 281.402 51.7155 281.402 51.2488C281.402 50.7755 281.272 50.3955 281.012 50.1088C280.752 49.8155 280.405 49.6688 279.972 49.6688C279.538 49.6688 279.192 49.8155 278.932 50.1088C278.672 50.3955 278.542 50.7755 278.542 51.2488C278.542 51.7155 278.672 52.0955 278.932 52.3888ZM288.636 51.1388C288.636 51.2922 288.626 51.4488 288.606 51.6088H284.816C284.883 52.0155 285.043 52.3288 285.296 52.5488C285.556 52.7622 285.896 52.8688 286.316 52.8688C286.896 52.8688 287.369 52.6555 287.736 52.2288L288.466 52.9488C287.959 53.6022 287.229 53.9288 286.276 53.9288C285.463 53.9288 284.809 53.6855 284.316 53.1988C283.823 52.7122 283.576 52.0688 283.576 51.2688C283.576 50.4755 283.813 49.8255 284.286 49.3188C284.766 48.8122 285.389 48.5588 286.156 48.5588C286.896 48.5588 287.493 48.7955 287.946 49.2688C288.406 49.7422 288.636 50.3655 288.636 51.1388ZM286.166 49.6188C285.793 49.6188 285.489 49.7222 285.256 49.9288C285.029 50.1288 284.883 50.4122 284.816 50.7788H287.416C287.389 50.4055 287.266 50.1188 287.046 49.9188C286.826 49.7188 286.533 49.6188 286.166 49.6188ZM292.314 48.6088C292.474 48.6088 292.621 48.6322 292.754 48.6788V49.8188C292.541 49.7855 292.354 49.7688 292.194 49.7688C291.287 49.7688 290.834 50.2722 290.834 51.2788V53.7888H289.614V48.6988H290.814V49.5488C290.941 49.2555 291.134 49.0255 291.394 48.8588C291.661 48.6922 291.967 48.6088 292.314 48.6088Z" fill="#1F1D21" />
                            </svg>

                        </div>
                    </div>

                    <section className="flex flex-col gap-2">
                        <p className="font-brsemi text-lg text-ev-950 ">Estimated Fee</p>
                        <div className="flex items-center gap-1 py-2 px-3 rounded-mm w-[175px] bg-[#F8F4FE] border-[1px] text-[#6D09F9] font-brsemi text-xl border-ev-700 ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1600_15209)">
                                    <path d="M17 20.5012H7C4 20.5012 2 19.0012 2 15.5012V8.50122C2 5.00122 4 3.50122 7 3.50122H17C20 3.50122 22 5.00122 22 8.50122V15.5012C22 19.0012 20 20.5012 17 20.5012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15.0012C13.6569 15.0012 15 13.6581 15 12.0012C15 10.3444 13.6569 9.00122 12 9.00122C10.3431 9.00122 9 10.3444 9 12.0012C9 13.6581 10.3431 15.0012 12 15.0012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1600_15209">
                                        <rect width="24" height="24" fill="white" transform="translate(0 0.0012207)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>₦ {formattedFee}</p>
                        </div>
                    </section>
                    <section className="flex flex-col gap-4">
                        <span className="flex justify-between items-center">
                            <p className="font-brsemi text-lg text-ev-950">Event Schedule</p>
                            <Link to="/StandBy/Nigeria/Event/Schedule">
                                <span className="flex items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9" />
                                    </svg>
                                    Edit
                                </span>
                            </Link>
                        </span>
                        <div className=" space-y-3">
                        {formattedScheduleData.map((schedule, index) => (
                            <div key={index} className="flex justify-between py-3 px-5 rounded-xl bg-[#F9F9FA] flex-wrap"> {/* Each date-time entry */}
                                <p className="font-semibold text-[#181719]">
                                    {schedule.formattedDateRange}. {/* Date */}
                                </p>
                                <p className="font-brmedium text-[#181719]">
                                    {schedule.formattedTimeRange} {/* Time */}
                                </p>
                            </div>
                        ))}
                    </div>

                        {/* <span className="flex justify-between items-center py-3 px-5 rounded-xl bg-[#F9F9FA]">
                            <p className=" font-brmedium text-[#181719]">Time</p>
                            {formattedScheduleData.map((schedule, index) => (
                            
                            ))}
                           
                        </span> */}
                    </section>

                    <section className="flex flex-col gap-4">
                        <span className="flex justify-between items-center">
                            <p className="font-brsemi text-lg text-ev-950">Number of Ambulance and Medics</p>
                            <Link to="/StandBy/Nigeria/Event/Schedule/Ambulance Size">
                                <span className="flex items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9" />
                                    </svg>
                                    Edit
                                </span>
                            </Link>
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
                            <p className="font-brsemi text-lg text-ev-950">Caller Details</p>
                            <Link to='/StandBy/Nigeria' >
                                <span className="flex items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9" />
                                    </svg>
                                    Edit
                                </span>
                            </Link>
                        </span>
                        <div className="flex flex-wrap gap-3 justify-between">
                            <span className="flex flex-col justify-between w-[278px]  py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full ">
                                <p className=" font-brmedium text-[#181719] ">Full Name</p>
                                <p className="font-brreg text-[#6D6D6D]">{storedCallerData.fullName}</p>
                            </span>
                            <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full ">
                                <p className=" font-brmedium text-[#181719]">Email Address</p>
                                <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.emailAddress}</p>
                            </span>
                            <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full ">
                                <p className=" font-brmedium text-[#181719]">Phone Number</p>
                                <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.phoneNumber}</p>
                            </span>
                            {storedCallerData.companyName &&
                                <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full ">
                                    <p className=" font-brmedium text-[#181719]">Company Name</p>
                                    <p className=" font-brreg text-[#6D6D6D]">{storedCallerData.companyName}</p>
                                </span>
                            }
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <span className="flex justify-between items-center">
                            <p className="font-brsemi text-lg text-ev-950">About Event</p>
                            <Link to="/StandBy/Nigeria/Event">
                                <span className="flex items-center gap-1 font-brsemi text-sm text-[#6D09F9]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3838 4.40844L11.5913 1.61532C11.4752 1.49919 11.3374 1.40707 11.1857 1.34422C11.034 1.28137 10.8714 1.24902 10.7072 1.24902C10.543 1.24902 10.3804 1.28137 10.2287 1.34422C10.077 1.40707 9.93921 1.49919 9.82313 1.61532L2.11626 9.32282C1.99976 9.43855 1.90739 9.57627 1.84452 9.72797C1.78165 9.87968 1.74953 10.0424 1.75001 10.2066V12.9997C1.75001 13.3312 1.8817 13.6492 2.11612 13.8836C2.35054 14.118 2.66848 14.2497 3.00001 14.2497H5.79313C5.95734 14.2501 6.12001 14.218 6.27171 14.1551C6.42341 14.0923 6.56112 13.9999 6.67688 13.8834L14.3838 6.17594C14.6181 5.94153 14.7497 5.62365 14.7497 5.29219C14.7497 4.96074 14.6181 4.64285 14.3838 4.40844ZM5.81251 11.2497L10.25 6.81219L10.9375 7.49969L6.50001 11.9372L5.81251 11.2497ZM4.75001 10.1872L4.06251 9.49969L8.50001 5.06219L9.18751 5.74969L4.75001 10.1872ZM3.25001 10.8122L4.21938 11.7816L5.18751 12.7497H3.25001V10.8122ZM12 6.43719L9.56251 3.99969L10.7088 2.85344L13.1463 5.29094L12 6.43719Z" fill="#6D09F9" />
                                    </svg>
                                    Edit
                                </span>
                            </Link>
                        </span>
                        <div className="flex flex-wrap gap-3 justify-between">
                            <span className="flex flex-col justify-between w-[278px]  py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                                <p className=" font-brmedium text-[#181719] ">Venue Name</p>
                                <p className="font-brreg text-[#6D6D6D]">{storedEventData.venueName}</p>
                            </span>
                            <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                                <p className=" font-brmedium text-[#181719]">Venue Address</p>
                                <p className=" font-brreg text-[#6D6D6D]">{storedEventData.venueAddress}</p>
                            </span>
                            <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                                <p className=" font-brmedium text-[#181719]">Estimated No. Guest</p>
                                <p className=" font-brreg text-[#6D6D6D]">{storedEventData.guests}</p>
                            </span>
                            <span className="flex flex-col justify-between w-[278px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                                <p className=" font-brmedium text-[#181719]">Event Type</p>
                                <p className=" font-brreg text-[#6D6D6D]">{storedEventData.eventType}</p>
                            </span>
                            {storedEventData.description &&
                                <span className="flex flex-col  w-[568px] h-[143px] py-3 px-5 rounded-xl bg-[#F9F9FA] max-lg:w-full">
                                    <p className=" font-brmedium text-[#181719]">Description</p>
                                    <p className=" font-brreg text-[#6D6D6D]">{storedEventData.description}</p>
                                </span>
                            }
                        </div>
                    </section>
                </div>
                {iaFlag == "ADMIN" ?
                    ' '
                    :
                    <section className="bg-white max-w-[640px] flex flex-col gap-3 p-6 w-full">
                        <p className="font-brsemi text-2xl text-[#181719]">Booking Policies</p>
                        <div className="flex flex-wrap gap-3 justify-between">
                            <div className=" bg-[#FEF0E6] w-[290px] h-[180px] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                                <p className="text-[#F96D09] font-brbold">No-Cash Policy</p>
                                <span className="text-sm text-[#636066] font-brreg">
                                    We do not accept payment via cash. We accept payment via wire transfers or online banking.
                                </span>
                            </div>
                            <div className=" bg-[#FEF0E6] w-[290px] h-[180px] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                                <p className="text-[#F96D09] font-brbold">Duration of Cover Policy</p>
                                <span className="text-sm text-[#636066] font-brreg ">
                                    <p>Duration of cover is for the period booked. For overtime, and hourly rate of #25000 applied thereafter.</p>
                                </span>
                            </div>
                            <div className=" bg-[#FEF0E6] w-[290px] h-[180px] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full">
                                <p className="text-[#F96D09] font-brbold">Arrival & Departure Policy</p>
                                <span className="text-sm text-[#636066] font-brreg">
                                    We arrive at least one (1) hour before your scheduled start time and depart one (1) hour after your scheduled end time.
                                </span>
                            </div>
                            <div className=" bg-[#FEF0E6] w-[290px] h-[180px] rounded-xl p-6 flex flex-col gap-0 max-lg:w-full ">
                                <p className="text-[#F96D09] font-brbold">Confirmation & Cancellation Policy</p>
                                <span className="text-sm text-[#636066] font-brreg">
                                    1. 100% payment confirms booking
                                    <br /> 2.Cancellations for any reason are allowed up to Two hours in before the scheduled time.
                                </span>
                            </div>
                            <div className=" bg-[#FEF0E6] w-[592px] h-[180px] max-sm:h-full rounded-xl p-6 flex flex-col gap-0 max-lg:w-full max-lg:h-[220px] ">
                                <p className="text-[#F96D09] font-brbold">Refund Policy</p>
                                <span className="text-sm text-[#636066] font-brreg">
                                    1. Notification not received or received 1 days or less before the event or appointment, 100% of the quoted event or appointment fee applies.
                                    <br /> 2. Notification received 8-14 days before the event or appointment, 50% of the quoted event fee applies.
                                    <br /> 3. Notification reviewed 15 days or more before the event or appointment - no fee applies
                                </span>
                            </div>
                        </div>
                    </section>
                }
            </div>
            <div className="flex justify-between fixed bottom-0 bg-white w-full py-6 px-20 max-lg:px-4 max-md:flex-col max-md:gap-3">
                {
                    invId &&
                    
                    <button
                        className={`border border-red-700 rounded-mm px-5 py-3 font-brbold text-lg text-red-700 ${showPopup ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => deleteOrder()}
                    >
                        Delete Order
                    </button>
                }

                <button
                    onClick={() => generateInvoice()}
                    className={`border border-ev-700 rounded-mm px-5 py-3 font-brbold text-lg text-ev-700 ${showPopup ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={showPopup} // Disable the button when showPopup is true
                >
                    Generate Invoice
                </button>
                <span className="flex items-center gap-9 max-md:flex-col-reverse">
                    <button className="font-brsemi text-[#181719] text-lg" onClick={toggleCancel}>Cancel</button>
                    {iaFlag == "ADMIN" ?
                        <div>
                            <button
                                onClick={() => generatePaymentLink()}
                                className={`w-full border border-ev-700 rounded-mm px-5 py-3 font-brbold text-lg text-ev-700 ${showPopup ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={showPopup} // Disable the button when showPopup is true
                            >Generate Payment Link</button>
                        </div>
                        :
                        <div>
                            {showPopup ?
                                <button disabled={showPopup} className="w-full border bg-ev-700 rounded-mm px-5 py-3 font-brsemi text-lg text-white cursor-not-allowed opacity-50">Proceed to Payment</button>
                                :
                                <PaystackButton {...componentProps} />
                            }
                        </div>
                    }

                </span>
            </div>
            <ErrorPopup open={invError} close={() => setInvError(false)} />
            <LinkPopup open={isOpen} close={() => setIsOpen(false)} />
            <PaymentLinkModal open={modalOpen} close={handlePaymentLinkClose} checkoutLink={checkoutLink} />
        </div>
    )
}