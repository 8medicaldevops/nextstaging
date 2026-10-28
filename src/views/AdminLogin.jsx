"use client";
import AuthDisp from "@/components/AuthDisp";
import ReactGA from "react-ga4";
import { useEffect } from "react";

export default function AdminLogin () {

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/Login",
            title: "Admin Login",
        })
    }, [])

    return(
     <div>
        <AuthDisp/>
     </div>
    )
}