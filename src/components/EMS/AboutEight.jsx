"use client";
import about__asset from "../../assets/images/abouteight.png";
const about = about__asset.src ?? about__asset;
import logo__asset from '../../assets/images/logo.png';
const logo = logo__asset.src ?? logo__asset;
export default function AboutEight() {

    return (
        <section>
            <div className="h-full md:mt-1/2 flex gap-6 md:gap-16 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto md:-py-auto p-[2rem]">
                <div className="h-full md:w-[40%] md:self-center">
                    <img src={about} alt="" className="object-fill md:flex mx-auto rounded-[1rem]" />
                </div>
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[40%] md:self-center flex flex-col gap-10">
                    <img src={logo} alt="Eight Medical logo" className="w-[200px]"/>
                    <h1 className="text-[#181719] text-4xl font-brbold">About Us</h1>
                    <p className="text-[#505050] font-brreg text-[20px]">
                        We are an end to end platform that identifies and connects hospital, personnel, care, information
                        and credit to users in 10 mins or less, we ensure accessibility, Improved patient care, and
                        streamlined processes to care.
                    </p>
                    <a className="bg-ev-700 px-5 py-2 text-md text-white w-fit font-brsemi rounded-mm cursor-pointer flex items-center gap-1 justify-center" href="https://www.8medical.co/AboutUs">
                        Learn more about 8medical
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}