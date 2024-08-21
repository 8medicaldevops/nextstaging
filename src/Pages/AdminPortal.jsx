import AuthDisp from "@/components/AuthDisp";
import { DataTableDemo } from "@/components/Table";
import { useState, useEffect } from "react";
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import useFetchAndStoreData from "@/components/hooks/useFetchAndStoreData ";
import profileImage from "../assets/images/ProfileImage.png"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Separator } from "@/components/ui/separator"

  



 export default function AdminPortal () {
   

      const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('admindata')));
      const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
      const {data, statusCount,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage} = useFetchAndStoreData(
        import.meta.env.VITE_ORDER_API,
        'tabledata',
        accessToken
      );
       
      const clearStorageAndRedirect = () => {
        localStorage.clear();
        window.location.href = '/Login'; // Redirect to login page
      };


     
    return(
        <div>
                <div className="bg-[#F4F6FA] flex flex-col gap-9 py-9 px-12">
            <section className="flex justify-between items-center bg-[#07072D] rounded-xl px-6 py-5">
                <div className="flex items-center gap-1">
                <svg width="186" height="40" viewBox="0 0 186 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1832_10934)">
                <path d="M39.7217 27.5091V23.302H46.6179V19.8973H39.7217V15.9071H47.2901V12.459H36.1001V30.9355H47.4203V27.4874H39.7217V27.5091Z" fill="white"/>
                <path d="M49.3285 17.9674V30.9357H52.6681V17.9674H49.3285ZM50.9984 11.8086C49.8706 11.8086 48.9165 12.7627 48.9165 13.8905C48.9165 15.0181 49.8706 15.9723 50.9984 15.9723C52.126 15.9723 53.0802 15.0181 53.0802 13.8905C53.0802 12.7627 52.126 11.8086 50.9984 11.8086Z" fill="white"/>
                <path d="M65.3764 17.9667V20.0919L64.6607 19.2028C63.7933 18.1185 62.5355 17.5547 60.9524 17.5547C57.3742 17.5547 54.5767 20.4606 54.5767 24.1472C54.5767 27.8339 57.3742 30.7398 60.9524 30.7398C62.5355 30.7398 63.7933 30.1976 64.6607 29.0917L65.3764 28.2025V30.588C65.3764 32.7133 64.0969 33.9277 61.8632 33.9277C59.9766 33.9277 59.1091 33.147 58.5887 32.3446L55.7478 33.971C56.9405 35.771 59.044 36.7686 61.7331 36.7686C64.8992 36.7686 68.6076 35.1421 68.6076 30.588V17.9667H65.3764ZM61.6463 27.7688C59.456 27.7688 57.9164 26.2942 57.9164 24.1689C57.9164 22.0437 59.456 20.569 61.6463 20.569C63.8367 20.569 65.3764 22.0437 65.3764 24.1689C65.3764 26.2942 63.8367 27.7688 61.6463 27.7688Z" fill="white"/>
                <path d="M78.8473 17.5769C77.2642 17.5769 75.9413 18.1408 75.2257 19.0949L74.5101 20.0925V12.459H71.1704V30.9355H74.5101V23.8225C74.5101 21.8057 75.6161 20.5913 77.4811 20.5913C79.1725 20.5913 80.2786 21.7406 80.2786 23.4972V30.9572H83.6182V22.89C83.6182 19.225 81.2328 17.5769 78.8473 17.5769Z" fill="white"/>
                <path d="M93.2892 21.1333V17.9671H90.4484V14.2588L87.109 15.2564V17.9671H84.897V21.1333H87.109V26.4031C87.109 28.203 87.4776 29.374 88.2366 30.0679C89.1692 30.892 90.7737 31.1957 93.2679 30.9788V28.0078C92.1186 28.0511 91.3381 27.9645 90.8608 27.5307C90.579 27.2705 90.427 26.8801 90.427 26.4031V21.1333H93.2892Z" fill="white"/>
                <path d="M110.293 12.459L104.828 21.3937L99.363 12.459H95.5684V30.9355H99.1675V18.7263L104.784 27.9211H104.828L110.445 18.7263V30.9572H114.045V12.459H110.293Z" fill="white"/>
                <path d="M129.636 24.4507C129.636 20.5254 126.795 17.5762 123.044 17.5762C119.031 17.5762 116.104 20.4603 116.104 24.4507C116.104 28.5059 119.075 31.3251 123.347 31.3251C125.668 31.3251 127.489 30.5444 128.768 29.0047L126.123 27.4867C125.451 28.0939 124.452 28.4409 123.412 28.4409C121.503 28.4409 120.268 27.7036 119.725 26.2506L119.53 25.7084H129.549C129.614 25.318 129.636 24.8843 129.636 24.4507ZM119.487 23.4314L119.617 22.9326C120.051 21.3495 121.265 20.4603 123 20.4603C124.669 20.4603 125.862 21.3495 126.296 22.9326L126.427 23.4314H119.487Z" fill="white"/>
                <path d="M141.415 12.459V19.9407L140.721 19.1383C139.832 18.1191 138.552 17.5985 136.925 17.5985C133.456 17.5985 130.745 20.6129 130.745 24.4731C130.745 28.3332 133.456 31.3476 136.925 31.3476C138.552 31.3476 139.832 30.8271 140.721 29.8079L141.415 29.0055V30.9572H144.754V12.459H141.415ZM137.728 28.2248C135.559 28.2248 134.042 26.685 134.042 24.4731C134.042 22.2611 135.559 20.7214 137.728 20.7214C139.897 20.7214 141.415 22.2611 141.415 24.4731C141.415 26.685 139.897 28.2248 137.728 28.2248Z" fill="white"/>
                <path d="M147.328 17.9674V30.9357H150.668V17.9674H147.328ZM148.998 11.8086C147.87 11.8086 146.917 12.7627 146.917 13.8905C146.917 15.0181 147.87 15.9723 148.998 15.9723C150.125 15.9723 151.08 15.0181 151.08 13.8905C151.08 12.7627 150.125 11.8086 148.998 11.8086Z" fill="white"/>
                <path d="M162.233 26.6628C161.647 27.5302 160.606 28.0507 159.413 28.0507C157.375 28.0507 155.9 26.5327 155.9 24.4509C155.9 22.369 157.375 20.851 159.413 20.851C160.606 20.851 161.647 21.3714 162.233 22.2389L165.138 20.5473C163.945 18.704 161.799 17.5547 159.457 17.5547C155.531 17.5547 152.561 20.5039 152.561 24.4292C152.561 28.3543 155.531 31.3037 159.457 31.3037C161.799 31.3037 163.945 30.1542 165.138 28.2893L162.233 26.6628Z" fill="white"/>
                <path d="M176.215 17.9665V19.9182L175.521 19.1158C174.632 18.0966 173.352 17.5762 171.726 17.5762C168.256 17.5762 165.545 20.5905 165.545 24.4507C165.545 28.3107 168.256 31.3251 171.726 31.3251C173.352 31.3251 174.632 30.8046 175.521 29.7854L176.215 28.983V30.9348H179.554V17.9665H176.215ZM172.55 28.224C170.381 28.224 168.863 26.6843 168.863 24.4724C168.863 22.2603 170.381 20.7206 172.55 20.7206C174.718 20.7206 176.236 22.2603 176.236 24.4724C176.215 26.6843 174.718 28.224 172.55 28.224Z" fill="white"/>
                <path d="M182.159 11.6348V30.9571H185.498V11.6348H182.159Z" fill="white"/>
                <path d="M14.0499 20.938L7.97786 14.8658C4.57314 11.4611 4.57314 5.90946 7.97786 2.50475C11.3175 -0.834915 16.7824 -0.834915 20.122 2.50475L20.2522 2.63486C21.857 4.23963 22.7678 6.40824 22.7678 8.68528C22.7678 10.9623 21.857 13.1092 20.2305 14.7357L14.0499 20.938ZM14.0499 3.39387C12.7271 3.39387 11.3826 3.89266 10.3851 4.9119C8.30315 6.99377 8.30315 10.3768 10.3851 12.4587L14.0499 16.1236L17.8451 12.3285C18.8209 11.3527 19.363 10.0515 19.363 8.68528C19.363 7.31906 18.8209 6.01789 17.8451 5.04202L17.7149 4.9119C16.6956 3.89266 15.3728 3.39387 14.0499 3.39387Z" fill="#6D09F9"/>
                <path d="M14.0512 39.9999C10.4729 39.9999 6.87302 38.6337 4.16227 35.9012C1.47319 33.2338 -0.00146484 29.699 -0.00146484 25.9039C-0.00146484 22.1306 1.47319 18.574 4.14058 15.885L14.0295 5.99609L16.4366 8.40325L14.0512 10.8104L6.54774 18.3138C2.36232 22.4992 2.36232 29.3303 6.54774 33.5157C10.6681 37.6361 17.3908 37.6361 21.5328 33.5157L21.5762 33.4723C25.74 29.3086 25.74 22.5209 21.5762 18.3571L17.8896 14.6706L20.2968 12.2634L23.9833 15.95C29.4699 21.4366 29.4699 30.393 23.9833 35.8795L23.94 35.9229C21.2075 38.6554 17.6293 39.9999 14.0512 39.9999Z" fill="#6D09F9"/>
                <path d="M14.0516 32.8437C12.2083 32.8437 10.4734 32.128 9.17222 30.8269C6.46147 28.1161 6.46147 23.6922 9.17222 20.9814L11.5794 23.3886C10.1915 24.7765 10.1915 27.0318 11.5794 28.4198C12.23 29.0703 13.1191 29.439 14.0516 29.439C14.9841 29.439 15.8516 29.0703 16.5239 28.4198C17.9118 27.0318 17.9118 24.7765 16.5456 23.4102L18.9527 21.0031C21.6634 23.7139 21.6634 28.0944 18.9527 30.8052C17.6081 32.128 15.8732 32.8437 14.0516 32.8437Z" fill="#6D09F9"/>
                <path d="M15.2342 17.3125L12.8267 19.72L16.5069 23.4001L18.9144 20.9927L15.2342 17.3125Z" fill="#6D09F9"/>
                <path d="M12.8314 17.332L9.1665 20.9969L11.5741 23.4044L15.2389 19.7395L12.8314 17.332Z" fill="#6D09F9"/>
                </g>
                <defs>
                <clipPath id="clip0_1832_10934">
                <rect width="185.778" height="40" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <div className="bg-ev-100 px-2 py-1 rounded-3xl font-brreg text-sm text-ev-700">
                    Admin
                </div>
                </div>

                <div>
                    <span className="flex items-center bg-[#5B5B7E] px-2 py-1 rounded-2xl gap-1">
                        <div>
                       <img src={profileImage} alt=""/>
                        </div>
                        <p className="text-white">Admin</p>
                        <div>
                        <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center">
                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.94 9.72699L4 10.667L8 14.667L12 10.667L11.06 9.72699L8 12.7803L4.94 9.72699Z" fill="white"/>
                        </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white rounded">
                            
                            
                            <DropdownMenuItem>
                                <div onClick={()=>{alert("This feature is coming soon")}} className="flex gap-1  font-brmedium text-sm text-[#181719]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0002 10.0003C12.3013 10.0003 14.1668 8.13485 14.1668 5.83366C14.1668 3.53247 12.3013 1.66699 10.0002 1.66699C7.69898 1.66699 5.8335 3.53247 5.8335 5.83366C5.8335 8.13485 7.69898 10.0003 10.0002 10.0003Z" stroke="#181719" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.8418 18.3333C2.8418 15.1083 6.05013 12.5 10.0001 12.5C10.8001 12.5 11.5751 12.6083 12.3001 12.8083" stroke="#181719" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.3332 15.0003C18.3332 15.267 18.2998 15.5253 18.2332 15.7753C18.1582 16.1087 18.0248 16.4337 17.8498 16.717C17.2748 17.6837 16.2165 18.3337 14.9998 18.3337C14.1415 18.3337 13.3665 18.0086 12.7832 17.4753C12.5332 17.2586 12.3165 17.0003 12.1498 16.717C11.8415 16.217 11.6665 15.6253 11.6665 15.0003C11.6665 14.1003 12.0248 13.2753 12.6082 12.6753C13.2165 12.0503 14.0665 11.667 14.9998 11.667C15.9832 11.667 16.8748 12.092 17.4748 12.7753C18.0082 13.367 18.3332 14.1503 18.3332 15.0003Z" stroke="#181719" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.2411 14.9824H13.7578" stroke="#181719" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.9995 13.7656V16.2573" stroke="#181719" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Invite Member
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Separator className="w-full border-[1px] bg-[#181719]" />
                            <DropdownMenuItem>
                                <div onClick={clearStorageAndRedirect} className=" flex gap-1   font-brmedium text-sm text-[#F9091D]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5332 12.1837L16.6665 10.0503L14.5332 7.91699" stroke="#F9091D" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.1333 10.0498H16.6083" stroke="#F9091D" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.79997 16.6663C6.11663 16.6663 3.1333 14.1663 3.1333 9.99967C3.1333 5.83301 6.11663 3.33301 9.79997 3.33301" stroke="#F9091D" strokeWidth="1.25" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Log Out
                                </div>
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                        </DropdownMenu>

                        
                        </div>
                    </span>
                </div>
            </section>
            <section className="flex gap-5 justify-between  items-center w-full">
                <span className="py-5 px-6 bg-white rounded-xl w-full">
                    <p className="font-brreg text-[#636066]">Total Bookings</p>
                    <p className="font-brbold text-[32px] text-[#181719]">{statusCount && statusCount[0] && statusCount[0].missionStatusCounts 
          ? statusCount[0].orderStatusCounts.CONFIRMED
          : 'Loading...'}</p>
                </span>
                <span className="py-5 px-6 bg-white rounded-xl w-full">
                    <p className="font-brreg text-[#636066]">Pending Bookings</p>
                    <p className="font-brbold text-[32px] text-[#181719]"> {statusCount && statusCount[0] && statusCount[0].missionStatusCounts 
          ? statusCount[0].missionStatusCounts.PENDING 
          : 'Loading...'}</p>
                </span>
                <span className="py-5 px-6 bg-white rounded-xl w-full">
                    <p className="font-brreg text-[#636066]">Completed Bookings</p>
                    <p className="font-brbold text-[32px] text-[#181719]"> {statusCount && statusCount[0] && statusCount[0].missionStatusCounts 
          ? statusCount[0].missionStatusCounts.COMPLETED
          : 'Loading...'}</p>
                </span>
            </section>
            <section className="bg-white px-6 rounded-xl">
                
                <span>
                    <DataTableDemo 
                    data={data} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                    nextPage={nextPage}
                    prevPage={prevPage} />
                </span>
            </section>
        </div>
        </div>
    )
 }