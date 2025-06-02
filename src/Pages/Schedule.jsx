import { useState, useEffect } from "react";
import { format, parse, differenceInMinutes } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactGA from "react-ga4";
import ambIcon from "../assets/images/ambicon.svg";
import ProgressBar from "@/components/ProgressBar";


export default function Schedule() {
  const [schedule, setSchedule] = useState([{
    startDate: null,
    endDate: null,
    eventEndsSameDay: false,
    startTime: '',
    endTime: '',
  }]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('schedule'));
    if (storedFormData) {
      setSchedule(storedFormData);
      if (storedFormData.startDate) {
        setSelectedDate(format(new Date(storedFormData.startDate), 'yyyy-MM-dd'));
      }
    }
    //console.log(storedFormData);
  }, []);

 

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/StandBy/Nigeria/Event/Schedule",
      title: "Event Schedule",
    })
  }, [])

  useEffect(() => {
    const { startDate, eventEndsSameDay } = schedule;

  
    if (startDate) {
      const start = new Date(startDate);
  
      const endDate = eventEndsSameDay 
        ? startDate  // same day event; end date is start date
        : new Date(start.setDate(start.getDate() + 1)).toISOString().split('T')[0]; // next day for overnight event
      
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        endDate,
      }));

    }
  }, [schedule.startDate, schedule.eventEndsSameDay]);
  

 

 // Handle date change for startDate and endDate
 const handleDateChange = (index, field, date) => {
   // Check if the date is a valid Date object
   if (!(date instanceof Date) || isNaN(date)) {
    alert("Invalid date selected");
    console.log("Received date:", date); // For debugging
    return;
  }

  const formattedDate = format(date, 'yyyy-MM-dd');
  const updatedSchedule = [...schedule];
  updatedSchedule[index] = { ...updatedSchedule[index], [field]: formattedDate };

  if (field === 'startDate') {
    if (!updatedSchedule[index].eventEndsSameDay) {
      updatedSchedule[index].endDate = formattedDate;
    } else {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      updatedSchedule[index].endDate = format(nextDay, 'yyyy-MM-dd');
    }
  }

  setSchedule(updatedSchedule);
};
 

