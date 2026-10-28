"use client";
import { useState } from 'react';
import ContactModal from '../ContactModal';

import logo__asset from '../../assets/images/logo.png';

const logo = logo__asset.src ?? logo__asset;
import logo2__asset from '../../assets/images/police.png';
const logo2 = logo2__asset.src ?? logo2__asset;
import logo3__asset from '../../assets/images/leadway assurance.png';
const logo3 = logo3__asset.src ?? logo3__asset;
import logo4__asset from '../../assets/images/fastcake.png';
const logo4 = logo4__asset.src ?? logo4__asset;
import logo5__asset from '../../assets/images/pharmarun.png';
const logo5 = logo5__asset.src ?? logo5__asset;
import logo6__asset from '../../assets/images/lecc.png';
const logo6 = logo6__asset.src ?? logo6__asset;
import logo7__asset from '../../assets/images/redbanner.png';
const logo7 = logo7__asset.src ?? logo7__asset;
import logo8__asset from '../../assets/images/ehcon.png';
const logo8 = logo8__asset.src ?? logo8__asset;
import logo9__asset from '../../assets/images/lag.png';
const logo9 = logo9__asset.src ?? logo9__asset;
import logo10__asset from '../../assets/images/asemhp.png';
const logo10 = logo10__asset.src ?? logo10__asset;
import logo11__asset from '../../assets/images/cee.png';
const logo11 = logo11__asset.src ?? logo11__asset;
import logo12__asset from '../../assets/images/eagle.png';
const logo12 = logo12__asset.src ?? logo12__asset;
import contact__asset from '../../assets/images/contact.svg';
const contact = contact__asset.src ?? contact__asset;
export default function Sponsors() {

    const [isSponsor, setIsSponsor] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sponsorData = {
        title: "For sponsorship and partnership, contact:",
        phone: "+2348092470000",
        email: "hello@8medical.co"
    }

    return (
        <section className="py-20 px-20 flex flex-col justify-center items-center gap-10">
            <h1 className="text-[#121212] text-3xl font-brbold text-center">Proudly Supported By</h1>
            <div className="flex justify-center gap-5 flex-wrap">
                <img src={logo} alt="8medical logo" className='h-[30px]' />
                <img src={logo2} alt="Nigerian police logo" className='h-[30px]' />
                <img src={logo3} alt="Leadway logo" className='h-[30px]' />
                <img src={logo4} alt="Fastcakes logo" className='h-[30px]' />
                <img src={logo5} alt="Pharmarun logo" className='h-[30px]' />
                <img src={logo6} alt="Lecc logo" className='h-[30px]' />
                <img src={logo7} alt="logo" className='h-[30px]' />
                <img src={logo8} alt="Ehcon logo" className='h-[30px]' />
                <img src={logo9} alt="logo" className='h-[30px]' />
                <img src={logo10} alt="Asemhp logo" className='h-[30px]' />
                <img src={logo11} alt="logo" className='h-[30px]' />
                <img src={logo12} alt="logo" className='h-[30px]' />
            </div>
            <button 
                className="bg-ev-700 px-5 py-2 text-md text-white w-fit font-brsemi rounded-mm cursor-pointer flex items-center gap-1  justify-center" 
                onClick={   
                    () => {
                        setIsSponsor(true);
                        setIsModalOpen(true);
                    }
                }
            >
                Become a Sponsor
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {isSponsor && isModalOpen && (
                <ContactModal isModalOpen={isSponsor} isModalClosed={() => setIsSponsor(false)} img = {contact} email={sponsorData.email} title={sponsorData.title} bg="#181719" phone={sponsorData.phone}/>
            )}
        </section>
    )
}