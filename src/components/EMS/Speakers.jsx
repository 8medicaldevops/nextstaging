import speaker1 from '../../assets/images/docAyo.png';
import speaker2 from '../../assets/images/docTemi.png';
import speaker3 from '../../assets/images/docAlli.png';

const facilitators = [
    {
        name: 'Dr. Abiola Fasina-Ayoola',
        position: 'President and Consultant Emergency Physician',
        image: speaker1
    },
    {
        name: 'Dr. Temi Filani',
        position: 'Senior Advisor Palladium',
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