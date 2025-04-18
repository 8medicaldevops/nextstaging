import grid1 from "../../assets/images/Medical.png";
import grid2 from "../../assets/images/Manager.png";
import grid3 from "../../assets/images/Stakeholder.png";
import grid4 from "../../assets/images/confetti.png";

export default function Ticket() {
    return (
        <section className="py-20 px-[2rem] flex flex-col gap-10">
            <h1 className="font-brbold text-3xl max-w-[40rem]">Why you should Attend Eight Medical's EMS WEEK 2025</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <img src={grid1} alt="" className="h-[40px]" />
                    <h3 className="text-[#121212] font-brbold text-md py-2">Hands-on Emergency Medical Training</h3>
                    <p className="text-[#505050] text-[16px]">
                        Pre-conference professional training workshop including training members of the society on basic life saving medical interventions.
                    </p>
                </div>
                <div>
                    <img src={grid2} alt="" className="h-[40px]" />
                    <h3 className="text-[#121212] font-brbold text-md py-2">Access to Industry Experts</h3>
                    <p className="text-[#505050] text-[16px]">
                        You can directly and indirectly learn and engage with industry experts, offering valuable opportunities to gain deeper insights into your areas of interest
                    </p>
                </div>
                <div>
                    <img src={grid3} alt="" className="h-[40px]" />
                    <h3 className="text-[#121212] font-brbold text-md py-2">Connect and Network</h3>
                    <p className="text-[#505050] text-[16px]">
                        We bring together the biggest stakeholders in Nigeria’s emergency medical ecosystem to create opportunities for professional growth and aid collaboration and partnerships.
                    </p>
                </div>
                <div>
                    <img src={grid4} alt="" className="h-[40px]" />
                    <h3 className="text-[#121212] font-brbold text-md py-2">Have Fun and Unwind</h3>
                    <p className="text-[#505050] text-[16px]">
                        Come have fun with known and new friends in our sporting activities lined up for your enjoyment.
                    </p>
                </div>
            </div>
            <button className="w-fit bg-[#ff2e60] py-3 px-5 text-xl text-white font-brsemi rounded-mm cursor-pointer">
                <a href="https://linktr.ee/8medicalcommsteam" target="_blank" className="flex items-center gap-1 justify-center">
                    Get a Ticket Now
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </button>
        </section>
    )
}