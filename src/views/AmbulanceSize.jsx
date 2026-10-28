"use client";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "@/lib/router-compat";
import { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import smallAmbulanceImg__asset from "../assets/images/smallambulance.svg";
const smallAmbulanceImg = smallAmbulanceImg__asset.src ?? smallAmbulanceImg__asset;
import largeAmbulanceImg__asset from "../assets/images/largeambulance.svg";
const largeAmbulanceImg = largeAmbulanceImg__asset.src ?? largeAmbulanceImg__asset;
import sos__asset from "../assets/images/sos.svg";
const sos = sos__asset.src ?? sos__asset;
import ambIcon__asset from "../assets/images/ambicon.svg";
const ambIcon = ambIcon__asset.src ?? ambIcon__asset;
import ProgressBar from "@/components/ProgressBar";
import ReactGA from "react-ga4";

const SMALL_AMBULANCE_COST = 100000; // Cost for 12 hours
const LARGE_AMBULANCE_COST = 130000; // Cost for 12 hours
const MEDIC_COST_PER_12_HOURS = 40000; // Cost per 12 hours for one medic

const roundUpToNextHour = (hours, minutes) => {
  if (minutes > 0) {
    return hours + 1;
  }
  return hours;
};

const calculateTotalCost = (smallAmbulanceCount, largeAmbulanceCount, medicsCount, hours) => {
  const smallAmbulanceCostPerHour = 8500; // Cost per hour for small ambulance
  const largeAmbulanceCostPerHour = 10850; // Cost per hour for large ambulance
  //const medicCostPerHour = MEDIC_COST_PER_12_HOURS; // Cost per hour for medics

  const complete12HourSets = Math.floor(hours / 12);
  const remainingHours = hours % 12;

  const smallAmbulanceTotal =
    smallAmbulanceCount * (complete12HourSets * SMALL_AMBULANCE_COST + remainingHours * smallAmbulanceCostPerHour);
  const largeAmbulanceTotal =
    largeAmbulanceCount * (complete12HourSets * LARGE_AMBULANCE_COST + remainingHours * largeAmbulanceCostPerHour);
  // Calculate medics cost
  const medicCostPer12HourSet = Math.ceil(hours / 12) * MEDIC_COST_PER_12_HOURS;
  const medicsTotal = medicsCount * medicCostPer12HourSet;
  localStorage.setItem('smallAmbulanceTotal', smallAmbulanceTotal.toString());
  localStorage.setItem('largeAmbulanceTotal', largeAmbulanceTotal.toString());
  localStorage.setItem('medicsTotal', medicsTotal.toString());
  return smallAmbulanceTotal + largeAmbulanceTotal + medicsTotal;
};

// const getNumberOfDays = (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   // Calculate the difference in time
//   const timeDiff = end.getTime() - start.getTime();
//   // Calculate the difference in days, ensuring to add one to include the end date's day
//   const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
//   return daysDiff;
// };

const calculateFinalTotalCost = (smallAmbulanceCount, largeAmbulanceCount, medicsCount, hours, startDate, endDate) => {
 // const days = getNumberOfDays(startDate, endDate);
  const dailyTotalCost = calculateTotalCost(smallAmbulanceCount, largeAmbulanceCount, medicsCount, hours);
  return dailyTotalCost ; //* days;
 
};


export default function AmbulanceSize() {

  const [smallAmbulanceCount, setSmallAmbulanceCount] = useState(0);
  const [largeAmbulanceCount, setLargeAmbulanceCount] = useState(0);
  const [medicsCount, setMedicsCount] = useState(1); // Start with 1 to ensure medics cannot be less than 1
  const [estimatedFee, setEstimatedFee] = useState(0)
  const formattedFee = new Intl.NumberFormat().format(estimatedFee);
  const storedScheduleData = JSON.parse(localStorage.getItem('schedule'));

  const [ambulanceData, setAmbulanceData] = useState({
    smallAmbulanceCount,
    largeAmbulanceCount,
    medicsCount,
    estimatedFee
  })


  useEffect(() => {
    // Load data from session storage on mount
    const storedFormData = JSON.parse(localStorage.getItem('ambulanceData'));
    if (storedFormData) {
      setAmbulanceData(storedFormData);
      setSmallAmbulanceCount(storedFormData.smallAmbulanceCount);
      setLargeAmbulanceCount(storedFormData.largeAmbulanceCount);
      setMedicsCount(storedFormData.medicsCount);
      setEstimatedFee(storedFormData.estimatedFee);
    }


  }, []);



  // Define a function to remove AM/PM and convert to 24-hour format
const stripAmPmSuffix = (time) => {
  const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)?/i); // Match hours, minutes, and AM/PM
  if (!timeParts) return time; // If no match, return the original time

  let [ , hours, minutes, period ] = timeParts;
  hours = parseInt(hours, 10);

  if (period) {
    if (period.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};


  useEffect(() => {

    const calculateTotalFee = () => {
      let accumulatedCost = 0;
  
      // Loop through each day in the schedule and calculate fee
      storedScheduleData.forEach((day) => {
        const strippedStartTime = stripAmPmSuffix(day.startTime);
        const strippedEndTime = stripAmPmSuffix(day.endTime);
  
        // Combine date and time for start and end
        const startDateTime = new Date(`${day.startDate} ${strippedStartTime}`);
        let endDateTime = new Date(`${day.endDate} ${strippedEndTime}`);
  
        // Handle cross-midnight scenario
        if (endDateTime < startDateTime && !day.eventEndsSameDay) {
          endDateTime.setDate(endDateTime.getDate() + 1);
        }
  
        const totalMinutes = Math.floor((endDateTime - startDateTime) / (1000 * 60)); // Difference in minutes
        const hours = Math.floor(totalMinutes / 60); // Total hours
        const minutes = totalMinutes % 60; // Remaining minutes
  
        const roundedHours = roundUpToNextHour(hours, minutes); // Adjust hours if necessary
  
        // Calculate cost for the current day
        const dailyCost = calculateFinalTotalCost(
          smallAmbulanceCount,
          largeAmbulanceCount,
          medicsCount,
          roundedHours,
          day.startDate,
          day.endDate
        );
  
        // Add the daily cost to the accumulated cost
        accumulatedCost += dailyCost;
      });
  
      setEstimatedFee(accumulatedCost); // Set the accumulated cost as the total estimated fee
      setAmbulanceData({
        ...ambulanceData,
        estimatedFee: accumulatedCost,
        smallAmbulanceCount : smallAmbulanceCount,
        largeAmbulanceCount : largeAmbulanceCount,
        medicsCount : medicsCount,
    });
    };
  
    if (storedScheduleData && storedScheduleData.length > 0) {
      calculateTotalFee();

    }
  }, [
    storedScheduleData,
    smallAmbulanceCount,
    largeAmbulanceCount,
    medicsCount
  ]);
  

    const progressSteps = [
        { label: 'About Caller' },
        { label: 'About Event' },
        { label: 'Schedule' },
        { label: 'Ambulance Size' },
        { label: 'Confirm Order' },
    ];
    const currentStep = 4; // This page is step 4


  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('ambulanceData', JSON.stringify(ambulanceData));
    //   console.log({
    //     smallAmbulanceCount,
    //     largeAmbulanceCount,
    //     medicsCount,
    //     estimatedFee
    //   });
    navigate("/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order")
  };
  // Increment and decrement functions for small ambulance
  const incrementSmallAmbulance = () => setSmallAmbulanceCount(smallAmbulanceCount + 1);
  const decrementSmallAmbulance = () => setSmallAmbulanceCount(smallAmbulanceCount > 0 ? smallAmbulanceCount - 1 : 0);

  // Increment and decrement functions for large ambulance
  const incrementLargeAmbulance = () => setLargeAmbulanceCount(largeAmbulanceCount + 1);
  const decrementLargeAmbulance = () => setLargeAmbulanceCount(largeAmbulanceCount > 0 ? largeAmbulanceCount - 1 : 0);

  // Increment and decrement functions for medics
  const incrementMedics = () => setMedicsCount(medicsCount + 1);
  const decrementMedics = () => setMedicsCount(medicsCount > 1 ? medicsCount - 1 : 1);

  let addSign =  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.593 7.00123C13.593 7.21107 13.5097 7.41232 13.3613 7.5607C13.2129 7.70908 13.0117 7.79244 12.8018 7.79244H7.79085V12.8034C7.79085 13.0133 7.70749 13.2145 7.55911 13.3629C7.41073 13.5113 7.20948 13.5946 6.99964 13.5946C6.7898 13.5946 6.58856 13.5113 6.44018 13.3629C6.2918 13.2145 6.20844 13.0133 6.20844 12.8034V7.79244H1.19746C0.987616 7.79244 0.786369 7.70908 0.637989 7.5607C0.489609 7.41232 0.40625 7.21107 0.40625 7.00123C0.40625 6.79139 0.489609 6.59014 0.637989 6.44176C0.786369 6.29338 0.987616 6.21002 1.19746 6.21002H6.20844V1.19904C6.20844 0.989203 6.2918 0.787956 6.44018 0.639576C6.58856 0.491196 6.7898 0.407837 6.99964 0.407837C7.20948 0.407837 7.41073 0.491196 7.55911 0.639576C7.70749 0.787956 7.79085 0.989203 7.79085 1.19904V6.21002H12.8018C13.0117 6.21002 13.2129 6.29338 13.3613 6.44176C13.5097 6.59014 13.593 6.79139 13.593 7.00123Z" fill="white" />
                      </svg> ;
  let subtractSign =  <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="white" />
                      </svg>;

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/StandBy/Nigeria/Event/Schedule/ambulance-size",
      title: "Ambulance Size",
    })
  }, [])

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center bg-[#F9F9FA] pt-9 pb-9">
        <div className="pt-9 max-w-[640px] max-lg:w-full   rounded-2xl flex flex-col gap-12 bg-white  max-sm:p-3 p-9 max-lg:p-4">
          <div className="flex items-center gap-3">
            <img src={ambIcon} alt="Ambulance Icon" className="" />
            <p className="font-brsemi text-3xl max-sm:text-2xl max-[410px]:text-2xl text-[#181719] ">Ambulance Standby</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full ">
               <ProgressBar currentStep={currentStep} steps={progressSteps} />
             
            </div>
           
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col  gap-9">
              <p className="font-brsemi text-lg text-[#181719]">Ambulance Sizes</p>
              <div className="flex justify-between gap-2  max-mm:flex-col max-mm:gap-2 max-mm:items-center">
                <span className="w-[278px] h-[191px] flex flex-col gap-4 rounded-xl px-6 pt-6 pb-9 max-mm:w-full bg-[#E4E3E5] max-md:w-[190px] ">
                  <p className="font-brsemi text-[#181719] ">Small Ambulance</p>
                  <div className="flex justify-center">
                   <img src={smallAmbulanceImg} alt="Small Ambulance" className="" />
                  </div>
                </span>
                <span className="w-[278px] h-[191px] flex flex-col gap-4 rounded-xl px-6 pt-6 pb-9 max-mm:w-full  bg-[#E4E3E5] max-md:w-[190px] ">
                  <p className="font-brsemi text-[#181719] ">Large Ambulance</p>
                  <div className="flex justify-center">
                   <img src={largeAmbulanceImg} alt="Small Ambulance" className="" />
                  </div>
                </span>
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <span className="flex cursor-pointer  items-center text-sm text-ev-700 gap-1">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99967 15.1679C11.6663 15.1679 14.6663 12.1679 14.6663 8.50126C14.6663 4.83459 11.6663 1.83459 7.99967 1.83459C4.33301 1.83459 1.33301 4.83459 1.33301 8.50126C1.33301 12.1679 4.33301 15.1679 7.99967 15.1679Z" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 5.83459V9.16793" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.99609 11.1678H8.00208" stroke="#6D09F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-brmedium ">About Ambulances</p>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="bg-none w-full">
                  <img src={sos} alt="sos" />
                  
                </HoverCardContent>
              </HoverCard>
              <p className="font-brsemi text-lg text-[#181719]">Number of Ambulance & Medics</p>
              <span className="flex flex-col gap-6 ">
                <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                  <p className="font-brsemi text-[#181719]">Small Ambulance</p>
                  <div className="flex gap-4 items-center">
                    <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={decrementSmallAmbulance}>
                     {subtractSign}
                    </button>
                    <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{smallAmbulanceCount}</p>
                    <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementSmallAmbulance}>
                     {addSign}
                    </button>
                  </div>
                </span>
                <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                  <p className="font-brsemi text-[#181719]">Large Ambulance</p>
                  <div className="flex gap-4 items-center">
                    <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={decrementLargeAmbulance}>
                      {subtractSign}
                    </button>
                    <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{largeAmbulanceCount}</p>
                    <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementLargeAmbulance}>
                     {addSign}
                    </button>
                  </div>
                </span>
                <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                  <p className="font-brsemi text-[#181719]">No. of Medics</p>
                  <div className="flex gap-4 items-center">
                    <button className={medicsCount === 1 ? "bg-[#E7D7FD] h-6 w-6 rounded flex items-center justify-center" : "bg-ev-700 h-6 w-6 rounded flex items-center justify-center"} onClick={decrementMedics} disabled={medicsCount === 1}>
                      {medicsCount === 1 ? (<svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="#BC8EFC" />
                      </svg>
                      ) : (<svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="white" />
                      </svg>)}
                    </button>
                    <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{medicsCount}</p>
                    <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementMedics}>
                    {addSign}
                    </button>
                  </div>
                </span>
              </span>
              <div className="flex w-[100%] justify-between items-center pt-4 pl-5 ">
                <p className="font-brsemi text-lg text-ev-950 ">Estimated Fee</p>
                <div className="flex items-center gap-1 py-2 px-3 rounded-mm border-[1px] text-[#6D09F9] font-brsemi text-xl border-ev-700 ">
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
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-6">
            <button className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center"
              onClick={handleSubmit}>Save and Continue
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link to="/StandBy/Nigeria/Event/Schedule" >
              <button className="bg-white w-full font-brsemi text-lg rounded-mm py-3 text-[#181719] flex justify-center gap-1 items-center">Go back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
