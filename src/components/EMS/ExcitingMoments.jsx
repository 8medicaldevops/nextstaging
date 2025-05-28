import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const images = [
    {
        image: '../Rectangle56.png',
    },
    {
        image: '../Rectangle57.png',
    },
    {
        image: '../Rectangle58.png',
    },
    {
        image: '../Rectangle59.png',
    },
    {
        image: '../Rectangle60.png',
    },
    {
        image: '../Rectangle61.png',
    },
    {
        image: '../Rectangle62.png',
    },
    {
        image: '../Rectangle63.png',
    },
    {
        image: '../Rectangle64.png',
    },
]

export function ImageCarousel({ image }) {
    return (
        <img src={image} alt="" className="rounded" />
    );
}

export default function ExcitingMoment() {
    return (
        <section className="bg-[#6d09f9] py-20 px-5">
            <div className="mb-10 flex flex-col items-center justify-center gap-5">
                <h1 className="text-[#fff] text-4xl font-brbold">EMS Week'24 Highlights</h1>
                <p className="text-[#d2b3fd] font-brreg text-[20px]">Exciting moments from the last EMS Week held in Lagos</p>
            </div>
 
            <div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    className="w-full mx-auto relative">
                    <CarouselContent className="flex ml-12 gap-9">
                        {images.map((testy, index) => (
                            <CarouselItem className="flex-[0_0_330px] h-[231px] p-2 " key={index}>
                                <ImageCarousel
                                    image={testy.image}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}