// Handle checkbox for 'eventEndsSameDay'
const handleCheckboxChange = (index, checked) => {
  setSchedule((prevSchedule) => {
    const updatedSchedule = [...prevSchedule];
    const currentItem = updatedSchedule[index];

    // Update the checkbox state
    currentItem.eventEndsSameDay = checked;

    // Calculate and set the end date
    if (checked) {
      const nextDay = new Date(currentItem.startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      currentItem.endDate = format(nextDay, 'yyyy-MM-dd'); // Set to the next day
    } else {
      currentItem.endDate = currentItem.startDate; // Set to the same day
    }

    return updatedSchedule;
  });
};


const stripAmPmSuffix = (time12) => {
  return time12.replace(/ (AM|PM)/, '');
};

// function to add new schedule
const addDay = () => {
  setSchedule(prevSchedule => {
    const normalizedSchedule = Array.isArray(prevSchedule) ? prevSchedule : [prevSchedule];
    return [
      ...normalizedSchedule,
      { 
        startDate: null,
        endDate: null,
        eventEndsSameDay: false,
        startTime: '',
        endTime: '',
      }
    ];
  });
};


// Handle time change for startTime and endTime
const handleTimeChange = (index, field, value) => {
  const updatedSchedule = [...schedule];
  updatedSchedule[index] = { ...updatedSchedule[index], [field]: value }; // Update the specific field for the selected day

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  const today = format(new Date(), 'yyyy-MM-dd');

  const strippedStartTime = updatedSchedule[index].startTime ? stripAmPmSuffix(updatedSchedule[index].startTime) : '';
  const strippedEndTime = updatedSchedule[index].endTime ? stripAmPmSuffix(updatedSchedule[index].endTime) : '';
  const strippedValue = stripAmPmSuffix(value);

  // Event validation for same-day end
  if (!updatedSchedule[index].eventEndsSameDay) {
    if (field === 'endTime' && strippedStartTime && strippedValue < strippedStartTime) {
      alert("End time cannot be earlier than the start time for events ending the same day");
      return;
    }
  }

  // Check if the selected date is today to validate against the current time
  if (selectedDate === today) {
    if (field === 'startTime' && strippedValue < currentTime) {
      alert("Start time cannot be earlier than the current time");
      return;
    }

    // If startTime changes and endTime is earlier, automatically set endTime to startTime
    if (field === 'startTime' && strippedEndTime && strippedEndTime < strippedValue) {
      updatedSchedule[index].endTime = value; 
    }
  }

  // Update the state with the validated schedule
  setSchedule(updatedSchedule);
};


const generateTimeOptions = (startTime, isStartTime, selectedDate) => {
  const times = [];
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Determine if the selected date is today
  const isToday = selectedDate && selectedDate.toDateString() === now.toDateString();

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const time24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const suffix = h < 12 ? 'AM' : 'PM';
      const hour12 = h % 12 || 12;
      const time12 = `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;

      // If the selected date is today, skip times earlier than the current time for start time
      if (isToday && isStartTime) {
        if (h < currentHours || (h === currentHours && m < currentMinutes)) {
          continue; // Skip earlier times
        }

      }

      // If eventEndsSameDay is true and we're generating end time options,
      // ensure that the end time is later than the start time
      // if (!isStartTime && schedule.eventEndsSameDay && startTime) {
      //   const strippedStartTime = stripAmPmSuffix(startTime);
      //   if (stripAmPmSuffix(time12) <= strippedStartTime) {
      //     continue; // Skip this time option
      //   }
      // }

      // Add the generated time option to the array
      times.push({ time24, time12 });
    }
  }


  return times;
};



// remove day 
const removeDay = (index) => {
  setSchedule((prevSchedule) => {
    // Create a new array excluding the day at the specified index
    const updatedSchedule = prevSchedule.filter((_, i) => i !== index);

    // Update local storage with the new schedule
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));

    return updatedSchedule;
  });
};






// Calculate hours and minutes for time difference
const calculateHoursAndMinutes = (startTime, endTime, startDate, endDate, eventEndsSameDay) => {
  if (startTime && endTime && startDate && endDate) {
    const strippedStartTime = stripAmPmSuffix(startTime);
    const strippedEndTime = stripAmPmSuffix(endTime);

    // Combine date and time
    const startDateTime = new Date(`${startDate} ${strippedStartTime}`);
    let endDateTime = new Date(`${endDate} ${strippedEndTime}`);

    // Handle cross-midnight scenario
    if (endDateTime < startDateTime) {
      if (eventEndsSameDay) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }
    }

    const totalMinutes = differenceInMinutes(endDateTime, startDateTime);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }
  return { hours: 0, minutes: 0 };
};


///calculate total
const calculateTotalHoursAndMinutes = () => {
  if (!Array.isArray(schedule)) {
    console.error('schedule is not an array:', schedule);
    return { totalHours: 0, totalMinutes: 0 };
  }

  let totalHours = 0;
  let totalMinutes = 0;

  schedule.forEach(day => {
    const { hours, minutes } = calculateHoursAndMinutes(
      day.startTime,
      day.endTime,
      day.startDate,
      day.endDate,
      day.eventEndsSameDay
    );

    totalHours += hours;
    totalMinutes += minutes;
  });

  // Convert excess minutes into hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return { totalHours, totalMinutes };
};


const { totalHours, totalMinutes } = calculateTotalHoursAndMinutes();


useEffect(() => {
  const isFormValid = (Array.isArray(schedule) ? schedule : [schedule]).every(day => {
    const { startDate, startTime, endTime, endDate, eventEndsSameDay } = day;
  
    // Parse the start and end dates to validate
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    // Validate start date, end date, start time, and end time
    const isStartDateValid = !isNaN(startDateObj.getTime());
    const isEndDateValid = !isNaN(endDateObj.getTime());
    const isStartTimeValid = startTime !== '';
    const isEndTimeValid = endTime !== '';
  
    // Check if end date is earlier than start date
    const isEndAfterStart = isEndDateValid && endDateObj >= startDateObj;
  
    // Calculate hours for the current day
    const { hours } = calculateHoursAndMinutes(
      startTime,
      endTime,
      startDate,
      endDate,
      eventEndsSameDay
    );
  
    // Ensure hours is a number and check for negative value
    const isHoursValid = typeof hours === 'number' && hours >= 0;
  
    // Form validation check for this day
    return isStartDateValid && isStartTimeValid && isEndTimeValid && isEndAfterStart && isHoursValid;
  });
  

  // If all days are valid, check if the total hours across all days is valid
  const totalHours = (Array.isArray(schedule) ? schedule : [schedule]).reduce((acc, day) => {
    const { startTime, endTime, startDate, endDate, eventEndsSameDay } = day;
    const { hours } = calculateHoursAndMinutes(startTime, endTime, startDate, endDate, eventEndsSameDay);
    return acc + hours;
  }, 0) || 0; //Default to 0 if schedule is invalid
  

  // Check if total hours is valid (non-negative)
  const isTotalHoursValid = totalHours >= 0;

  // Final form validation
  setIsButtonDisabled(!(isFormValid && isTotalHoursValid));
}, [schedule]);




// Calculate the number of days (accounting for overnight bookings)
const getNumberOfDays = () => {
  const start = new Date(schedule.startDate);
  const end = new Date(schedule.endDate);

  const timeDiff = end.getTime() - start.getTime();

  // If start and end dates are the same but times cross midnight, count as 2 days
  if (timeDiff === 0 && schedule.startTime && schedule.endTime) {
    const strippedStartTime = schedule.startTime.replace(/ (AM|PM)/, '');
    const strippedEndTime = schedule.endTime.replace(/ (AM|PM)/, '');

    const startDateTime = parse(strippedStartTime, 'HH:mm', new Date());
    const endDateTime = parse(strippedEndTime, 'HH:mm', new Date());


    if (endDateTime < startDateTime && schedule.eventEndsSameDay) {

      return 2; // Crosses midnight, so count as 2 days
    }
  }

  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  return daysDiff;
};

const daysDiff = getNumberOfDays();

  //console.log(daysDiff)

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an array of schedule items with their respective hours
    const updatedSchedule = schedule.map((day, index) => ({
      ...day,
      hours: calculateTotalHoursAndMinutes(totalHours,totalMinutes), // You need to implement this function or adjust accordingly
    }));
  
    // Store the updated schedule in local storage
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
  
    // Navigate to the next route
    navigate("/StandBy/Nigeria/Event/Schedule/Ambulance Size");
  };
  

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };


      const progressSteps = [
        { label: 'About Caller' },
        { label: 'About Event' },
        { label: 'Schedule' },
        { label: 'Ambulance Size' },
        { label: 'Confirm Order' },
    ];
    const currentStep = 3; // This page is step 3



  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center bg-[#F9F9FA] pt-9 pb-9">

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
        {(Array.isArray(schedule) ? schedule : [schedule]).map((day, index) => {
        // Calculate hours and minutes for the current day
        const { hours, minutes } = calculateHoursAndMinutes(
          day.startTime,
          day.endTime,
          day.startDate,
          day.endDate,
          day.eventEndsSameDay
        );
         return (
            <div
              key={index}
              className="flex flex-col gap-9 transition-transform transform duration-500 ease-in-out scale-95"
              style={{ transform: 'scale(1)', opacity: 1 }} // Optional inline style for initial state
            >
              <span className="font-brsemi text-lg text-[#181719] flex justify-between items-center">
                <p>
                 {index >= 1 ? `(Day: ${index + 1})` : `Standby Date and Duration`}
                </p>
                { index >= 1 ? 
                  <button onClick={() => removeDay(index)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9199 22C17.4199 22 21.9199 17.5 21.9199 12C21.9199 6.5 17.4199 2 11.9199 2C6.41992 2 1.91992 6.5 1.91992 12C1.91992 17.5 6.41992 22 11.9199 22Z" stroke="#F9091D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.91992 12H15.9199" stroke="#F9091D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
                :
                ''
                }
              </span>
              <DatePickerDemo
                date={day.startDate ? new Date(day.startDate) : null}
                setDate={(date) => handleDateChange(index, 'startDate', date)}
                placeholder="Start Date"
              />
              {day.eventEndsSameDay && (
                <DatePickerDemo
                  date={day.endDate ? new Date(day.endDate) : null}
                  setDate={(date) => handleDateChange(index, 'endDate', date)}
                  placeholder="End Date"
                />
              )}
              <span className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="indeterminate:bg-[#A7A8A9] checked:bg-blue-500"
                  checked={schedule[index]?.eventEndsSameDay || false}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
                <p className="font-brmedium text-[#212121]">Overnight</p>
              </span>
              <span className="flex justify-between max-lg:gap-2">
                <select
                  className="w-[278px] h-12 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl max-lg:w-full max-lg:h-full"
                  value={day.startTime}
                  onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                >
                  <option value="" disabled>Select start time</option>
                  {generateTimeOptions(null, true).map(({ time24, time12 }) => (
                    <option key={time24} value={time24}>{time12}</option>
                  ))}
                </select>
                <select
                  className="w-[278px] h-12 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl max-lg:w-full max-lg:h-full"
                  value={day.endTime}
                  onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                >
                  <option value="" disabled>Select end time</option>
                  {generateTimeOptions(day.startTime, false).map(({ time24, time12 }) => (
                    <option key={time24} value={time24}>{time12}</option>
                  ))}
                </select>
              </span>
              <span className="flex justify-between py-3 px-5 rounded-xl bg-[#F9F9FA]">
                  <p className="font-brsemi text-[#181719]">Event Duration:</p>
                  <span className="flex items-center gap-1">
                    {/* <p className="font-brsemi text-xl text-[#6D09F9]">{hours}:{minutes}hrs</p> */}
                    <p className="font-brsemi text-xl text-[#6D09F9]">{hours}:{minutes}hrs</p>
                    {/* {daysDiff > 1 &&
                      <p className="font-brsemi text-xl text-[#6D09F9]">|{daysDiff}Days</p>
                    } */}
                  </span>
                </span>
             
            </div>
          );
          })}
        <div className="flex flex-col gap-4">
        <small className="flex items-center gap-1 text-[#636066]">
                <p className="text-red-700">*</p> Medics shift coverage is determined per 12-hour period.
              </small>
            <span>
                <button onClick={addDay} className="w-full justify-center flex items-center gap-1 text-lg font-brsemi text-ev-700 bg-white border-2 border-ev-700 rounded-mm py-3 px-5 transition-transform transform duration-500 ease-in-out hover:scale-105">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8H12" stroke="#6D09F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12V4" stroke="#6D09F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                  Add Another Day
                </button>
              </span>
              <span>
                {schedule.length > 1 &&
                <span className="flex justify-between py-3 px-5 rounded-xl bg-[#F9F9FA]">
                  <p className="font-brsemi text-[#181719]">Cummulative Duration:</p>
                  <span className="flex items-center gap-1">

                    {/* <p className="font-brsemi text-xl text-[#6D09F9]">{hours}:{minutes}hrs</p> */}
                    <p className="font-brsemi text-xl text-[#6D09F9]">{totalHours}:{totalMinutes}hrs</p>

                    {/* {daysDiff > 1 &&
                      <p className="font-brsemi text-xl text-[#6D09F9]">|{daysDiff}Days</p>
                    } */}
                  </span>
                </span>
                }
                {daysDiff > 1 &&
                  <small className="flex items-center gap-1 text-[#636066]"> <p className="text-red-700">*</p> You are selecting to book standby from {format(schedule.startDate, 'yyyy-MM-dd')} to {format(schedule.endDate, 'yyyy-MM-dd')} within time periods of {formatTime(schedule.startTime)} to {formatTime(schedule.endTime)}</small>
                }
              </span>
            </div>

          </div>
          <div className="flex flex-col gap-6">

            <button disabled={isButtonDisabled} className={isButtonDisabled ? "bg-ev-300 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center " : "bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 text-white flex justify-center gap-1 items-center"}
              onClick={handleSubmit}>
              Save and Continue
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Link to="/StandBy/Nigeria/Event" >
              <button className="bg-white w-full font-brsemi text-lg rounded-mm py-3 text-[#181719] flex justify-center gap-1 items-center">Go back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export function DatePickerDemo({ date, setDate, placeholder, minDate }) {
  const [open, setOpen] = useState(false);
  const today = new Date();

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false); // Close the popover after selecting a date
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full rounded-xl p-3 border-[1px] border-[#E4E3E5] h-12 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            onClick={() => setOpen(true)} // Open the popover on button click
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={[
              { before: today }
            ]}
            minDate={minDate} // Apply minimum date constraint
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}