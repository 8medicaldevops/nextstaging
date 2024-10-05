import { useState } from "react";
import { BeatLoader } from "react-spinners";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function AmbulanceTp() {

    const [trip, setTrip] = useState('one-way');
    // eslint-disable-next-line no-unused-vars
    const [isPending, setIsPending] = useState(false);

    function handleSubmit() {
        console.log("test");
    }

    return (
        <div>
            <NavBar />
            <div className="md:h-full flex flex-col gap-6 md:gap-16 flex-col md:flex-row  md:w-[100%]  md:-px-auto px-[2rem] py-16">
                <div className="md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[70%] md:flex-start">
                    <form action="" className="flex flex-col" noValidate onSubmit={handleSubmit}>
                        <h2 className="text-ev-700 font-brsemi text-[40px] max-lg:text-4xl">Book Ambulance Transport</h2>
                        <p className="font-brsemi text-md text-[#636066] my-3">Enter your details for the transport below:</p>
                        <div className="w-[100%] my-6">
                            <h3 className="font-brsemi text-xl font-brsemi mb-3">Patient&apos;s Details</h3>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="firstName" className="font-brsemi text-sm text-[#636066] mb-[10px]">First Name</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        required
                                        id="firstName"
                                    />
                                </div>
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="lastName" className="font-brsemi text-sm text-[#636066] mb-[10px]"  >Last Name</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Last Name"
                                        name="lastName"
                                        required
                                        id="lastName"
                                    />
                                </div>
                            </div>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="gender" className="font-brsemi text-sm text-[#636066] mb-[10px]">Gender</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Select Gender(Dropdown)"
                                        name="gender"
                                        required
                                        id="gender"
                                    />
                                </div>
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="age" className="font-brsemi text-sm text-[#636066] mb-[10px]">Age</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Age"
                                        name="age"
                                        required
                                        id="age"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] mb-6">
                            <h3 className="text-xl font-brsemi mb-3">Transport Details</h3>
                            <div>
                                <label htmlFor="transport-type" className="font-brsemi text-sm text-[#636066]">Transport Type</label>
                                <div className="flex gap-[2rem] items-center my-3 font-brreg">
                                    <div className="flex gap-[5px] items-center">
                                        <input type="radio" name="transport-type" className=" bg-ev-700  " value="Nigeria" checked={trip === 'one-way'} onChange={() => setTrip('one-way')} />
                                        <span>One way</span>
                                    </div>
                                    <div className="flex gap-[5px] items-center">
                                        <input type="radio" name="transport-type" className=" bg-ev-700  " value="Nigeria" checked={trip === 'one-way'} onChange={() => setTrip('one-way')} />
                                        <span>Two way</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] mb-6">
                            <div className="flex flex-col gap-[3px] py-[0.5rem]">
                                <label htmlFor="pickUp" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Location</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Pickup Location"
                                    name="pickUp"
                                    required
                                    id="pickUp"
                                />
                            </div>
                            <div className="flex flex-col gap-[3px] py-[0.5rem]">
                                <label htmlFor="dropOff" className="font-brsemi text-sm text-[#636066] mb-[10px]">Drop-Off Location</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Drop-off Location"
                                    name="dropOff"
                                    required
                                    id="dropOff"
                                />
                            </div>
                        </div>
                        <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                            <div className="flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="pickupDate" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Date</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Select Date(Calender)"
                                    name="pickupDate"
                                    required
                                    id="pickupDate"
                                />
                            </div>
                            <div className="flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="pickupTime" className="font-brsemi text-sm text-[#636066] mb-[10px]">Pickup Time</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Select Time(Time)"
                                    name="time"
                                    required
                                    id="time"
                                />
                            </div>
                        </div>

                        <div className="w-[100%] my-6">
                            <h3 className="text-xl font-brsemi mb-3">Contact Details</h3>
                            <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="contactFirstName" className="font-brsemi text-sm text-[#636066] mb-[10px]">First Name</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter First Name"
                                        name="contactFirstName"
                                        required
                                        id="contactFirstName"
                                    />
                                </div>
                                <div className="flex flex-col gap-[3px] w-1/2">
                                    <label htmlFor="contactLastName" className="font-brsemi text-sm text-[#636066] mb-[10px]"  >Last Name</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter Last Name"
                                        name="contactLastName"
                                        required
                                        id="contactLastName"
                                    />
                                </div>
                            </div>
                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="email" className="font-brsemi text-sm text-[#636066] mb-[10px]">Email Address</label>
                                <input type="email"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Email Address"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    id="emailAddress"
                                />
                            </div>
                            <div className="py-[0.5rem] flex flex-col">
                                <label htmlFor="email" className="font-brsemi text-sm text-[#636066] mb-[10px]">Phone Number</label>
                                <input type="number"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Phone Number"
                                    name="phoneNumber"
                                    required
                                    id="phoneNumber"
                                />
                            </div>
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
                <div className="md:h-full md:w-[30%] md:flex-start">
                    <p className="hidden md:flex mx-auto rounded-[1rem]">Placeholder</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}