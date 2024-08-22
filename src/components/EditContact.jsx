import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
  import { useState, useEffect } from "react";
  import usePatchData from "./hooks/patchData";
  import '.././App.css'
 

export default function EditContact (props) {

    const [callerData, setCallerData] = useState({
        fullName: '',
        emailAddress: '',
        phoneNumber:  '',
        companyName: ''
        
    });
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    
    

    useEffect(() => {
        // Load data
        const storedFormData = {
            fullName: props.bookingData?.callerDetails?.fullName || '',
            emailAddress: props.bookingData?.callerDetails?.email || '',
            phoneNumber: props.bookingData?.callerDetails?.phone || '',
            companyName: props.bookingData?.callerDetails?.company || '',
            
        };
        if (storedFormData) {
            setCallerData(storedFormData);
        }
    }, [props.bookingData]);

    useEffect(() => {
        const { fullName, emailAddress, phoneNumber } = callerData;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
        const isPhoneNumberValid = phoneNumber 
        ? phoneNumber.startsWith('+234')
            ? phoneNumber.length === 14
            : phoneNumber.length === 10 || phoneNumber.length === 11
        : false;
        const isFormValid = fullName && isEmailValid && isPhoneNumberValid;
        ;
    }, [callerData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emailAddress') {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(value));
        }
            setCallerData({ ...callerData, [name]: value });
    };

  
    const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
    const { response, setResponse, error, loading, patchData } = usePatchData('https://api.staging.8medical.co/order', accessToken);

    const handlePatch = () => {
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
            const id = props.id;
            const patchObject = {
            callerDetails: {
            fullName: callerData.fullName,
            email: callerData.emailAddress,
            phone: phoneNumber,
            company: callerData.companyName
          },
      };
      patchData(id, patchObject);
        } else {
            console.log("Invalid phone number. It should be 10 digits long.");
        }
      
    };
    // Close the dialog and reset the response state after a successful save
    useEffect(() => {
        if (response) {
            setTimeout(() => {
                props.close();
                setResponse(null);
            }, 1000);
        }
    }, [response, props]);

    // Reset response state when the dialog closes
    useEffect(() => {
        if (!props.open) {
        setResponse(null);
        }
    }, [props.open]);
        

    return (
        <div>
        <Dialog open={props.open}>
        <DialogContent className="border-none max-w-[640px] overflow-y-auto no-scrollbar  p-0 max-h-[100%]">
            <DialogHeader>
                <VisuallyHidden.Root>
          <DialogTitle>Booking details</DialogTitle>
          </VisuallyHidden.Root>
            <DialogDescription>
            <div className="flex flex-col rounded-2xl justify-center items-center border-none pb-3 pt-9">
               
               <div className="pt-9 max-w-[640px] max-lg:w-full max-lg:px-4  rounded-2xl flex flex-col gap-12 bg-white p-9">
                       <div className="flex flex-col gap-6">
                        <span className="flex items-center justify-between">
                       <p className="font-brsemi text-lg text-[#181719]">Edit Contact person details</p>
                       <p onClick={props.close} className="font-brreg text-lg cursor-pointer bg-[#F9F9FA] px-3 py-1 rounded-full">x</p>
                       </span>
                       <form className="flex flex-col gap-5" onSubmit={handlePatch}>
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
                           { !callerData.phoneNumber &&
                           <span className="font-brreg text-[#636066]">+234</span>
                           }
                           <input type="text"
                           className=" font-brreg w-full placeholder:text-[#9C9A9E] outline-none "
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
                       <div className="flex items-center justify-end gap-6">
                        <span className="flex items-center gap-3">
                        <p onClick={props.close} className="text-[#181719] cursor-pointer text-lg font-brsemi">Cancel</p>
                    
                       <button onClick={handlePatch}  className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 px-5 text-white flex justify-center gap-1 items-center max-lg:py-1"  type="submit">
                       {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {response && !loading && !error && <p>Success: Order updated</p>}
                        {!loading && !error && !response && <div className="flex items-center gap-1">Save Changes
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}
                    </button>
                    
                    </span>
                       </div>
              </div>
               </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

        </div>
    )
}