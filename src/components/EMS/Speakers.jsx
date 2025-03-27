import speaker1 from '../../assets/images/speaker1.png';

const facilitators = [
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
    {
        name: 'Firstname Lastname',
        position: 'Position',
        image: speaker1
    },
];

export default function Speakers() {
    return (
        <section className="bg-[#110F21] py-20 px-10">
            <div className="flex items-center justify-center flex-col gap-5 text-center">
                <h1 className="text-[#fff] font-brbold text-3xl">EMS Week'25 Speakers and Facilitators</h1>
                <p className="text-[#a3a3a3] font-brreg">This year’s facilitators are made up of top medical emergency professionals in Nigeria</p>
            </div>
            <div className='pt-10 grid grid-cols-2 md:grid-cols-4 gap-3'>
                {facilitators.map((facilitator, index) =>
                    <div className="flex flex-col items-center justify-center gap-2 mb-[2rem]" key={index}>
                        <img src={facilitator.image} alt="EMS facilitator" />
                        <h6 className="text-[#fff] font-brbold text-sm">{facilitator.name}</h6>
                        <small className="text-[#a3a3a3] font-brreg">{facilitator.position}</small>
                    </div>
                )}
            </div>
        </section>
    )
}