import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {

     const [country, setCountry] = useState('Nigeria')
     const navigate = useNavigate();
     const submitSelection = (e) => {
        e.preventDefault()
        navigate(`/StandBy/${country}`)
     }
     

    return(
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center bg-[#F9F9FA] h-[100vh]">
            <div className="pt-9 max-w-[640px] max-md:w-full h-[504px] rounded-2xl bg-white p-9 max-md:p-4">
                <form className="flex flex-col gap-8" onSubmit={submitSelection}>
                    <div className="flex items-center gap-3">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="52" height="52" rx="8.66667" fill="#F8F4FE"/>
                    <g clipPath="url(#clip0_1585_10996)">
                    <path d="M42.2809 24.7753L37.0776 18.7128C36.906 18.5078 36.6916 18.3429 36.4494 18.2298C36.2071 18.1167 35.943 18.0581 35.6757 18.0581H16.9077C16.4229 18.0581 15.9579 18.2507 15.615 18.5936C15.2722 18.9364 15.0796 19.4014 15.0796 19.8862V32.6831C15.0796 33.168 15.2722 33.6329 15.615 33.9758C15.9579 34.3186 16.4229 34.5112 16.9077 34.5112H18.8501C19.0515 35.2977 19.5089 35.9948 20.1502 36.4926C20.7915 36.9904 21.5802 37.2606 22.3921 37.2606C23.2039 37.2606 23.9927 36.9904 24.634 36.4926C25.2753 35.9948 25.7327 35.2977 25.9341 34.5112H31.647C31.8483 35.2977 32.3057 35.9948 32.9471 36.4926C33.5884 36.9904 34.3771 37.2606 35.189 37.2606C36.0008 37.2606 36.7896 36.9904 37.4309 36.4926C38.0722 35.9948 38.5296 35.2977 38.731 34.5112H40.6733C41.1582 34.5112 41.6232 34.3186 41.966 33.9758C42.3089 33.6329 42.5015 33.168 42.5015 32.6831V25.3706C42.5014 25.1522 42.4232 24.941 42.2809 24.7753ZM16.9077 24.4565V19.8862H23.3062V24.4565H16.9077ZM22.3921 35.4253C22.0305 35.4253 21.6771 35.3181 21.3764 35.1172C21.0758 34.9163 20.8415 34.6308 20.7031 34.2968C20.5648 33.9627 20.5286 33.5951 20.5991 33.2405C20.6696 32.8859 20.8437 32.5602 21.0994 32.3045C21.3551 32.0488 21.6808 31.8747 22.0354 31.8042C22.3901 31.7336 22.7576 31.7698 23.0917 31.9082C23.4257 32.0466 23.7112 32.2809 23.9121 32.5815C24.113 32.8821 24.2202 33.2356 24.2202 33.5972C24.2202 34.082 24.0276 34.547 23.6848 34.8898C23.3419 35.2327 22.8769 35.4253 22.3921 35.4253ZM31.5327 24.4565H25.1343V19.8862H31.5327V24.4565ZM35.189 35.4253C34.8274 35.4253 34.4739 35.3181 34.1733 35.1172C33.8727 34.9163 33.6384 34.6308 33.5 34.2968C33.3616 33.9627 33.3254 33.5951 33.396 33.2405C33.4665 32.8859 33.6406 32.5602 33.8963 32.3045C34.152 32.0488 34.4777 31.8747 34.8323 31.8042C35.1869 31.7336 35.5545 31.7698 35.8886 31.9082C36.2226 32.0466 36.5081 32.2809 36.709 32.5815C36.9099 32.8821 37.0171 33.2356 37.0171 33.5972C37.0171 34.082 36.8245 34.547 36.4816 34.8898C36.1388 35.2327 35.6738 35.4253 35.189 35.4253ZM33.3608 24.4565V19.8862H35.6757L39.5982 24.4565H33.3608Z" fill="#6D09F9"/>
                    <path d="M42.2809 24.7753L37.0776 18.7128C36.906 18.5078 36.6916 18.3429 36.4494 18.2298C36.2071 18.1167 35.943 18.0581 35.6757 18.0581H16.9077C16.4229 18.0581 15.9579 18.2507 15.615 18.5936C15.2722 18.9364 15.0796 19.4014 15.0796 19.8862V32.6831C15.0796 33.168 15.2722 33.6329 15.615 33.9758C15.9579 34.3186 16.4229 34.5112 16.9077 34.5112H18.8501C19.0515 35.2977 19.5089 35.9948 20.1502 36.4926C20.7915 36.9904 21.5802 37.2606 22.3921 37.2606C23.2039 37.2606 23.9927 36.9904 24.634 36.4926C25.2753 35.9948 25.7327 35.2977 25.9341 34.5112H31.647C31.8483 35.2977 32.3057 35.9948 32.9471 36.4926C33.5884 36.9904 34.3771 37.2606 35.189 37.2606C36.0008 37.2606 36.7896 36.9904 37.4309 36.4926C38.0722 35.9948 38.5296 35.2977 38.731 34.5112H40.6733C41.1582 34.5112 41.6232 34.3186 41.966 33.9758C42.3089 33.6329 42.5015 33.168 42.5015 32.6831V25.3706C42.5014 25.1522 42.4232 24.941 42.2809 24.7753ZM16.9077 24.4565V19.8862H23.3062V24.4565H16.9077ZM22.3921 35.4253C22.0305 35.4253 21.6771 35.3181 21.3764 35.1172C21.0758 34.9163 20.8415 34.6308 20.7031 34.2968C20.5648 33.9627 20.5286 33.5951 20.5991 33.2405C20.6696 32.8859 20.8437 32.5602 21.0994 32.3045C21.3551 32.0488 21.6808 31.8747 22.0354 31.8042C22.3901 31.7336 22.7576 31.7698 23.0917 31.9082C23.4257 32.0466 23.7112 32.2809 23.9121 32.5815C24.113 32.8821 24.2202 33.2356 24.2202 33.5972C24.2202 34.082 24.0276 34.547 23.6848 34.8898C23.3419 35.2327 22.8769 35.4253 22.3921 35.4253ZM31.5327 24.4565H25.1343V19.8862H31.5327V24.4565ZM35.189 35.4253C34.8274 35.4253 34.4739 35.3181 34.1733 35.1172C33.8727 34.9163 33.6384 34.6308 33.5 34.2968C33.3616 33.9627 33.3254 33.5951 33.396 33.2405C33.4665 32.8859 33.6406 32.5602 33.8963 32.3045C34.152 32.0488 34.4777 31.8747 34.8323 31.8042C35.1869 31.7336 35.5545 31.7698 35.8886 31.9082C36.2226 32.0466 36.5081 32.2809 36.709 32.5815C36.9099 32.8821 37.0171 33.2356 37.0171 33.5972C37.0171 34.082 36.8245 34.547 36.4816 34.8898C36.1388 35.2327 35.6738 35.4253 35.189 35.4253ZM33.3608 24.4565V19.8862H35.6757L39.5982 24.4565H33.3608Z" fill="url(#pattern0_1585_10996)"/>
                    </g>
                    <defs>
                    <pattern id="pattern0_1585_10996" patternContentUnits="objectBoundingBox" width="5.92593" height="1.52324">
                    <use xlinkHref="#image0_1585_10996" transform="scale(0.0296296 0.0423122)"/>
                    </pattern>
                    <clipPath id="clip0_1585_10996">
                    <rect width="29.25" height="29.25" fill="white" transform="translate(13.2515 11.6597)"/>
                    </clipPath>
                    <image id="image0_1585_10996" width="200" height="36" xlinkHref="data:image/png;base64,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"/>
                    </defs>
                    </svg>
                    <p className="font-brsemi text-3xl text-[#181719] ">Ambulance Standby</p>
                    </div>
                    <div className="flex flex-col gap-6">
                    <p className="text-xl font-brsemi text-[#181719]">Where is the location of the Standby event?</p>
                    <div className="flex justify-between gap-6 max-md:gap-3">
                        <div className={country === 'Nigeria' ? "flex flex-col items-center w-[278px] h-[210px] py-8 px-6 gap-5 border-[1px] border-ev-700 bg-white rounded-xl "  :"flex flex-col items-center w-[278px] h-[210px] py-8 px-6 gap-5 border-[1px] border-[#E4E3E5] bg-white rounded-xl "}
                        onClick={() => setCountry('Nigeria')}>
                            <input type="radio" name="country" className=" bg-ev-700 appearance-none  "  value="Nigeria" checked={country === 'Nigeria'} onChange={()=>setCountry('Nigeria')}  />
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H64V64H0V0Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M42.6625 0H64V64H42.6625V0ZM0 0H21.3375V64H0V0Z" fill="#008753"/>
                            </svg>
                            <p className="font-brsemi text-lg text-[#636066]">Nigeria</p>
                        </div>
                        <div className={country === 'Others' ? "flex flex-col items-center w-[278px] h-[210px] text-center py-8 px-6 gap-5 border-[1px] border-ev-700 bg-white rounded-xl "  :"flex flex-col items-center w-[278px] text-center h-[210px] py-8 px-6 gap-5 border-[1px] border-[#E4E3E5] bg-white rounded-xl "}
                         onClick={() => setCountry('Others')}>
                        <input type="radio" className="appearance-none" name="country"  value="Others" checked={country === 'Others'} onChange={()=>setCountry('Others')}  />
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1592_11949)">
                        <path d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z" fill="#6D09F9"/>
                        <path d="M57.43 12.59C51.33 4.59 42.06 0 32 0C21.94 0 12.67 4.59 6.57 12.59C2.27 18.21 0 24.92 0 32C0 39.08 2.27 45.79 6.56 51.41C12.67 59.41 21.94 64 32 64C42.06 64 51.33 59.41 57.44 51.41C61.73 45.8 64 39.09 64 32C64 24.91 61.73 18.2 57.43 12.59ZM19.85 47.07C23.38 46.23 27.06 45.76 30.84 45.68V60.48C30.17 60.45 29.51 60.41 28.86 60.34C25.1 58.55 21.85 53.63 19.85 47.07ZM28.85 3.66C29.51 3.59 30.17 3.55 30.83 3.52V18.32C27.05 18.24 23.36 17.77 19.84 16.93C21.85 10.36 25.1 5.45 28.85 3.66ZM30.84 20.64V30.84H17.72C17.8 26.69 18.34 22.73 19.23 19.17C22.95 20.06 26.85 20.55 30.84 20.64ZM30.84 33.16V43.36C26.85 43.44 22.95 43.93 19.23 44.83C18.34 41.27 17.81 37.31 17.72 33.16H30.84ZM35.15 60.34C34.49 60.41 33.83 60.45 33.16 60.48V45.68C36.94 45.76 40.63 46.23 44.15 47.07C42.15 53.63 38.9 58.55 35.15 60.34ZM33.16 43.36V33.16H46.28C46.2 37.31 45.66 41.27 44.77 44.83C41.05 43.94 37.15 43.45 33.16 43.36ZM33.16 30.84V20.64C37.15 20.56 41.05 20.07 44.77 19.17C45.66 22.73 46.19 26.69 46.28 30.84H33.16ZM33.16 18.31V3.52C33.83 3.55 34.49 3.59 35.15 3.66C38.91 5.46 42.15 10.37 44.16 16.93C40.63 17.77 36.94 18.23 33.16 18.31ZM40.35 4.72C45.51 6.29 50.14 9.31 53.72 13.53C51.42 14.65 48.99 15.58 46.46 16.32C45.02 11.48 42.91 7.48 40.35 4.72ZM23.65 4.72C21.1 7.48 18.99 11.48 17.54 16.32C15.01 15.59 12.58 14.65 10.28 13.53C13.86 9.31 18.49 6.29 23.65 4.72ZM8.82 15.41C11.38 16.69 14.1 17.74 16.93 18.56C16.02 22.29 15.48 26.44 15.4 30.84H3.51C3.73 25.25 5.55 19.95 8.82 15.41ZM15.4 33.16C15.48 37.56 16.02 41.71 16.93 45.44C14.1 46.26 11.38 47.31 8.82 48.59C5.56 44.04 3.73 38.75 3.51 33.16H15.4ZM17.54 47.68C18.99 52.52 21.09 56.53 23.65 59.28C18.49 57.71 13.86 54.69 10.28 50.47C12.58 49.35 15.01 48.41 17.54 47.68ZM40.35 59.28C42.9 56.52 45.01 52.52 46.46 47.68C48.99 48.41 51.42 49.35 53.72 50.47C50.14 54.69 45.52 57.71 40.35 59.28ZM55.18 48.59C52.62 47.31 49.9 46.26 47.07 45.44C47.98 41.71 48.52 37.56 48.6 33.16H60.49C60.27 38.76 58.45 44.05 55.18 48.59ZM48.6 30.84C48.52 26.43 47.98 22.29 47.07 18.56C49.9 17.74 52.62 16.69 55.18 15.41C58.44 19.95 60.27 25.25 60.49 30.84H48.6Z" fill="#ECE5FF"/>
                        <path d="M36.75 12.6299C36.74 21.5499 46.6 30.9299 47.7 31.8999V1.81995C41.75 1.86995 36.75 6.66995 36.75 12.6299Z" fill="#F2BA34"/>
                        <path d="M47.7002 1.81995V31.8999C48.7902 30.9399 58.6602 21.5499 58.6502 12.6299C58.6402 6.66995 53.6402 1.86995 47.7002 1.81995Z" fill="#DBA82F"/>
                        <path d="M47.7 30.4499V31.8999C46.61 30.9399 36.74 21.5499 36.75 12.6299C36.75 12.3999 36.76 12.1599 36.77 11.9299C37.29 20.5899 46.63 29.5099 47.7 30.4499Z" fill="#E36308"/>
                        <path d="M47.7003 1.81995V30.4499C46.6303 29.5099 37.2903 20.5999 36.7803 11.9299C37.1503 6.29995 41.9803 1.86995 47.7003 1.81995Z" fill="#FA8A3A"/>
                        <path d="M58.6502 12.6299C58.6602 21.5499 48.8002 30.9399 47.7002 31.8999V30.4499C48.7702 29.5099 58.1102 20.5999 58.6202 11.9299C58.6402 12.1599 58.6502 12.3899 58.6502 12.6299Z" fill="#B14D06"/>
                        <path d="M58.6202 11.9299C58.1002 20.5999 48.7602 29.5099 47.7002 30.4499V1.81995C53.4102 1.86995 58.2402 6.29995 58.6202 11.9299Z" fill="#E36308"/>
                        <path d="M53.2002 12.5299C53.2002 15.5699 50.7402 18.0299 47.7002 18.0299C44.6602 18.0299 42.2002 15.5699 42.2002 12.5299C42.2002 9.48991 44.6602 7.02991 47.7002 7.02991C50.7302 7.02991 53.2002 9.48991 53.2002 12.5299Z" fill="#FDD2B3"/>
                        <path d="M53.2002 12.5299C53.2002 15.5699 50.7402 18.0299 47.7002 18.0299C44.6602 18.0299 42.2002 15.5699 42.2002 12.5299C42.2002 12.3599 42.2102 12.1899 42.2202 12.0199C42.4802 14.8199 44.8402 17.0099 47.7002 17.0099C50.5602 17.0099 52.9202 14.8199 53.1702 12.0199C53.1902 12.1999 53.2002 12.3599 53.2002 12.5299Z" fill="#FB9D5A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1592_11949">
                        <rect width="64" height="64" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <p className="font-brsemi text-lg text-[#636066]">Other Countries</p>
                        </div>
                        </div>
                    </div>
                    <button className="bg-ev-700 rounded-mm py-3 text-white flex justify-center gap-1 items-center">Proceed 
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.8335 8H14.0535" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}



