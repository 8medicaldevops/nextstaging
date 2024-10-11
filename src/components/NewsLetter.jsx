import { useState } from "react";
import Suscribed from "./Suscribed";
import axios from "axios";

import successImage from '../assets/images/sub-success.svg';
import subscribedImage from '../assets/images/sub-already.svg';


export default function NewsLetter() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailAddressEntered, setEmailAddressEntered] = useState(true);

    const successData = {
        title: "Thank you for Subscribing!",
        body: "You're now part of our community and will receive the latest updates, exclusive offers, and insider content straight to your inbox."
    }

    const subscribedData = {
        title: "You are already subscribed!",
        body: "Thank you for being a part of our community. Keep enjoying our regular updates and stay tuned for more."
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Clear the email validation error as soon as the user starts typing
        setEmailAddressEntered(true);

        // Update the corresponding state based on the input name
        if (name === 'emailAddress') {
            setEmailAddress(value.trim());
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure the email address is not empty
        if (!emailAddress.trim()) {
            // Set error state if email is empty
            setEmailAddressEntered(false);
            return;
        }

        // Validate the email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            setEmailAddressEntered(false);
            return;
        }


        axios.post(import.meta.env.VITE_NEWSLETTER_API, {
            email: emailAddress,
        })
            .then(function (response) {
                console.log(response);
                setIsModalOpen(true);
                setEmailAddress('');
            })
            .catch(function (error) {
                // console.log(error)
                
                // Notify user if email has already been used
                let statusCode = error.response.data.statusCode;
                if(statusCode == 409){
                    setIsSubscribed(true);
                }
            });

    }

    return (
        <div className=" py-16  flex flex-col gap-8 rounded-[32px] bg-white items-center">
            <div className="px-24 items-center gap-1 text-center max-lg:px-4 max-sm:px-2 max-lg:flex max-lg:flex-col ">
                <p className=" font-brsemi text-4xl text-[#000000] max-lg:w-[300px] max-lg:text-[32px] max-sm:text-2xl max-lg:text-center ">Subscribe to our Newsletter</p>
                <p className=" font-brmedium text-[#636066]">Get relevant health care updates, resources and offers straight in your inbox</p>
            </div>
            <form onSubmit={handleSubmit} className="w-[90%] flex  gap-2 items-center max-lg:flex-col ">
                <input
                    placeholder="Enter your email address here"
                    className=" font-brmedium text-[#9C9A9E] border-[1px]-[#F4F2F5] py-3 px-5 max-lg:w-full bg-[#F9F9FA] outline-none rounded-mm w-[80%]"
                    value={emailAddress}
                    name="emailAddress"
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={!emailAddressEntered} className={emailAddressEntered ? " font-brbold text-lg text-white py-3 px-5 bg-ev-700 rounded-mm max-lg:w-[90%]" : " font-brbold text-lg text-white py-3 px-5 bg-ev-300 rounded-mm max-lg:w-[90%]"}>Subscribe</button>
            </form>
            {!emailAddressEntered && (
                <small className="text-red-500">Invalid email address.</small>
            )}
            {isSubscribed && (
                <Suscribed isModalOpen={isSubscribed} isModalClosed={() => setIsSubscribed(false)} img = {subscribedImage} title={subscribedData.title} body={subscribedData.body} bg="#181719"/>
            )}
            <Suscribed isModalOpen={isModalOpen} isModalClosed={() => setIsModalOpen(false)} img = {successImage} title={successData.title} body={successData.body} />
        </div>
    );
}