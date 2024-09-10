import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    //DialogClose
} from "@/components/ui/dialog";


export default function Subscribed(props) {
    return (
        <div>
            <Dialog open={props.isModalOpen}>
                <DialogContent className="bg-none w-full bg-white max-md:rounded-[24px] max-md:w-[95%] md:rounded-[24px] py-12 ">
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
                        <DialogDescription>
                            <div className="flex flex-col gap-6 items-center">
                                <p className="font-brbold max-md:w-full  max-md:text-3xl text-[32px] text-[#181719] text-center">{props.title}</p>
                                <p className="font-brreg text-lg text-[#636066] text-center">{props.body}</p>
                                <button onClick={props.isModalClosed} className="flex items-center gap-1 py-3 px-6 font-brbold text-lg rounded-mm text-white bg-[#181719]">Close</button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}