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
            day: "Day 1",
            title: "EMS Rally",
            content: [
                "Emergency medical vehicle showcase and drive across Lagos.", 
                "Nigeria's largest gathering of first responders."
            ]
        },
        {
            day: "Day 2",
            title: "EMS Training & Certification Sessions",
            content: [
                "Emergency medical vehicle showcase and drive across Lagos.", 
                "Nigeria's largest gathering of first responders."
            ]
        },
        {
            day: "Day 3",
            title: "Preconference Workshop",
            content: [
                "Hands-on training for professionals and first responders."
            ]
        },
        {
            day: "Day 4",
            title: "EMS Conference & Keynote Sessions",
            content: [
                "Keynote addresses by healthcare leaders and policy makers.",
                "Expert panel discussions on reimagining emergency care in Nigeria."
            ]
        },
        {
            day: "Day 5",
            title: "Emergency Response Simulations & Live Demonstrations",
            content: [
                "Simulated emergency scenarios to showcase best practices.",
                "Interactive drills for professionals and the general public."

            ]
        },
        {
            day: "Day 6",
            title: "Stakeholders Engagement",
            content: [
                "Courtesy visit to stakeholders, partners and relevant policy makers."
            ]
        },
        {
            day: "Day 7",
            title: "Sports and Fitness Fest",
            content: [
                "Indoor and outdoor sports activities between EMS stakeholders in Nigeria."
            ]
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
                                    <AccordionTrigger>
                                        <div className="flex items-center">
                                            <button className="w-fit bg-[#ff2e60] p-[5px] text-sm text-white font-brsemi rounded-mm cursor-pointer">
                                                {activity.day}
                                            </button>
                                            <span className="font-brsemi text-sm ml-[2px]">
                                                {activity.title}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {activity.content.map((act) =>
                                            <ol className="list-disc list-inside">
                                                <li className="font-brreg">{act}</li>
                                            </ol>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}