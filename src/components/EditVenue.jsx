/// Other countries components 
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link,useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
  import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
  import './../index.css';
  import usePatchData from "./hooks/patchData";
  import '.././App.css'

export default function (props) {
    
    const [eventData, setEventData] = useState({
        venueName : '',
        venueAddress : '',
        guests : '' ,
        eventType : '',
        description : '',
    })
   
   
    useEffect(() => {
        // Load data 
        const storedFormData = {
            venueName: props.bookingData?.ambulances?.eventLocationName || '',
            venueAddress: props.bookingData?.ambulances?.eventAddress   || '',
            guests: props.bookingData?.ambulances?.estimatedNumberOfGuests || '',
            eventType: props.bookingData?.ambulances?.eventType || '',
            description: props.bookingData?.ambulances?.description || '',
        };
        if (storedFormData) {
            setEventData(storedFormData);
        }
    }, [props.bookingData]);

    useEffect(() => {
        const { venueName, venueAddress, guests, eventType } = eventData;
        const isFormValid = venueName && venueAddress && guests && eventType ;
    }, [eventData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSelectChange = (field, value) => {
        setEventData({ ...eventData, [field]: value });
      };

      const handleAddressSelect = (value) => {
        const event = {
          target: {
            name: 'venueAddress',
            value: value.label,
          },
        };
        handleInputChange(event);
      };

      const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
      const { response, setResponse, error, loading, patchData } = usePatchData(import.meta.env.VITE_ORDER_API, accessToken);
    
      const handlePatch = () => {
        const id = props.id;
        const patchObject = {
            eventDetails: {
                eventLocationName: eventData.venueName,
                eventAddress: eventData.venueAddress,
                estimatedNumberOfGuests: eventData.guests,
                eventType: eventData.eventType,
                description: eventData.description,
                
              },
        };
        patchData(id, patchObject);
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

    return(
        <div>
            <Dialog open={props.open}>
        <DialogContent className="border-none max-w-[640px] overflow-y-auto no-scrollbar  p-0 max-h-[100%] ">
            <DialogHeader>
            <VisuallyHidden.Root>
          <DialogTitle>Booking details</DialogTitle>
          </VisuallyHidden.Root>
            <DialogDescription>
        <div className="flex flex-col justify-center  pt-9">
               
               <div className="pt-9 max-w-[640px] max-lg:w-full  rounded-2xl flex flex-col gap-12 bg-white p-9 max-lg:p-4">
                     
                       <div className="flex flex-col gap-6">
                       <span className="flex items-center justify-between">
                       <p className="font-brsemi text-lg text-[#181719]">Edit Event Location details</p>
                       <p onClick={props.close} className="font-brreg text-lg cursor-pointer bg-[#F9F9FA] px-3 py-1 rounded-full">x</p>
                       </span>
                       <form className="flex flex-col gap-5" onSubmit={handlePatch}>
                           <span>
                           <label htmlFor="" className="font-brsemi text-sm text-[#636066] " >Venue Name</label>
                           <input type="text"
                           className="border-[1px] border-[#E4E3E5] h-12 w-[568px] rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none max-lg:w-full "
                           placeholder="Enter venue name"
                           value={eventData.venueName}
                           name="venueName"
                           onChange={handleInputChange} />
                           </span>
   
                           <span>
                           <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Enter venue address</label>
                           {/* <input type="text"
                           className="border-[1px] border-[#E4E3E5] h-12 w-[568px] rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none max-lg:w-full "
                           placeholder="Enter venue address"
                           value={eventData.venueAddress}
                           name="venueAddress"
                           onChange={handleInputChange} /> */}
                           <div className="font-brreg rounded-xl  ">
                            <GooglePlacesAutocomplete
                               apiKey= {import.meta.env.VITE_PLACES_KEY}
                               autocompletionRequest={{
                                  
                                   componentRestrictions: {
                                     country: ['ng'],
                                   }
                                 }}
                               selectProps={{
                               value: eventData.venueAddress ? { label: eventData.venueAddress, value: eventData.venueAddress } : null,
                               onChange: handleAddressSelect,
                               placeholder: "Enter venue address",
                               onFocus:{outline:'none'},
                               styles: {
                                   control: (provided) => ({
                                       ...provided,
                                       
                                       border:'1px solid #E4E3E5',
                                       borderRadius:'8px',
                                       padding:'0px 6px',
                                       height:'48px',
                                       outline:'none'
                                   }),
                                   placeholder: (provided) => ({
                                       ...provided,
                                       color:'#9C9A9E'
                                   }),
                                   input: (provided) => ({
                                   ...provided,
                                   border: 'none',
                                   padding: '0px 0px',
                                   color: '#232323',
                                   maxWidth: '100%',
                                   height:'40px'
                                   }),
                                   option: (provided) => ({
                                   ...provided,
                                   color: '#232323',
                                   border: 'none',
                                   outline: 'none',
                                   }),
                                   singleValue: (provided) => ({
                                   ...provided,
                                   color: '#232323',
                                   outline: 'none',
                                   padding: '0px 0px',
                                   }),
                               },
                               }}
                           />
                           </div>
                           </span>
   
                           <span>
                           <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Estimated Number of Guests</label>
                           <Select onValueChange={(value) => handleSelectChange('guests', value)}>
                           <SelectTrigger className=" border-[1px] border-[#E4E3E5] text-base w-[568px] h-12 text-[#232323] rounded-mm p-4 font-brreg max-lg:w-full">
                               <SelectValue   placeholder={eventData.guests || "Select estimated number of guests"} />
                               
                           </SelectTrigger>
                           <SelectContent className="bg-white rounded-mm text-[#232323]"  >
                               <SelectItem value="Less than 500">Less than 500</SelectItem>
                               <SelectItem value="500 - 1,500">500 - 1,500</SelectItem>
                               <SelectItem value="1,500 - 2,500">1,500 - 2,500</SelectItem>
                               <SelectItem value="2,500 - 5,000">2,500 - 5,000</SelectItem>
                               <SelectItem value="5,000 - 10,000">5,000 - 10,000</SelectItem>
                               <SelectItem value="More than 10,000">More than 10,000</SelectItem>
                           </SelectContent>
                           </Select>
   
                           </span>
   
                           <div>
                           <p className="font-brsemi text-lg text-[#181719]">About Event</p>
                           <span>
                           <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Event Type</label>
                           <Select onValueChange={(value) => handleSelectChange('eventType', value)}>
                           <SelectTrigger className=" border-[1px] border-[#E4E3E5] text-base w-[568px] h-12 text-[#232323] rounded-mm p-4 font-brreg max-lg:w-full">
                               <SelectValue className=" text-6xl " placeholder={eventData.eventType || "Select event type"} />
                           </SelectTrigger>
                           <SelectContent className="bg-white rounded-mm" >
                               <SelectItem value="Wedding">Wedding</SelectItem>
                               <SelectItem value="Conference">Conference</SelectItem>
                               <SelectItem value="Fashion">Fashion</SelectItem>
                               <SelectItem value="Burial">Burial</SelectItem>
                               <SelectItem value="Sports">Sports</SelectItem>
                               <SelectItem value="Corporate">Corporate</SelectItem>
                               <SelectItem value="Music">Music</SelectItem>
                               <SelectItem value="Book Launch">Book Launch</SelectItem>
                               <SelectItem value="Trade">Trade</SelectItem>
                               <SelectItem value="Charity">Charity</SelectItem>
                               <SelectItem value="Festival">Festival</SelectItem>
                               <SelectItem value="Food">Food</SelectItem>
                               <SelectItem value="Production">Production</SelectItem>
                               <SelectItem value="Product Launch">Product Launch</SelectItem>
                               <SelectItem value="Others">Others</SelectItem>
                           </SelectContent>
                           </Select>
                           </span>
   
                           <span>
                           <label htmlFor="" className="font-brsemi text-sm text-[#636066] "  >Description</label>
                           <textarea
                           className="border-[1px] h-36  border-[#E4E3E5] w-[568px] p-4 rounded-mm  font-brreg  placeholder:text-[#9C9A9E] outline-none max-lg:w-full "
                           placeholder="Describe your event (e.g estimated number of guests, outdoor or indoor, e.t.c)" 
                           value={eventData.description}
                           name="description"
                           onChange={handleInputChange} />
                           </span>
                           </div>
                          
                       </form>
                       
                       </div>
                       <div className="flex items-center justify-end gap-6">
                        <span className="flex items-center gap-3">
                        <p onClick={props.close} className="text-[#181719] cursor-pointer text-lg font-brsemi">Cancel</p>
                    
                       <button onClick={handlePatch} disabled={response}  className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 px-5 text-white flex justify-center gap-1 items-center max-lg:py-1"   type="submit">
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