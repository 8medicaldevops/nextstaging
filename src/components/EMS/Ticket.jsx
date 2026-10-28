"use client";
import grid1__asset from "../../assets/images/Medical.png";
const grid1 = grid1__asset.src ?? grid1__asset;
import grid2__asset from "../../assets/images/Manager.png";
const grid2 = grid2__asset.src ?? grid2__asset;
import grid3__asset from "../../assets/images/Stakeholder.png";
const grid3 = grid3__asset.src ?? grid3__asset;
import grid4__asset from "../../assets/images/confetti.png";
const grid4 = grid4__asset.src ?? grid4__asset;
import ticketIcon__asset from "../../assets/images/ticket.png";
const ticketIcon = ticketIcon__asset.src ?? ticketIcon__asset;
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
                <a href="https://linktr.ee/8medicalcommsteam" target="_blank" className="flex items-center gap-2 justify-center">
                    Get a Ticket Now
                    <img src={ticketIcon} alt="ticket icon" />
                </a>
            </button>
        </section>
    )
}