// Other countries components 
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ReactGA from "react-ga4";
import ProgressBar from "@/components/ProgressBar";
import ambIcon from "../assets/images/ambicon.svg";
import customerCare from "../assets/images/customercare.svg";


export default function AboutCaller() {
    const navigate = useNavigate();
    const [callerData, setCallerData] = useState({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        companyName: ''

    });
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Load data from session storage on mount
        const storedFormData = JSON.parse(localStorage.getItem('callerData'));
        if (storedFormData) {
            setCallerData(storedFormData);
        }
    }, []);

    useEffect(() => {
        const { fullName, emailAddress, phoneNumber } = callerData;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
        const isPhoneNumberValid = phoneNumber.startsWith('+234') ? phoneNumber.length === 14 : phoneNumber.length === 10 || phoneNumber.length === 11;

        const isFormValid = fullName && isEmailValid && isPhoneNumberValid;
        setIsButtonDisabled(!isFormValid);
    }, [callerData]);

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/StandBy/Nigeria",
            title: "About Caller - Nigeria",
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emailAddress') {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(value));
        }

        setCallerData({ ...callerData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let { phoneNumber } = callerData;

        // Remove leading 0 if present
        if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.substring(1);
        }

        // Prepend +234 only if it does not already have it
        if (!phoneNumber.startsWith('+234')) {
            phoneNumber = '+234' + phoneNumber;
        }
        // console.log(phoneNumber)

        // Validate phone number (simple validation for length)
        const isValid = phoneNumber.length === 14; // +234 followed by 10 digits

        setIsValidPhoneNumber(isValid);

        if (isValid) {
            const updatedCallerData = { ...callerData, phoneNumber };
            localStorage.setItem('callerData', JSON.stringify(updatedCallerData));
            //console.log(updatedCallerData);
            // navigate("/StandBy/Nigeria/Event");
            setIsDialogOpen(true)
        } else {
            console.log("Invalid phone number. It should be 10 digits long.");
        }
    };

     const progressSteps = [
        { label: 'About Caller' },
        { label: 'About Event' },
        { label: 'Schedule' },
        { label: 'Ambulance Size' },
        { label: 'Confirm Order' },
    ];
    const currentStep = 1; // This page is step 1

    return (
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center bg-[#F9F9FA] pb-9 pt-9">

                <div className="pt-9 max-w-[640px] max-lg:w-full max-lg:px-4  rounded-2xl flex flex-col gap-12 bg-white p-9">
                    <div className="flex items-center gap-3 ">
                      <img src={ambIcon} alt="Ambulance Icon" className="" />

                        <p className="font-brsemi text-3xl max-sm:text-2xl max-[410px]:text-2xl text-[#181719] ">Ambulance Standby</p>

                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full">
                            <ProgressBar currentStep={currentStep} steps={progressSteps} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="font-brsemi text-lg text-[#181719]">Contact person details</p>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <span>
                                <label htmlFor="" className="font-brsemi text-sm text-[#636066] " >Full Name of Contact Person</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-[568px] max-lg:w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter full name"
                                    value={callerData.fullName}
                                    name="fullName"
                                    onChange={handleInputChange} />
                            </span>

                            <span>
                                <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Email Address</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-[568px] max-lg:w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter email address"
                                    value={callerData.emailAddress}
                                    name="emailAddress"
                                    onChange={handleInputChange} />
                                {!isValidEmail && (
                                    <small className="text-red-500">Invalid email address.</small>
                                )}
                            </span>

                            <span>
                                <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Phone Number</label>
                                <div className="flex items-center gap-1 border-[1px] border-[#E4E3E5] w-[568px] max-lg:w-full rounded-mm p-4 font-brreg">
                                    {!callerData.phoneNumber &&
                                        <span className="font-brreg text-[#636066]">+234</span>
                                    }
                                    <input type="text"
                                        className=" font-brreg w-full  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter phone number"
                                        value={callerData.phoneNumber}
                                        name="phoneNumber"
                                        onChange={handleInputChange} />

                                </div>
                                {!isValidPhoneNumber && (
                                    <small className="text-red-500">Invalid phone number. It should be +234 followed by 10 digits.</small>
                                )}
                            </span>

                            <span>
                                <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Company Name (Optional)</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-[568px] max-lg:w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter event organiser’s name"
                                    value={callerData.companyName}
                                    name="companyName"
                                    onChange={handleInputChange} />
                            </span>
                        </form>
                    </div>
                    <div className="flex flex-col gap-6">
                        <Dialog open={isDialogOpen} className="">
                            <button disabled={isButtonDisabled} className={isButtonDisabled ? "bg-ev-300 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center " : "bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center"} onClick={handleSubmit} type="submit">Save and Continue
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <DialogContent className=" flex gap-6 bg-white p-6 border-none  h-[665px] max-lg:w-[90%] max-lg:h-[75%] max-mm:h-[90%] w-[580px] max-sm:p-1 sm:rounded-[25px] max-mm:px-0  ">
                                <DialogHeader>
                                    <DialogTitle >
                                        <div className="flex flex-col  pb-6 gap-6 items-center max-lg:pb-0">
                                            <div className="w-full flex justify-center ">
                                                <img src={customerCare} alt="Customer Care" className="" />
                                            </div>
                                           
                                        </div>
                                        <p className="font-brsemi text-center mb-2 text-[#202020] text-2xl max-lg:text-lg  ">Verify Contact Details</p>
                                        <p className="text-center font-brreg text-[#717171] max-lg:text-sm ">Kindly verify that the details below are accurate and a valid point of contact.</p>
                                        {/* </div> */}
                                    </DialogTitle>
                                    <DialogDescription>
                                        <div className="flex flex-col gap-6 ">

                                            <div className="flex flex-col justify-between gap-6 max-lg:gap-5">
                                                <div>
                                                    <span className="flex items-center bg-[#F9F9FA] border-[1px] border-[#F4F2F5] gap-3 rounded-mm p-3 w-full max-lg:p-1 ">
                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12.5" r="12" fill="#6D09F9" />
                                                            <path d="M15.125 7.1875H8.875C7 7.1875 5.75 8.125 5.75 10.3125V14.6875C5.75 16.875 7 17.8125 8.875 17.8125H15.125C17 17.8125 18.25 16.875 18.25 14.6875V10.3125C18.25 8.125 17 7.1875 15.125 7.1875ZM15.4187 10.9938L13.4625 12.5563C13.05 12.8875 12.525 13.05 12 13.05C11.475 13.05 10.9437 12.8875 10.5375 12.5563L8.58125 10.9938C8.38125 10.8313 8.35 10.5312 8.50625 10.3312C8.66875 10.1312 8.9625 10.0938 9.1625 10.2562L11.1188 11.8187C11.5938 12.2 12.4 12.2 12.875 11.8187L14.8313 10.2562C15.0312 10.0938 15.3313 10.125 15.4875 10.3312C15.65 10.5312 15.6187 10.8313 15.4187 10.9938Z" fill="#F4F1FF" />
                                                        </svg>
                                                        <p className="pr-[5px]">Email</p>
                                                        <p className="pl-2 border-l-[1px] border-[#E4E3E5] ">{callerData.emailAddress}</p>
                                                    </span>
                                                </div>
                                                <div className="flex ">
                                                    <span className="flex items-center bg-[#F9F9FA] border-[1px] border-[#F4F2F5] gap-3 rounded-mm p-3 w-full max-lg:p-1">
                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12.5" r="12" fill="#6D09F9" />
                                                            <path d="M11.9062 14.3438L10.75 15.5C10.5062 15.7438 10.1188 15.7438 9.86875 15.5063C9.8 15.4375 9.73125 15.375 9.6625 15.3063C9.01875 14.6563 8.4375 13.975 7.91875 13.2625C7.40625 12.55 6.99375 11.8375 6.69375 11.1313C6.4 10.4188 6.25 9.7375 6.25 9.0875C6.25 8.6625 6.325 8.25625 6.475 7.88125C6.625 7.5 6.8625 7.15 7.19375 6.8375C7.59375 6.44375 8.03125 6.25 8.49375 6.25C8.66875 6.25 8.84375 6.2875 9 6.3625C9.1625 6.4375 9.30625 6.55 9.41875 6.7125L10.8688 8.75625C10.9813 8.9125 11.0625 9.05625 11.1188 9.19375C11.175 9.325 11.2063 9.45625 11.2063 9.575C11.2063 9.725 11.1625 9.875 11.075 10.0188C10.9938 10.1625 10.875 10.3125 10.725 10.4625L10.25 10.9563C10.1812 11.025 10.15 11.1063 10.15 11.2063C10.15 11.2563 10.1563 11.3 10.1688 11.35C10.1875 11.4 10.2063 11.4375 10.2188 11.475C10.3313 11.6813 10.525 11.95 10.8 12.275C11.0812 12.6 11.3812 12.9313 11.7062 13.2625C11.7687 13.325 11.8375 13.3875 11.9 13.45C12.15 13.6938 12.1562 14.0938 11.9062 14.3438Z" fill="#F4F1FF" />
                                                            <path d="M18.7312 16.4562C18.7312 16.6312 18.7 16.8124 18.6375 16.9874C18.6187 17.0374 18.6 17.0874 18.575 17.1374C18.4687 17.3624 18.3313 17.5749 18.15 17.7749C17.8438 18.1124 17.5062 18.3562 17.125 18.5124C17.1187 18.5124 17.1125 18.5187 17.1063 18.5187C16.7375 18.6687 16.3375 18.7499 15.9062 18.7499C15.2688 18.7499 14.5875 18.5999 13.8687 18.2937C13.15 17.9874 12.4312 17.5749 11.7187 17.0562C11.475 16.8749 11.2313 16.6937 11 16.4999L13.0437 14.4562C13.2187 14.5874 13.375 14.6874 13.5062 14.7562C13.5375 14.7687 13.575 14.7874 13.6187 14.8062C13.6687 14.8249 13.7187 14.8312 13.775 14.8312C13.8812 14.8312 13.9625 14.7937 14.0312 14.7249L14.5062 14.2562C14.6625 14.0999 14.8125 13.9812 14.9562 13.9062C15.1 13.8187 15.2437 13.7749 15.4 13.7749C15.5187 13.7749 15.6437 13.7999 15.7812 13.8562C15.9187 13.9124 16.0625 13.9937 16.2188 14.0999L18.2875 15.5687C18.45 15.6812 18.5625 15.8124 18.6312 15.9687C18.6937 16.1249 18.7312 16.2812 18.7312 16.4562Z" fill="#F4F1FF" />
                                                        </svg>
                                                        <p className="">Phone</p>
                                                        <p className="pl-2 border-l-[1px] border-[#E4E3E5]">{callerData.phoneNumber}</p>
                                                    </span>
                                                </div>
                                                <div className=" flex items-center gap-1 max-md:gap-2 max-md:text-left">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(event) => { setIsChecked(event.target.checked) }}
                                                    />
                                                    <label className="font-brreg text-sm max-lg:text-xs text-red-500">I confirm the information above is correct for contact purposes.</label>
                                                </div>

                                                <button onClick={() => { navigate("/StandBy/Nigeria/Event") }} disabled={!isChecked} className={isChecked ? "bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center max-lg:py-1" : "bg-ev-300 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center max-lg:py-1"} type="submit">Save and Continue
                                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>

                                                <button onClick={() => { setIsDialogOpen(false) }} className="bg-white w-full font-brsemi text-lg rounded-mm py-3 text-[#181719] flex justify-center gap-1 items-center max-lg:py-1">Go back and edit</button>

                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Link to="/StandBy" >
                            <button className="bg-white w-full font-brsemi text-lg rounded-mm py-3 text-[#181719] flex justify-center gap-1 items-center">Change Location</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}