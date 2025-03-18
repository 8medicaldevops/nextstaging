import about from "../../assets/images/Footer Image.png";
import logo from '../../assets/images/logo.png';

export default function Exhibit() {

    return (
        <section>
            <div className="bg-[#110f21] h-full md:mt-1/2 flex gap-6 md:gap-16 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto md:-py-auto p-[2rem]">
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[50%] md:self-center flex flex-col gap-10">
                    <h1 className="text-[#fff] text-4xl font-brbold">Would you like to Exhibit your Startup or Business?</h1>
                    <p className="text-[#a3a3a3] font-brreg">
                        Increase your startup and business visibility by booking a booth with us to exhibit at our conference today.
                    </p>
                    <button className="bg-ev-700 px-5 py-2 text-md text-white w-fit font-brsemi rounded-mm cursor-pointer flex items-center gap-1  justify-center">
                        Become an Exhibitor
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="h-full md:w-[50%] md:self-center">
                    <img src={about} alt="" className="object-fill md:flex mx-auto rounded-[1rem]" />
                </div>
            </div>
        </section>
    )
}