import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useFetch } from "@/components/hooks/useFetch";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const OtpVerification = () => {

    const { isPending, fetchUserDataSetItemRoute } = useFetch(import.meta.env.VITE_USER_VERIFY_TOKEN);

    const [otp, setOtp] = useState('');
    //const [isPending, setIsPending] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [userEmail, setUserEmail] = useState(JSON.parse(sessionStorage.getItem('email')));

    const [formData, setFormData] = useState({
        "shortToken": "",
        "email": userEmail
    })

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            shortToken: otp,
        }))
    }, [otp])

    const verifyOtp = async () => {

        fetchUserDataSetItemRoute (formData, 'longToken', "/ChangePassword" )

        /*fetchUserData(formData);
        if (isSuccess && data?.statusCode == 200) {
            sessionStorage.setItem('longToken', JSON.stringify(data.data.longToken));
            navigate("/ChangePassword");
        }*/
    }

    return (
        <div>
            <form>
                <div className='size-14 flex flex-row items-center justify-center mx-auto w-full max-w-xs gap-1'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        //containerStyle={{display: "flex", gap: "1rem"}}
                        //inputStyle={{flex:"1",padding:"0.5rem 1.5rem", gap: "4rem", borderRadius: "0.5rem", fontSize: "1.3rem", fontWeight: "600", userSelect: "none", backgroundColor:"#f9f9f9", color: "#364330"}}
                        //inputStyle="w-full h-full px-8 py-4 mx-2 outline-none rounded-md border border-gray-200 text-lg bg-white shadow-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    />
                </div>

                {/*<p className="text-center mb-6 text-[#636066]">
                    Didn&apos;t recieve OTP? <button className="text-ev-700" onClick={handleResendOTP}>Resend Code</button>
                </p>*/}

                <button type='button' onClick={verifyOtp} className="bg-ev-700 w-full font-brsemi text-lg rounded-mm py-2 text-white flex justify-center gap-1 items-center py-[0.8rem] my-[0.5rem]">
                    Proceed {isPending && <BeatLoader size={4} color="#ffffff" />}
                </button>
            </form>
            <div className="text-center">
                <Link className="text-ev-700" to="/SignIn">Go back</Link>
            </div>
        </div>
    )
}

export default OtpVerification;