import React from "react"; 
import { Link , useNavigate } from "react-router-dom";
import { useState , useEffect, useRef} from "react";
import { Skeleton } from "@/components/ui/skeleton"
import EmblaCarousel from '../components/EmblaCarousel'
import '../App.css'
import ambuBig from '../assets/images/ambu-big-transformed.png'
import doctor from '../assets/images/doctor.jpeg';
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Faqs from "./Faqs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import ComingSoon from "./ComingSoon";
import BookServiceModal from "./BookServiceModal";
  

  





const carouselImgs = [
    '../Zapphire.png',
    '../Wellpath.png',
    '../stuff.png',
    '../Rjolad.png',
    '../reliance.png',
    '../Oando.png',
    '../mdass.png',
    '../download.png',
    '../coptic.png',
    '../clinalancet.png',
  ];



export default function Hero() {
    // coming soon modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // other services yet to be integrated use boooking modal 
    const [bookingModal, setBookingModal] = useState(false);

    const ambBlack = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1503_172)">
    <path d="M5.14286 12.5714C5.14286 12.2559 5.03125 11.9866 4.80804 11.7634C4.58482 11.5401 4.31548 11.4285 4 11.4285C3.68452 11.4285 3.41518 11.5401 3.19196 11.7634C2.96875 11.9866 2.85714 12.2559 2.85714 12.5714C2.85714 12.8869 2.96875 13.1562 3.19196 13.3794C3.41518 13.6026 3.68452 13.7143 4 13.7143C4.31548 13.7143 4.58482 13.6026 4.80804 13.3794C5.03125 13.1562 5.14286 12.8869 5.14286 12.5714ZM1.71429 7.99997H5.14286V5.71425H3.73214C3.64881 5.72616 3.58333 5.75294 3.53571 5.79461L1.79464 7.53568C1.75298 7.60711 1.72619 7.67258 1.71429 7.73211V7.99997ZM13.1429 12.5714C13.1429 12.2559 13.0312 11.9866 12.808 11.7634C12.5848 11.5401 12.3155 11.4285 12 11.4285C11.6845 11.4285 11.4152 11.5401 11.192 11.7634C10.9687 11.9866 10.8571 12.2559 10.8571 12.5714C10.8571 12.8869 10.9687 13.1562 11.192 13.3794C11.4152 13.6026 11.6845 13.7143 12 13.7143C12.3155 13.7143 12.5848 13.6026 12.808 13.3794C13.0312 13.1562 13.1429 12.8869 13.1429 12.5714ZM14.2857 6.57139V4.85711C14.2857 4.77377 14.2589 4.70532 14.2054 4.65175C14.1518 4.59818 14.0833 4.57139 14 4.57139H12V2.57139C12 2.48806 11.9732 2.41961 11.9196 2.36604C11.8661 2.31247 11.7976 2.28568 11.7143 2.28568H10C9.91667 2.28568 9.84821 2.31247 9.79464 2.36604C9.74107 2.41961 9.71428 2.48806 9.71428 2.57139V4.57139H7.71429C7.63095 4.57139 7.5625 4.59818 7.50893 4.65175C7.45536 4.70532 7.42857 4.77377 7.42857 4.85711V6.57139C7.42857 6.65473 7.45536 6.72318 7.50893 6.77675C7.5625 6.83032 7.63095 6.85711 7.71429 6.85711H9.71428V8.85711C9.71428 8.94044 9.74107 9.00889 9.79464 9.06247C9.84821 9.11604 9.91667 9.14282 10 9.14282H11.7143C11.7976 9.14282 11.8661 9.11604 11.9196 9.06247C11.9732 9.00889 12 8.94044 12 8.85711V6.85711H14C14.0833 6.85711 14.1518 6.83032 14.2054 6.77675C14.2589 6.72318 14.2857 6.65473 14.2857 6.57139ZM16.5714 1.71425V12C16.5714 12.1547 16.5149 12.2887 16.4018 12.4018C16.2887 12.5148 16.1548 12.5714 16 12.5714H14.2857C14.2857 13.2023 14.0625 13.741 13.6161 14.1875C13.1696 14.6339 12.631 14.8571 12 14.8571C11.369 14.8571 10.8304 14.6339 10.3839 14.1875C9.9375 13.741 9.71428 13.2023 9.71428 12.5714H6.28571C6.28571 13.2023 6.0625 13.741 5.61607 14.1875C5.16964 14.6339 4.63095 14.8571 4 14.8571C3.36905 14.8571 2.83036 14.6339 2.38393 14.1875C1.9375 13.741 1.71429 13.2023 1.71429 12.5714H0.571429C0.416667 12.5714 0.282738 12.5148 0.169643 12.4018C0.0565476 12.2887 0 12.1547 0 12C0 11.8452 0.0565476 11.7113 0.169643 11.5982C0.282738 11.4851 0.416667 11.4285 0.571429 11.4285V7.71425C0.571429 7.55949 0.610119 7.38687 0.6875 7.19639C0.764881 7.00592 0.860119 6.85413 0.973214 6.74104L2.74107 4.97318C2.85417 4.86008 3.00595 4.76485 3.19643 4.68747C3.3869 4.61008 3.55952 4.57139 3.71429 4.57139H5.14286V1.71425C5.14286 1.55949 5.1994 1.42556 5.3125 1.31247C5.42559 1.19937 5.55952 1.14282 5.71429 1.14282H16C16.1548 1.14282 16.2887 1.19937 16.4018 1.31247C16.5149 1.42556 16.5714 1.55949 16.5714 1.71425Z" fill="#181719"/>
    </g>
    <defs>
    <clipPath id="clip0_1503_172">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    ;
    const ambWhite = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1503_168)">
    <path d="M5.1428 12.5714C5.1428 12.2559 5.03119 11.9866 4.80797 11.7634C4.58476 11.5401 4.31541 11.4285 3.99994 11.4285C3.68446 11.4285 3.41512 11.5401 3.1919 11.7634C2.96869 11.9866 2.85708 12.2559 2.85708 12.5714C2.85708 12.8869 2.96869 13.1562 3.1919 13.3794C3.41512 13.6026 3.68446 13.7143 3.99994 13.7143C4.31541 13.7143 4.58476 13.6026 4.80797 13.3794C5.03119 13.1562 5.1428 12.8869 5.1428 12.5714ZM1.71422 7.99997H5.1428V5.71425H3.73208C3.64875 5.72616 3.58327 5.75294 3.53565 5.79461L1.79458 7.53568C1.75292 7.60711 1.72613 7.67258 1.71422 7.73211V7.99997ZM13.1428 12.5714C13.1428 12.2559 13.0312 11.9866 12.808 11.7634C12.5848 11.5401 12.3154 11.4285 11.9999 11.4285C11.6845 11.4285 11.4151 11.5401 11.1919 11.7634C10.9687 11.9866 10.8571 12.2559 10.8571 12.5714C10.8571 12.8869 10.9687 13.1562 11.1919 13.3794C11.4151 13.6026 11.6845 13.7143 11.9999 13.7143C12.3154 13.7143 12.5848 13.6026 12.808 13.3794C13.0312 13.1562 13.1428 12.8869 13.1428 12.5714ZM14.2857 6.57139V4.85711C14.2857 4.77377 14.2589 4.70532 14.2053 4.65175C14.1517 4.59818 14.0833 4.57139 13.9999 4.57139H11.9999V2.57139C11.9999 2.48806 11.9732 2.41961 11.9196 2.36604C11.866 2.31247 11.7976 2.28568 11.7142 2.28568H9.99994C9.9166 2.28568 9.84815 2.31247 9.79458 2.36604C9.74101 2.41961 9.71422 2.48806 9.71422 2.57139V4.57139H7.71422C7.63089 4.57139 7.56244 4.59818 7.50887 4.65175C7.4553 4.70532 7.42851 4.77377 7.42851 4.85711V6.57139C7.42851 6.65473 7.4553 6.72318 7.50887 6.77675C7.56244 6.83032 7.63089 6.85711 7.71422 6.85711H9.71422V8.85711C9.71422 8.94044 9.74101 9.00889 9.79458 9.06247C9.84815 9.11604 9.9166 9.14282 9.99994 9.14282H11.7142C11.7976 9.14282 11.866 9.11604 11.9196 9.06247C11.9732 9.00889 11.9999 8.94044 11.9999 8.85711V6.85711H13.9999C14.0833 6.85711 14.1517 6.83032 14.2053 6.77675C14.2589 6.72318 14.2857 6.65473 14.2857 6.57139ZM16.5714 1.71425V12C16.5714 12.1547 16.5148 12.2887 16.4017 12.4018C16.2886 12.5148 16.1547 12.5714 15.9999 12.5714H14.2857C14.2857 13.2023 14.0624 13.741 13.616 14.1875C13.1696 14.6339 12.6309 14.8571 11.9999 14.8571C11.369 14.8571 10.8303 14.6339 10.3839 14.1875C9.93744 13.741 9.71422 13.2023 9.71422 12.5714H6.28565C6.28565 13.2023 6.06244 13.741 5.61601 14.1875C5.16958 14.6339 4.63089 14.8571 3.99994 14.8571C3.36899 14.8571 2.8303 14.6339 2.38387 14.1875C1.93744 13.741 1.71422 13.2023 1.71422 12.5714H0.571368C0.416606 12.5714 0.282677 12.5148 0.169582 12.4018C0.0564866 12.2887 -6.10352e-05 12.1547 -6.10352e-05 12C-6.10352e-05 11.8452 0.0564866 11.7113 0.169582 11.5982C0.282677 11.4851 0.416606 11.4285 0.571368 11.4285V7.71425C0.571368 7.55949 0.610058 7.38687 0.687439 7.19639C0.76482 7.00592 0.860058 6.85413 0.973153 6.74104L2.74101 4.97318C2.85411 4.86008 3.00589 4.76485 3.19637 4.68747C3.38684 4.61008 3.55946 4.57139 3.71422 4.57139H5.1428V1.71425C5.1428 1.55949 5.19934 1.42556 5.31244 1.31247C5.42553 1.19937 5.55946 1.14282 5.71422 1.14282H15.9999C16.1547 1.14282 16.2886 1.19937 16.4017 1.31247C16.5148 1.42556 16.5714 1.55949 16.5714 1.71425Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_1503_168">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
    ;    

    const blackSteth = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 9.5C15.0001 9.0397 14.8732 8.5883 14.6331 8.19555C14.393 7.8028 14.0492 7.48395 13.6395 7.27415C13.2298 7.06434 12.7701 6.97172 12.3111 7.0065C11.8521 7.04127 11.4117 7.20209 11.0382 7.47123C10.6648 7.74037 10.373 8.10739 10.1948 8.53182C10.0167 8.95625 9.95917 9.42163 10.0286 9.87666C10.0981 10.3317 10.2919 10.7587 10.5885 11.1107C10.8852 11.4626 11.2733 11.7258 11.71 11.8713C11.6252 12.2618 11.4094 12.6115 11.0983 12.8623C10.7872 13.1132 10.3996 13.25 10 13.25H8.5C8.03587 13.25 7.59075 13.0656 7.26256 12.7374C6.93437 12.4093 6.75 11.9641 6.75 11.5V9.18125C8.73312 8.82 10.25 7.05063 10.25 4.94813V2.5C10.25 2.33585 10.2177 2.1733 10.1548 2.02165C10.092 1.86999 9.99996 1.73219 9.88388 1.61612C9.76781 1.50004 9.63001 1.40797 9.47835 1.34515C9.3267 1.28233 9.16415 1.25 9 1.25H8C7.80109 1.25 7.61032 1.32902 7.46967 1.46967C7.32902 1.61032 7.25 1.80109 7.25 2C7.25 2.19891 7.32902 2.38968 7.46967 2.53033C7.61032 2.67098 7.80109 2.75 8 2.75H8.75V4.94813C8.75 6.47313 7.53312 7.73063 6.03687 7.75C5.67265 7.75489 5.31108 7.68736 4.97317 7.55135C4.63525 7.41534 4.32773 7.21355 4.06845 6.9577C3.80917 6.70185 3.6033 6.39704 3.4628 6.06097C3.3223 5.7249 3.24997 5.36426 3.25 5V2.75H4C4.19891 2.75 4.38968 2.67098 4.53033 2.53033C4.67098 2.38968 4.75 2.19891 4.75 2C4.75 1.80109 4.67098 1.61032 4.53033 1.46967C4.38968 1.32902 4.19891 1.25 4 1.25H3C2.66848 1.25 2.35054 1.3817 2.11612 1.61612C1.8817 1.85054 1.75 2.16848 1.75 2.5V5C1.75004 5.99706 2.10064 6.96237 2.74045 7.72707C3.38027 8.49177 4.26859 9.00717 5.25 9.18313V11.5C5.25099 12.3617 5.59372 13.1877 6.203 13.797C6.81228 14.4063 7.63835 14.749 8.5 14.75H10C10.7937 14.7491 11.5596 14.4581 12.1537 13.9318C12.7477 13.4055 13.129 12.6802 13.2256 11.8925C13.7385 11.7361 14.1876 11.4193 14.507 10.9886C14.8264 10.558 14.9992 10.0362 15 9.5ZM12.5 10.5C12.3022 10.5 12.1089 10.4414 11.9444 10.3315C11.78 10.2216 11.6518 10.0654 11.5761 9.88269C11.5004 9.69996 11.4806 9.49889 11.5192 9.30491C11.5578 9.11093 11.653 8.93275 11.7929 8.7929C11.9327 8.65304 12.1109 8.5578 12.3049 8.51922C12.4989 8.48063 12.7 8.50043 12.8827 8.57612C13.0654 8.65181 13.2216 8.77998 13.3315 8.94443C13.4414 9.10888 13.5 9.30222 13.5 9.5C13.5 9.76522 13.3946 10.0196 13.2071 10.2071C13.0196 10.3946 12.7652 10.5 12.5 10.5Z" fill="#181719"/>
    </svg>
    ;    

    const whiteSteth = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 9.5C15.0001 9.0397 14.8732 8.5883 14.6331 8.19555C14.393 7.8028 14.0492 7.48395 13.6395 7.27415C13.2298 7.06434 12.7701 6.97172 12.3111 7.0065C11.8521 7.04127 11.4117 7.20209 11.0382 7.47123C10.6648 7.74037 10.373 8.10739 10.1948 8.53182C10.0167 8.95625 9.95917 9.42163 10.0286 9.87666C10.0981 10.3317 10.2919 10.7587 10.5885 11.1107C10.8852 11.4626 11.2733 11.7258 11.71 11.8713C11.6252 12.2618 11.4094 12.6115 11.0983 12.8623C10.7872 13.1132 10.3996 13.25 10 13.25H8.5C8.03587 13.25 7.59075 13.0656 7.26256 12.7374C6.93437 12.4093 6.75 11.9641 6.75 11.5V9.18125C8.73312 8.82 10.25 7.05063 10.25 4.94813V2.5C10.25 2.33585 10.2177 2.1733 10.1548 2.02165C10.092 1.86999 9.99996 1.73219 9.88388 1.61612C9.76781 1.50004 9.63001 1.40797 9.47835 1.34515C9.3267 1.28233 9.16415 1.25 9 1.25H8C7.80109 1.25 7.61032 1.32902 7.46967 1.46967C7.32902 1.61032 7.25 1.80109 7.25 2C7.25 2.19891 7.32902 2.38968 7.46967 2.53033C7.61032 2.67098 7.80109 2.75 8 2.75H8.75V4.94813C8.75 6.47313 7.53312 7.73063 6.03687 7.75C5.67265 7.75489 5.31108 7.68736 4.97317 7.55135C4.63525 7.41534 4.32773 7.21355 4.06845 6.9577C3.80917 6.70185 3.6033 6.39704 3.4628 6.06097C3.3223 5.7249 3.24997 5.36426 3.25 5V2.75H4C4.19891 2.75 4.38968 2.67098 4.53033 2.53033C4.67098 2.38968 4.75 2.19891 4.75 2C4.75 1.80109 4.67098 1.61032 4.53033 1.46967C4.38968 1.32902 4.19891 1.25 4 1.25H3C2.66848 1.25 2.35054 1.3817 2.11612 1.61612C1.8817 1.85054 1.75 2.16848 1.75 2.5V5C1.75004 5.99706 2.10064 6.96237 2.74045 7.72707C3.38027 8.49177 4.26859 9.00717 5.25 9.18313V11.5C5.25099 12.3617 5.59372 13.1877 6.203 13.797C6.81228 14.4063 7.63835 14.749 8.5 14.75H10C10.7937 14.7491 11.5596 14.4581 12.1537 13.9318C12.7477 13.4055 13.129 12.6802 13.2256 11.8925C13.7385 11.7361 14.1876 11.4193 14.507 10.9886C14.8264 10.558 14.9992 10.0362 15 9.5ZM12.5 10.5C12.3022 10.5 12.1089 10.4414 11.9444 10.3315C11.78 10.2216 11.6518 10.0654 11.5761 9.88269C11.5004 9.69996 11.4806 9.49889 11.5192 9.30491C11.5578 9.11093 11.653 8.93275 11.7929 8.7929C11.9327 8.65304 12.1109 8.5578 12.3049 8.51922C12.4989 8.48063 12.7 8.50043 12.8827 8.57612C13.0654 8.65181 13.2216 8.77998 13.3315 8.94443C13.4414 9.10888 13.5 9.30222 13.5 9.5C13.5 9.76522 13.3946 10.0196 13.2071 10.2071C13.0196 10.3946 12.7652 10.5 12.5 10.5Z" fill="#FFFFFF"/>
    </svg>
  
  const [activeService, setActiveService] = useState('standby');
    const handleButtonClick = (service) => {
        setActiveService(service);
    };

    const handleSelectChange = (value) => {
        setActiveService(value);
    };

    const sectionRef = useRef(null);
    const newsLetterRef = useRef(null);

    const scrollToSection = () => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToNewsLetter = () => {
        setIsModalOpen(false);
        newsLetterRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const getServiceContent = () => {
        switch (activeService) {
            case 'standby':
                return <div className="px-12 py-12 rounded-3xl bg-white  ">
                    <p className="font-brmedium text-ev-700 mb-2">Ambulance Standby</p>
                    <div className="flex justify-between gap-32 max-lg:flex-col max-lg:gap-4 ">
                    
                    <main className="flex flex-col gap-6 w-[464px] max-lg:w-full ">
                        
                        <p className="font-brsemi text-4xl max-lg:text-[28px] ">Book an ambulance to standby at your event</p>
                        
                    </main>
                    <aside className="flex flex-col gap-3 w-[464px] max-lg:w-full">
                        <p className="font-brreg text-lg text-[#636066]">Be it film sporting events, film shoots,  conferences or weddings, let's provide round the clock medical support.</p>
                      <Link to='/ServiceAmb'>
                        <p className="font-brmedium text-ev-700 ">Learn more</p>
                        </Link>
                    </aside>
                    
                    </div>
                    <Link to='StandBy' >
                        <button  className="bg-ev-700 mt-4 font-brbold text-lg text-white rounded py-3 px-5 w-36">Book Now</button>
                        </Link>
                </div>;
            case 'transport':
                return <div className="px-12 py-12 rounded-3xl bg-white">
                <p className="font-brmedium text-ev-700 mb-2">Ambulance Transport</p>
                <div className="flex justify-between gap-32 max-lg:flex-col max-lg:gap-4">
                
                <main className="flex flex-col gap-6  w-[464px] max-lg:w-full">
                    
                    <p className="font-brsemi text-4xl max-lg:text-[28px] ">Transport a patient in need with our ambulance</p>
                   
                </main>
                <aside className="flex flex-col gap-3  w-[464px] max-lg:w-full">
                    <p className="font-brreg text-lg text-[#636066]">Arrange ambulance transport for a loved one or patient whether by land or air</p>
                    <Link to="/ServiceAgt" >
                    <p className="font-brmedium text-ev-700 ">Learn More</p>
                    </Link>
                </aside>
                </div>
                
                <button onClick={()=>setBookingModal(true)} className="bg-ev-700 font-brbold mt-4 text-lg text-white rounded py-3 px-5 w-36">Book Now</button>
                
            </div>;
            case 'urgentCare':
                return <div className="px-12 py-12 rounded-3xl bg-white">
                    <p className="font-brmedium text-ev-700 mb-2 ">Urgent Care</p>
                    <div className="flex justify-between gap-32 max-lg:flex-col max-lg:gap-4">
                    
                    <main className="flex flex-col gap-6 w-[464px] max-lg:w-full">
                        <p className="font-brsemi text-4xl max-lg:text-[28px]">Curate a medical care package to suit your health needs</p>
                    </main>
                    <aside className="flex flex-col gap-3 w-[464px] max-lg:w-full">
                        <p className="font-brreg text-lg text-[#636066]">Need periodic ambulance transport or standby for your individual, family or business use? Curate a package to suit your needs.</p>
                        <Link to="/ServiceUg">
                        <p className="font-brmedium text-ev-700 ">Learn More</p>
                        </Link>
                    </aside>
                    </div>
                    
                    <button onClick={()=>setBookingModal(true)} className="bg-ev-700 font-brbold text-lg mt-4 text-white rounded py-3 px-5 w-40">Get Started</button>
                    
                </div>;
            default:
                return <p>Select a service to see the details.</p>;
        }
    };

    const buttonClass = 'pt-4 px-6 pb-5 border-2 border-[#E4E3E5] rounded-mm text-lg font-brbold flex gap-2 items-center cursor-pointer';
    const activeClass = 'bg-ev-700 text-white rounded-mm border-none';
    const navigate = useNavigate();
    return(
        <div>
            <section className="flex flex-col justify-center items-center gap-9 bg-[#30056B] bg-[url(src/assets/images/Siren.gif)] bg-no-repeat bg-cover bg-center bg-blend-soft-light  py-20">
                <p className="font-brbold text-6xl text-white w-[694px] text-center max-lg:text-5xl max-lg:w-[396px] ">Get urgent ambulance and medical care services</p>
                <p className=" font-brreg text-white w-[694px] text-center text-2xl rounded max-lg:text-lg max-lg:w-[396px] ">We offer responsive and dependable ambulance and medical care services according to your needs.</p>
                <div className="flex gap-4 items-center max-lg:flex-col max-lg:w-[396px] ">
                    
                    <button onClick={()=>setBookingModal(true)} className="bg-[#F9091D] px-5 py-3 text-xl text-white font-brsemi rounded-mm cursor-pointer flex items-center gap-1 max-lg:w-full max-lg:justify-center ">Report an Emergency 
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1558_2496)">
                    <path d="M8.4175 5.99312L8.40715 6.05476C9.56297 6.24892 10.4375 7.29955 10.4375 8.5C10.4375 8.64918 10.4968 8.79226 10.6023 8.89775C10.7077 9.00324 10.8508 9.0625 11 9.0625C11.1492 9.0625 11.2923 9.00324 11.3977 8.89775C11.5032 8.79226 11.5625 8.64918 11.5625 8.5C11.5625 6.75778 10.2869 5.22932 8.59311 4.94528C8.52002 4.93239 8.44511 4.9341 8.37268 4.95029C8.30017 4.96651 8.23158 4.99693 8.17089 5.0398C8.1102 5.08267 8.0586 5.13714 8.01908 5.20007C7.97956 5.263 7.9529 5.33313 7.94064 5.40642C7.92838 5.47971 7.93076 5.5547 7.94764 5.62706C7.96453 5.69943 7.99559 5.76773 8.03902 5.82802C8.08245 5.88831 8.1374 5.9394 8.20069 5.97834C8.26398 6.01727 8.33436 6.04328 8.40776 6.05486L8.4175 5.99312ZM8.4175 5.99312C9.60437 6.1925 10.5 7.27 10.5 8.5C10.5 8.63261 10.5527 8.75979 10.6464 8.85355C10.7402 8.94732 10.8674 9 11 9C11.1326 9 11.2598 8.94732 11.3536 8.85355C11.4473 8.75979 11.5 8.63261 11.5 8.5C11.5 6.7875 10.2456 5.28562 8.5825 5.00688C8.51746 4.99537 8.45078 4.99687 8.38632 5.01128C8.32186 5.0257 8.2609 5.05274 8.20695 5.09085C8.153 5.12896 8.10714 5.17738 8.07201 5.23331C8.03688 5.28925 8.01318 5.35159 8.00228 5.41673C7.99138 5.48188 7.9935 5.54854 8.00851 5.61286C8.02352 5.67718 8.05113 5.73789 8.08973 5.79149C8.12834 5.84508 8.17718 5.89049 8.23344 5.9251C8.2897 5.95971 8.35226 5.98283 8.4175 5.99312ZM12.1462 2.64625C12.0762 2.71618 12.0286 2.8053 12.0092 2.90235C11.9899 2.99939 11.9998 3.09998 12.0377 3.1914C12.0756 3.28281 12.1397 3.36092 12.222 3.41586C12.3043 3.4708 12.4011 3.50008 12.5 3.5C12.5657 3.50005 12.6307 3.48716 12.6914 3.46207C12.7521 3.43697 12.8073 3.40017 12.8538 3.35375L13.3538 2.85375C13.4476 2.75993 13.5003 2.63268 13.5003 2.5C13.5003 2.36732 13.4476 2.24007 13.3538 2.14625C13.2599 2.05243 13.1327 1.99972 13 1.99972C12.8673 1.99972 12.7401 2.05243 12.6462 2.14625L12.1462 2.64625ZM12.8096 3.30953L12.8096 3.30956C12.7689 3.35016 12.7206 3.38236 12.6675 3.40431C12.6144 3.42627 12.5575 3.43755 12.5 3.4375H12.5C12.4134 3.43757 12.3287 3.41195 12.2567 3.36388C12.1847 3.31581 12.1286 3.24746 12.0954 3.16747C12.0623 3.08749 12.0536 2.99946 12.0705 2.91455C12.0874 2.82964 12.1292 2.75166 12.1904 2.69047L12.1904 2.69044L12.6904 2.19044C12.7725 2.10834 12.8839 2.06222 13 2.06222C13.1161 2.06222 13.2275 2.10834 13.3096 2.19044C13.3917 2.27254 13.4378 2.38389 13.4378 2.5C13.4378 2.61611 13.3917 2.72746 13.3096 2.80956L12.8096 3.30953ZM2.5 10.5625H2.5625V10.5V8.5C2.56248 7.78244 2.70448 7.07197 2.98033 6.40955C3.25617 5.74713 3.6604 5.14586 4.16972 4.64039C4.67903 4.13493 5.28335 3.73527 5.94784 3.46446C6.61234 3.19365 7.32386 3.05703 8.0414 3.0625L8.04141 3.0625C11.0158 3.08474 13.4375 5.55178 13.4375 8.5625V10.5V10.5625H13.5C13.7486 10.5625 13.9871 10.6613 14.1629 10.8371C14.3387 11.0129 14.4375 11.2514 14.4375 11.5V13C14.4375 13.2486 14.3387 13.4871 14.1629 13.6629C13.9871 13.8387 13.7486 13.9375 13.5 13.9375H2.5C2.25136 13.9375 2.0129 13.8387 1.83709 13.6629C1.66127 13.4871 1.5625 13.2486 1.5625 13V11.5C1.5625 11.2514 1.66127 11.0129 1.83709 10.8371C2.0129 10.6613 2.25136 10.5625 2.5 10.5625ZM13.5 13.0625H13.5625V13V11.5V11.4375H13.5H2.5H2.4375V11.5V13V13.0625H2.5H13.5ZM7.5625 1.5V1C7.5625 0.883968 7.60859 0.772688 7.69064 0.690641C7.77269 0.608594 7.88397 0.5625 8 0.5625C8.11603 0.5625 8.22731 0.608594 8.30936 0.690641C8.39141 0.772688 8.4375 0.883968 8.4375 1V1.5C8.4375 1.61603 8.39141 1.72731 8.30936 1.80936C8.22731 1.89141 8.11603 1.9375 8 1.9375C7.88397 1.9375 7.77269 1.89141 7.69064 1.80936C7.60859 1.72731 7.5625 1.61603 7.5625 1.5ZM3.33247 3.40445C3.27936 3.38245 3.2311 3.35021 3.19044 3.30956L2.69044 2.80956C2.60834 2.72746 2.56222 2.61611 2.56222 2.5C2.56222 2.38389 2.60834 2.27254 2.69044 2.19044C2.77254 2.10834 2.88389 2.06222 3 2.06222C3.11611 2.06222 3.22746 2.10834 3.30956 2.19044L3.80956 2.69044C3.85021 2.7311 3.88245 2.77936 3.90445 2.83247C3.92645 2.88558 3.93778 2.94251 3.93778 3C3.93778 3.05749 3.92645 3.11442 3.90445 3.16753C3.88245 3.22064 3.85021 3.2689 3.80956 3.30956C3.7689 3.35021 3.72064 3.38245 3.66753 3.40445C3.61442 3.42645 3.55749 3.43778 3.5 3.43778C3.44251 3.43778 3.38558 3.42645 3.33247 3.40445Z" fill="white" stroke="white" strokeWidth="0.125"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1558_2496">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>
                    </button>
                    
                    <button className="bg-ev-700 px-5 py-3 text-xl text-white font-brsemi rounded-mm cursor-pointer flex items-center gap-1 max-lg:w-full max-lg:justify-center " onClick={scrollToSection}>Book a Service
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                </div>
            </section>
            <section className=" py-4">
            <EmblaCarousel slides={carouselImgs} options={{loop:true,stopOnMouseEnter:true,stopOnInteraction:false}} className="flex" />
            </section>

            <section ref={sectionRef} className="bg-[#F9F9FA] py-12 px-32 flex flex-col gap-9 max-lg:px-4 max-lg:py-9">
                <div className=" max-lg:hidden">
                <p className="font-brsemi text-3xl pb-6">Choose a Service</p>
                <div className="flex gap-3">
                    <button className={`${buttonClass} ${activeService === 'standby' ? activeClass : ''}`} onClick={() => handleButtonClick('standby')}>
                        {activeService === 'standby' ?  ambWhite : ambBlack}
                        Ambulance standby</button>
                    <button className={`${buttonClass} ${activeService === 'transport' ? activeClass : ''}`} onClick={() => handleButtonClick('transport')}>
                    {activeService === 'transport' ?  ambWhite : ambBlack}
                        Ambulance Transport</button>
                    <button className={`${buttonClass} ${activeService === 'urgentCare' ? activeClass : ''}`} onClick={() => handleButtonClick('urgentCare')} >
                    {activeService === 'urgentCare' ?  whiteSteth : blackSteth}
                        Urgent Care</button>
                </div>
                </div>
                <div className="md:hidden">
                <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[240px] rounded-mm border-[1px] border-[#E4E3E5] font-brmedium text-[#181719] ">
                    <SelectValue placeholder={<div className="flex gap-2 items-center">{ambBlack}Ambulance standby</div> }/>
                </SelectTrigger>
                <SelectContent className="bg-white rounded-mm">
                    <SelectItem value="standby"><div className="flex gap-2 items-center">{ambBlack}Ambulance standby</div></SelectItem>
                    <SelectItem value="transport"><div className="flex gap-2 items-center">{ambBlack}Ambulance Transport</div></SelectItem>
                    <SelectItem value="urgentCare"><div className="flex gap-2 items-center">{blackSteth}Urgent Care</div></SelectItem>
                </SelectContent>
                </Select>

                </div>

                <div>
                {getServiceContent()}
                </div>
                <BookServiceModal isModalOpen={bookingModal} isModalClosed={()=>setBookingModal(false)} />
            </section>
            <section className="bg-[url(./assets/images/line.png)] bg-no-repeat bg-cover w-full ">
                <div className="flex justify-between text-white py-9 px-52 max-lg:flex-col max-lg:gap-12 max-xl:px-36 max-lg:py-12 max-lg:px-4 ">
                <span className="text-center">
                        <span className="text-4xl flex justify-center  font-brbold">
                            {/* <Counter targetNumber={15000} duration={5000} /> */}
                            15000+</span>
                        <p className=" font-brmedium text-s " >Calls Recieved</p>
                    </span>
 
                    <span className="text-center">
                        <span className="text-4xl flex justify-center font-brbold">
                            {/* <Counter targetNumber={8000} duration={5000} /> */}
                            8000+</span>
                        <p className=" font-brmedium text-s " >Lives Saved</p>
                    </span>
 
                    <span className="text-center">
                        <span className="text-4xl flex justify-center  font-brbold"> 
                            {/* <Counter targetNumber={400} duration={12705} /> */}
                            400+</span>
                        <p className=" font-brmedium text-s " >First responders</p>
                    </span>

                    

                    <span className="text-center">
                        <span className="text-4xl font-brbold">
                            {/* <Counter targetNumber={10} duration={500} /> */}
                            10</span>
                        <p className=" font-brmedium text-s " >Avg. Response Time <br/>
                        (Mins)</p>
                    </span>

                    <span className="text-center">
                        <span className="text-4xl flex justify-center  font-brbold"><Counter targetNumber={25} duration={500} />+</span>
                        <p className=" font-brmedium text-s " >Ambulances</p>
                    </span>
                </div>
            </section>
            <section className="flex justify-between max-lg:items-center bg-[#F9F9FA] py-32 px-36 gap-32 max-lg:flex-col max-lg:py-12 max-xl:px-8 max-xl:gap-4 max-lg:px-4 max-lg:gap-9 ">
                <main>
                    <p className="font-brbold text-4xl max-lg:text-center  text-[#181719]">Unparalleled
                    Healthcare Services</p>
                    <p className="font-brreg text-lg text-[#636066]">You are assured of top-notch medical care when you book any of our services.</p>
                </main>
                <aside className=" ">
                    <div className="flex flex-wrap justify-between gap-6 max-lg:gap-12 max-md:flex-nowrap max-md:flex-col max-lg:w-full ">
                    {serviceContents.map((service, index) => (
                <ServiceCard 
                    key={index}
                    image={service.image}
                    title={service.title}
                    desc={service.desc}
                    link={service.link}
                />
            ))}
                    
                    </div>
                </aside>
            </section>
            <section className="pt-20 px-[148px] pb-[148px] flex flex-col gap-12 max-lg:py-12 max-lg:px-4 ">
                <div className="flex flex-col gap-6">
                <p className="font-brsemi text-5xl text-[#181719]">Why Choose EightMedical?</p>
                <p className="font-brreg text-lg text-[#636066]">We provide healthcare services that suits your needs</p>
                </div>
                <div className="flex gap-12 justify-between max-lg:flex-col ">
                    <main className="flex flex-wrap gap-6 w-[696px]  max-lg:flex-col max-lg:w-full">
                    {wceContents.map((cont, index ) => (
                        <WceCard 
                        key={index}
                        svg={cont.svg}
                        title={cont.title}
                        desc={cont.desc}
                        />
                    ))}
                    </main>
                    <aside  className=" flex items-end max-lg:items-center max-lg:justify-end">
                        <ScrollImage  />

                    </aside>
                </div>
            </section>
            <section className="  flex ">
                <main className="w-[80%]  max-lg:hidden">
                    <img src={doctor} alt="" className="h-full " />
                </main>
                <aside className="w-[70%] pt-[148px] pr-[180px] pb-[164px] pl-[120px] bg-[#2E0469] flex flex-col gap-8 bg-[url('./assets/images/MembershipSection.png')] max-lg:bg-[url('./assets/images/doctor.jpeg')] max-lg:bg-blend-overlay max-lg:bg-center max-lg:bg-cover max-lg:h-[60vh] max-lg:w-[100%] max-lg:py-32 max-lg:px-9 max-lg:items-center ">
                    <p className="font-brsemi text-5xl text-white max-lg:text-[32px]">Membership</p>
                    <p className="font-brmedium text-[#F8F4FE] w-3/4 max-lg:text-center">Enroll your family, organization, and customers in our plan for access to urgent and emergency care services.</p>
                    <span>
                    <button onClick={()=>setIsModalOpen(true)} className="bg-ev-700 flex gap-1  text-white items-center  py-3 px-5 text-lg font-brbold rounded-mm"><p>Become a Member</p> <svg className="flex-shrink-0" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.62 4.32837L13.6667 8.37504L9.62 12.4217" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.33337 8.375H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                    </span>
                    <ComingSoon isModalOpen={isModalOpen} scrollView={scrollToNewsLetter} isModalClosed={()=>setIsModalOpen(false)} />
                </aside>
                
            </section>
            <section className="flex flex-col items-center w-full h-[543px] justify-center">
                <p className="font-brsemi text-[40px] text-[#181719] max-lg:text-center">What People are Saying</p>
                <p className="font-brreg text-lg text-[#636066] max-lg:text-center">Here's what customers have to say about our 24/7 support</p>
                <div className=" flex py-8 w-[100%]">
                    <TestimonialCarousel />
                    
                </div>
            </section>
            <section className="flex flex-col items-center">
                <Faqs/>
            </section>
           
            <section ref={newsLetterRef} className="pt-[120px] px-[240px] pb-[148px] bg-[#6D09F9] bg-[url('./assets/images/Background.png')] flex justify-center max-lg:py-12 max-lg:px-4 ">
                <NewsLetter />
            </section>
            <section>
                <Footer />
            </section>
        </div>
    )
}

