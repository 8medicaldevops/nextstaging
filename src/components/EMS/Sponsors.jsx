import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/images 2.png';
import logo3 from '../../assets/images/leadway assurance.png';

export default function Sponsors() {
    return (
        <section className="py-20 flex flex-col justify-center items-center gap-10">
            <h1 className="text-[#121212] text-4xl font-brbold">Proudly Supported By</h1>
            <div className="flex flex-row gap-5">
                <img src={logo} alt="8medical logo" />
                <img src={logo2} alt="" />
                <img src={logo3} alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
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