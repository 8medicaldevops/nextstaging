"use client";
import React from 'react';

export default function ProgressBar({ currentStep, steps = [] }) {
    return (
        <div className="flex flex-col items-center justify-center py-0 sm:py-0 md:py-0 px-4 max-md:px-0 font-brreg">
            <div className="w-full max-w-5xl flex flex-col items-center">
                <div className="flex justify-between w-[90%] relative mb-0 "> 
                    
                    {steps.map((_, index) => {
                        if (index === 0) return null;

                        const segmentTotalWidthPercentage = 100 / (steps.length - 1);
                        const segmentLeftStartPercentage = (index - 1) * segmentTotalWidthPercentage;
                        const visualOffsetPercentage = 6.2; // Increased this value for more central lines
                        const calculatedLeft = segmentLeftStartPercentage + visualOffsetPercentage;
                        const calculatedWidth = segmentTotalWidthPercentage - (1.9 * visualOffsetPercentage);
                        const finalWidth = Math.max(0, calculatedWidth);

                        const isLineCompleted = (index + 1) <= currentStep;

                        return (
                            <div
                                key={`line-${index}`}
                                className={`absolute h-[1px] top-1/2 transform -translate-y-1/2 
                                          ${isLineCompleted ? 'bg-ev-700' : 'bg-[#9C9A9E]'}
                                          transition-all duration-300 ease-in-out`}
                                style={{
                                    left: `${calculatedLeft}%`,
                                    width: `${finalWidth}%`,
                                }}
                            ></div>
                        );
                    })}

                    {/* Render Circles SECOND for proper z-indexing (on top of lines) */}
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isActive = stepNumber === currentStep;
                        const isInactive = stepNumber > currentStep;
                        const isLastStep = stepNumber  === steps.length;
                       // console.log(isLastStep)

                        return (
                            <div key={`circle-${index}`} className="relative z-50 flex flex-col items-center ">
                                <div
                                    className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                                              font-brbold text-xs sm:text-xs transition-all duration-300 ease-in-out
                                              ${isCompleted ? 'bg-white text-[#6D09F9] border border-ev-700' : ''}
                                              ${isActive ? 'bg-ev-700 text-white' : 'border border-[#9C9A9E] text-[#6D09F9]'}
                                              ${isInactive && !isActive ? 'bg-white border border-[#9C9A9E] text-[#9C9A9E]' : ''}
                                              ${isActive && isLastStep ? 'bg-[#39C574] ' : 'bg-ev-700'}
                                              `}
                                >
                                    {isCompleted ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1}
                                            stroke="currentColor"
                                            className="w-3 h-3"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Labels below the steps */}
                <div className="flex justify-between w-full mt-1 sm:mt-1">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === currentStep;
                        const isInactive = stepNumber > currentStep;

                        const alignmentClass =
                            stepNumber === 1
                                ? 'text-left'
                                : stepNumber === steps.length
                                ? 'text-right'
                                : 'text-center';

                        return (
                            <div
                                key={`label-${index}`}
                                className={`text-xs w-1/5 max-[410px]:text-[10px] max-[410px]:text-center
                                          ${isActive ? 'text-[#1F1D21] font-brsemi' : 'text-[#9C9A9E]'}
                                          ${isInactive && !isActive ? 'text-[#9C9A9E] font-brreg' : ''}
                                          ${alignmentClass}
                                          transition-colors duration-300 ease-in-out`}
                            >
                                {step.label}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
