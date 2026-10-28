"use client";
/// Other countries components 
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "@/lib/router-compat";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../index.css';
import ReactGA from "react-ga4";
import ProgressBar from "@/components/ProgressBar";
import ambIcon__asset from "../assets/images/ambicon.svg";
const ambIcon = ambIcon__asset.src ?? ambIcon__asset;
export default function AboutEvent() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        venueName: '',
        venueAddress: '',
        guests: '',
        eventType: '',
        description: '',
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Load data from session storage on mount
        const storedFormData = JSON.parse(localStorage.getItem('eventData'));
        if (storedFormData) {
            setEventData(storedFormData);
        }
    }, []);

    useEffect(() => {
        const { venueName, venueAddress, guests, eventType } = eventData;
        const isFormValid = venueName && venueAddress && guests && eventType;
        setIsButtonDisabled(!isFormValid);
    }, [eventData]);

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "StandBy/Nigeria/Event",
            title: "About Event - Nigeria",
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSelectChange = (field, value) => {
        setEventData({ ...eventData, [field]: value });
    };

    const handleAddressSelect = (value) => {
        if (!value) {
          // Clear the value if null
          setEventData((prev) => ({ ...prev, venueAddress: '' }));
          return;
        }
      
        const event = {
          target: {
            name: 'venueAddress',
            value: value.label,
          },
        };
        handleInputChange(event);
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('eventData', JSON.stringify(eventData));
        //console.log(eventData);
        navigate("/StandBy/Nigeria/Event/Schedule")


    };

      const progressSteps = [
        { label: 'About Caller' },
        { label: 'About Event' },
        { label: 'Schedule' },
        { label: 'Ambulance Size' },
        { label: 'Confirm Order' },
    ];
    const currentStep = 2; // This page is step 2

    return (
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center bg-[#F9F9FA] pt-9">

                <div className="pt-9 max-w-[640px] max-lg:w-full  rounded-2xl flex flex-col gap-12 bg-white p-9 max-lg:p-4">
                    <div className="flex items-center gap-3">
                         <img src={ambIcon} alt="Ambulance Icon" className="" />

                        <p className="font-brsemi text-3xl max-sm:text-2xl max-[410px]:text-2xl text-[#181719] ">Ambulance Standby</p>

                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full">
                            <ProgressBar currentStep={currentStep} steps={progressSteps} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="font-brsemi text-lg text-[#181719]">Event Location</p>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                                <div className="font-brreg rounded-xl  ">
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.VITE_PLACES_KEY}
                                    autocompletionRequest={{
                                        componentRestrictions: {
                                        country: ['ng'],
                                        },
                                    }}
                                    selectProps={{
                                        value: eventData.venueAddress
                                        ? { label: eventData.venueAddress, value: eventData.venueAddress }
                                        : null,
                                        onChange: handleAddressSelect,
                                        placeholder: 'Enter venue address',
                                        isClearable: true, //  Required!
                                        components: {
                                        DropdownIndicator: () => null, // remove arrow
                                        IndicatorSeparator: () => null,
                                        ClearIndicator: (props) =>
                                            ClearIndicator({
                                            ...props,
                                            selectProps: {
                                                ...props.selectProps,
                                                setEventData,
                                            },
                                            }),
                                        },
                              styles: {
                                control: (provided) => ({
                                  ...provided,
                                  border: '1px solid #E4E3E5',
                                  borderRadius: '8px',
                                  padding: '0px 6px',
                                  height: '48px',
                                  outline: 'none',
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: '#9C9A9E',
                                }),
                                input: (provided) => ({
                                  ...provided,
                                  border: 'none',
                                  padding: '0px 0px',
                                  color: '#232323',
                                  maxWidth: '100%',
                                  height: '40px',
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
                                        <SelectValue placeholder={eventData.guests || "Select estimated number of guests"} />

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
                                    <label htmlFor="" className="font-brsemi text-sm text-[#636066]">Event Type</label>
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
                    <div className="flex flex-col gap-6">

                        <button disabled={isButtonDisabled} className={isButtonDisabled ? "bg-ev-300 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center " : "bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center"} onClick={handleSubmit}>Save and Continue
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <Link to="/StandBy/Nigeria" >
                            <button className="bg-white w-full font-brsemi text-lg rounded-mm py-3 text-[#181719] flex justify-center gap-1 items-center">Go back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}



const ClearIndicator = (props) => {
    const {
      innerRef,
      innerProps,
      selectProps: { setEventData },
    } = props;
  
    return (
      <div
        ref={innerRef}
        {...innerProps}
        onClick={(e) => {
          e.stopPropagation();
          setEventData((prev) => ({ ...prev, venueAddress: '' }));
        }}
        style={{ padding: '0 8px', cursor: 'pointer' }}
      >
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 2.45557C5.40866 2.45557 1.66699 6.19723 1.66699 10.7889C1.66699 15.3806 5.40866 19.1222 10.0003 19.1222C14.592 19.1222 18.3337 15.3806 18.3337 10.7889C18.3337 6.19723 14.592 2.45557 10.0003 2.45557ZM12.8003 12.7056C13.042 12.9472 13.042 13.3472 12.8003 13.5889C12.6753 13.7139 12.517 13.7722 12.3587 13.7722C12.2003 13.7722 12.042 13.7139 11.917 13.5889L10.0003 11.6722L8.08366 13.5889C7.95866 13.7139 7.80033 13.7722 7.64199 13.7722C7.48366 13.7722 7.32533 13.7139 7.20033 13.5889C6.95866 13.3472 6.95866 12.9472 7.20033 12.7056L9.11699 10.7889L7.20033 8.87223C6.95866 8.63057 6.95866 8.23057 7.20033 7.9889C7.44199 7.74723 7.84199 7.74723 8.08366 7.9889L10.0003 9.90557L11.917 7.9889C12.1587 7.74723 12.5587 7.74723 12.8003 7.9889C13.042 8.23057 13.042 8.63057 12.8003 8.87223L10.8837 10.7889L12.8003 12.7056Z" fill="#181719"/>
        </svg>

      </div>
    );
  };