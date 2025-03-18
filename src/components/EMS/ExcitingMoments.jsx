import EmblaCarousel from '../../components/EmblaCarousel';
import { useState, useEffect, useRef } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const carouselImgs = [
    '../Rectangle 56.png',
    '../Rectangle 57.png',
    '../Rectangle 58.png',
    '../Rectangle 59.png',
    '../Rectangle 60.png',
    '../Rectangle 61.png',
    '../Rectangle 62.png',
    '../Rectangle 63.png',
    '../Rectangle 64.png',
];

export default function ExcitingMoment() {
    return (
        <section className="bg-[#6d09f9] py-20 px-5">
            <div className="mb-10 flex flex-col items-center justify-center gap-5">
                <h1 className="text-[#fff] text-4xl font-brbold">EMS Week'24</h1>
                <p className="text-[#d2b3fd] font-brreg">Exciting moments from the last EMS Week held in Lagos</p>
            </div>
            <div>
                <EmblaCarousel slides={carouselImgs} options={{ loop: true, stopOnMouseEnter: true, stopOnInteraction: false }} className="flex" />
            </div>
        </section>
    )
}