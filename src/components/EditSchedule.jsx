 
import { useState, useEffect } from "react";
import { format, parse, differenceInMinutes, formatDate  } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import NavBar from "../components/NavBar" ;
import { Link , useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  

export default function (props) {
    const [schedule, setSchedule] = useState({
        startDate: null,
        endDate: null,
        eventEndsSameDay: true,
        startTime: '',
        endTime: '',
      });
      
      const [selectedDate, setSelectedDate] = useState('');
      //const selectedDate = format(new Date(), 'yyyy-MM-dd')
      //console.log(selectedDate)
    
          useEffect(() => {
            const storedFormData = {
              startDate: props.bookingData?.ambulances?.startDate || '',
              endDate: props.bookingData?.ambulances?.endDate || '',
              eventEndsSameDay: props.bookingData?.ambulances?.eventEndOnTheSameDay || false,
              startTime: props.bookingData?.ambulances?.startTime || '',
              endTime: props.bookingData?.ambulances?.endTime || '',
          };
                if (storedFormData) {
                    setSchedule(storedFormData);
                    if (storedFormData.startDate) {
                        setSelectedDate(format(new Date(storedFormData.startDate), 'yyyy-MM-dd'));
                    }
                }
                //console.log(storedFormData);
        }, [props.bookingData]);
    
        useEffect(() => {
          const { startDate, startTime, endTime } = schedule;
          const isFormValid = startDate && startTime && endTime ;
        }, [schedule]);
    
      const handleDateChange = (field, date) => {
        if (!date) {
          alert("Invalid date selected");
          return;
      }
    
     
      
        const formattedDate = format(date, 'yyyy-MM-dd');
        const updatedSchedule = { ...schedule, [field]: date };
    
        // Convert the formatted dates back to Date objects for comparison
        const startDate = schedule.startDate ? new Date(schedule.startDate) : null;
        const endDate = formattedDate ? new Date(formattedDate) : null;
    
        if (field === 'startDate') {
            setSelectedDate(formattedDate);
            if (schedule.eventEndsSameDay) {
                updatedSchedule.endDate = date;
            }
        }
    
        if (field === 'endDate') {
            if (startDate && endDate < startDate) {
                // Validate that endDate is not earlier than startDate
                alert("End date cannot be earlier than the start date");
                return;
            }
        }
    
      setSchedule(updatedSchedule);
    
      // if (field === 'startDate') {
      //     setSelectedDate(formattedDate);
      // }
      };
    
      const handleCheckboxChange = (e) => {
        if (e.target.checked) {
          setSchedule({ ...schedule, eventEndsSameDay: true, endDate: schedule.startDate });
        } else {
          setSchedule({ ...schedule, eventEndsSameDay: false });
        }
      };
    
      const handleTimeChange = (field, value) => {
        let newSchedule = { ...schedule, [field]: value };
    
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const today = format(new Date(), 'yyyy-MM-dd');
    
        const stripAmPmSuffix = (time12) => {
            // Remove the "AM" or "PM" suffix
            return time12.replace(/ (AM|PM)/, '');
          };
        
          // Strip suffix from times for comparison
          const strippedStartTime = newSchedule.startTime ? stripAmPmSuffix(newSchedule.startTime) : '';
          const strippedEndTime = newSchedule.endTime ? stripAmPmSuffix(newSchedule.endTime) : '';
          const strippedValue = stripAmPmSuffix(value);
        
          // Validate that end time is not earlier than start time
          if (field === 'endTime') {
            if (strippedStartTime && strippedStartTime > strippedValue) {
              alert("End time cannot be earlier than the start time");
              return;
            }
          }
        
          // Check if selected date is today and validate against current time
          if (selectedDate === today) {
            if (field === 'startTime') {
              if (strippedValue < currentTime) {
                alert("Start time cannot be earlier than the current time");
                return;
              }
              if (strippedEndTime && strippedEndTime < strippedValue) {
                newSchedule.endTime = value; // Adjust end time to be same as start time if it was earlier
              }
            } else if (field === 'endTime') {
              if (strippedStartTime && strippedStartTime > strippedValue) {
                alert("End time cannot be earlier than the start time");
                return;
              }
            }
          }
    
        setSchedule(newSchedule);
      };
    
      const stripAmPmSuffix = (time12) => {
        return time12.replace(/ (AM|PM)/, '');
      };
      
      const generateTimeOptions = (startTime, isStartTime) => {
        const times = [];
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const today = format(new Date(), 'yyyy-MM-dd');
      
        for (let h = 0; h < 24; h++) {
          for (let m = 0; m < 60; m += 15) {
            const time24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            const suffix = h < 12 ? 'AM' : 'PM';
            const hour12 = h % 12 || 12;
            const time12 = `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
      
            if (selectedDate === today) {
              if (isStartTime) {
                if (time24 < currentTime) continue;
              } else {
                if (startTime && time24 <= startTime) continue;
              }
            } else {
              if (!isStartTime && startTime && time24 <= startTime) continue;
            }
            times.push({ time24, time12 });
          }
        }
        return times;
      };
    
    
    const calculateHoursAndMinutes = () => {
      if (schedule.startTime && schedule.endTime) {
        const stripAmPmSuffix = (time12) => {
            // Remove the "AM" or "PM" suffix
            return time12.replace(/ (AM|PM)/, '');
          };
        const strippedStartTime = stripAmPmSuffix(schedule.startTime);
        const strippedEndTime = stripAmPmSuffix(schedule.endTime);
        const startDateTime = parse(strippedStartTime, 'HH:mm', new Date());
        const endDateTime = parse(strippedEndTime, 'HH:mm', new Date());
        const totalMinutes = differenceInMinutes(endDateTime, startDateTime);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
      }
      return { hours: 0, minutes: 0 };
    };
    
    const { hours, minutes } = calculateHoursAndMinutes();
    
    const getNumberOfDays = () => {
        const start = new Date(schedule.startDate);
        const end = new Date(schedule.endDate);
        // Calculate the difference in time
        const timeDiff = end.getTime() - start.getTime();
        // Calculate the difference in days, ensuring to add one to include the end date's day
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        return daysDiff;
      };
    
      const daysDiff = getNumberOfDays()
      //console.log(daysDiff)
      const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
    const { response, setResponse, error, loading, patchData } = usePatchData('https://api.staging.8medical.co/order', accessToken);
      
      const handlePatch = () => {
        const id = props.id;
        const patchObject = {
          scheduleDetails: {
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            eventEndOnTheSameDay: schedule.eventEndsSameDay,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
                
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
  
    
        const formatTime = (time) => {
            if (!time) return '';
            const [hours, minutes] = time.split(':');
            const date = new Date();
            date.setHours(parseInt(hours, 10));
            date.setMinutes(parseInt(minutes, 10));
            return format(date, 'h:mm a');
        };
    

    return(
        <div>
        <Dialog open={props.open} >
        
        <DialogContent className="border-none  ">
        <VisuallyHidden.Root>
          <DialogTitle>Booking details</DialogTitle>
          </VisuallyHidden.Root>
        <div className="flex flex-col justify-center items-center  pt-9 pb-9">
               
               <div className="pt-9 max-w-[640px] max-lg:w-full  rounded-2xl flex flex-col gap-12 bg-white p-9 max-lg:p-4">
                       
                       
                       <div className="flex flex-col gap-6">
                       
                       <div className="flex flex-col gap-9">
                       <span className="flex items-center justify-between">
                       <p className="font-brsemi text-lg text-[#181719]">Edit Standby Date and Duration</p>
                       <p onClick={props.close} className="font-brreg text-lg cursor-pointer bg-[#F9F9FA] px-3 py-1 rounded-full">x</p>
                       </span>
                       <DatePickerDemo
                        date={schedule.startDate ? new Date(schedule.startDate) : null}
                        setDate={(date) => handleDateChange('startDate', date)}
                        placeholder="Start Date"
                       />
                       { !schedule.eventEndsSameDay &&
                       <DatePickerDemo
                       date={schedule.endDate ? new Date(schedule.endDate) : null}
                       setDate={(date) => handleDateChange('endDate', date)}
                       placeholder="End Date"
                       />}
                       <span className="flex items-center gap-1">
                           <input type="checkbox" className=" indeterminate:bg-[#A7A8A9] checked:bg-blue-500"
                           checked={schedule.eventEndsSameDay}
                           onChange={handleCheckboxChange} />
                           <p className="font-brmedium text-[#212121]">Event ends on same day</p>
                       </span>
                       {/* <span className="flex justify-between">
                           <input type="time" 
                           className="w-[278px] h-12 flex flex-col gap-3 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl "
                           value={schedule.startTime}
                           onChange={(e) => handleTimeChange('startTime', e.target.value)}
                           />
                           <input type="time" className="w-[278px] h-12 flex flex-col gap-3 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl"
                           value={schedule.endTime}
                           onChange={(e) => handleTimeChange('endTime', e.target.value)}
                           />
                       </span> */}
                       <span>
                       <span className="flex justify-between max-lg:gap-2">
                   <select 
                       className="w-[278px] h-12 flex items-center gap-3 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl max-lg:w-full max-lg:h-full"
                       value={schedule.startTime}
                       onChange={(e) => handleTimeChange('startTime', e.target.value)}
                   >
                       <option value="" disabled>Select start time</option>
                       {generateTimeOptions(null, true).map(({ time24, time12 }) => (
                           <option key={time24} value={time24}>{time12}</option>
                       ))}
                   </select>
                   <select 
                       className="w-[278px] h-12 flex items-center  gap-3 border-[1px] border-[#E4E3E5] outline-none p-3 rounded-xl max-lg:w-full max-lg:h-full"
                       value={schedule.endTime}
                       onChange={(e) => handleTimeChange('endTime', e.target.value)}
                   >
                       <option  value="" disabled>Select end time</option>
                       {generateTimeOptions(schedule.startTime, false).map(({ time24, time12 }) => (
                           <option key={time24} value={time24}>{time12}</option>
                       ))}
                   </select>
                  
               </span>
               <small className="flex items-center gap-1 text-[#636066]"> <p className="text-red-700">*</p> Medics shift coverage is determined per 12-hour period.</small>
               </span>
               <span>
                       <span className="flex justify-between py-3 px-5 rounded-xl bg-[#F9F9FA]">
                         <p className="font-brsemi text-[#181719]">Event Duration:</p>
                         <span className="flex items-center gap-1">
                         <p className="font-brsemi text-xl text-[#6D09F9]">{hours}:{minutes}hrs</p>
                         {daysDiff > 1 &&
                          <p className="font-brsemi text-xl text-[#6D09F9]">|{daysDiff}Days</p>
                           }
                          </span>
                       </span>
                       {daysDiff > 1 &&
                       <small className="flex items-center gap-1 text-[#636066]"> <p className="text-red-700">*</p> You are selecting to book standby from {format(schedule.startDate,'yyyy-MM-dd')} to {format(schedule.endDate,'yyyy-MM-dd')} within time periods of {formatTime(schedule.startTime)} to {formatTime(schedule.endTime)} on each day</small>
                       }
                       </span>
                       </div>
                       
                       </div>
                       <div className="flex items-center justify-end gap-6">
                        <span className="flex items-center gap-3">
                        <p onClick={props.close} className="text-[#181719] text-lg font-brsemi">Cancel</p>
                    
                       <button  onClick={handlePatch} className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-3 px-5 text-white flex justify-center gap-1 items-center max-lg:py-1"   type="submit">
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
        </DialogContent>
        </Dialog>

        </div>
    )
}



export function DatePickerDemo({ date, setDate, placeholder,minDate }) {
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