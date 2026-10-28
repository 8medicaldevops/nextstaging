"use client";
import speaker1__asset from '../../assets/images/docAyo.png';
const speaker1 = speaker1__asset.src ?? speaker1__asset;
import speaker2__asset from '../../assets/images/ACP.png';
const speaker2 = speaker2__asset.src ?? speaker2__asset;
import speaker3__asset from '../../assets/images/docAlli.png';
const speaker3 = speaker3__asset.src ?? speaker3__asset;
const facilitators = [
    {
        name: 'Dr. Abiola Fasina-Ayoola',
        position: 'President and Consultant Emergency Physician',
        image: speaker1
    },
    {
        name: 'ACP Abosede M. Salami',
        position: 'Assistant Commissioner of Police Medical, Lagos State Command',
        image: speaker2
    },
    {
        name: 'Dr. Alli Tokunbo',
        position: 'Managing Director of Leadway Health',
        image: speaker3
    },
];

export default function Speakers() {
    return (
        <section className="bg-[#110F21] py-20 px-10">
            <div className="flex items-center justify-center flex-col gap-5 text-center">
                <h1 className="text-[#fff] font-brbold text-3xl">EMS Week'25 Speakers and Facilitators</h1>
                <p className="text-[#a3a3a3] font-brre text-[20px]">This year’s facilitators are made up of top medical emergency professionals in Nigeria</p>
            </div>
            <div className='pt-10 flex flex-col md:flex-row items-center justify-center gap-[3rem]'>
                {facilitators.map((facilitator, index) =>
                    <div className="flex flex-col items-center justify-center gap-2 mb-[2rem]" key={index}>
                        <img src={facilitator.image} alt="EMS facilitator" />
                        <h6 className="text-[#fff] font-brbold text-[20px]">{facilitator.name}</h6>
                        <p className="text-[#a3a3a3] font-brreg text-[16px] max-w-[20rem] text-center">{facilitator.position}</p>
                    </div>
                )}
            </div>
        </section>
    )
}