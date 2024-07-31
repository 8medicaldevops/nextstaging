

export default function NewsLetter () {
    return(
        <div className=" py-16  flex flex-col gap-8 rounded-[32px] bg-white items-center">
            <div className="px-24 items-center gap-1 text-center max-lg:px-4 max-lg:flex max-lg:flex-col ">

           
            <p className=" font-brsemi text-4xl text-[#000000] max-lg:w-[300px] max-lg:text-[32px] max-lg:text-center ">Subscribe to our Newsletter</p>
            <p className=" font-brmedium text-[#636066]">Get relevant health care updates, resources and offers straight in your inbox</p>
           
            </div>
            <form className="w-[90%] flex gap-2 items-center max-lg:flex-col ">
                <input
                placeholder="Enter your email address here"
                className=" font-brmedium text-[#9C9A9E] border-[1px]-[#F4F2F5] py-3 px-5 bg-[#F9F9FA] rounded-mm w-[80%]"
                />
                <button className=" font-brbold text-lg text-white py-3 px-5 bg-ev-700 rounded-mm max-lg:w-[90%]">Subscribe</button>
            </form>
        </div>
    );

}