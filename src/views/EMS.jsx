"use client";
import ReactGA from "react-ga4";
import { useEffect } from "react";

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Ticket from '../components/EMS/Ticket';
import Speakers from '../components/EMS/Speakers';
import Hero from '../components/EMS/Hero';
import Theme from '../components/EMS/Theme';
import AboutEight from '../components/EMS/AboutEight';
import Exhibit from '../components/EMS/Exhibit';
import ExcitingMoment from '../components/EMS/ExcitingMoments';
//import Sponsors from '../components/EMS/Sponsors';
import Banner from '../components/EMS/Banner';
import Events from '../components/EMS/Events';


export default function EmsLanding() {
    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/ems-week",
            title: "EMS Week",
        })
    }, [])

    return (
        <div>
            <NavBar />
            <Hero />
            <Theme />
            <Banner />
            <Ticket />
            <Speakers />
            <Events />
            <ExcitingMoment />
            <Exhibit />
            <AboutEight />
            {/*<Sponsors />*/}
            <Footer />
        </div>
    )
}