"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"

function WorkSliderBtns({ containerStyles, btnStyles, iconStyles }) {

    const swiper = useSwiper();

    const swipeLeft = () => {
        swiper.slidePrev();
    }

    const swipeRight = () => {
        swiper.slideNext();
    }

    return (
        <div className={containerStyles}>
            <button className={btnStyles} onClick={() => swipeLeft()}>
                <PiCaretLeftBold className={iconStyles} />
            </button>
            <button className={btnStyles} onClick={() => swipeRight()}>
                <PiCaretRightBold className={iconStyles} />
            </button>
        </div>
    )
}

export default WorkSliderBtns