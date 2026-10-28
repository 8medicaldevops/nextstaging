"use client";
import React from 'react';

const DateTimeDisplay = ({ value, type}) => {
    return (
        <div>
            <p className='font-brbold text-2xl md:text-3xl bg-gradient-to-r from-[#9124dd] to-[#ff2e60] text-transparent bg-clip-text'>{value}</p>
            <span className='text-[#505050] font-brreg'>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;