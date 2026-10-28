"use client";
import { Link } from "@/lib/router-compat";
import { useState } from "react";
import { useFormik } from "formik";
import { useFetch } from "@/components/hooks/useFetch";
import { BeatLoader } from "react-spinners";

import NavBar from "../../components/NavBar";
import { forgotPasswordValidation } from "./FormValidation";
import OtpVerification from "./OtpVerification";

import forgot__asset from "../../assets/images/password-ambulance.png";

const forgot = forgot__asset.src ?? forgot__asset;
import lock__asset from "../../assets/images/lock.svg";
const lock = lock__asset.src ?? lock__asset;
import reEnterPin__asset from "../../assets/images/re-enter-pincode.svg";
const reEnterPin = reEnterPin__asset.src ?? reEnterPin__asset;
export default function ForgotPassword() {

    const [isOtpSent] = useState(false);

    const {isPending, fetchUserDataSetItemChangeState, otpSent } = useFetch(process.env.VITE_USER_FORGOT_PASSWORD);


    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        email: '',
    });

    function retievePassword(){
        fetchUserDataSetItemChangeState (values, values.email, "email", isOtpSent)
    }


    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordValidation,
        onSubmit: () => {

            retievePassword();

        }
    })

    return (
        <div>
            <NavBar />
            <div className="md:h-full md:mt-1/2 flex gap-6 md:gap-12 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto p-[2rem]">
                <div className="md:h-full md:w-[40%] md:self-center">
                    <img src={forgot} alt="" className="object-fill hidden md:flex       mx-auto" />
                </div>
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem]            border-[#F4F2F5] md:w-[40%]  md:self-center">
                    <div className="flex flex-col items-center justify-center my-[0.5rem]">
                        <div className="p-4 bg-[#F4F1FF] rounded-[50%]">
                            <img src={isOtpSent ? reEnterPin : lock} alt="lock icon" className="self-center size-[30px]" />
                        </div>
                        <h3 className="font-brsemi text-2xl max-sm:text-xl text-[#181719] text-center my-3">Forgot Password</h3>
                        <p className="font-brreg text-lg text-[#636066] my-[0.5rem] text-center">
                            {isOtpSent ?
                                "Enter the 6-digit code sent to your email address" :
                                "Input your email address below to reset your password."}
                        </p>
                    </div>
                    {
                        otpSent ? <OtpVerification /> :
                            <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                                <div className="py-[1rem] flex flex-col">
                                    <label htmlFor="emailAddress" className="font-brsemi text-sm text-[#636066]">Email Address</label>
                                    <input type="text"
                                        className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                        placeholder="Enter email address"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                        id="identifier"
                                        onBlur={handleBlur}
                                    />

                                    {touched.email && errors.email &&
                                        <p>
                                            <small className='text-xs text-red-500'>
                                                {errors.email}
                                            </small>
                                        </p>
                                    }
                                </div>
                                <div className="pb-[0.5rem]">
                                    <button className="bg-ev-700 w-full font-brsemi text-lg rounded-mm  text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]" type="submit">
                                        Reset Password
                                        {
                                            isPending ?
                                                <BeatLoader size={4} color="#ffffff" /> :
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                        }
                                    </button>
                                </div>
                                <Link className="mx-auto self-center text-ev-700" to="/SignIn">Go back</Link>
                            </form>
                    }
                </div>
            </div>
        </div>

    )
}