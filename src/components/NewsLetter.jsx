"use client";
import { useState } from "react";
import Suscribed from "./Suscribed";
import axios from "axios";
import { Mail } from "lucide-react";

import successImage__asset from '../assets/images/sub-success.svg';

const successImage = successImage__asset.src ?? successImage__asset;
import subscribedImage__asset from '../assets/images/sub-already.svg';
const subscribedImage = subscribedImage__asset.src ?? subscribedImage__asset;
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


        axios.post(process.env.VITE_NEWSLETTER_API, {
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
        <div className="grid items-center gap-10 border-t border-white/10 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <div className="flex flex-col gap-3 max-lg:items-center max-lg:text-center">
                <h2 className="font-brbold text-3xl tracking-tight text-white sm:text-4xl">Subscribe to our Newsletter</h2>
                <p className="max-w-[44ch] font-brmedium text-lg text-white/70">
                    Get relevant health care updates, resources and offers straight in your inbox
                </p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-2">
                <label htmlFor="newsletter-email" className="font-brsemi text-sm text-white/80">
                    Email address
                </label>
                <div
                    className={
                        "flex w-full min-w-0 items-center gap-2 rounded-full border bg-white/10 p-1.5 pl-5 transition-colors duration-200 focus-within:border-ev-300 focus-within:bg-white/15 max-sm:flex-col max-sm:rounded-3xl max-sm:p-3 " +
                        (emailAddressEntered ? "border-white/20" : "border-[#FF6B76]")
                    }
                >
                    <Mail size={20} aria-hidden="true" className="shrink-0 text-white/60 max-sm:hidden" />
                    <input
                        id="newsletter-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!emailAddressEntered}
                        aria-describedby={!emailAddressEntered ? "newsletter-error" : undefined}
                        className="w-full min-w-0 flex-1 bg-transparent py-3 font-brmedium text-white outline-none placeholder:text-white/50 max-sm:px-2"
                        value={emailAddress}
                        name="emailAddress"
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="shrink-0 rounded-full bg-ev-700 px-6 py-3.5 font-brsemi text-base text-white transition-[transform,background-color] duration-200 ease-out-strong hover:bg-ev-600 active:scale-[0.97] max-sm:w-full sm:text-lg"
                    >
                        Subscribe
                    </button>
                </div>
                <p id="newsletter-error" role="alert" className="min-h-5 pl-5 text-sm text-[#FF8A92]">
                    {!emailAddressEntered && "Enter a valid email address, like you@example.com."}
                </p>
            </form>
            {isSubscribed && (
                <Suscribed isModalOpen={isSubscribed} isModalClosed={() => setIsSubscribed(false)} img = {subscribedImage} title={subscribedData.title} body={subscribedData.body} bg="#181719"/>
            )}
            <Suscribed isModalOpen={isModalOpen} isModalClosed={() => setIsModalOpen(false)} img = {successImage} title={successData.title} body={successData.body} />
        </div>
    );
}
