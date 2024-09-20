import { useState } from "react";
import { useFormik } from "formik";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/components/hooks/useFetch";

import NavBar from "../../components/NavBar";

import forgot from "../../assets/images/password-ambulance.png";
import lock from "../../assets/images/passwordd.svg";
//import goodPin from "../../assets/images/good-pincode.svg";
import { changePasswordValidation } from "./FormValidation";

export default function ChangePassword() {
    let navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    const { isSuccess, isPending, data, fetchUserData } = useFetch(import.meta.env.VITE_USER_RESET_PASSWORD);


    // eslint-disable-next-line no-unused-vars
    const userToken = JSON.parse(sessionStorage.getItem('longToken'));

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        "longToken": userToken,
        "newPassword": '',
        "confirmNewPassword": '',
    });

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handlePasswordConfirmationVisibility = () => {
        setIsConfirmationVisible(!isConfirmationVisible);
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: changePasswordValidation,
        onSubmit: (values) => {
            
            fetchUserData(values);
            if(isSuccess && data?.statusCode == 200){
                navigate("/SignIn")
                sessionStorage.setItem('UpdatePW', JSON.stringify(data));
            }
        }
    })

    return (
        <div>
            <NavBar />
            <div className="md:h-full md:mt-1/2 flex gap-6 md:gap-12 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto p-[2rem]">
                <div className="md:h-full md:w-[40%] md:self-center">
                    <img src={forgot} alt="" className="object-fill hidden md:flex mx-auto" />
                </div>
                <div className="md:py-[4rem] md:px-[1rem] xl:px-[1rem] border-[#F4F2F5] md:w-[40%]  md:self-center">
                    <div className="flex flex-col items-center justify-center my-[0.5rem]">
                        <div className="p-4 bg-[#F4F1FF] rounded-[50%]">
                            <img src={lock} alt="lock icon" className="self-center  size-[30px]" />
                        </div>
                        <h3 className="font-brsemi text-2xl max-sm:text-xl text-[#181719] text-center my-3">Change Password</h3>
                        <p className="font-brreg text-lg text-[#636066] my-[0.5rem] text-center">
                            Create a new password for your account.
                        </p>
                    </div>

                    <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="py-[0.5rem]">
                            <label htmlFor="newPassword" className="font-brsemi text-sm text-[#636066] mb-[10px]">Create New Password</label>
                            <input
                                type={(isPasswordVisible === true) ? "text" : "password"}
                                id="newPassword"
                                placeholder="Enter your password"
                                name="newPassword"
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
                        {touched.newPassword && errors.newPassword &&
                            <p>
                                <small className='text-xs text-red-500'>
                                    {errors.newPassword}
                                </small>
                            </p>
                        }

                        <div className="py-[0.5rem]">
                            <label htmlFor="confirmNewPassword" className="font-brsemi text-sm text-[#636066] mb-[10px]">Confirm Password</label>

                            <input
                                type={(isConfirmationVisible === true) ? "text" : "password"}
                                id="confirmNewPassword"
                                placeholder="Confirm Password"
                                name="confirmNewPassword"
                                className="border-[1px] border-[#E4E3E5] w-full rounded-mm p-4 font-brreg  placeholder:text-[#9C9A9E] outline-none "
                                value={values.confirmNewPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required />
                            <button
                                type="button"
                                id="toggleConfirmPassword"
                                className="focus:outline-none -ml-8 cursor-pointer"
                                onClick={handlePasswordConfirmationVisibility}
                            >
                                {isConfirmationVisible ? (
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
                        {touched.confirmNewPassword && errors.confirmNewPassword &&
                            <p>
                                <small className='text-xs text-red-500'>
                                    {errors.confirmNewPassword}
                                </small>
                            </p>
                        }

                        <div className="pb-[0.5rem]">
                            <button className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]" type="submit">
                                Reset Password
                                {isPending ? <BeatLoader size={4} color="#ffffff" /> :
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.1201 3.95337L14.1668 8.00004L10.1201 12.0467" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.83301 8H14.053" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </form>

                    {/*{isError && <p>Error</p>}
                    {isPending && <p>pending</p>}
                    {
                        isSuccess && 
                            <Subscribed title={successData.title} body={successData.body} img={goodPin} isModalOpen={isModalOpen} isModalClosed={() => setIsModalOpen(false)}/>
                    }*/}
                </div>
            </div>
        </div>

    )
}