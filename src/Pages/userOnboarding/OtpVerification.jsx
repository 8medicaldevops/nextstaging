import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useFetch } from "@/components/hooks/useFetch";
import { BeatLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";

const OtpVerification = () => {
    let navigate = useNavigate();

    const { isSuccess, isPending, data, fetchUserData } = useFetch(import.meta.env.VITE_USER_VERIFY_TOKEN);

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

        fetchUserData(formData);
            if(isSuccess && data?.statusCode == 200){
                sessionStorage.setItem("SignIn", JSON.stringify(data));
                sessionStorage.setItem('longToken', JSON.stringify(data.data.longToken));
                navigate("/ChangePassword");
            }

        /*setIsPending(true);
        await fetch(import.meta.env.VITE_USER_VERIFY_TOKEN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
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
                    addToast(`${data?.message}`, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setTimeout(() => { navigate("/ChangePassword") }, 4000);
                    sessionStorage.setItem('longToken', JSON.stringify(data.data.longToken));

                } else if (data.statusCode == 400) {
                    setIsPending(false);
                }
            })
            .catch(error => {
                setIsPending(false);
                console.error('There has been a problem with your fetch operation:', error);
                addToast("Sorry, There was an error", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });*/
    }

    return (
        <>
            <form>
                <div className='size-14 flex flex-row items-center justify-center mx-auto w-full max-w-xs gap-1'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
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
        </>
    )
}

export default OtpVerification;