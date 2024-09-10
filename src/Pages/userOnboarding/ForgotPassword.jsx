import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";

import NavBar from "../../components/NavBar";
import Subscribed from "@/components/Suscribed";
import { useFetch } from "@/components/hooks/useFetch";

import forgot from "../../assets/images/password-ambulance.png";
import lock from "../../assets/images/lock.svg";
import reEnterPin from "../../assets/images/re-enter-pincode.svg";
import { forgotPasswordValidation } from "./FormValidation";

export default function ForgotPassword() {

    let { fetchUserData, myData, isSuccess, isPending, isError } = useFetch();

    const [isNotRegistered, setIsNotRegistered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        email: '',
    });

    const successData = {
        title: "Reset Password",
        body: "An email containing a token to complete this process has been sent to you. You will be redirected to a verifivation page in a few seconds"
    }

    const notRegisteredData = {
        title: "Not registered",
        body: "The email address provided is not registered yet."
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordValidation,
        onSubmit: (values) => {

            fetchUserData(values, import.meta.env.VITE_USER_FORGOT_PASSWORD); //USEEFFECT

            if (isSuccess) {
                setIsModalOpen(true)
            } else if (isError) {
                setIsNotRegistered(true)
            }

            console.log(values);

            console.log(myData);

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
                        <img src={lock} alt="" className="self-center" />
                        <h3 className="font-brsemi text-2xl max-sm:text-xl text-[#181719] text-center">Forgot Password</h3>
                        <p className="font-brreg text-lg text-[#636066] my-[0.5rem] text-center">
                            Input your email address below to reset your password.
                        </p>
                    </div>

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
                            <button className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]" type="submit">
                                Reset Password
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <Link className="underline underline-offset-4 mx-auto self-center" to="/SignIn">Go back</Link>
                    </form>

                    {
                        isError && 
                        <Subscribed title={notRegisteredData.title} body={notRegisteredData.body} img={reEnterPin} isModalOpen={isNotRegistered} isModalClosed={() => setIsNotRegistered(false)}/>
                    }
                    {isPending && <p>pending</p>}
                    {
                        isSuccess && 
                            <Subscribed title={successData.title} body={successData.body} img={reEnterPin} isModalOpen={isModalOpen} isModalClosed={() => setIsModalOpen(false)}/>
                    }
                </div>
            </div>
        </div>

    )
}