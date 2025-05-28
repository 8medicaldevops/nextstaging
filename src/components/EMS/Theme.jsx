export default function Theme() {
    return (
        <section className="bg-[url(./assets/images/theme.png)] py-[10rem] px-6 bg-no-repeat bg-cover bg-center md:h-full md:w-full  md:-px-auto p-[2rem] flex flex-col gap-20">
            <div className="flex flex-col justify-center items-center gap-4">
                <button className="bg-ev-700 w-fit px-5 py-2 text-xl text-white font-brsemi rounded-mm cursor-pointer flex items-center justify-center">
                    Global Theme:
                </button>
                <p className="text-[#fff] font-brbold text-4xl text-center">
                    We Care. For Everyone
                </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
                <button className="bg-[#ff2e60] w-fit px-5 py-2 text-xl text-white font-brsemi rounded-mm cursor-pointer flex items-center justify-center">
                    Local Theme:
                </button>
                <p className="text-[#fff] text-center font-brbold text-4xl">
                    Reimagining Emergency Care in Nigeria
                </p>
            </div>
        </section>
    )
}