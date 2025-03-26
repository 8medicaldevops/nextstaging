import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/police.png';
import logo3 from '../../assets/images/leadway assurance.png';
import logo4 from '../../assets/images/fastcake.png';
import logo5 from '../../assets/images/pharmarun.png';
import logo6 from '../../assets/images/lecc.png';
import logo7 from '../../assets/images/redbanner.png';
import logo8 from '../../assets/images/ehcon.png';
import logo9 from '../../assets/images/lag.png';
import logo10 from '../../assets/images/asemhp.png';
import logo11 from '../../assets/images/cee.png';
import logo12 from '../../assets/images/eagle.png';

export default function Sponsors() {
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
            <button className="bg-ev-700 px-5 py-2 text-md text-white w-fit font-brsemi rounded-mm cursor-pointer flex items-center gap-1  justify-center">
                Become a Sponsor
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.33337 8.5H13.5534" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </section>
    )
}