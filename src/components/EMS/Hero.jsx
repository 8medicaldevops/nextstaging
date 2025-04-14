import hero1 from "../../assets/images/Group27.png";
import hero2 from "../../assets/images/Group43239.png";
import EventCountdown from "./EventCountdown";

export default function Hero() {
    const THREE_DAYS_IN_MS = 53 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
  
    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  
    return (
        <section className="bg-[url(./assets/emsHero.png)] bg-no-repeat bg-cover bg-center md:h-full">
            <div className="h-full md:mt-1/2 flex gap-6 md:gap-16 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto md:-py-auto p-[2rem]">
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[55%] md:self-center flex flex-col gap-5">
                    <img src={hero1} alt="EMS logo" className="w-[10rem]" />
                    <h1 className="font-brbold text-[#121212] text-3xl md:text-4xl">Eight Medical Emergency Medical Service Week 2025</h1>
                    <p className="text-[#505050] font-brreg text-[#505050]  rounded max-sm:w-full text-xl">The biggest gathering of emergency response ecosystem in Nigeria</p>
                    <button className="w-fit bg-ev-700 px-5 py-3 text-xl text-white font-brsemi rounded-mm cursor-pointer flex items-center gap-1 max-lg:w-full justify-center">
                        Get a Ticket Now
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="h-full md:w-[45%] md:self-center">
                    <img src={hero2} alt="" className="object-fill md:flex mx-auto rounded-[1rem] w-[30rem]" />
                </div>
            </div>
            <div className="bg-[#f3f0f7] px-10 py-[2rem] md:w-[90%] mx-auto rounded-[1rem] event-countdown">
                <EventCountdown targetDate={dateTimeAfterThreeDays}/>
            </div>
        </section>

    )
}