"use client";
import BookingDetails from "@/components/BookingDetails";
import ReactGA from "react-ga4";
import { useEffect } from "react";

export default function EditBooking () {

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/Admin/EditBooking",
            title: "Admin Edit Booking",
        })
    }, [])

    return(
        <div>
            <BookingDetails />
        </div>
    )
}