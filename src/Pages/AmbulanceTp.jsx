import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import * as Yup from 'yup';

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Subscribed from "@/components/Suscribed";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

    const [transportType, setTransportType] = useState('one-way')
    const bg = "#6D09F9";
    //const [trip, setTrip] = useState('one-way');
    // eslint-disable-next-line no-unused-vars
    const [isPending, setIsPending] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        transportType: '',
        pickUp: '',
        dropOff: '',
        pickupDate: '',
        pickupTime: '',
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactNumber: '',
    });

    const groundAmbulanceValidation = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        gender: Yup.string().required("Gender is required"),
        age: Yup.string().required("Age is required"),
        transportType: Yup.bool().oneOf([true], 'You need to pick a transport type'),
        pickUp: Yup.string().required("Pickup location is required"),
        dropOff: Yup.string().required("Drop-off location is required"),
        pickupTime: Yup.string().required("Pickup time is required"),
        pickupDate: Yup
            .string()
            .required("Start date is required")
            /*.matches(
                /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
                "Date must be in MM/DD/YYYY format"
            ),*/,
        contactFirstName: Yup.string().required("Contact first name is required"),
        contactLastName: Yup.string().required("Contact last name is required"),
        contactEmail: Yup.string().required("Contact email is required"),
        contactNumber: Yup.number().required("Contact phone number is required"),

    })

    const successData = {
        title: "Request Received!",
        body: "We have successfully received your request for an ambulance transport. Our team will be in touch shortly to get additional details."
    }

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/AmbulanceTp",
            title: "Ground Ambulance TP",
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true);
        console.log(values);
    }

    const handleSelectChange = (field, value) => {
        setInitialValues({ ...initialValues, [field]: value });
    };


    const { values, handleBlur, handleChange, errors, touched } = useFormik({
        //validateOnChange: "false",
        //validateOnBlur: "false",
        initialValues: initialValues,
        validationSchema: groundAmbulanceValidation,
        onSubmit: () => {
            handleSubmit();
        }
    })

    return (
        <div>
            <NavBar />
            <div className="md:h-full flex flex-col gap-6 md:gap-16 flex-col md:flex-row  md:w-[100%]  md:-px-auto px-[2rem] py-16">
                <div className="md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[60%] md:flex-start">
                    <form action="" className="flex flex-col" noValidate onSubmit={handleSubmit}>
                        <h2 className="text-[#2E0469] font-brsemi text-[40px] max-lg:text-4xl">Book Ambulance Transport</h2>
                        <p className="font-brsemi text-md text-[#636066] my-3">Enter your details for the transport below:</p>
                        <div className="w-[100%] my-6">
                            <h3 className="font-brsemi text-xl font-brsemi mb-3 text-[#181719]">Patient&apos;s Details</h3>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="firstName" className="font-brsemi text-sm text-[#636066] mb-[10px]">First Name</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter First Name"
                                        value={values.firstName}
                                        name="firstName"
                                        onChange={handleChange}
                                        required
                                        id="firstName"
                                        onBlur={handleBlur}
                                    />
                                    {touched.firstName && errors.firstName &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.firstName}
                                            </small>
                                        </p>
                                    }
                                </div>

                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="lastName" className="font-brsemi text-sm text-[#636066] mb-[10px]">Last Name</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Last Name"
                                        value={values.lastName}
                                        name="lastName"
                                        onChange={handleChange}
                                        required
                                        id="lastName"
                                        onBlur={handleBlur}
                                    />
                                    {touched.lastName && errors.lastName &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.lastName}
                                            </small>
                                        </p>
                                    }
                                </div>

                            </div>

                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3 items-center">
                                <div className="py-[0.5rem] w-1/2 gap-3">
                                    <div className="flex flex-col gap-[3px]">
                                        <label htmlFor="age" className="font-brsemi text-sm text-[#636066] mb-[10px]">Age</label>
                                        <input
                                            type="text"
                                            className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                            placeholder="Enter Age"
                                            name="age"
                                            required
                                            id="age"
                                            value={values.age}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.age && errors.age &&
                                            <p>
                                                <small className='text-xs text-red-500'>
                                                    {errors.age}
                                                </small>
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-1/2">
                                    <div className="flex flex-col gap-[12px]">
                                        <label htmlFor="gender" className="font-brsemi text-sm text-[#636066]">Gender</label>
                                        <Select onValueChange={(value) => handleSelectChange('gender', value)} className="max-w-full">
                                            <SelectTrigger className=" border-[1px] border-[#E4E3E5] text-base h-14 text-[#232323] rounded-mm p-4 font-brreg max-lg:w-full">
                                                <SelectValue className="text-6xl" placeholder={initialValues.gender || "Select Gender"} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white rounded-mm" >
                                                <SelectItem value="Wedding">Male</SelectItem>
                                                <SelectItem value="Conference">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {touched.gender && errors.gender &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.gender}
                                            </small>
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] mb-6">
                            <h3 className="text-xl font-brsemi mb-3 text-[#181719]">Transport Details</h3>
                            <div>
                                <label htmlFor="transportType" className="font-brsemi text-sm text-[#636066]">Transport Type</label>
                                <div className="flex gap-[2rem] items-center my-3 font-brreg">
                                    <div className="flex gap-5 items-center">

                                        <div className={"flex items-center gap-2"}
                                            onClick={() => setTransportType('one-way')}>
                                            <input type="radio" name="transportType" className=" bg-ev-700  " value="one-way" checked={transportType === 'one-way'} onChange={() => setTransportType('one-way')} />

                                            <p className="font-brsemi text-sm text-[#636066]">One-way</p>
                                        </div>

                                        <div className={"flex items-center gap-2"}
                                            onClick={() => setTransportType('two-way')}>
                                            <input type="radio" name="transportType" className=" bg-ev-700" value="two-way" checked={transportType === 'two-way'} onChange={() => setTransportType('two-way')} />

                                            <p className="font-brsemi text-sm text-[#636066]">Two-way</p>
                                        </div>


                                    </div>

                                    {touched.transportType && errors.transportType &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.transportType}
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
                                    name="pickUp"
                                    required
                                    id="pickUp"
                                    value={values.pickUp}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.pickUp && errors.pickUp &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.pickUp}
                                    </small>
                                </p>
                            }
                            <div className="flex flex-col gap-[3px] py-[0.5rem]">
                                <label htmlFor="dropOff" className="font-brsemi text-sm text-[#636066] mb-[10px]">Drop-Off Location</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Drop-off Location"
                                    name="dropOff"
                                    required
                                    id="dropOff"
                                    value={values.dropOff}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.dropOff && errors.dropOff &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.dropOff}
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
                                    name="pickupDate"
                                    required
                                    id="pickupDate"
                                    value={values.pickupDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.pickupDate && errors.pickupDate &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.pickupDate}
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
                                    name="pickupTime"
                                    required
                                    id="pickupTime"
                                    value={values.pickupTime}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.pickupTime && errors.pickupTime &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.pickupTime}
                                        </small>
                                    </p>
                                }
                            </div>

                        </div>

                        <div className="w-[100%] my-6">
                            <h3 className="text-xl font-brsemi mb-3 text-[#181719]">Contact Details</h3>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="contactFirstName" className="font-brsemi text-sm text-[#636066] mb-[10px]">First Name</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter First Name"
                                        name="contactFirstName"
                                        required
                                        id="contactFirstName"
                                        value={values.contactFirstName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.contactFirstName && errors.contactFirstName &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.contactFirstName}
                                            </small>
                                        </p>
                                    }
                                </div>

                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="contactLastName" className="font-brsemi text-sm text-[#636066] mb-[10px]"  >Last Name</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Last Name"
                                        name="contactLastName"
                                        required
                                        id="contactLastName"
                                        value={values.contactLastName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.contactLastName && errors.contactLastName &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.contactLastName}
                                            </small>
                                        </p>
                                    }
                                </div>
                            </div>

                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="email" className="font-brsemi text-sm text-[#636066] mb-[10px]">Email Address</label>
                                <input
                                    type="email"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Email Address"
                                    name="contactEmail"
                                    autoComplete="email"
                                    required
                                    id="contactEmail"
                                    value={values.contactEmail}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.contactEmail && errors.contactEmail &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.contactEmail}
                                    </small>
                                </p>
                            }
                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="contactNumber" className="font-brsemi text-sm text-[#636066] mb-[10px]">Phone Number</label>
                                <input
                                    type="tel"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Phone Number"
                                    name="contactNumber"
                                    required
                                    id="contactNumber"
                                    value={values.contactNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {touched.contactNumber && errors.contactNumber &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.contactNumber}
                                    </small>
                                </p>
                            }
                        </div>
                        <div className="py-[0.5rem] w-[100%]">
                            <button
                                className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]"
                                type="submit"
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
                    className="md:h-full md:w-[40%] md:flex-start bg-[image:var(--image-url)] text-white py-6 px-6 rounded-[1rem] hidden md:flex md:flex-col"
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