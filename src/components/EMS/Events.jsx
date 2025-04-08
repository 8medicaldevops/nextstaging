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
            title: "Response Simulations & Live Demos",
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
                <img src={events} alt="Eight medical staff in front of white ambulances" className="md:w-[45%] max-h-[70rem] md:max-h-[45rem]" />
                <div className="size-full py-[3rem] px-[1rem] md:w-[55%] md:self-center flex flex-col gap-5 w-full">
                    <h1 className="text-[#fff] text-4xl font-brbold border-[#ffe563]">Activities Schedule</h1>
                    <Accordion type="single" collapsible className="w-full">
                        {
                            activities.map((activity, index) =>
                                <AccordionItem value={activity.day} className="text-white" key={index}>
                                    <AccordionTrigger>
                                        <div className="flex items-center">
                                            <span className="w-fit h-fit bg-[#ff2e60] p-[4px] mr-[2px] text-[20px] text-white font-brsemi rounded-mm cursor-pointer">
                                                {activity.day}
                                            </span>
                                            <span className="font-brsemi text-[20px] text-left">
                                                {activity.title}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {activity.content.map((act, index) =>
                                            <ol className="list-disc list-inside" key={index}>
                                                <li className="font-brreg text-[16px]">{act}</li>
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