/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import { BeatLoader } from "react-spinners";
import { GoogleLogin } from '@react-oauth/google';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

import { useFetch } from "@/components/hooks/useFetch.jsx";

import NavBar from "../../components/NavBar";

import signin from "../../assets/images/signin.png";
import { signInValidation } from "./FormValidation";

export default function SignIn() {
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { fetchUserDataAndRoute, isPending } = useFetch(import.meta.env.VITE_USER_LOGIN,);
    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        identifier: '',
        password: ''
    });

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/SignIn",
            title: "Sign In",
        })
    }, [])

    const handlPasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const responseMessage = (response) => {
        const userData = {
            "token": `${response.credential}`,
        }
        axios
            .post(import.meta.env.VITE_USER_CONTINUE_GOOGLE,
                { ...userData },
            )
            .then((res) => {
                sessionStorage.setItem('SignIn', JSON.stringify(res.data));
                addToast(res.data.message, {
                    appearance: 'success',
                });

                navigate("/")
            })
            .catch((err) => {
                addToast(err.response.data?.message, {
                    appearance: 'error',
                });
             });
    }

    // eslint-disable-next-line no-unused-vars
    const errorMessage = (error) => {
        //console.log(error);
    };


    function signUserIn() {
        fetchUserDataAndRoute(values, '/');
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signInValidation,
        onSubmit: () => {
            signUserIn();
        }
    })

    return (
        <div>
            <NavBar />
            <div className="h-full md:mt-1/2 flex gap-6 md:gap-12 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto md:-py-auto p-[2rem]">
                <div className="h-full md:w-[40%] md:self-center">
                    <img src={signin} alt="" className="object-fill hidden md:flex       mx-auto" />
                </div>
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem]            border-[#F4F2F5] md:w-[40%]  md:self-center">
                    <div className="flex flex-col items-center justify-center my-[0.5rem]">
                        <h3 className="font-brsemi text-2xl max-sm:text-xl text-[#181719] text-center">Welcome Back</h3>
                        <p className="font-brreg text-lg text-[#636066] my-[0.5rem] text-center">
                            Don&apos;t have an account? <Link className="text-ev-700 my-[0.5rem]" to="/CreateAccount">Sign Up</Link>
                        </p>

                        <GoogleLogin
                            onSuccess={responseMessage}
                            onError={errorMessage}
                            size="large"
                            text="continue_with"
                        />
                    </div>

                    <div className="divider-text my-3">
                        <span>OR</span>
                    </div>

                    <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="py-[1rem] flex flex-col">
                            <label htmlFor="emailAddress" className="font-brsemi text-sm text-[#636066]">Email Address</label>
                            <input type="text"
                                className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                placeholder="Enter email address"
                                name="identifier"
                                value={values.identifier}
                                onChange={handleChange}
                                required
                                id="identifier"
                                onBlur={handleBlur}
                            />

                            {touched.identifier && errors.identifier &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.identifier}
                                    </small>
                                </p>
                            }
                        </div>

                        <div className="pb-[1rem]">
                            <label htmlFor="password" className="font-brsemi text-sm text-[#636066] mb-[10px]">Enter Password</label>
                            <input
                                type={(isPasswordVisible === true) ? "text" : "password"}
                                id="password"
                                placeholder="Enter Password"
                                name="password"
                                className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none"
                                required
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <button
                                type="button"
                                id="togglePassword"
                                className="focus:outline-none -ml-8 cursor-pointer"
                                onClick={handlPasswordVisibility}
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

                            {touched.password && errors.password &&
                                <p>
                                    <small className='text-xs text-red-500'>
                                        {errors.password}
                                    </small>
                                </p>
                            }
                        </div>

                        <Link className="underline underline-offset-4 text-right my-3" to="/ForgotPassword">Forgot Password</Link>

                        <div className="pb-[0.5rem]">
                            <button className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]" type="submit">
                                Sign In
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
        </div>
    )
}
