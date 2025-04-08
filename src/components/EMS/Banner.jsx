import ellipse1 from '../../assets/images/ellipse4.png';
import ellipse2 from '../../assets/images/ellipse5.png';
import ellipse3 from '../../assets/images/ellipse6.png';

export default function Banner() {
    return (
        <section className="bg-[#110f21] py-20 px-10 md:px-20 flex flex-col gap-10 items-center">
            <div className='flex flex-col md:flex-row mx-auto'>
                <img src={ellipse1} alt="" className='md:ml-[-20px]'/>
                <img src={ellipse2} alt="" className='md:ml-[-20px]'/>
                <img src={ellipse3} alt="" className='md:ml-[-20px]'/>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 text-center">
                <h1 className="text-[#fff] font-brbold text-4xl">Join the 2nd Edition of the EMS Week in Nigeria!</h1>
                <p className="text-[#fff] font-brreg text-xl max-w-[50rem]">
                    EMS Week’25 is set to take place in the city of Lagos, Nigeria, from the 18th to 24th of May, 2025. This event promises to be an unforgettable experience with inspiring keynote speakers, and hands-on advanced workshops.
                </p>
            </div>
        </section>
    )
}