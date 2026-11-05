"use client";
import NavBar from "../components/NavBar";
import { parseISO, parse, format, isBefore, isSameDay, set } from "date-fns";
import { PaystackButton } from 'react-paystack';
import { Link, useNavigate } from "@/lib/router-compat";
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
import ProgressBar from "@/components/ProgressBar";
import PageLoader from "@/components/PageLoader";

const readJSON = (storage, key) => {
    try {
        return JSON.parse(storage.getItem(key));
    } catch {
        return null;
    }
};

// The order summary needs every earlier booking step. If they are missing (a direct visit, a new
// browser, cleared storage) go back to the start of the flow instead of crashing on a null read.
export default function ConfirmOrder() {
    const navigate = useNavigate();
    const complete =
        !!readJSON(localStorage, "callerData") &&
        !!readJSON(localStorage, "eventData") &&
        Array.isArray(readJSON(localStorage, "schedule")) &&
        !!readJSON(localStorage, "ambulanceData");

    useEffect(() => {
        if (!complete) navigate("/StandBy");
    }, [complete, navigate]);

    return complete ? <ConfirmOrderInner /> : <PageLoader />;
}


function ConfirmOrderInner() {
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
    const [invErrorMsg, setInvErrorMsg] = useState(''); // To hold the specific error message for invoice errors
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
            page: "/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order",
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
        const formattedStartTime = format(startTime, 'h:mm a') || 'N/A';
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
    const handlePaymentLinkClose = () => {
        setModalOpen(false);
        localStorage.clear();
        navigate('/OrderHistory')
    }
    // Paystack Config function
    const config = {
        reference: (new Date()).getTime().toString(),
        email: storedCallerData.emailAddress,
        amount: storedAmbulanceData.estimatedFee * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.VITE_PAYSTACK_KEY,
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
                events: storedScheduleData,
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
            const response = await axios.post(process.env.VITE_BOOKING_API, data);
            //console.log("Response:", response.data);
            navigate("/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order/booking-successful");
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
    const generateInvoice = async () => {
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
                events: storedScheduleData,
                smallAmbulance: storedAmbulanceData.smallAmbulanceCount,
                largeAmbulance: storedAmbulanceData.largeAmbulanceCount,
                noOfMedic: storedAmbulanceData.medicsCount,
            },
            country: "NG",
            orderId: invId || "",
            userId: userId || "",

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
                    `${process.env.VITE_UPDATE_INVOICE}${invId}`
                    :
                    process.env.VITE_GENERATE_INVOICE

                )
                : (
                    invId
                        ? `${process.env.VITE_ORDER_API}${invId}`
                        :
                        process.env.VITE_GENERATE_PAYMENT_LINK
                );
            const unAuthenticatedApiUrl = process.env.VITE_GENERATE_INVOICE_UNAUTHENTICATED

            const method = invId  && userId ? 'patch' : 'post'; // Choose 'patch' if  invId available, otherwise 'post'
            // await function 

            let response = await axios[method](
                userId ? apiUrl : unAuthenticatedApiUrl,
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
            setInvErrorMsg(error?.response?.data?.message || "An error occurred while generating the invoice.");
            //console.error("You are not logged in:", error);
            //navigate("/BookingError");
        } finally {
            setLoading(false);
        }
       
    }

    const deleteOrder = async () => {

        setLoading(!loading)

        const apiUrl = invId && `${process.env.VITE_ORDER_API}${invId}`
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
            localStorage.removeItem("bookingid");
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
                events: storedScheduleData,
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
                ? `${process.env.VITE_ORDER_API}${invId}`
                : process.env.VITE_GENERATE_PAYMENT_LINK;

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
            //navigate("/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order/booking-successful");
        } catch (error) {
            //console.error("Error:", error);
            //navigate("/BookingError");
        } finally {
            setLoading(false);

        }
    }

        const progressSteps = [
        { label: 'About Caller' },
        { label: 'About Event' },
        { label: 'Schedule' },
        { label: 'Ambulance Size' },
        { label: 'Confirm Order' },
    ];
    const currentStep = 5; // This page is step 5

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
                                <image id="image0_1585_10996" width="200" height="36" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>

                        <p className="font-brsemi text-3xl max-sm:text-2xl max-[410px]:text-2xl text-[#181719] ">Ambulance Standby</p>

                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full">
                            <ProgressBar currentStep={currentStep} steps={progressSteps} />
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
                    </section>

                    <section className="flex flex-col gap-4">
                        <span className="flex justify-between items-center">
                            <p className="font-brsemi text-lg text-ev-950">Number of Ambulance and Medics</p>
                            <Link to="/StandBy/Nigeria/Event/Schedule/ambulance-size">
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
                    invId && userId &&

                    <button
                        className={`border border-red-700 rounded-mm px-5 py-3 font-brbold text-lg text-red-700 ${showPopup || !userId ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => deleteOrder()}
                        disabled={!userId}
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

            <ErrorPopup open={invError} errorMsg={invErrorMsg} close={() => setInvError(false)} />


            <LinkPopup open={isOpen} close={() => setIsOpen(false)} userId={userId} />

            <PaymentLinkModal open={modalOpen} close={handlePaymentLinkClose} checkoutLink={checkoutLink} />
        </div>
    )
}