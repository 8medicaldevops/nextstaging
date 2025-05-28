import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    //DialogClose
} from "@/components/ui/dialog";

import { useState, useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";


export default function ContactModal(props) {
    const [emailCopied, setEmailCopied] = useState(false);
    const [phoneCopied, setPhoneCopied] = useState(false);

    const onEmailCopy = useCallback(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 1000);
    }, [])
    const onPhoneCopy = useCallback(() => {
        setPhoneCopied(true);
        setTimeout(() => setPhoneCopied(false), 1000);
    }, [])

    return (
        <div>
            <Dialog open={props.isModalOpen}>
                <DialogContent className="bg-none w-full bg-white max-md:rounded-[24px] max-md:w-[95%] sm:rounded-[24px] py-12 ">
                    <DialogHeader className="bg-white gap-6" >
                        <div className=" flex px-2 justify-end cursor-pointer">
                            <button onClick={props.isModalClosed}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM13.36 12.3C13.65 12.59 13.65 13.07 13.36 13.36C13.21 13.51 13.02 13.58 12.83 13.58C12.64 13.58 12.45 13.51 12.3 13.36L10 11.06L7.7 13.36C7.55 13.51 7.36 13.58 7.17 13.58C6.98 13.58 6.79 13.51 6.64 13.36C6.35 13.07 6.35 12.59 6.64 12.3L8.94 10L6.64 7.7C6.35 7.41 6.35 6.93 6.64 6.64C6.93 6.35 7.41 6.35 7.7 6.64L10 8.94L12.3 6.64C12.59 6.35 13.07 6.35 13.36 6.64C13.65 6.93 13.65 7.41 13.36 7.7L11.06 10L13.36 12.3Z" fill="#F9091D" />
                            </svg>
                            </button>
                        </div>
                        <DialogTitle>
                            <div className="flex justify-center">
                                <img src={props.img} alt="modal image" />
                            </div>
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-6 items-center">
                            <span className="font-brreg text-lg text-[#636066] text-center">{props.title}</span>
                            <div className="flex flex-col justify-between w-full gap-6">
                                <div className="flex bg-[#F9F9FA] border-[1px] border-[#F4F2F5] gap-3 rounded-mm p-3 max-md:w-full w-full">
                                    <a href={`mailto:${props.email}`} className="w-full">
                                        <span className="flex w-full gap-3">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12.5" r="12" fill="#6D09F9" />
                                                <path d="M15.125 7.1875H8.875C7 7.1875 5.75 8.125 5.75 10.3125V14.6875C5.75 16.875 7 17.8125 8.875 17.8125H15.125C17 17.8125 18.25 16.875 18.25 14.6875V10.3125C18.25 8.125 17 7.1875 15.125 7.1875ZM15.4187 10.9938L13.4625 12.5563C13.05 12.8875 12.525 13.05 12 13.05C11.475 13.05 10.9437 12.8875 10.5375 12.5563L8.58125 10.9938C8.38125 10.8313 8.35 10.5312 8.50625 10.3312C8.66875 10.1312 8.9625 10.0938 9.1625 10.2562L11.1188 11.8187C11.5938 12.2 12.4 12.2 12.875 11.8187L14.8313 10.2562C15.0312 10.0938 15.3313 10.125 15.4875 10.3312C15.65 10.5312 15.6187 10.8313 15.4187 10.9938Z" fill="#F4F1FF" />
                                            </svg>
                                            <span className="pr-[5px] font-brreg">Email</span>
                                            <span className="pl-2 border-l-[1px] w-full border-[#E4E3E5] font-brreg ">
                                                {props.email}
                                            </span>
                                        </span>
                                    </a>
                                    <div className="flex items-center">
                                        <CopyToClipboard
                                            onCopy={emailCopied}
                                            options={{ message: 'Whoa!' }}
                                            text={props.email}>
                                            <button onClick={onEmailCopy}>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.6666 9.10004V11.9C10.6666 14.2334 9.73331 15.1667 7.39998 15.1667H4.59998C2.26665 15.1667 1.33331 14.2334 1.33331 11.9V9.10004C1.33331 6.76671 2.26665 5.83337 4.59998 5.83337H7.39998C9.73331 5.83337 10.6666 6.76671 10.6666 9.10004Z" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14.6666 5.10004V7.90004C14.6666 10.2334 13.7333 11.1667 11.4 11.1667H10.6666V9.10004C10.6666 6.76671 9.73331 5.83337 7.39998 5.83337H5.33331V5.10004C5.33331 2.76671 6.26665 1.83337 8.59998 1.83337H11.4C13.7333 1.83337 14.6666 2.76671 14.6666 5.10004Z" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                    <div className="section font-brreg">
                                        {emailCopied ? <span style={{ color: '#6D09F9' }}>Copied.</span> : null}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-[#F9F9FA] border-[1px] border-[#F4F2F5] gap-3 rounded-mm p-3 max-md:w-full w-full">
                                <a href={`tel:${props.phone}`} className="w-full">
                                        <span className="flex w-full gap-3">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12.5" r="12" fill="#6D09F9" />
                                                <path d="M11.9062 14.3438L10.75 15.5C10.5062 15.7438 10.1188 15.7438 9.86875 15.5063C9.8 15.4375 9.73125 15.375 9.6625 15.3063C9.01875 14.6563 8.4375 13.975 7.91875 13.2625C7.40625 12.55 6.99375 11.8375 6.69375 11.1313C6.4 10.4188 6.25 9.7375 6.25 9.0875C6.25 8.6625 6.325 8.25625 6.475 7.88125C6.625 7.5 6.8625 7.15 7.19375 6.8375C7.59375 6.44375 8.03125 6.25 8.49375 6.25C8.66875 6.25 8.84375 6.2875 9 6.3625C9.1625 6.4375 9.30625 6.55 9.41875 6.7125L10.8688 8.75625C10.9813 8.9125 11.0625 9.05625 11.1188 9.19375C11.175 9.325 11.2063 9.45625 11.2063 9.575C11.2063 9.725 11.1625 9.875 11.075 10.0188C10.9938 10.1625 10.875 10.3125 10.725 10.4625L10.25 10.9563C10.1812 11.025 10.15 11.1063 10.15 11.2063C10.15 11.2563 10.1563 11.3 10.1688 11.35C10.1875 11.4 10.2063 11.4375 10.2188 11.475C10.3313 11.6813 10.525 11.95 10.8 12.275C11.0812 12.6 11.3812 12.9313 11.7062 13.2625C11.7687 13.325 11.8375 13.3875 11.9 13.45C12.15 13.6938 12.1562 14.0938 11.9062 14.3438Z" fill="#F4F1FF" />
                                                <path d="M18.7312 16.4562C18.7312 16.6312 18.7 16.8124 18.6375 16.9874C18.6187 17.0374 18.6 17.0874 18.575 17.1374C18.4687 17.3624 18.3313 17.5749 18.15 17.7749C17.8438 18.1124 17.5062 18.3562 17.125 18.5124C17.1187 18.5124 17.1125 18.5187 17.1063 18.5187C16.7375 18.6687 16.3375 18.7499 15.9062 18.7499C15.2688 18.7499 14.5875 18.5999 13.8687 18.2937C13.15 17.9874 12.4312 17.5749 11.7187 17.0562C11.475 16.8749 11.2313 16.6937 11 16.4999L13.0437 14.4562C13.2187 14.5874 13.375 14.6874 13.5062 14.7562C13.5375 14.7687 13.575 14.7874 13.6187 14.8062C13.6687 14.8249 13.7187 14.8312 13.775 14.8312C13.8812 14.8312 13.9625 14.7937 14.0312 14.7249L14.5062 14.2562C14.6625 14.0999 14.8125 13.9812 14.9562 13.9062C15.1 13.8187 15.2437 13.7749 15.4 13.7749C15.5187 13.7749 15.6437 13.7999 15.7812 13.8562C15.9187 13.9124 16.0625 13.9937 16.2188 14.0999L18.2875 15.5687C18.45 15.6812 18.5625 15.8124 18.6312 15.9687C18.6937 16.1249 18.7312 16.2812 18.7312 16.4562Z" fill="#F4F1FF" />
                                            </svg>

                                            <span className="font-brreg">Phone</span>
                                            <span className="pl-2 border-l-[1px] w-full font-brreg border-[#E4E3E5]">{props.phone}</span>
                                        </span>
                                    </a>
                                    <div className="flex items-center">
                                        <CopyToClipboard
                                            onCopy={phoneCopied}
                                            options={{ message: 'Whoa!' }}
                                            text={props.phone}>
                                            <button onClick={onPhoneCopy}>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.6666 9.10004V11.9C10.6666 14.2334 9.73331 15.1667 7.39998 15.1667H4.59998C2.26665 15.1667 1.33331 14.2334 1.33331 11.9V9.10004C1.33331 6.76671 2.26665 5.83337 4.59998 5.83337H7.39998C9.73331 5.83337 10.6666 6.76671 10.6666 9.10004Z" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14.6666 5.10004V7.90004C14.6666 10.2334 13.7333 11.1667 11.4 11.1667H10.6666V9.10004C10.6666 6.76671 9.73331 5.83337 7.39998 5.83337H5.33331V5.10004C5.33331 2.76671 6.26665 1.83337 8.59998 1.83337H11.4C13.7333 1.83337 14.6666 2.76671 14.6666 5.10004Z" stroke="#6D09F9" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                    <div className="section font-brreg">
                                        {phoneCopied ? <span style={{ color: '#6D09F9' }}>Copied.</span> : null}
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}