"use client";

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './../app/globals.css'; // Ensure this path matches where you put your CSS

const AnimatedText = ({ text }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
        // Reset the active state after the animation completes
        setTimeout(() => {
            setActive(false);
        }, 600); // Match this duration with the animation duration
    };

    return (
        <div className={'blast'}  onClick={() => handleClick()}>
            {text.split('').map((char, index) => (
                <span key={index} className={`${active ? 'blast-active' : ''}`}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default AnimatedText;
