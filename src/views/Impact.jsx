"use client";
import { useEffect } from "react";
import ReactGA from "react-ga4"
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import headerImg__asset from "../assets/images/sustainable.jpeg";
const headerImg = headerImg__asset.src ?? headerImg__asset;
import threeImg__asset from "../assets/images/three.jpeg";
const threeImg = threeImg__asset.src ?? threeImg__asset;
import genderEq__asset from "../assets/images/gendereq.png";
const genderEq = genderEq__asset.src ?? genderEq__asset;
import decentWork__asset from "../assets/images/decentwork.png";
const decentWork = decentWork__asset.src ?? decentWork__asset;
import industry__asset from "../assets/images/industry.png";
const industry = industry__asset.src ?? industry__asset;
import ten__asset from "../assets/images/ten.png";
const ten = ten__asset.src ?? ten__asset;
import climate__asset from "../assets/images/climate.png";
const climate = climate__asset.src ?? climate__asset;
import peace__asset from "../assets/images/peace.png";
const peace = peace__asset.src ?? peace__asset;
import '../App.css';


export default function Impact() {

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/Impact",
            title: "Impact",
        })
    }, [])

    return (
        <div>
            <NavBar />
            <div>
                <section className="bg-[url(./assets/images/impactbackground.jpeg)]  bg-[#43039C61]/50 accent-[#37018330] bg-blend-overlay max-2xl:bg-[center_bottom_-22rem] max-xl:bg-[center_bottom_-7rem] max-lg:h-[40vh]  max-lg:bg-[center_top_-6rem] max-md:h-[30vh] max-md:bg-[center_top_-3rem] bg-[center_bottom_-38rem] bg-cover bg-no-repeat  h-[50vh] flex items-end justify-center pb-[80px] max-md:pb-10 ">
                    <h1 className="text-white text-[64px] font-brbold">
                        Impact
                    </h1>
                </section>
                <section className="flex justify-center">
                    <div className="w-[80%] py-32">
                        <img src={headerImg} alt="header image" />
                    </div>
                </section>
                <section className="flex max-lg:flex-col ">
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12   justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl  text-[#2E0469]">Good Health and Wellbeing</p>
                            <ol className="text-lg list-disc text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    We strive to reduce preventable global deaths, particularly in cases of pregnancy and child-related emergencies, as well as injuries from road traffic accidents. Our focus is on delivering prompt ambulance response and efficient transport to save lives.
                                </li>
                                <li>
                                    We leverage trained experts, equipment, up-to-date information, technology and infrastructure in place, to ensure reduction in neonatal, maternal and general mortality.
                                </li>
                                <li>
                                    We have a 95% emergency call-to-mission completion rate.
                                </li>
                                <li>
                                    We have a care now pay later product in place to ensure last mile access to definitive care for our patients
                                </li>
                            </ol>
                        </div>
                    </main>

                    <aside className="w-[100%]">
                        <img src={threeImg} alt="" />
                    </aside>
                </section>
                <section className="flex max-lg:flex-col-reverse">
                    <aside className="w-[100%]">
                        <img src={genderEq} alt="" />
                    </aside>
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12  justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl text-[#2E0469]">Achieve Gender Equality and Empower all Women and Girls</p>
                            <ol className="text-lg list-disc  text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    We promote gender equality and empowerment by
                                </li>
                                <li>
                                    We have the First female biker response medic in West Africa.
                                </li>
                                <li>
                                    Eight Medical's leadership style involves a balanced structure of both men and women.
                                </li>
                            </ol>
                        </div>
                    </main>


                </section>
                <section className="flex max-lg:flex-col ">
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12   justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl  text-[#2E0469]">Promote sustained, inclusive & sustainable economic growth, full & productive employment & decent work for all</p>
                            <ol className="text-lg list-disc text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    Eight medical has provided at least 2-3 jobs per day for both men and women ensuring equal pay for work of equal value.
                                </li>
                                <li>
                                    We substantially reduced the proportion of youths not in employment through our work integrated learning and foundation training programs.
                                </li>

                            </ol>
                        </div>
                    </main>

                    <aside className="w-[100%]">
                        <img src={decentWork} alt="" />
                    </aside>
                </section>
                <section className="flex max-lg:flex-col-reverse">
                    <aside className="w-[100%]">
                        <img src={industry} alt="" />
                    </aside>
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12  justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl text-[#2E0469]">Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation</p>
                            <ol className="text-lg list-disc  text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    At Eight Medical, we've built a robust technology infrastructure to ensure reliable, sustainable, and affordable access to urgent and emergency services, promoting human wellbeing.
                                </li>

                            </ol>
                        </div>
                    </main>


                </section>
                <section className="flex max-lg:flex-col ">
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12   justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl  text-[#2E0469]">Reduce inequality within and among countries</p>
                            <ol className="text-lg list-disc text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    We empower and promote social, economic and political inclusion of all irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status.
                                </li>
                                <li>
                                    We ensure equal opportunities and reduce inequalities of outcomes by promoting appropriate legislation and policies within the organisation.
                                </li>

                            </ol>
                        </div>
                    </main>

                    <aside className="w-[100%]">
                        <img src={ten} alt="" />
                    </aside>
                </section>
                <section className="flex max-lg:flex-col-reverse">
                    <aside className="w-[100%]">
                        <img src={climate} alt="" />
                    </aside>
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12  justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl text-[#2E0469]">Take urgent action to combat climate change and its impacts</p>
                            <ol className="text-lg list-disc  text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    As an EMS Technology platform and provider, we are at the fore-front of strengthening resilience and adaptive capacity at all community, state and national levels.
                                </li>

                                <li>
                                    We are committed to improving education, awareness raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning.
                                </li>

                            </ol>
                        </div>
                    </main>


                </section>
                <section className="flex max-lg:flex-col ">
                    <main className="w-[100%] flex flex-col max-lg:pt-9 max-lg:pb-12   justify-center items-center">
                        <div className="w-[60%] flex flex-col gap-6 justify-center items-center max-xl:w-[80%]">
                            <p className="font-brbold text-[40px] max-xl:text-4xl  text-[#2E0469]">Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels</p>
                            <ol className="text-lg list-disc text-[#666666] max-xl:text-base font-brreg">
                                <li>
                                    Through our EMS platform and care provision, we are able to contribute to the reduction of violence related death rate.
                                </li>
                                <li>
                                    Leveraging our emergency resource bank, we are able to protect children from abuse, exploitation, trafficking and violence by connecting them to the most appropriate emergency resource when it matters most.
                                </li>

                            </ol>
                        </div>
                    </main>

                    <aside className="w-[100%]">
                        <img src={peace} alt="" />
                    </aside>
                </section>
            </div>
            <Footer />
        </div>
    )
}