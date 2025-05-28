import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"



export default function ErrorPopup({open, errorMsg, close}) {
 


    return(
        <Dialog open={open}>
        <DialogContent className="bg-white bg-none w-full rounded-[44px] max-md:rounded-[84px] max-mm:rounded-[24px] max-mm:px-0 max-md:w-[95%] sm:rounded-[24px] py-12 ">
          <DialogHeader>
          <div className=" flex px-2 justify-end cursor-pointer">
            <button onClick={close}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM13.36 12.3C13.65 12.59 13.65 13.07 13.36 13.36C13.21 13.51 13.02 13.58 12.83 13.58C12.64 13.58 12.45 13.51 12.3 13.36L10 11.06L7.7 13.36C7.55 13.51 7.36 13.58 7.17 13.58C6.98 13.58 6.79 13.51 6.64 13.36C6.35 13.07 6.35 12.59 6.64 12.3L8.94 10L6.64 7.7C6.35 7.41 6.35 6.93 6.64 6.64C6.93 6.35 7.41 6.35 7.7 6.64L10 8.94L12.3 6.64C12.59 6.35 13.07 6.35 13.36 6.64C13.65 6.93 13.65 7.41 13.36 7.7L11.06 10L13.36 12.3Z" fill="#F9091D"/>
            </svg>
            </button>
            </div>
            <div className="flex flex-col gap-6 items-center">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M153.75 146.25C153.75 154.534 147.034 161.25 138.75 161.25H52.5C44.2162 161.25 37.5 154.534 37.5 146.25V18.75H153.75V146.25Z" fill="#D9CFFF"/>
            <path d="M52.5 45H63.75V56.25H52.5V45ZM75 45H138.75V56.25H75V45ZM52.5 67.5H63.75V78.75H52.5V67.5ZM75 67.5H138.75V78.75H75V67.5Z" fill="#6D09F9"/>
            <path d="M127.5 116.25C127.5 122.546 131.276 129.787 139.29 138.75C131.276 147.713 127.5 154.954 127.5 161.25H138.75C147.034 161.25 153.75 154.534 153.75 146.25V90H120V112.5H127.5V116.25Z" fill="#BEA8FF"/>
            <path d="M52.5 90H63.75V101.25H52.5V90ZM75 90H138.75V101.25H75V90Z" fill="#6D09F9"/>
            <path d="M120 90H138.75V101.25H120V90Z" fill="#8540FF"/>
            <path d="M123.75 142.5C123.75 139.819 123.75 128.276 123.75 123.75H26.25C26.25 128.276 26.25 139.819 26.25 142.5C26.25 152.858 30.8925 161.25 41.25 161.25H138.75C128.393 161.25 123.75 152.858 123.75 142.5Z" fill="#A177FF"/>
            <path d="M157.875 138.75C163.125 133.5 172.5 123.375 172.5 116.25V112.5H135V116.25C135 123.375 144.375 133.5 149.625 138.75C144.375 144 135 154.125 135 161.25V165H172.5V161.25C172.5 154.125 163.125 144 157.875 138.75Z" fill="#FFE0B2"/>
            <path d="M172.5 112.5H135V105H172.5V112.5ZM172.5 165H135V172.5H172.5V165Z" fill="#8D6E63"/>
            <path d="M180 105H127.5V97.5H180V105ZM180 172.5H127.5V180H180V172.5Z" fill="#6D4C41"/>
            <path d="M142.5 165C146.25 157.5 153.75 150 153.75 150C153.75 150 161.25 157.5 165 165H142.5ZM144 120C145.875 123.375 149.625 127.875 153.75 132.375C158.25 127.875 161.625 123.375 163.5 120H144Z" fill="#FB8C00"/>
            </svg>
            <DialogTitle>
            <p className="font-brsemi text-[28px]">Error generating Invoice</p>
            </DialogTitle>
            <p className="text-center font-brmedium text-[#636066]">{errorMsg}</p>
            
            {/* <PDFDownloadLink document={<InvoicePDF {...invoiceProps} />} filename="Eightmedical-invoice">
             {({loading}) => (loading ? 
            <button className="">
              <FadeLoader 
              color={color}
              height={5}
              
              />
              </button> 
        : 
            <button onClick={()=>handleButtonClick()} className="flex items-center gap-1 py-3 px-6 font-brbold text-lg rounded-mm text-white bg-ev-700">
                Download Invoice 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00065 14.6666C11.6825 14.6666 14.6673 11.6818 14.6673 7.99992C14.6673 4.31802 11.6825 1.33325 8.00065 1.33325C4.31875 1.33325 1.33398 4.31802 1.33398 7.99992C1.33398 11.6818 4.31875 14.6666 8.00065 14.6666Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 5.66675V9.66675" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8.33325L8 10.3333L10 8.33325" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button> )} */}
            
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
}