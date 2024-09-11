import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import { useToasts } from 'react-toast-notifications';
import { BeatLoader } from "react-spinners";


import { createAccountValidation } from "./FormValidation";

import google from "../../assets/images/google.svg";
import signup from "../../assets/images/signup.svg";


export default function CreateAccount() {
    let navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        //termsAndConditions: false,
    });

    const { addToast } = useToasts()


    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/SignIn",
            title: "Sign In",
        })
    }, [])


    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const createUserAccount = async () => {
        setIsPending(true);
        await fetch(import.meta.env.VITE_USER_REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.success == true) {
                    setIsPending(false);
                    addToast(`Hello ${data.data.firstName}, your sign in was successful. You will be redirected to the homepage in a few seconds.`, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setTimeout(() => { navigate("/SignIn") }, 4000);
                    sessionStorage.setItem('SignIn', JSON.stringify(data));
                    
                } else if (data.success == false && data.statusCode == 409) {
                    setIsPending(false);
                    addToast(`Hello, There was an error. This email might have been used already. Please try again. If it persists, contact support"`, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
            })
            .catch(error => {
                setIsPending(false);
                console.error('There has been a problem with your fetch operation:', error);
                addToast("Hello, There was an error. Please try again. ", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: createAccountValidation,
        onSubmit: (values) => {

            //fetchUserDataAndRoute(values, import.meta.env.VITE_USER_REGISTER, "/SignIn", "signUpData"); //USEEFFECT

            /*if (isSuccess && myData.statusCode == 201) {
                addToast(`Hello ${myData.data.firstName}, your account creation was successful. You will be redirected to the login page in a few seconds.`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            } else if (isError || myData.statusCode == 409) {
                addToast(`Hello, There was an error. This email might have been used already. Please try again. If it persists, contact support"`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            } */

            createUserAccount();
            console.log(values);

        }
    })


    return (
        <div>
            <NavBar />
            <div className="md:h-full flex flex-col justify-center gap-6 md:gap-12 flex-col md:flex-row  md:w-[100%]  md:-px-auto p-[2rem]"> {/*items-center md:justify-center md:items-center* */}
                <div className="md:h-full md:w-[40%] md:self-center">
                    <img src={signup} alt="" className="object-fill hidden md:flex mx-auto" />
                </div>
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[40%]  md:self-center">
                    <div className="flex flex-col items-center justify-center my-auto">
                        <h3 className="font-brsemi text-2xl max-sm:text-xl text-[#181719] text-center">Welcome Back</h3>
                        <p className="font-[16px] text-lg text-[#636066] my-[0.5rem] text-center">
                            Already have an account? <Link className="text-ev-700 my-[0.5rem]" to="/SignIn">Sign In</Link>
                        </p>
                        <button className="flex gap-3 bg-[#F9F9FA] py-[16px] px-[12px] border-[#F4F2F5] w-full rounded-mm  justify-center my-[0.5rem]">
                            <img src={google} alt="" className="self-center" />
                            Continue with Google
                        </button>
                    </div>
                    <p className="text-center">Or</p>
                    <form action="" className="flex flex-col" noValidate onSubmit={handleSubmit}>
                        <div className="py-[0.5rem] flex justify-between w-[100%] gap-3">
                            <div className=" flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="firstName" className="font-brsemi text-sm text-[#636066] mb-[10px]">First Name</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter First Name"
                                    value={values.firstName}
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    id="firstName"
                                    onBlur={handleBlur}
                                />

                                {touched.firstName && errors.firstName &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.firstName}
                                        </small>
                                    </p>
                                }
                            </div>
                            <div className=" flex flex-col gap-[3px] w-1/2">
                                <label htmlFor="lastName" className="font-brsemi text-sm text-[#636066] mb-[10px]"  >Last Name</label>
                                <input type="text"
                                    className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                    placeholder="Enter Last Name"
                                    value={values.lastName}
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    id="lastName"
                                    onBlur={handleBlur}
                                />
                                {touched.lastName && errors.lastName &&
                                    <p>
                                        <small className='text-xs text-red-500'>
                                            {errors.lastName}
                                        </small>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="py-[0.5rem] flex flex-col">
                            <label htmlFor="" className="font-brsemi text-sm text-[#636066] mb-[10px]" >Email Address</label>
                            <input type="email"
                                className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                placeholder="Enter Email Address"
                                value={values.email}
                                name="email"
                                onChange={handleChange}
                                autoComplete="email"
                                required
                                id="emailAddress"
                                onBlur={handleBlur}
                            />
                        </div>
                        {touched.email && errors.email &&
                            <p>
                                <small className='text-xs text-red-500'>
                                    {errors.email}
                                </small>
                            </p>
                        }
                        <div className="py-[0.5rem]">
                            <label htmlFor="password" className="font-brsemi text-sm text-[#636066] mb-[10px]">Create Password</label>
                            <input
                                type={(isPasswordVisible === true) ? "text" : "password"}
                                id="password"
                                placeholder="Create Password"
                                name="password"
                                className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />

                            <button
                                type="button"
                                id="togglePassword"
                                className="focus:outline-none -ml-8 cursor-pointer"
                                onClick={handlePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {touched.password && errors.password &&
                            <p>
                                <small className='text-xs text-red-500'>
                                    {errors.password}
                                </small>
                            </p>
                        }
                        {/*
                            <div className="py-[0.5rem] flex items-center gap-1 max-md:gap-2 max-md:text-left">
                                <input
                                    type="checkbox"
                                    id="termsAndConditions"
                                    name="termsAndConditions"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <label className="font-brreg text-sm max-lg:text-xs text-red-500 ml-2">
                                    I agree with the <a href="">Terms and Conditions</a> and <a href="">Privacy Policy</a>
                                </label>
                            </div>
                            {touched.termsAndConditions && errors.termsAndConditions &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.termsAndConditions}
                                    </small>
                                </p>
                            }*/}
                        <div className="pb-[0.5rem] pt-[1rem]">
                            <button
                                className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]"
                                type="submit"
                            >
                                {/*onClick={() => { navigate("/dashboard-home") }} */}
                                Sign Up
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
                    </form>
                </div>
            </div>
            {/*<ToastContainer />*/}
        </div>
    )
}
