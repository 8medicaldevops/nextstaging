

export default function OrderBox() {
    return(
        <div className="rounded-3xl bg-white p-6 w-[378px] drop-shadow">
            <div className="flex flex-col gap-3">
                <p className="font-brsemi text-[24px] text-[#181719]">Zapphire Event Center</p>
                <p className="font-brmedium text-[#181719]">15th Oct 2024, 7:54 AM</p>
                <span className="flex gap-1 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2890_31127)">
                <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#F34197" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#F34197" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 9.5V14.5" stroke="#F34197" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 9.5V14.5" stroke="#F34197" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2890_31127">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p className="font-brsemi text-xl">₦ 146,000</p>
                </span>
            </div>
            <div className="bg-[#F4F6FA] p-4 flex flex-col gap-2 rounded-mm">
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Date</p>
                    <p className="text-sm font-brreg text-[#181719]">15, Oct 2024</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Standby Time</p>
                    <p className="text-sm font-brreg text-[#181719]">9:00am - 5:00pm</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">Large Ambulance</p>
                    <p className="text-sm font-brreg text-[#181719]">0</p>
                </span>
                <span className="flex justify-between">
                    <p className="text-sm font-brreg text-[#636066]">No. of Medics</p>
                    <p className="text-sm font-brreg text-[#181719]">4</p>
                </span>
            </div>
        </div>
    )
}