/// counter 

const Counter = ({ targetNumber, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const incrementTime = duration / targetNumber; // Calculate the increment time

        const interval = setInterval(() => {
            start += 1;
            setCount(start);

            if (start === targetNumber) {
                clearInterval(interval); // Clear the interval when the target number is reached
            }
        }, incrementTime);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [targetNumber, duration]);

    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    return (
        <div className="text-4xl font-brbold">
            <h1>{formatNumber(count)}</h1>
        </div>
    );
};

/// Skeleton

export function SkeletonCard() {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[180px] w-[324px] rounded-xl" />
        
      </div>
    )
  }


  // service card 

  const serviceContents = [
    { 
       image:'../air.png',
       title:'Air and Ground Ambulance Transport',
       desc: 'Our state-of-the-art air and ground ambulances, staffed by skilled professionals, are ready 24/7 for rapid transport or specialized care.',
       link: '/ServiceAgt'
    },
    { 
        image:'../ServiceImage.png',
        title:'Ambulance Standby',
        desc: 'We provide ambulance standby for events or emergencies, ensuring immediate assistance with trained staff and well-equipped ambulances.',
        link: '/ServiceAmb'
     },
     { 
        image:'../ug.png',
        title:'Urgent Care',
        desc: `We address non-life threatening medical issues to ensure that they don't escalate.'`,
        link: '/ServiceUg'
     },
     { 
        image:'../er.png',
        title:'Emergency Response',
        desc: 'Be it night or day, you can count on our emergency response team to show up.',
        link: '/ServiceEr'
     },
]

  export function ServiceCard({ image, title, desc, link}) {
    return (
        <Link to={link}>
      <div className="flex flex-col  gap-6">
        {image ? (
            <img src={image} alt="" className="h-[180px] w-[324px] max-lg:w-[324px] max-lg:h-[180px] max-xl:w-[225px] max-xl:h-[125px] rounded-xl" />
        ) :(<SkeletonCard />)}
        
        <div className=" flex flex-col gap-2">
            <p className=" w-[324px] max-xl:w-[225px] font-brsemi text-xl text-[#181719]">{title}</p>
            <p className=" w-[324px] max-xl:w-[225px] font-brmedium text-[#636066]">{desc}</p>
            <p className="  font-brmedium text-ev-700 flex gap-2 items-center ">Learn more <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.62 4.45337L13.6667 8.50004L9.62 12.5467" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.33337 8.5H13.5534" stroke="#6D09F9" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </p>
          
        </div>
      </div>
      </Link>
    )
  }


   // Why choose 8medical

   const wceContents = [
    { 
       svg:<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M21.38 37.5799C37.38 25.9599 41.14 13.5799 41.98 8.29992C42.0312 7.9881 42.0077 7.66861 41.9115 7.36761C41.8153 7.06662 41.6492 6.7927 41.4268 6.56829C41.2043 6.34389 40.9319 6.17538 40.6317 6.07659C40.3316 5.97779 40.0123 5.95152 39.7 5.99992C34.48 6.85992 22 10.5399 10.42 26.6199L21.38 37.5799Z" fill="#FA8A3A"/>
       <path d="M31.68 28.3601C32.6859 30.6621 32.9335 33.2244 32.387 35.6764C31.8405 38.1285 30.5282 40.3431 28.64 42.0001L23 36.3601" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
       <path d="M19.64 16.3201C17.338 15.3142 14.7757 15.0666 12.3237 15.6131C9.87164 16.1596 7.657 17.4719 6 19.3601L11.64 25.0001" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
       <path d="M21.38 37.5799C37.38 25.9599 41.14 13.5799 41.98 8.29992C42.0311 7.9881 42.0076 7.66861 41.9115 7.36761C41.8153 7.06662 41.6492 6.7927 41.4267 6.56829C41.2043 6.34389 40.9318 6.17538 40.6317 6.07659C40.3315 5.97779 40.0122 5.95152 39.7 5.99992C34.48 6.85992 22 10.5399 10.42 26.6199L21.38 37.5799ZM17.38 39.1799L20.22 36.3399L11.66 27.8399L8.81999 30.6799C8.44749 31.0546 8.2384 31.5616 8.2384 32.0899C8.2384 32.6183 8.44749 33.1252 8.81999 33.4999L14.5 39.1799C14.8747 39.5524 15.3816 39.7615 15.91 39.7615C16.4384 39.7615 16.9453 39.5524 17.32 39.1799H17.38Z" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
       </svg>
       ,
       title:'Reliable',
       desc: 'We deliver expert care to you in the shortest time possible.',
    },
    { 
        svg:<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.3 17.1801C42.8425 21.6272 42.62 26.4966 40.6784 30.7846C38.7369 35.0725 35.2242 38.4521 30.8645 40.2267C26.5049 42.0014 21.6305 42.0358 17.2462 40.3228C12.862 38.6099 9.30195 35.2802 7.30005 31.0201C6.86675 29.9598 6.532 28.8618 6.30005 27.7401C8.6512 31.277 12.1535 33.8917 16.2128 35.1405C20.2721 36.3893 24.6384 36.1955 28.5711 34.5918C32.5037 32.9881 35.7605 30.0734 37.789 26.3421C39.8174 22.6107 40.4926 18.2926 39.7001 14.1201C40.3239 15.0902 40.8594 16.1143 41.3 17.1801Z" fill="#FA8A3A"/>
        <path d="M24 6C27.5601 6 31.0402 7.05568 34.0003 9.03355C36.9603 11.0114 39.2675 13.8226 40.6298 17.1117C41.9922 20.4008 42.3487 24.02 41.6541 27.5116C40.9596 31.0033 39.2453 34.2106 36.7279 36.7279C34.2106 39.2453 31.0033 40.9596 27.5116 41.6541C24.02 42.3487 20.4008 41.9922 17.1117 40.6298C13.8226 39.2675 11.0114 36.9603 9.03355 34.0003C7.05568 31.0402 6 27.5601 6 24" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24H24V14" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        ,
        title:'24/7 Availability',
        desc: 'We are available around the clock, every day of the year.',
     },
     { 
        svg:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20L18 26L28 16M38 20C38 23.5601 36.9443 27.0402 34.9665 30.0003C32.9886 32.9603 30.1774 35.2675 26.8883 36.6298C23.5992 37.9922 19.98 38.3487 16.4884 37.6541C12.9967 36.9596 9.78943 35.2453 7.27209 32.7279C4.75474 30.2106 3.04041 27.0033 2.34587 23.5116C1.65134 20.02 2.0078 16.4008 3.37018 13.1117C4.73255 9.82263 7.03966 7.01141 9.99974 5.03355C12.9598 3.05568 16.4399 2 20 2C24.7739 2 29.3523 3.89642 32.7279 7.27208C36.1036 10.6477 38 15.2261 38 20Z" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        ,
        title:'Expertise',
        desc: `Our expert medical teams guarantee top-tier care.`,
     },
     { 
        svg:<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 24V34C20 34.5304 19.7893 35.0391 19.4142 35.4142C19.0391 35.7893 18.5304 36 18 36H8C6.93913 36 5.92172 35.5786 5.17157 34.8284C4.42143 34.0783 4 33.0609 4 32V24H20ZM20 20V14C20 13.4696 19.7893 12.9609 19.4142 12.5858C19.0391 12.2107 18.5304 12 18 12H8C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16V20H20Z" fill="#FA8A3A"/>
        <path d="M40 4H20C17.7909 4 16 5.79086 16 8V40C16 42.2091 17.7909 44 20 44H40C42.2091 44 44 42.2091 44 40V8C44 5.79086 42.2091 4 40 4Z" fill="#6D09F9"/>
        <path d="M24 4L24.62 6.48C24.7295 6.92375 24.9877 7.31661 25.3516 7.59317C25.7155 7.86973 26.1631 8.01331 26.62 8H33.5C33.9569 8.01331 34.4045 7.86973 34.7684 7.59317C35.1323 7.31661 35.3905 6.92375 35.5 6.48L36 4" fill="#FA8A3A"/>
        </svg>
        ,
        title:'Affordable Healthcare',
        desc: 'Access urgent medical care without breaking the bank.',
     },
]

  export function WceCard({svg, title , desc}) {
    return (
      <div className="flex flex-col  gap-4 px-6 py-6 rounded-xl bg-[#F9F9FA] w-[336px] border-[#E7D7FD] border border-solid max-lg:w-full">
       <div>{svg}</div>
       <p className="font-brbold text-xl text-[#181719] ">{title}</p>
       <p className="font-brmedium text-[#636066]">{desc}</p>
      </div>
    )
  }



  /// scroll span image
  export function ScrollImage() {
    const [scale, setScale] = useState(1);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const scrollPosition = window.scrollY + window.innerHeight;
            const sectionBottom = window.scrollY + rect.bottom;
            
            if (scrollPosition >= sectionBottom - 100) { // Start scaling before the end of the section
                const newScale = 1 + ((scrollPosition - sectionBottom + 100) / 1000);
                setScale(newScale);
            } else {
                setScale(1);
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={sectionRef} className="w-[400px] max-2xl:w-[200px]">
            <div>
                <img
                    src={ambuBig}
                    alt="Scrolling Image"
                    style={{ transform: `scale(${scale})`, transformOrigin: 'right bottom', transition: 'transform 0.2s' }}
                />
            </div>
        </div>
    );
}



