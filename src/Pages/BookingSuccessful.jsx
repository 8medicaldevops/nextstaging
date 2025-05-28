import { Link } from "react-router-dom"
import ReactGA from "react-ga4";
import { useEffect } from "react";
import BookingSuccessfulImg from "../assets/images/booksuccess.svg"

export default function BookingSuccessful() {

    localStorage.clear();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/StandBy/Nigeria/Event/Schedule/Ambulance Size/Confirm order/Booking successful",
            title: "Booking Successful",
        })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center gap-6 h-[100vh]">
           <img src={BookingSuccessfulImg } alt="Booking Successful" className="" />
            <p className="font-brbold  text-3xl">Booking Successful!</p>
            <p className="text-lg text-[#48444F] font-brsemi text-center w-[560px] max-lg:w-[90%]">You have successfully made a reservation for ambulance standby at your location. We will contact you for more information.</p>
            <Link to='/' >
                <button className="w-[244px] py-3 px-9 bg-[#6D09F9] rounded-mm font-brsemi text-white ">Done</button>
            </Link>
        </div>
    )
}