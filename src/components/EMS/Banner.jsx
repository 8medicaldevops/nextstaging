"use client";
import ellipse1__asset from '../../assets/images/Ellipse4.png';
const ellipse1 = ellipse1__asset.src ?? ellipse1__asset;
import ellipse2__asset from '../../assets/images/Ellipse5.png';
const ellipse2 = ellipse2__asset.src ?? ellipse2__asset;
import ellipse3__asset from '../../assets/images/Ellipse6.png';
const ellipse3 = ellipse3__asset.src ?? ellipse3__asset;
export default function Banner() {
    return (
        <section className="bg-[#110f21] py-16 px-4 sm:px-10 md:px-20 flex flex-col gap-10 items-center">
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-0 mx-auto'>
                <img src={ellipse1} alt="" className='w-[min(100%,240px)] md:w-[clamp(150px,24vw,252px)]'/>
                <img src={ellipse2} alt="" className='w-[min(100%,240px)] md:w-[clamp(150px,24vw,252px)] md:-ml-5'/>
                <img src={ellipse3} alt="" className='w-[min(100%,240px)] md:w-[clamp(150px,24vw,252px)] md:-ml-5'/>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 text-center">
                <h1 className="text-[#fff] font-brbold text-3xl sm:text-4xl">About EMS Week</h1>
                <p className="text-[#fff] font-brreg text-lg sm:text-xl max-w-[50rem]">
                    EMS Week is an annual event dedicated to celebrating and recognizing the work of Emergency Medical Services (EMS) professionals. It traditionally takes place during the month of May and is a period in which to advocate for awareness of the vital role EMS providers play in emergency services, engage with the public, and promote education regarding emergency response.
                </p>
            </div>
        </section>
    )
}