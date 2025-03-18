import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import events from "../../assets/images/events.png";

export default function Events() {

    const activities = [
        {
            day: 1,
            title: "EMS Rally",
            content: "Hello"
        },
        {
            day: 2,
            title: "EMS Training & Certification Sessions",
            content: "Hello"
        },
        {
            day: 3,
            title: "Preconference Workshop",
            content: "Hello"
        },
        {
            day: 4,
            title: "EMS Conference & Keynote Sessions",
            content: "Hello"
        },
        {
            day: 5,
            title: "Emergency Response Simulations & Live Demonstrations",
            content: "Hello"
        },
        {
            day: 6,
            title: "Stakeholders Engagement",
            content: "Hello"
        },
        {
            day: 7,
            title: "Sports and Fitness Fest",
            content: "Hello"
        },

    ]

    return (
        <section>
            <div className="h-full md:mt-1/2 flex gap-6 md:gap-16 flex-col md:flex-row md:justify-center md:items-center md:w-[100%]  md:-px-auto md:-py-auto">
                <div className="h-full md:w-[50%] md:self-center">
                    <img src={events} alt="" className="object-fill md:flex" />
                </div>
                <div className="test bg-[#110f21] md:w-[50%] md:self-center flex flex-col gap-10">
                    <h1 className="text-[#fff] text-4xl font-brbold border-[#ffe563]">Activities Schedule</h1>
                    <Accordion type="single" collapsible className="w-full">
                        {
                            activities.map((activity, index) =>
                                <AccordionItem value={activity.day} className="text-white">
                                    <AccordionTrigger>{activity.title}</AccordionTrigger>
                                    <AccordionContent>
                                        {activity.content}
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}