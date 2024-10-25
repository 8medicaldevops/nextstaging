import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from "react-router-dom";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Subscribed from "@/components/Suscribed";
import line from "@/assets/images/line.png";
import call from "@/assets/images/call.png";
import email from "@/assets/images/EmailIcon.png";
import success from "@/assets/images/ground-success.png";
import location from "@/assets/images/location.png";
import whatsapp from "@/assets/images/Whatsapp.png";

//import calender from "@/assets/images/calendar.png";
//import clock from "@/assets/images/clock.png";
//import directUp from "@/assets/images/direct-up.png";
//import directDown from "@/assets/images/direct-down.png";

export default function AmbulanceTp() {
    const [token, setToken] = useState('')
    const [loggedOut, setLoggedOut] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [decoded, setDecoded] = useState('')
    const [transportType, setTransportType] = useState('')
    const bg = "#6D09F9";
    // eslint-disable-next-line no-unused-vars
    const [isPending, setIsPending] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const siginData = JSON.parse(sessionStorage.getItem('SignIn'));
    const userId = siginData?.data?.id
    const { addToast } = useToasts();
    let navigate = useNavigate();
    //const pattern = new RegExp("^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$");
    //const phoneRegExp =  new RegExp("^\\+(234){1}-[0-9]{10}$ ");


    const groundAmbulanceValidation = Yup.object().shape({
        patientDetails: Yup.object().shape({
            fullName: Yup.string().required("Full Name is required"),
            gender: Yup.string().required("Gender is required"),
            age: Yup.string().required("Age is required"),
        }),
        transportDetails: Yup.object().shape({
            transportType: Yup.bool().oneOf([true], 'You need to pick a transport type'),
            pickUpLocation: Yup.string().required("Pickup location is required"),
            dropOffLocation: Yup.string().required("Drop-off location is required"),
            pickUpDate: Yup
                .string()
                .required("Pickup date is required"),
            pickUpTime: Yup.string().required("Pickup time is required"),
        }),
        callerDetails: Yup.object().shape({
            fullName: Yup.string().required("Full Name is required"),
            email: Yup.string().required("Contact email is required"),
            phone: Yup.string()
                .required("Contact phone number is required")
                //.matches(pattern, "Phone number is not valid")
                .min(14, "too short")
                .max(14, "too long"),
        }),
    })

    const successData = {
        title: "Request Received!",
        body: "We have successfully received your request for an ambulance transport. Our team will be in touch shortly to get additional details."
    }

    useEffect(() => {
        const signInData = JSON.parse(sessionStorage.getItem('SignIn'));

        if (signInData && signInData.data && signInData.data.tokens) {
            const token = signInData.data.tokens.accessToken || '';
            setToken(signInData.data.tokens.accessToken)
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setDecoded(decodedToken);
                } catch (error) {
                    //console.error('Invalid token:', error);
                }
            } else {
                //console.error('No access token found.');
            }
        } else {
            //console.error('No sign-in data found.');
            setLoggedOut(true);
        }
    }, []);

    useEffect(() => {
        if (loggedOut) {
            addToast("Please, sign in to book Ambulance transport", {
                appearance: 'info',
            });
        }
    }, [addToast, loggedOut])

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/AmbulanceTp",
            title: "Ground Ambulance TP",
        })
    }, [])

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        orderId: userId,
        userId: userId,
        country: "NG",
        orderType: "AMBULANCE_TRANSPORT",
        patientDetails: {
            fullName: '',
            gender: '',
            age: ''
        },
        transportDetails: {
            transportType: transportType,
            pickUpLocation: '',
            dropOffLocation: '',
            pickUpDate: '',
            pickUpTime: ''
        },
        callerDetails: {
            fullName: '',
            email: '',
            phone: '',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_ORDER_API
        const method = 'post';
        axios({
            method: method,
            url: apiUrl,
            data: values,
            headers: {
                "Content-Type": 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
            // eslint-disable-next-line no-unused-vars
        }).then((response) => {
            setModalOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }).catch((error) => {
            if (Array.isArray(error?.response.data.message)) {
                addToast("All required fields should be filled appropriately, please", {
                    appearance: 'error',
                });
            } else {
                addToast(error?.response.data.message, {
                    appearance: 'error',
                });
            }
        })
    }

    const { values, handleBlur, handleChange, setFieldValue, dirty, isSubmitting, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: groundAmbulanceValidation,
        onSubmit: () => {
            handleSubmit();
        }
    })

    useEffect(() => {
        setFieldValue("transportDetails.transportType", transportType);
    }, [transportType, setFieldValue]
    );


    return (
        <div>
            <NavBar />
            <div className="md:h-full flex flex-col gap-6 md:gap-16 flex-col md:flex-row  md:w-[100%]  md:-px-auto px-[2rem] py-16">
                <div className="md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[60%] md:flex-start">

                    <form action="" className="flex flex-col" noValidate onSubmit={handleSubmit}>
                        <h2 className="text-[#2E0469] font-brsemi text-[40px] max-lg:text-4xl">Book Ambulance Transport</h2>
                        <p className="font-brsemi text-md text-[#636066] my-3">Enter your details for the transport below:</p>
                        <div className="w-[100%] my-6">
                            <h3 className="font-brsemi text-xl font-brsemi mb-3 text-[#181719]">Patient Details</h3>
                            <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                <label htmlFor="patientDetails.fullName" className="font-brsemi text-sm text-[#636066] mb-[10px]">Full Name</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Full Name"
                                    name="patientDetails.fullName"
                                    required
                                    id="patientDetails.fullName"
                                    value={values.patientDetails.fullName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.patientDetails?.fullName && errors.patientDetails?.fullName &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.patientDetails?.fullName}
                                        </small>
                                    </p>
                                }
                            </div>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="patientDetails.gender" className="font-brsemi text-sm text-[#636066]">Gender</label>
                                    <select
                                        name="patientDetails.gender"
                                        value={values.patientDetails.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="bg-none appearance-none border-[1px] border-[#E4E3E5] rounded-mm p-4 font-brreg w-full"

                                    >
                                        <option value="" disabled label="Select Gender" className="default-option">Select Gender</option>
                                        <option value="Male" label="Male">Male</option>
                                        <option value="Female" label="Female" >Female</option>

                                    </select>

                                    {touched.patientDetails?.gender && errors.patientDetails?.gender &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.patientDetails?.gender}
                                            </small>
                                        </p>
                                    }
                                </div>
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="patientDetails.age" className="font-brsemi text-sm text-[#636066]">Age</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Age"
                                        name="patientDetails.age"
                                        required
                                        id="patientDetails.age"
                                        value={values.patientDetails.age}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.patientDetails?.age && errors.patientDetails?.age &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.patientDetails?.age}
                                            </small>
                                        </p>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] mb-6">
                            <h3 className="text-xl font-brsemi mb-3 text-[#181719]">Transport Details</h3>
                            <div>
                                <label htmlFor="transportDetails.transportType" className="font-brsemi text-sm text-[#636066]">Transport Type</label>
                                <div className="flex gap-[2rem] items-center my-3 font-brreg">
                                    <div className="flex gap-5 items-center">

                                        <div className={"flex items-center gap-2"}
                                            onClick={() => setTransportType('ONE_WAY')}
                                        >
                                            <input
                                                type="radio"
                                                name="transportType"
                                                className="bg-ev-700"
                                                value="ONE_WAY"
                                                checked={transportType === 'ONE_WAY'}
                                                onChange={() => setTransportType('ONE_WAY')}

                                            />
                                            <p className="font-brsemi text-sm text-[#636066]">One-way</p>
                                        </div>

                                        <div className={"flex items-center gap-2"}
                                            onClick={() => setTransportType('TWO_WAY')}
                                        >
                                            <input
                                                type="radio"
                                                name="transportType"
                                                className="bg-ev-700"
                                                value="TWO_WAY"
                                                checked={transportType === 'TWO_WAY'}
                                                onChange={() => setTransportType('TWO_WAY')}

                                            />
                                            <p className="font-brsemi text-sm text-[#636066]">Round-trip</p>
                                        </div>
                                    </div>

                                    {touched.transportDetails?.transportType && errors.transportDetails?.transportType &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.transportDetails?.transportType}
                                            </small>
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] mb-6">
                            <div className="flex flex-col gap-[3px] py-[0.5rem]">
                                <label htmlFor="pickUp" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Location</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Pickup Location"
                                    name="transportDetails.pickUpLocation"
                                    required
                                    id="transportDetails.pickUpLocation"
                                    value={values.transportDetails.pickUpLocation}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.transportDetails?.pickUpLocation && errors.transportDetails?.pickUpLocation &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.transportDetails?.pickUpLocation}
                                    </small>
                                </p>
                            }
                            <div className="flex flex-col gap-[3px] py-[0.5rem]">
                                <label htmlFor="dropOff" className="font-brsemi text-sm text-[#636066] mb-[10px]">Drop-Off Location</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Drop-off Location"
                                    name="transportDetails.dropOffLocation"
                                    required
                                    id="transportDetails.dropOffLocation"
                                    value={values.transportDetails.dropOffLocation}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.transportDetails?.dropOffLocation && errors.transportDetails?.dropOffLocation &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.transportDetails?.dropOffLocation}
                                    </small>
                                </p>
                            }
                        </div>
                        <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                            <div className="flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="pickupDate" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Date</label>
                                <input
                                    type="date"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Select Date(Calender)"
                                    name="transportDetails.pickUpDate"
                                    required
                                    id="transportDetails.pickUpDate"
                                    value={values.transportDetails.pickUpDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.transportDetails?.pickUpDate && errors.transportDetails?.pickUpDate &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.transportDetails?.pickUpDate}
                                        </small>
                                    </p>
                                }
                            </div>

                            <div className="flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="pickupTime" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Time</label>
                                <input
                                    type="time"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Select Time(Time)"
                                    name="transportDetails.pickUpTime"
                                    required
                                    id="transportDetails.pickUpTime"
                                    value={values.transportDetails.pickUpTime}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.transportDetails?.pickUpTime && errors.transportDetails?.pickUpTime &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.transportDetails?.pickUpTime}
                                        </small>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="w-[100%] my-6">
                            <h3 className="text-xl font-brsemi mb-3 text-[#181719]">Contact Details</h3>

                            <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                <label htmlFor="callerDetails.fullName" className="font-brsemi text-sm text-[#636066] mb-[10px]">Full Name</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Full Name"
                                    name="callerDetails.fullName"
                                    required
                                    id="callerDetails.fullName"
                                    value={values.callerDetails.fullName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.callerDetails?.fullName && errors.callerDetails?.fullName &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.callerDetails?.fullName}
                                        </small>
                                    </p>
                                }
                            </div>
                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="callerDetails.email" className="font-brsemi text-sm text-[#636066] mb-[10px]">Email Address</label>
                                <input
                                    type="email"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Email Address"
                                    name="callerDetails.email"
                                    autoComplete="email"
                                    required
                                    id="callerDetails.email"
                                    value={values.callerDetails.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.callerDetails?.email && errors.callerDetails?.email &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.callerDetails?.email}
                                    </small>
                                </p>
                            }
                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="callerDetails.phone" className="font-brsemi text-sm text-[#636066] mb-[10px]">Phone Number</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="+234-000-000-0000"
                                    name="callerDetails.phone"
                                    required
                                    id="callerDetails.phone"
                                    value={values.callerDetails.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />

                                {/*<div className="flex items-center gap-1 border-[1px] border-[#E4E3E5] w-[568px] max-lg:w-full rounded-mm p-4 font-brreg">
                                    {!values.callerDetails.phone &&
                                        <span className="font-brreg text-[#636066]">+234</span>
                                    }
                                    <input type="text"
                                        className=" font-brreg w-full placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter phone number"
                                        value={values.callerDetails.phone}
                                        name="callerDetails.phone"
                                        onChange={handleInputChange}
                                    />
                                </div>*/}

                            </div>
                            {touched.callerDetails?.phone && errors.callerDetails?.phone &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.callerDetails?.phone}
                                    </small>
                                </p>
                            }
                        </div>
                        <div className="py-[0.5rem] w-[100%]">
                            <button
                                className={`${!dirty ? 'bg-ev-500' : 'bg-ev-700'} w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]`}
                                type="submit"
                                disabled={!dirty || isSubmitting}
                            >
                                Send Request
                                {
                                    isPending ?
                                        <BeatLoader size={4} color="#ffffff" /> :
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                }
                            </button>

                        </div>
                    </form>
                </div>
                <div
                    style={{ '--image-url': `url(${line})` }}
                    className="md:h-full  md:flex-start bg-[image:var(--image-url)] text-white py-6 px-6 rounded-[1rem] hidden md:flex md:flex-col w-fit"
                >
                    <h3 className="font-brsemi text-[25px]">Contact Us Via</h3>
                    <ul className="my-3 font-brlight">
                        <li className="flex items-center gap-2">
                            <img src={email} alt="email icon" className="size-[15px]" />
                            <span>hello@8medical.co</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={call} alt="phone icon" className="size-[15px]" />
                            <span>+2348098888763, +2347071534107</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={whatsapp} alt="whatsapp icon" className="size-[15px]" />
                            <span>+2348098888763</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <img src={location} alt="phone icon" className="size-[15px]" />
                            <span>13 Odiyan Street, Ikate, Lagos, Nigeria</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Subscribed isModalOpen={modalOpen} isModalClosed={() => setModalOpen(false)} img={success} title={successData.title} body={successData.body} bg={bg} />
            </div>
            <Footer />
        </div>
    )
}