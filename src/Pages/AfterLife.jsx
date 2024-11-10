import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from "react-router-dom";
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Subscribed from "@/components/Suscribed";
import line from "@/assets/images/line.png";
import call from "@/assets/images/call.png";
import email from "@/assets/images/EmailIcon.png";
import success from "@/assets/images/ground-success.png";
import location from "@/assets/images/location.png";
import whatsapp from "@/assets/images/Whatsapp.png";


const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function AfterLife() {
    const [token, setToken] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [decoded, setDecoded] = useState('')
    const [deathCertificate, setDeathCertificate] = useState('')
    const bg = "#6D09F9";
    // eslint-disable-next-line no-unused-vars
    const [isPending, setIsPending] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const siginData = JSON.parse(sessionStorage.getItem('SignIn'));
    const userId = siginData?.data?.id
    const [phone, setPhone] = useState('');
    const isValid = isPhoneValid(phone);

    const { addToast } = useToasts();
    let navigate = useNavigate();

    const afterLifeValidation = Yup.object().shape({
        deceasedDetails: Yup.object().shape({
            fullName: Yup.string().required("Full Name is required"),
            gender: Yup.string().required("Gender is required"),
            age: Yup.string().required("Age is required"),
            causeOfDeath: Yup.string().required("Cause of death is required"),
            locationOfDeath: Yup.string().required("Location of death is required"),
            deathCertificate: Yup.bool().oneOf([true], 'Field is required'),
        }),
        transportDetails: Yup.object().shape({
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
            company: Yup.string().required("Relationship with deceased is required")
        }),
    })

    const successData = {
        title: "Request Received!",
        body: "We have successfully received your request. Our team will be in touch shortly to get additional details."
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
        }
    }, []);

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/AfterLife",
            title: "After Life TP",
        })
    }, [])

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        orderId: userId,
        userId: userId,
        country: "NG",
        orderType: "AFTER_LIFE_TRANSPORT",
        deceasedDetails: {
            fullName: '',
            gender: '',
            age: '',
            causeOfDeath: '',
            locationOfDeath: '',
            deathCertificate: deathCertificate
        },
        transportDetails: {
            transportType: "ONE_WAY",
            pickUpLocation: '',
            dropOffLocation: '',
            pickUpDate: '',
            pickUpTime: ''
        },
        callerDetails: {
            fullName: '',
            email: '',
            phone: phone,
            company: ''
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_ORDER_API
        const method = 'post';

        setIsPending(true);
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
            setIsPending(false);
            setModalOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }).catch((error) => {
            setIsPending(false);
            if (Array.isArray(error?.response.data.message)) {
                addToast("All required fields should be filled appropriately, please", {
                    appearance: 'error',
                });
            } else {
                addToast(error?.response.data.message, {
                    appearance: 'error',
                });
            }
            //console.log(error)
            //console.log(values);
        })
    }

    const { values, handleBlur, handleChange, setFieldValue, dirty, isSubmitting, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: afterLifeValidation,
        onSubmit: () => {
            handleSubmit();
        }
    })

    useEffect(() => {
        setFieldValue("deceasedDetails.deathCertificate", deathCertificate);
    }, [deathCertificate, setFieldValue]
    );

    useEffect(() => {
        setFieldValue("callerDetails.phone", phone);
    }, [phone, setFieldValue]
    );

    return (
        <div>
            <NavBar />
            <div className="md:h-full flex flex-col gap-6 md:gap-16 flex-col md:flex-row  md:w-[100%]  md:-px-auto px-[2rem] py-16">
                <div className="md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[60%] md:flex-start">
                    <form action="" className="flex flex-col" noValidate onSubmit={handleSubmit}>
                        <h2 className="text-[#2E0469] font-brsemi text-[40px] max-lg:text-4xl">Book AfterLife Transport</h2>
                        <p className="font-brsemi text-md text-[#636066] my-3">Enter your details for the transport below:</p>
                        <div className="w-[100%] my-6">
                            <h3 className="font-brsemi text-xl font-brsemi mb-3 text-[#181719]">Deceased Details</h3>
                            <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                <label htmlFor="deceasedDetails.fullName" className="font-brsemi text-sm text-[#636066] mb-[10px]">Full Name</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Full Name"
                                    name="deceasedDetails.fullName"
                                    required
                                    id="deceasedDetails.fullName"
                                    value={values.deceasedDetails.fullName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.deceasedDetails?.fullName && errors.deceasedDetails?.fullName &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.deceasedDetails?.fullName}
                                        </small>
                                    </p>
                                }
                            </div>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="deceasedDetails.gender" className="font-brsemi text-sm text-[#636066]">Gender</label>
                                    <select
                                        name="deceasedDetails.gender"
                                        value={values.deceasedDetails.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="bg-transparent appearance-none border-[1px] border-[#E4E3E5] rounded-mm p-4 font-brreg w-full"
                                    >
                                        <option value="" disabled selected label="Select Gender" className="default-option">Select Gender</option>
                                        <option value="Male" label="Male">Male</option>
                                        <option value="Female" label="Female" >Female</option>
                                    </select>

                                    {touched.deceasedDetails?.gender && errors.deceasedDetails?.gender &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.deceasedDetails?.gender}
                                            </small>
                                        </p>
                                    }
                                </div>
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="deceasedDetails.age" className="font-brsemi text-sm text-[#636066]">Age</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Age"
                                        name="deceasedDetails.age"
                                        required
                                        id="deceasedDetails.age"
                                        value={values.deceasedDetails.age}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.deceasedDetails?.age && errors.deceasedDetails?.age &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.deceasedDetails?.age}
                                            </small>
                                        </p>
                                    }
                                </div>

                            </div>






                            <div>
                                <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                    <label htmlFor="deceasedDetails.causeOfDeath" className="font-brsemi text-sm text-[#636066] mb-[10px]">Cause of Death</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Cause of Death"
                                        name="deceasedDetails.causeOfDeath"
                                        required
                                        id="deceasedDetails.causeOfDeath"
                                        value={values.deceasedDetails.causeOfDeath}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.deceasedDetails?.causeOfDeath && errors.deceasedDetails?.causeOfDeath &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.deceasedDetails?.causeOfDeath}
                                            </small>
                                        </p>
                                    }
                                </div>

                                <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                    <label htmlFor="deceasedDetails.locationOfDeath" className="font-brsemi text-sm text-[#636066] mb-[10px]">Location of Death</label>
                                    <input
                                        type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Location of Death"
                                        name="deceasedDetails.locationOfDeath"
                                        required
                                        id="deceasedDetails.locationOfDeath"
                                        value={values.deceasedDetails.locationOfDeath}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.deceasedDetails?.locationOfDeath && errors.deceasedDetails?.locationOfDeath &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.deceasedDetails?.locationOfDeath}
                                            </small>
                                        </p>
                                    }
                                </div>

                                <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                    <label htmlFor="deceasedDetails.deathCerificate" className="font-brsemi text-sm text-[#636066]">Do you have a Death Certificate?</label>
                                    <div className="flex gap-[2rem] items-center my-3 font-brreg">
                                        <div className="flex gap-5 items-center">

                                            <div className={"flex items-center gap-2"}
                                                onClick={() => setDeathCertificate(true)}
                                            >
                                                <input
                                                    type="radio"
                                                    name="deathCertificate"
                                                    className="bg-ev-700"
                                                    value="true"
                                                    checked={deathCertificate === true}
                                                    onChange={() => setDeathCertificate(true)}

                                                />
                                                <p className="font-brsemi text-sm text-[#636066]">Yes</p>
                                            </div>

                                            <div className={"flex items-center gap-2"}
                                                onClick={() => setDeathCertificate(false)}
                                            >
                                                <input
                                                    type="radio"
                                                    name="deathCertificate"
                                                    className="bg-ev-700"
                                                    value="false"
                                                    checked={deathCertificate === false}
                                                    onChange={() => setDeathCertificate(false)}

                                                />
                                                <p className="font-brsemi text-sm text-[#636066]">No</p>
                                            </div>
                                        </div>

                                        {touched.deceasedDetails?.deathCertificate && errors.deceasedDetails?.deathCertificate &&
                                            <p>
                                                <small className='text-xs text-red-500'>
                                                    {errors.deceasedDetails?.deathCertificate}
                                                </small>
                                            </p>
                                        }
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="w-[100%] mb-6">

                            <h3 className="text-xl font-brsemi mb-3 text-[#181719]">Transport Details</h3>

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
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm py-4 px-2 font-brreg  placeholder:text-[#9C9A9E] outline-none bg-transparent "
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
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm py-4 px-2 font-brreg  placeholder:text-[#9C9A9E] outline-none bg-transparent"
                                    name="transportDetails.pickUpTime"
                                    required
                                    id="transportDetails.pickUpTime"
                                    value={values.transportDetails.pickUpTime}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    style={{

                                    }}
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
                                <label htmlFor="phone" className="font-brsemi text-sm text-[#636066] mb-[10px]">Phone Number</label>

                                <div
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-3 outline-none"
                                >
                                    <PhoneInput
                                        defaultCountry="ng"
                                        value={phone}
                                        onChange={(phone) => setPhone(phone.trim())}
                                        hideDropdown="true"
                                        style={{
                                            "--react-international-phone-border-color": "none",
                                            "--react-international-phone-border-radius": "none",
                                            "--react-international-phone-outline": 0,
                                        }}
                                        inputStyle={{}}
                                        className={{}}
                                        inputClassName=""
                                        forceDialCode="true"
                                        inputProps={
                                            {
                                                required: true,
                                                className: "font-brreg w-full pl-3 !outline-none",

                                            }
                                        }

                                    />
                                </div>

                                {!isValid &&
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            Phone Number is not valid
                                        </small>
                                    </p>
                                }
                            </div>

                            <div className="flex flex-col gap-[3px] w-[100%]  py-[0.5rem]">
                                <label htmlFor="callerDetails.fullName" className="font-brsemi text-sm text-[#636066] mb-[10px]">Relationship with Deseased</label>
                                <input
                                    type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Relationship with deceased"
                                    name="callerDetails.company"
                                    required
                                    id="callerDetails.company"
                                    value={values.callerDetails.company}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.callerDetails?.company && errors.callerDetails?.company &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.callerDetails?.company}
                                        </small>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="py-[0.5rem] w-[100%]">
                            <button
                                className={`${!dirty ? 'bg-ev-500' : 'bg-ev-700'} w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]`}
                                type="submit"
                                disabled={!dirty || isSubmitting || !isValid}
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