// Testimonial carousel 

const testimonies = [
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
    {
        image : './profile.png',
        name : 'Edward Berge',
        title : 'Investor Paradigm Agent',
        review : `The ambulance was in good condition, the paramedics were polite, empathic, professional and patient. Best service provision ever. I'm most impressed.
“`
    },
 
]

export function Testimonial({ image, name, title, review }) {
    return (
      <div className="bg-[#F9F9FA] rounded-xl flex flex-col-reverse  gap-3  p-5 w-[330px] h-[231px]">
        <div className="flex gap-2 items-center border-[#E4E3E5] pt-2 border-t-[1px]" >
          <img src={image} alt="" className="w-8 h-8 rounded" />
          <span>
            <p className="font-brbold text-sm text-[#181719]">{name}</p>
            <p className="font-brreg text-sm text-[#636066]">{title}</p>
          </span>
        </div>
        <span className="">
          <p className="font-brmedium text-[#181719] w-[290px] ">{review}</p>
        </span>
      </div>
    );
  }
  
  export function TestimonialCarousel() {
    return (
      <Carousel className="w-full mx-auto relative">
        <CarouselContent className="flex ml-12 gap-9">
          {testimonies.map((testy, index) => (
            <CarouselItem className="flex-[0_0_330px] h-[231px] p-2 " key={index}>
              <Testimonial 
                image={testy.image}
                title={testy.title}
                name={testy.name}
                review={testy.review}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-ev-700 border-none text-white left-5 ">
          Previous
        </CarouselPrevious>
        <CarouselNext className="bg-ev-700 border-none text-white right-5 ">
          Next
        </CarouselNext>
        <div className="blur-effect absolute top-0 right-0 w-[100px] h-full pointer-events-none bg-gradient-to-l from-white/100 to-transparent"></div>
      </Carousel>
    );
  }  