"use client";
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../hooks/useCountdown';

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>EMS WEEK!!!</span>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter flex justify-between">
            <div className='border-r-[#cccccc] w-[50%]'>
                <p className='font-brbold text-2xl md:text-3xl bg-gradient-to-r from-[#9124dd] to-[#ff2e60] text-transparent bg-clip-text'>18TH - 24TH</p>
                <span className='text-[#505050] font-brreg'>May, 2025</span>
            </div>
            <div className='flex justify-between w-[50%] gap-2'>
                <DateTimeDisplay value={days} type={'Days'} />
                <DateTimeDisplay value={hours} type={'Hrs'} />
                <DateTimeDisplay value={minutes} type={'Mins'} />
                <DateTimeDisplay value={seconds} type={'Secs'} />
            </div>
        </div>
    );
};

const targetDate = "18/05/2025";

const EventCountdown = ({targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default EventCountdown;

