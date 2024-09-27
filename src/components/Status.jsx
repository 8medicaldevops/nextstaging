import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";
import usePatchData from "./hooks/patchData";



export default function Status (props) {
      const [selectedValue, setSelectedValue] = useState(props.row);
//   console.log(selectedValue)
const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
const { response, error, loading, patchData } = usePatchData(import.meta.env.VITE_ORDER_API, accessToken);

  
    const handlePatch = (value) => {
        setSelectedValue(value)
        const id = props.id;
        const patchObject = {
            missionStatus: value,
            orderStatus: value
        };
        patchData(id, patchObject);
    };

      const renderContent = () => {
        switch (selectedValue) {
          case "PENDING":
            return (
                <div className="bg-[#864df1] w-[120px]  gap-2 m-0 flex items-center p-2 rounded">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7856 9.5C16.7856 13.64 13.4256 17 9.28564 17C5.14564 17 1.78564 13.64 1.78564 9.5C1.78564 5.36 5.14564 2 9.28564 2C13.4256 2 16.7856 5.36 16.7856 9.5Z" stroke="#FAFAFA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.0678 11.8853L9.74281 10.4978C9.33781 10.2578 9.00781 9.68031 9.00781 9.20781V6.13281" stroke="#FAFAFA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm font-brmedium text-[#FAFAFA]">Pending</p>
                </div>
            );
            case "UP_COMING":
              return (
                  <div className="bg-[#FEF0E6] w-[120px]  gap-2 m-0 flex items-center p-2 rounded">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7856 9.5C16.7856 13.64 13.4256 17 9.28564 17C5.14564 17 1.78564 13.64 1.78564 9.5C1.78564 5.36 5.14564 2 9.28564 2C13.4256 2 16.7856 5.36 16.7856 9.5Z" stroke="#F96D09" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.0678 11.8853L9.74281 10.4978C9.33781 10.2578 9.00781 9.68031 9.00781 9.20781V6.13281" stroke="#F96D09" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-sm font-brmedium text-[#F96D09]">Upcoming</p>
                  </div>
              );
          case "COMPLETED":
            return (
                <div className="bg-[#ECFBF2] w-[120px]  gap-2 flex items-center p-2 rounded">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.28564 17C13.4106 17 16.7856 13.625 16.7856 9.5C16.7856 5.375 13.4106 2 9.28564 2C5.16064 2 1.78564 5.375 1.78564 9.5C1.78564 13.625 5.16064 17 9.28564 17Z" stroke="#39C574" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.09814 9.49945L8.22064 11.622L12.4731 7.37695" stroke="#39C574" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#181719]">
            Completed
            </p>
            </div>
            );
          case "CANCELLED":
            return (
                <div className="bg-[#FEE6E8] w-[120px] gap-2 flex items-center p-2 rounded">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.28564 17C13.4106 17 16.7856 13.625 16.7856 9.5C16.7856 5.375 13.4106 2 9.28564 2C5.16064 2 1.78564 5.375 1.78564 9.5C1.78564 13.625 5.16064 17 9.28564 17Z" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.16455 11.622L11.4096 7.37695" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.4096 11.622L7.16455 7.37695" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#F9091D]">
            Canceled
            </p>
            </div>
            );
          default:
            return null;
        }
      };

    return(
        <div className="border-1 border-solid border-red-400">
        <Select  onValueChange={handlePatch}>
        <SelectTrigger className="bg-none border-none px-0 ">
            
            <SelectValue placeholder={renderContent(selectedValue)}> 
            <div>{renderContent(selectedValue)}</div>
            </SelectValue>
        </SelectTrigger>
        <SelectContent className=" bg-white flex flex-col gap-0 m-0 p-0 rounded-mm " >
            <SelectItem  value="PENDING" >
                <div className="bg-[#864df1] w-[120px]  gap-2 m-0 flex items-center p-2 rounded">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7856 9.5C16.7856 13.64 13.4256 17 9.28564 17C5.14564 17 1.78564 13.64 1.78564 9.5C1.78564 5.36 5.14564 2 9.28564 2C13.4256 2 16.7856 5.36 16.7856 9.5Z" stroke="#FAFAFA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0678 11.8853L9.74281 10.4978C9.33781 10.2578 9.00781 9.68031 9.00781 9.20781V6.13281" stroke="#FAFAFA" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#FAFAFA]">Pending</p>
            </div>
            </SelectItem>
            <SelectItem  value="UP_COMING" >
                <div className="bg-[#FEF0E6] w-[120px]  gap-2 m-0 flex items-center p-2 rounded">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7856 9.5C16.7856 13.64 13.4256 17 9.28564 17C5.14564 17 1.78564 13.64 1.78564 9.5C1.78564 5.36 5.14564 2 9.28564 2C13.4256 2 16.7856 5.36 16.7856 9.5Z" stroke="#F96D09" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0678 11.8853L9.74281 10.4978C9.33781 10.2578 9.00781 9.68031 9.00781 9.20781V6.13281" stroke="#F96D09" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#F96D09]">UpComing</p>
            </div>
            </SelectItem>
            <SelectItem value="COMPLETED" >
                <div className="bg-[#ECFBF2] w-[120px]   gap-2 flex items-center p-2 rounded">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.28564 17C13.4106 17 16.7856 13.625 16.7856 9.5C16.7856 5.375 13.4106 2 9.28564 2C5.16064 2 1.78564 5.375 1.78564 9.5C1.78564 13.625 5.16064 17 9.28564 17Z" stroke="#39C574" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.09814 9.49945L8.22064 11.622L12.4731 7.37695" stroke="#39C574" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#181719]">
            Completed
            </p>
            </div>
            </SelectItem>
            <SelectItem value="CANCELLED">
                <div className="bg-[#FEE6E8] w-[120px]  gap-2 flex items-center p-2 rounded">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.28564 17C13.4106 17 16.7856 13.625 16.7856 9.5C16.7856 5.375 13.4106 2 9.28564 2C5.16064 2 1.78564 5.375 1.78564 9.5C1.78564 13.625 5.16064 17 9.28564 17Z" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.16455 11.622L11.4096 7.37695" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.4096 11.622L7.16455 7.37695" stroke="#F9091D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-brmedium text-[#F9091D]">
            Canceled
            </p>
            </div>
            </SelectItem>
        </SelectContent>
        </Select>
        
        </div>
    )
}