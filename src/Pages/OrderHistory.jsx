import NavBar from "@/components/NavBar";
import OrderBox from "@/components/OrderBox";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import NoBooking from "@/components/NoBooking";
  



export default function OrderHistory () {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [boxData, setBoxData] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [upcomingOrders, setUpcomingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const signInData = JSON.parse(sessionStorage.getItem('SignIn'));
    const token = signInData?.data?.tokens?.accessToken || '';
    const decodedToken = token? jwtDecode(token) : '';
    const iaFlag = decodedToken?.userType ;
    const totalOrders = pendingOrders.length + upcomingOrders.length + completedOrders.length;
     console.log(boxData)

    const handleCategoryClick = (category) => {
      setActiveCategory(category);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

        useEffect(()=>{
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(
                        iaFlag == "ADMIN"? 
                        import.meta.env.VITE_ORDER_API 
                        : 
                        import.meta.env.VITE_USER_ORDER_HISTORY, 
                        {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                    });
                    
                    // Handle the response
                    console.log('Orders fetched successfully:', response.data);
                    setBoxData(response.data || []);
                    setPendingOrders(response.data.data.PENDING.orders);
                    setUpcomingOrders(response.data.data.UP_COMING.orders);
                    setCompletedOrders(response.data.data.COMPLETED.orders);
                    return response.data; // Return the order data
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    // Handle the error (e.g., display a message to the user)
                }
                };

                // Call the function to fetch orders
                
                    fetchOrders();
               
        },[token])
            

    return(
        <div>
            <NavBar />
            <div className="pt-6 px-32 max-xl:px-10 max-md:px-4 max-[1024px]:px-10 flex flex-col gap-9">
                <section className="flex flex-col gap-4 ">
                    <span className="flex justify-between items-center max-md:flex-col max-md:gap-2 ">
                        <div className="flex items-center gap-1 max-[500px]:w-full">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="56" height="56" rx="9.33333" fill="#F4F1FF"/>
                        <g clip-path="url(#clip0_2890_26796)">
                        <path d="M45.7717 26.583L39.498 19.2733C39.2911 19.0261 39.0325 18.8274 38.7404 18.691C38.4484 18.5546 38.13 18.4839 37.8076 18.4839H15.1788C14.5942 18.4839 14.0336 18.7162 13.6202 19.1295C13.2068 19.5429 12.9746 20.1035 12.9746 20.6881V36.1175C12.9746 36.7021 13.2068 37.2627 13.6202 37.6761C14.0336 38.0895 14.5942 38.3217 15.1788 38.3217H17.5208C17.7636 39.2699 18.315 40.1104 19.0883 40.7106C19.8615 41.3108 20.8125 41.6366 21.7914 41.6366C22.7702 41.6366 23.7213 41.3108 24.4945 40.7106C25.2677 40.1104 25.8192 39.2699 26.062 38.3217H32.9501C33.1929 39.2699 33.7444 40.1104 34.5177 40.7106C35.2909 41.3108 36.2419 41.6366 37.2208 41.6366C38.1996 41.6366 39.1506 41.3108 39.9239 40.7106C40.6971 40.1104 41.2486 39.2699 41.4914 38.3217H43.8333C44.4179 38.3217 44.9786 38.0895 45.3919 37.6761C45.8053 37.2627 46.0375 36.7021 46.0375 36.1175V27.3007C46.0375 27.0374 45.9432 26.7828 45.7717 26.583ZM15.1788 26.1986V20.6881H22.8935V26.1986H15.1788ZM21.7914 39.4238C21.3554 39.4238 20.9293 39.2945 20.5668 39.0523C20.2043 38.8101 19.9218 38.4659 19.755 38.0631C19.5881 37.6603 19.5445 37.2171 19.6295 36.7896C19.7146 36.362 19.9245 35.9692 20.2328 35.661C20.5411 35.3527 20.9338 35.1428 21.3614 35.0577C21.7889 34.9727 22.2321 35.0163 22.6349 35.1832C23.0377 35.35 23.3819 35.6325 23.6241 35.995C23.8663 36.3575 23.9956 36.7836 23.9956 37.2196C23.9956 37.8042 23.7634 38.3648 23.35 38.7782C22.9366 39.1916 22.376 39.4238 21.7914 39.4238ZM32.8124 26.1986H25.0977V20.6881H32.8124V26.1986ZM37.2208 39.4238C36.7848 39.4238 36.3587 39.2945 35.9962 39.0523C35.6337 38.8101 35.3512 38.4659 35.1843 38.0631C35.0175 37.6603 34.9739 37.2171 35.0589 36.7896C35.144 36.362 35.3539 35.9692 35.6622 35.661C35.9704 35.3527 36.3632 35.1428 36.7907 35.0577C37.2183 34.9727 37.6615 35.0163 38.0643 35.1832C38.467 35.35 38.8113 35.6325 39.0535 35.995C39.2957 36.3575 39.425 36.7836 39.425 37.2196C39.425 37.8042 39.1927 38.3648 38.7794 38.7782C38.366 39.1916 37.8053 39.4238 37.2208 39.4238ZM35.0166 26.1986V20.6881H37.8076L42.537 26.1986H35.0166Z" fill="#6D09F9"/>
                        <path d="M45.7717 26.583L39.498 19.2733C39.2911 19.0261 39.0325 18.8274 38.7404 18.691C38.4484 18.5546 38.13 18.4839 37.8076 18.4839H15.1788C14.5942 18.4839 14.0336 18.7162 13.6202 19.1295C13.2068 19.5429 12.9746 20.1035 12.9746 20.6881V36.1175C12.9746 36.7021 13.2068 37.2627 13.6202 37.6761C14.0336 38.0895 14.5942 38.3217 15.1788 38.3217H17.5208C17.7636 39.2699 18.315 40.1104 19.0883 40.7106C19.8615 41.3108 20.8125 41.6366 21.7914 41.6366C22.7702 41.6366 23.7213 41.3108 24.4945 40.7106C25.2677 40.1104 25.8192 39.2699 26.062 38.3217H32.9501C33.1929 39.2699 33.7444 40.1104 34.5177 40.7106C35.2909 41.3108 36.2419 41.6366 37.2208 41.6366C38.1996 41.6366 39.1506 41.3108 39.9239 40.7106C40.6971 40.1104 41.2486 39.2699 41.4914 38.3217H43.8333C44.4179 38.3217 44.9786 38.0895 45.3919 37.6761C45.8053 37.2627 46.0375 36.7021 46.0375 36.1175V27.3007C46.0375 27.0374 45.9432 26.7828 45.7717 26.583ZM15.1788 26.1986V20.6881H22.8935V26.1986H15.1788ZM21.7914 39.4238C21.3554 39.4238 20.9293 39.2945 20.5668 39.0523C20.2043 38.8101 19.9218 38.4659 19.755 38.0631C19.5881 37.6603 19.5445 37.2171 19.6295 36.7896C19.7146 36.362 19.9245 35.9692 20.2328 35.661C20.5411 35.3527 20.9338 35.1428 21.3614 35.0577C21.7889 34.9727 22.2321 35.0163 22.6349 35.1832C23.0377 35.35 23.3819 35.6325 23.6241 35.995C23.8663 36.3575 23.9956 36.7836 23.9956 37.2196C23.9956 37.8042 23.7634 38.3648 23.35 38.7782C22.9366 39.1916 22.376 39.4238 21.7914 39.4238ZM32.8124 26.1986H25.0977V20.6881H32.8124V26.1986ZM37.2208 39.4238C36.7848 39.4238 36.3587 39.2945 35.9962 39.0523C35.6337 38.8101 35.3512 38.4659 35.1843 38.0631C35.0175 37.6603 34.9739 37.2171 35.0589 36.7896C35.144 36.362 35.3539 35.9692 35.6622 35.661C35.9704 35.3527 36.3632 35.1428 36.7907 35.0577C37.2183 34.9727 37.6615 35.0163 38.0643 35.1832C38.467 35.35 38.8113 35.6325 39.0535 35.995C39.2957 36.3575 39.425 36.7836 39.425 37.2196C39.425 37.8042 39.1927 38.3648 38.7794 38.7782C38.366 39.1916 37.8053 39.4238 37.2208 39.4238ZM35.0166 26.1986V20.6881H37.8076L42.537 26.1986H35.0166Z" fill="url(#pattern0_2890_26796)"/>
                        </g>
                        <defs>
                        <pattern id="pattern0_2890_26796" patternContentUnits="objectBoundingBox" width="5.92593" height="1.52324">
                        <use xlink:href="#image0_2890_26796" transform="scale(0.0296296 0.0423122)"/>
                        </pattern>
                        <clipPath id="clip0_2890_26796">
                        <rect width="35.2671" height="35.2671" fill="white" transform="translate(10.7695 10.7692)"/>
                        </clipPath>
                        <image id="image0_2890_26796" width="200" height="36" xlink:href="data:image/png;base64,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"/>
                        </defs>
                        </svg>
                        <p className="font-brbold text-[32px] text-[#1F1D21] max-md:text-2xl">Standby Bookings</p>
                        </div>
                        <div className="max-[500px]:w-full">
                        <div className="bg-[#F5F4F6] flex items-center rounded-mm gap-1 py-1 px-2 ">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7141 11.786L10.117 9.18779C10.8957 8.17305 11.2592 6.9001 11.1339 5.62717C11.0086 4.35423 10.4037 3.17663 9.44206 2.33325C8.48041 1.48987 7.23395 1.04387 5.95555 1.08571C4.67714 1.12755 3.46252 1.6541 2.55806 2.55855C1.65361 3.463 1.12706 4.67763 1.08522 5.95604C1.04338 7.23444 1.48939 8.4809 2.33277 9.44255C3.17615 10.4042 4.35374 11.0091 5.62668 11.1344C6.89961 11.2597 8.17256 10.8962 9.1873 10.1175L11.7866 12.7173C11.8476 12.7784 11.9201 12.8268 11.9999 12.8598C12.0796 12.8929 12.1651 12.9099 12.2514 12.9099C12.3378 12.9099 12.4233 12.8929 12.503 12.8598C12.5828 12.8268 12.6552 12.7784 12.7163 12.7173C12.7773 12.6563 12.8258 12.5838 12.8588 12.5041C12.8918 12.4243 12.9088 12.3388 12.9088 12.2525C12.9088 12.1661 12.8918 12.0807 12.8588 12.0009C12.8258 11.9211 12.7773 11.8487 12.7163 11.7876L12.7141 11.786ZM2.40605 6.12529C2.40605 5.38979 2.62415 4.67081 3.03278 4.05926C3.4414 3.44772 4.02219 2.97108 4.7017 2.68961C5.38121 2.40815 6.12893 2.33451 6.8503 2.478C7.57166 2.62148 8.23428 2.97566 8.75436 3.49574C9.27443 4.01581 9.62861 4.67843 9.7721 5.3998C9.91559 6.12117 9.84194 6.86888 9.56048 7.5484C9.27902 8.22791 8.80237 8.8087 8.19083 9.21732C7.57928 9.62594 6.8603 9.84404 6.1248 9.84404C5.13884 9.84303 4.19355 9.45091 3.49637 8.75373C2.79919 8.05654 2.40707 7.11125 2.40605 6.12529Z" fill="#4A464E"/>
                        </svg>
                        <input 
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="outline-none bg-[#F5F4F6] text-sm placeholder:text-[#868388] font-brreg" 
                        />
                        </div>
                        </div>
                    </span>
               
                    {iaFlag !== 'ADMIN' && !searchTerm &&
                    <span className="flex justify-between gap-2 max-md:flex-col">
                        <div className="w-full bg-ev-50 rounded-xl border border-[#ECE5FF] py-4 px-5">
                            <span className="flex justify-between items-center">
                                <p className="font-brmedium text-[#636066]">Total Bookings</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#6D09F9"/>
                                <rect width="19.2" height="19.2" transform="translate(6.40039 6.4)" fill="#6D09F9"/>
                                <mask id="mask0_2952_32608"  maskUnits="userSpaceOnUse" x="6" y="6" width="20" height="20">
                                <rect x="6.40039" y="6.4" width="19.2" height="19.2" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2952_32608)">
                                <path d="M15.2 24C14.9733 24 14.7833 23.9233 14.63 23.77C14.4767 23.6167 14.4 23.4267 14.4 23.2V19.2C14.4 19.1067 14.4067 19.0133 14.42 18.92C14.4333 18.8267 14.4533 18.74 14.48 18.66L15.32 16.28C15.4267 15.96 15.62 15.7 15.9 15.5C16.18 15.3 16.4933 15.2 16.84 15.2H21.56C21.9067 15.2 22.22 15.3 22.5 15.5C22.78 15.7 22.9733 15.96 23.08 16.28L23.92 18.66C23.9467 18.74 23.9667 18.8267 23.98 18.92C23.9933 19.0133 24 19.1067 24 19.2V23.2C24 23.4267 23.9233 23.6167 23.77 23.77C23.6167 23.9233 23.4267 24 23.2 24C22.9733 24 22.7833 23.9233 22.63 23.77C22.4767 23.6167 22.4 23.4267 22.4 23.2V22.8H16V23.2C16 23.4267 15.9233 23.6167 15.77 23.77C15.6167 23.9233 15.4267 24 15.2 24ZM16 18H22.4L21.84 16.4H16.56L16 18ZM16.8 21.2C17.0267 21.2 17.2167 21.1233 17.37 20.97C17.5233 20.8167 17.6 20.6267 17.6 20.4C17.6 20.1733 17.5233 19.9833 17.37 19.83C17.2167 19.6767 17.0267 19.6 16.8 19.6C16.5733 19.6 16.3833 19.6767 16.23 19.83C16.0767 19.9833 16 20.1733 16 20.4C16 20.6267 16.0767 20.8167 16.23 20.97C16.3833 21.1233 16.5733 21.2 16.8 21.2ZM21.6 21.2C21.8267 21.2 22.0167 21.1233 22.17 20.97C22.3233 20.8167 22.4 20.6267 22.4 20.4C22.4 20.1733 22.3233 19.9833 22.17 19.83C22.0167 19.6767 21.8267 19.6 21.6 19.6C21.3733 19.6 21.1833 19.6767 21.03 19.83C20.8767 19.9833 20.8 20.1733 20.8 20.4C20.8 20.6267 20.8767 20.8167 21.03 20.97C21.1833 21.1233 21.3733 21.2 21.6 21.2ZM11.2 17.6V16H12.8V17.6H11.2ZM15.2 12.8V11.2H16.8V12.8H15.2ZM11.2 20.8V19.2H12.8V20.8H11.2ZM11.2 24V22.4H12.8V24H11.2ZM8 24V14.4C8 13.96 8.15667 13.5833 8.47 13.27C8.78333 12.9567 9.16 12.8 9.6 12.8H12V9.6C12 9.16 12.1567 8.78333 12.47 8.47C12.7833 8.15667 13.16 8 13.6 8H18.4C18.84 8 19.2167 8.15667 19.53 8.47C19.8433 8.78333 20 9.16 20 9.6V13.6H18.4V9.6H13.6V14.4H9.6V24H8Z" fill="white"/>
                                </g>
                                </svg>
                            </span>
                            <p className="font-brbold text-[40px] text-[#181719]">{totalOrders}</p>
                        </div>
                            <div className="w-full bg-[#FDF2F8] rounded-xl border border-[#FDE6F3] py-4 px-5">
                            <span className="flex justify-between items-center">
                                <p className="font-brmedium text-[#636066]">Pending Bookings</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F34197"/>
                                <mask id="mask0_2952_32648"  maskUnits="userSpaceOnUse" x="6" y="6" width="20" height="20">
                                <rect x="6.40039" y="6.4" width="19.2" height="19.2" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2952_32648)">
                                <path d="M15.2 24C14.9733 24 14.7833 23.9233 14.63 23.77C14.4767 23.6167 14.4 23.4267 14.4 23.2V19.2C14.4 19.1067 14.4067 19.0133 14.42 18.92C14.4333 18.8267 14.4533 18.74 14.48 18.66L15.32 16.28C15.4267 15.96 15.62 15.7 15.9 15.5C16.18 15.3 16.4933 15.2 16.84 15.2H21.56C21.9067 15.2 22.22 15.3 22.5 15.5C22.78 15.7 22.9733 15.96 23.08 16.28L23.92 18.66C23.9467 18.74 23.9667 18.8267 23.98 18.92C23.9933 19.0133 24 19.1067 24 19.2V23.2C24 23.4267 23.9233 23.6167 23.77 23.77C23.6167 23.9233 23.4267 24 23.2 24C22.9733 24 22.7833 23.9233 22.63 23.77C22.4767 23.6167 22.4 23.4267 22.4 23.2V22.8H16V23.2C16 23.4267 15.9233 23.6167 15.77 23.77C15.6167 23.9233 15.4267 24 15.2 24ZM16 18H22.4L21.84 16.4H16.56L16 18ZM16.8 21.2C17.0267 21.2 17.2167 21.1233 17.37 20.97C17.5233 20.8167 17.6 20.6267 17.6 20.4C17.6 20.1733 17.5233 19.9833 17.37 19.83C17.2167 19.6767 17.0267 19.6 16.8 19.6C16.5733 19.6 16.3833 19.6767 16.23 19.83C16.0767 19.9833 16 20.1733 16 20.4C16 20.6267 16.0767 20.8167 16.23 20.97C16.3833 21.1233 16.5733 21.2 16.8 21.2ZM21.6 21.2C21.8267 21.2 22.0167 21.1233 22.17 20.97C22.3233 20.8167 22.4 20.6267 22.4 20.4C22.4 20.1733 22.3233 19.9833 22.17 19.83C22.0167 19.6767 21.8267 19.6 21.6 19.6C21.3733 19.6 21.1833 19.6767 21.03 19.83C20.8767 19.9833 20.8 20.1733 20.8 20.4C20.8 20.6267 20.8767 20.8167 21.03 20.97C21.1833 21.1233 21.3733 21.2 21.6 21.2ZM11.2 17.6V16H12.8V17.6H11.2ZM15.2 12.8V11.2H16.8V12.8H15.2ZM11.2 20.8V19.2H12.8V20.8H11.2ZM11.2 24V22.4H12.8V24H11.2ZM8 24V14.4C8 13.96 8.15667 13.5833 8.47 13.27C8.78333 12.9567 9.16 12.8 9.6 12.8H12V9.6C12 9.16 12.1567 8.78333 12.47 8.47C12.7833 8.15667 13.16 8 13.6 8H18.4C18.84 8 19.2167 8.15667 19.53 8.47C19.8433 8.78333 20 9.16 20 9.6V13.6H18.4V9.6H13.6V14.4H9.6V24H8Z" fill="white"/>
                                </g>
                                </svg>
                            </span>
                            <p className="font-brbold text-[40px] text-[#181719]">{pendingOrders.length}</p>
                        </div>
                        <div className="w-full bg-[#FEF0E6] rounded-xl border border-[#FDD2B3] py-4 px-5">
                            <span className="flex justify-between items-center">
                                <p className="font-brmedium text-[#636066]">Upcoming Bookings</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F96D09"/>
                                <mask id="mask0_2952_32643"  maskUnits="userSpaceOnUse" x="6" y="6" width="20" height="20">
                                <rect x="6.40039" y="6.4" width="19.2" height="19.2" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2952_32643)">
                                <path d="M15.2 24C14.9733 24 14.7833 23.9233 14.63 23.77C14.4767 23.6167 14.4 23.4267 14.4 23.2V19.2C14.4 19.1067 14.4067 19.0133 14.42 18.92C14.4333 18.8267 14.4533 18.74 14.48 18.66L15.32 16.28C15.4267 15.96 15.62 15.7 15.9 15.5C16.18 15.3 16.4933 15.2 16.84 15.2H21.56C21.9067 15.2 22.22 15.3 22.5 15.5C22.78 15.7 22.9733 15.96 23.08 16.28L23.92 18.66C23.9467 18.74 23.9667 18.8267 23.98 18.92C23.9933 19.0133 24 19.1067 24 19.2V23.2C24 23.4267 23.9233 23.6167 23.77 23.77C23.6167 23.9233 23.4267 24 23.2 24C22.9733 24 22.7833 23.9233 22.63 23.77C22.4767 23.6167 22.4 23.4267 22.4 23.2V22.8H16V23.2C16 23.4267 15.9233 23.6167 15.77 23.77C15.6167 23.9233 15.4267 24 15.2 24ZM16 18H22.4L21.84 16.4H16.56L16 18ZM16.8 21.2C17.0267 21.2 17.2167 21.1233 17.37 20.97C17.5233 20.8167 17.6 20.6267 17.6 20.4C17.6 20.1733 17.5233 19.9833 17.37 19.83C17.2167 19.6767 17.0267 19.6 16.8 19.6C16.5733 19.6 16.3833 19.6767 16.23 19.83C16.0767 19.9833 16 20.1733 16 20.4C16 20.6267 16.0767 20.8167 16.23 20.97C16.3833 21.1233 16.5733 21.2 16.8 21.2ZM21.6 21.2C21.8267 21.2 22.0167 21.1233 22.17 20.97C22.3233 20.8167 22.4 20.6267 22.4 20.4C22.4 20.1733 22.3233 19.9833 22.17 19.83C22.0167 19.6767 21.8267 19.6 21.6 19.6C21.3733 19.6 21.1833 19.6767 21.03 19.83C20.8767 19.9833 20.8 20.1733 20.8 20.4C20.8 20.6267 20.8767 20.8167 21.03 20.97C21.1833 21.1233 21.3733 21.2 21.6 21.2ZM11.2 17.6V16H12.8V17.6H11.2ZM15.2 12.8V11.2H16.8V12.8H15.2ZM11.2 20.8V19.2H12.8V20.8H11.2ZM11.2 24V22.4H12.8V24H11.2ZM8 24V14.4C8 13.96 8.15667 13.5833 8.47 13.27C8.78333 12.9567 9.16 12.8 9.6 12.8H12V9.6C12 9.16 12.1567 8.78333 12.47 8.47C12.7833 8.15667 13.16 8 13.6 8H18.4C18.84 8 19.2167 8.15667 19.53 8.47C19.8433 8.78333 20 9.16 20 9.6V13.6H18.4V9.6H13.6V14.4H9.6V24H8Z" fill="white"/>
                                </g>
                                </svg>
                            </span>
                            <p className="font-brbold text-[40px] text-[#181719]">{upcomingOrders.length}</p>
                        </div>
                        <div className="w-full bg-[#ECFBF2] rounded-xl border border-[#C3F3D8] py-4 px-5">
                            <span className="flex justify-between items-center">
                                <p className="font-brmedium text-[#636066]">Completed Bookings</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#39C574"/>
                                <mask id="mask0_2952_32614"  maskUnits="userSpaceOnUse" x="6" y="6" width="20" height="20">
                                <rect x="6.40039" y="6.4" width="19.2" height="19.2" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2952_32614)">
                                <path d="M15.2 24C14.9733 24 14.7833 23.9233 14.63 23.77C14.4767 23.6167 14.4 23.4267 14.4 23.2V19.2C14.4 19.1067 14.4067 19.0133 14.42 18.92C14.4333 18.8267 14.4533 18.74 14.48 18.66L15.32 16.28C15.4267 15.96 15.62 15.7 15.9 15.5C16.18 15.3 16.4933 15.2 16.84 15.2H21.56C21.9067 15.2 22.22 15.3 22.5 15.5C22.78 15.7 22.9733 15.96 23.08 16.28L23.92 18.66C23.9467 18.74 23.9667 18.8267 23.98 18.92C23.9933 19.0133 24 19.1067 24 19.2V23.2C24 23.4267 23.9233 23.6167 23.77 23.77C23.6167 23.9233 23.4267 24 23.2 24C22.9733 24 22.7833 23.9233 22.63 23.77C22.4767 23.6167 22.4 23.4267 22.4 23.2V22.8H16V23.2C16 23.4267 15.9233 23.6167 15.77 23.77C15.6167 23.9233 15.4267 24 15.2 24ZM16 18H22.4L21.84 16.4H16.56L16 18ZM16.8 21.2C17.0267 21.2 17.2167 21.1233 17.37 20.97C17.5233 20.8167 17.6 20.6267 17.6 20.4C17.6 20.1733 17.5233 19.9833 17.37 19.83C17.2167 19.6767 17.0267 19.6 16.8 19.6C16.5733 19.6 16.3833 19.6767 16.23 19.83C16.0767 19.9833 16 20.1733 16 20.4C16 20.6267 16.0767 20.8167 16.23 20.97C16.3833 21.1233 16.5733 21.2 16.8 21.2ZM21.6 21.2C21.8267 21.2 22.0167 21.1233 22.17 20.97C22.3233 20.8167 22.4 20.6267 22.4 20.4C22.4 20.1733 22.3233 19.9833 22.17 19.83C22.0167 19.6767 21.8267 19.6 21.6 19.6C21.3733 19.6 21.1833 19.6767 21.03 19.83C20.8767 19.9833 20.8 20.1733 20.8 20.4C20.8 20.6267 20.8767 20.8167 21.03 20.97C21.1833 21.1233 21.3733 21.2 21.6 21.2ZM11.2 17.6V16H12.8V17.6H11.2ZM15.2 12.8V11.2H16.8V12.8H15.2ZM11.2 20.8V19.2H12.8V20.8H11.2ZM11.2 24V22.4H12.8V24H11.2ZM8 24V14.4C8 13.96 8.15667 13.5833 8.47 13.27C8.78333 12.9567 9.16 12.8 9.6 12.8H12V9.6C12 9.16 12.1567 8.78333 12.47 8.47C12.7833 8.15667 13.16 8 13.6 8H18.4C18.84 8 19.2167 8.15667 19.53 8.47C19.8433 8.78333 20 9.16 20 9.6V13.6H18.4V9.6H13.6V14.4H9.6V24H8Z" fill="white"/>
                                </g>
                                </svg>
                            </span>
                            <p className="font-brbold text-[40px] text-[#181719]">{completedOrders.length}</p>
                        </div>
                    </span>
                    }
                </section>
              
                {iaFlag !== 'ADMIN' && !searchTerm && totalOrders > 0 &&
                <section className="py-3">
                    <ul className="flex gap-3 font-brlight text-[#636066] max-md:hidden">
                    {["All", "Pending Bookings", "Upcoming Bookings", "Completed Bookings"].map((category) => (
                        <li
                        key={category}
                        className={`cursor-pointer py-1 ${activeCategory === category ? "border-b border-ev-700  text-ev-700 font-bold" : ""}`}
                        onClick={() => handleCategoryClick(category)}
                        >
                        {category}
                        </li>
                    ))}
                    </ul>
                    <div className="md:hidden">
                    <Select value={activeCategory} onValueChange={handleCategoryClick}>
                    <SelectTrigger className="w-[180px] font-brmedium text-[#181719] bg-[#F9F9FA] py-3 px-4 rounded-mm border border-[#E4E3E5]">
                        <SelectValue placeholder={activeCategory} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#F9F9FA] rounded-mm font-brmedium text-[#181719] py-3 px-4">
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending Bookings">Pending Bookings</SelectItem>
                        <SelectItem value="Upcoming Bookings">Upcoming Bookings</SelectItem>
                        <SelectItem value="Completed Bookings">Completed Bookings</SelectItem>
                    </SelectContent>
                    </Select>
                    </div>
                </section>}
                {!searchTerm && activeCategory === "All" && totalOrders > 0 && (
                <>
                {pendingOrders.length > 0 &&
                <section className="flex flex-col gap-2">
                    <p className="font-brbold text-[28px] text-[#0A0116]">Pending Bookings</p>
                    <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                        {pendingOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.smallAmbulanceCost}
                            largeAmbulanceCost={order.largeAmbulanceCost}
                            medicCost={order.medicCost}
                            smallAmbulanceCount={order.ambulances.smallAmbulance}
                            largeAmbulanceCount={order.ambulances.largeAmbulance}
                            estimatedFee={order.price}
                            venueAddress={order.ambulances.eventAddress}
                            guests={order.ambulances.estimatedNumberOfGuests}
                            eventType={order.ambulances.eventType}
                            description={order.ambulances.description}
                            fullName={order.callerDetails.fullName}
                            emailAddress={order.callerDetails.email}
                            phoneNumber={order.callerDetails.phone}
                            companyName={order.callerDetails.company}
                            iaFlag={iaFlag}
                            />
                        ))}
                    
                    </div>
                </section>
                }
                {iaFlag !== 'ADMIN' && upcomingOrders.length > 0 &&
                <section className="flex flex-col gap-2">
                    <p className="font-brbold text-[28px] text-[#0A0116]">Upcoming Bookings</p>
                    <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                    {upcomingOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.ambulances.smallAmbulance}
                            medicCost={order.medicCost}
                            />
                        ))}
                    </div>
                </section>
                 }
                 {iaFlag !== 'ADMIN' && completedOrders.length > 0 &&
                <section className="flex flex-col gap-2">
                    <p className="font-brbold text-[28px] text-[#0A0116]">Completed Bookings</p>
                    <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                    {completedOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.ambulances.smallAmbulance}
                            medicCost={order.medicCost}
                            />
                        ))}
                    </div>
                </section>
                }
                </>
            )}

            {/* Render sections based on the active category */}
            {iaFlag !== 'ADMIN' && !searchTerm && activeCategory === "Pending Bookings" && (
                <section className="flex flex-col gap-2">
                <p className="font-brbold text-[28px] text-[#0A0116]">Pending Bookings</p>
                <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                {pendingOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.ambulances.smallAmbulance}
                            medicCost={order.medicCost}
                            iaFlag={iaFlag}
                            />
                        ))}
                </div>
                </section>
            )}

            { iaFlag !== 'ADMIN' && !searchTerm && activeCategory === "Upcoming Bookings" && (
                <section className="flex flex-col gap-2">
                <p className="font-brbold text-[28px] text-[#0A0116]">Upcoming Bookings</p>
                <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                {upcomingOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.ambulances.smallAmbulance}
                            medicCost={order.medicCost}
                            iaFlag={iaFlag}
                            />
                        ))}
                </div>
                </section>
            )}

            {iaFlag !== 'ADMIN' && !searchTerm && activeCategory === "Completed Bookings" && (
                <section className="flex flex-col gap-2">
                <p className="font-brbold text-[28px] text-[#0A0116]">Completed Bookings</p>
                <div className="flex gap-6 flex-wrap max-[1024px]:justify-between">
                {completedOrders.map(order =>(
                            <OrderBox 
                            key={order._id}
                            eventLocationName={order.ambulances.eventLocationName}
                            startDate={order.ambulances.startDate}
                            startTime={order.ambulances.startTime}
                            price={order.price}
                            endDate={order.ambulances.endDate}
                            endTime={order.ambulances.endTime}
                            largeAmbulance={order.ambulances.largeAmbulance}
                            noOfMedic={order.ambulances.noOfMedic}
                            smallAmbulanceCost={order.ambulances.smallAmbulance}
                            medicCost={order.medicCost}
                            iaFlag={iaFlag}
                            />
                        ))}
                </div>
                </section>
            )}

            {searchTerm && 
            <div>
            searching
           
            </div>}
            {totalOrders == 0 &&
            <section>
               <NoBooking />
            </section>
            }
            </div>
        </div>
    )
}