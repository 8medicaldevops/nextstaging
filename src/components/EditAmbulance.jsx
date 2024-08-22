
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
  import usePatchData from "./hooks/patchData";
  import '.././App.css'

 
  
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

  return smallAmbulanceTotal + largeAmbulanceTotal + medicsTotal;
};

const getNumberOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Calculate the difference in time
    const timeDiff = end.getTime() - start.getTime();
    // Calculate the difference in days, ensuring to add one to include the end date's day
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    return daysDiff;
  };
  
  const calculateFinalTotalCost = (smallAmbulanceCount, largeAmbulanceCount, medicsCount, hours, startDate, endDate) => {
    const days = getNumberOfDays(startDate, endDate);
    const dailyTotalCost = calculateTotalCost(smallAmbulanceCount, largeAmbulanceCount, medicsCount, hours);
    return dailyTotalCost * days;
  };


export default function EditAmbulance(props) {
    const [smallAmbulanceCount, setSmallAmbulanceCount] = useState(0);
    const [largeAmbulanceCount, setLargeAmbulanceCount] = useState(0);
    const [medicsCount, setMedicsCount] = useState(1); // Start with 1 to ensure medics cannot be less than 1
    const [estimatedFee, setEstimatedFee] = useState(0)
    const formattedFee = new Intl.NumberFormat().format(estimatedFee);
    

//  console.log(props.bookingData)

    const [ambulanceData, setAmbulanceData ] = useState({
        smallAmbulanceCount,
        largeAmbulanceCount,
        medicsCount,
        estimatedFee
    }) 

    // console.log(ambulanceData)

    const storedScheduleData = {
        startDate: props.bookingData?.ambulances?.startDate || '',
        endDate: props.bookingData?.ambulances?.endDate || '',
        eventEndsSameDay: props.bookingData?.ambulances?.eventEndOnTheSameDay || false,
        startTime: props.bookingData?.ambulances?.startTime || '',
        endTime: props.bookingData?.ambulances?.endTime || '',
    };

    
    useEffect(() => {
      const storedAmbulanceData = {
        smallAmbulanceCount: props.bookingData.ambulances?.smallAmbulance || 0,
        largeAmbulanceCount: props.bookingData.ambulances?.largeAmbulance || 0,
        medicsCount: props.bookingData.ambulances?.noOfMedic || 0,
        estimatedFee: props.bookingData.price || 0,
      };

        if (storedAmbulanceData) {
          setAmbulanceData(storedAmbulanceData);
          setLargeAmbulanceCount(storedAmbulanceData.largeAmbulanceCount);
          setSmallAmbulanceCount(storedAmbulanceData.smallAmbulanceCount);
          setMedicsCount(storedAmbulanceData.medicsCount);
          setEstimatedFee(storedAmbulanceData.estimatedFee);
        }
      }, [props.bookingData]);

    useEffect(() => {
        // Update ambulanceData state when individual states change
        setAmbulanceData({
          smallAmbulanceCount,
          largeAmbulanceCount,
          medicsCount,
          estimatedFee
        });
      }, [smallAmbulanceCount, largeAmbulanceCount, medicsCount, estimatedFee]);

      useEffect(() => {
        const calculateFee = () => {
            const [startHours, startMinutes] = storedScheduleData.startTime.split(":").map(Number);
            const [endHours, endMinutes] = storedScheduleData.endTime.split(":").map(Number);
      
            let totalHours = endHours - startHours;
            let totalMinutes = endMinutes - startMinutes;
      
            if (totalMinutes < 0) {
              totalHours -= 1;
              totalMinutes += 60;
            }
      
            totalHours = roundUpToNextHour(totalHours, totalMinutes);
      
            const totalCost = calculateFinalTotalCost(
              smallAmbulanceCount,
              largeAmbulanceCount,
              medicsCount,
              totalHours,
              storedScheduleData.startDate,
              storedScheduleData.endDate
            );
      
            setEstimatedFee(totalCost);
          };
      
          if (
            storedScheduleData.startTime &&
            storedScheduleData.endTime &&
            storedScheduleData.startDate &&
            storedScheduleData.endDate
          ) {
            calculateFee();
          }
        }, [
          storedScheduleData.startTime,
          storedScheduleData.endTime,
          storedScheduleData.startDate,
          storedScheduleData.endDate,
          smallAmbulanceCount,
          largeAmbulanceCount,
          medicsCount
        ]);
    
 
        const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
        const { response, setResponse, error, loading, patchData } = usePatchData('https://api.staging.8medical.co/order', accessToken);
          
          const handlePatch = () => {
            const id = props.id;
            const patchObject = {
              ambulances: {
                smallAmbulance: smallAmbulanceCount,
                largeAmbulance: largeAmbulanceCount,
                noOfMedic: medicsCount,
                    
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

    // Increment and decrement functions for small ambulance
    const incrementSmallAmbulance = () => setSmallAmbulanceCount(smallAmbulanceCount + 1);
    const decrementSmallAmbulance = () => setSmallAmbulanceCount(smallAmbulanceCount > 0 ? smallAmbulanceCount - 1 : 0);

    // Increment and decrement functions for large ambulance
    const incrementLargeAmbulance = () => setLargeAmbulanceCount(largeAmbulanceCount + 1);
    const decrementLargeAmbulance = () => setLargeAmbulanceCount(largeAmbulanceCount > 0 ? largeAmbulanceCount - 1 : 0);

    // Increment and decrement functions for medics
    const incrementMedics = () => setMedicsCount(medicsCount + 1);
    const decrementMedics = () => setMedicsCount(medicsCount > 1 ? medicsCount - 1 : 1);
    return(
        <div>
            <Dialog open={props.open}>
        <DialogContent className="border-none max-w-[640px] overflow-y-auto no-scrollbar  p-0 max-h-[100%]">
            <DialogHeader>
            <VisuallyHidden.Root>
          <DialogTitle>Booking details</DialogTitle>
          </VisuallyHidden.Root>
            <DialogDescription>
            <div className="flex flex-col justify-center w-[640px] items-center  pt-9 pb-9">  
                <div className="pt-9 max-w-[640px] max-lg:w-full w-full  rounded-2xl flex flex-col gap-12 bg-white  max-sm:p-3 p-9 max-lg:p-4">
                    <div className="flex flex-col gap-6">
                    <div className="flex flex-col  gap-9">
                    <span className="flex items-center justify-between">
                       <p className="font-brsemi text-lg text-[#181719]">Edit Contact person details</p>
                       <p onClick={props.close} className="font-brreg text-lg cursor-pointer bg-[#F9F9FA] px-3 py-1 rounded-full">x</p>
                       </span>

                    <p className="font-brsemi text-lg text-[#181719]">Number of Ambulance & Medics</p>
                    <span className="flex flex-col gap-6 ">
                        <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                            <p className="font-brsemi text-[#181719]">Small Ambulance</p>
                            <div className="flex gap-4 items-center">
                                <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={decrementSmallAmbulance}>
                                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="white"/>
                                    </svg>
                                    </button>
                                <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{smallAmbulanceCount}</p>
                                <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementSmallAmbulance}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.593 7.00123C13.593 7.21107 13.5097 7.41232 13.3613 7.5607C13.2129 7.70908 13.0117 7.79244 12.8018 7.79244H7.79085V12.8034C7.79085 13.0133 7.70749 13.2145 7.55911 13.3629C7.41073 13.5113 7.20948 13.5946 6.99964 13.5946C6.7898 13.5946 6.58856 13.5113 6.44018 13.3629C6.2918 13.2145 6.20844 13.0133 6.20844 12.8034V7.79244H1.19746C0.987616 7.79244 0.786369 7.70908 0.637989 7.5607C0.489609 7.41232 0.40625 7.21107 0.40625 7.00123C0.40625 6.79139 0.489609 6.59014 0.637989 6.44176C0.786369 6.29338 0.987616 6.21002 1.19746 6.21002H6.20844V1.19904C6.20844 0.989203 6.2918 0.787956 6.44018 0.639576C6.58856 0.491196 6.7898 0.407837 6.99964 0.407837C7.20948 0.407837 7.41073 0.491196 7.55911 0.639576C7.70749 0.787956 7.79085 0.989203 7.79085 1.19904V6.21002H12.8018C13.0117 6.21002 13.2129 6.29338 13.3613 6.44176C13.5097 6.59014 13.593 6.79139 13.593 7.00123Z" fill="white"/>
                                    </svg>
                                    </button>
                            </div>
                        </span>
                        <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                            <p className="font-brsemi text-[#181719]">Large Ambulance</p>
                            <div className="flex gap-4 items-center">
                                <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={decrementLargeAmbulance}>
                                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="white"/>
                                    </svg>
                                    </button>
                                <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{largeAmbulanceCount}</p>
                                <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementLargeAmbulance}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.593 7.00123C13.593 7.21107 13.5097 7.41232 13.3613 7.5607C13.2129 7.70908 13.0117 7.79244 12.8018 7.79244H7.79085V12.8034C7.79085 13.0133 7.70749 13.2145 7.55911 13.3629C7.41073 13.5113 7.20948 13.5946 6.99964 13.5946C6.7898 13.5946 6.58856 13.5113 6.44018 13.3629C6.2918 13.2145 6.20844 13.0133 6.20844 12.8034V7.79244H1.19746C0.987616 7.79244 0.786369 7.70908 0.637989 7.5607C0.489609 7.41232 0.40625 7.21107 0.40625 7.00123C0.40625 6.79139 0.489609 6.59014 0.637989 6.44176C0.786369 6.29338 0.987616 6.21002 1.19746 6.21002H6.20844V1.19904C6.20844 0.989203 6.2918 0.787956 6.44018 0.639576C6.58856 0.491196 6.7898 0.407837 6.99964 0.407837C7.20948 0.407837 7.41073 0.491196 7.55911 0.639576C7.70749 0.787956 7.79085 0.989203 7.79085 1.19904V6.21002H12.8018C13.0117 6.21002 13.2129 6.29338 13.3613 6.44176C13.5097 6.59014 13.593 6.79139 13.593 7.00123Z" fill="white"/>
                                    </svg>
                                    </button>
                            </div>
                        </span>
                        <span className="flex justify-between items-center bg-[#F9F9FA] px-5 py-3 rounded-xl w-[100%]">
                            <p className="font-brsemi text-[#181719]">No. of Medics</p>
                            <div className="flex gap-4 items-center">
                                <button className={medicsCount === 1 ? "bg-[#E7D7FD] h-6 w-6 rounded flex items-center justify-center" :"bg-ev-700 h-6 w-6 rounded flex items-center justify-center"} onClick={decrementMedics} disabled={medicsCount === 1}>
                                  {medicsCount === 1 ? (<svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="#BC8EFC"/>
                                    </svg>
                                    ): (<svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1229 1.0013C13.1229 1.19615 13.0454 1.38302 12.9077 1.5208C12.7699 1.65859 12.583 1.73599 12.3882 1.73599H1.61263C1.41777 1.73599 1.2309 1.65859 1.09312 1.5208C0.955335 1.38302 0.87793 1.19615 0.87793 1.0013C0.87793 0.806444 0.955335 0.619571 1.09312 0.481789C1.2309 0.344007 1.41777 0.266602 1.61263 0.266602H12.3882C12.583 0.266602 12.7699 0.344007 12.9077 0.481789C13.0454 0.619571 13.1229 0.806444 13.1229 1.0013Z" fill="white"/>
                                    </svg>) }  
                                    </button>
                                <p className="border-[1px] border-[#E4E3E5] h-8 w-12 rounded flex items-center justify-center">{medicsCount}</p>
                                <button className="bg-ev-700 h-6 w-6 rounded flex items-center justify-center" onClick={incrementMedics}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.593 7.00123C13.593 7.21107 13.5097 7.41232 13.3613 7.5607C13.2129 7.70908 13.0117 7.79244 12.8018 7.79244H7.79085V12.8034C7.79085 13.0133 7.70749 13.2145 7.55911 13.3629C7.41073 13.5113 7.20948 13.5946 6.99964 13.5946C6.7898 13.5946 6.58856 13.5113 6.44018 13.3629C6.2918 13.2145 6.20844 13.0133 6.20844 12.8034V7.79244H1.19746C0.987616 7.79244 0.786369 7.70908 0.637989 7.5607C0.489609 7.41232 0.40625 7.21107 0.40625 7.00123C0.40625 6.79139 0.489609 6.59014 0.637989 6.44176C0.786369 6.29338 0.987616 6.21002 1.19746 6.21002H6.20844V1.19904C6.20844 0.989203 6.2918 0.787956 6.44018 0.639576C6.58856 0.491196 6.7898 0.407837 6.99964 0.407837C7.20948 0.407837 7.41073 0.491196 7.55911 0.639576C7.70749 0.787956 7.79085 0.989203 7.79085 1.19904V6.21002H12.8018C13.0117 6.21002 13.2129 6.29338 13.3613 6.44176C13.5097 6.59014 13.593 6.79139 13.593 7.00123Z" fill="white"/>
                                    </svg>
                                    </button>
                            </div>
                        </span>
                    </span>
                    <div className="flex w-[100%] justify-between items-center pt-4 pl-5 ">
                        <p className="font-brsemi text-lg text-ev-950 ">Estimated Fee</p>
                        <div className="flex items-center gap-1 py-2 px-3 rounded-mm border-[1px] text-[#6D09F9] font-brsemi text-xl border-ev-700 ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1600_15209)">
                        <path d="M17 20.5012H7C4 20.5012 2 19.0012 2 15.5012V8.50122C2 5.00122 4 3.50122 7 3.50122H17C20 3.50122 22 5.00122 22 8.50122V15.5012C22 19.0012 20 20.5012 17 20.5012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15.0012C13.6569 15.0012 15 13.6581 15 12.0012C15 10.3444 13.6569 9.00122 12 9.00122C10.3431 9.00122 9 10.3444 9 12.0012C9 13.6581 10.3431 15.0012 12 15.0012Z" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 9.50122V14.5012" stroke="#6D09F9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1600_15209">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.0012207)"/>
                        </clipPath>
                        </defs>
                        </svg>
                            <p>₦ {formattedFee}</p>
                        </div>
                    </div>
                    </div>
                    
                    </div>
                    <div className="flex items-center justify-end gap-6">
                        <span className="flex items-center gap-3">
                        <p onClick={props.close} className="text-[#181719] cursor-pointer text-lg font-brsemi">Cancel</p>
                    
                       <button onClick={handlePatch}  className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 px-5 text-white flex justify-center gap-1 items-center max-lg:py-1" type="submit">
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