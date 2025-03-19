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
            <div className="h-full bg-[#110f21] md:mt-1/2 flex flex-col md:flex-row md:justify-center md:items-center md:w-[100%]">
                <img src={events} alt="" className="md:w-[45%] max-h-[50rem]" />
                <div className="size-full py-[4rem] px-10 md:w-[55%] md:self-center flex flex-col gap-10 w-full">
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