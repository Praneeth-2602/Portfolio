"use client";

import { useEffect, useRef, useCallback } from 'react';
import 'tailwindcss/tailwind.css';

const Cursor = () => {
    const delay = 18;

    const dot = useRef(null);
    const dotOutline = useRef(null);

    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);
    const cursorRectangular = useRef(false);
    const cursorScaled = useRef(false);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    const toggleCursorVisibility = useCallback(() => {
        if (cursorVisible.current) {
            dot.current.style.opacity = 1;
            dotOutline.current.style.opacity = 1;
        } else {
            dot.current.style.opacity = 0;
            dotOutline.current.style.opacity = 0;
        }
    }, []);

    const toggleCursorSize = useCallback(() => {
        if (cursorEnlarged.current) {
            dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, []);

    const toggleCursorShape = useCallback(() => {
        if (cursorRectangular.current) {
            dot.current.style.width = '100px'; // Example size, adjust as needed
            dot.current.style.height = '40px'; // Example size, adjust as needed
            dot.current.style.borderRadius = '10px'; // Example rounded rectangle, adjust as needed
            dotOutline.current.style.width = '120px'; // Example size, adjust as needed
            dotOutline.current.style.height = '60px'; // Example size, adjust as needed
            dotOutline.current.style.borderRadius = '10px'; // Example rounded rectangle, adjust as needed
        } else {
            dot.current.style.width = '30px';
            dot.current.style.height = '30px';
            dot.current.style.borderRadius = '50%';
            dotOutline.current.style.width = '50px';
            dotOutline.current.style.height = '50px';
            dotOutline.current.style.borderRadius = '50%';
        }
    }, []);

    const toggleCursorScale = useCallback(() => {
        if (cursorScaled.current) {
            dot.current.style.transform = 'translate(-50%, -50%) scale(2)';
            dotOutline.current.style.opacity = 0;
        } else {
            toggleCursorSize();
            dotOutline.current.style.opacity = 1;
        }
    }, [toggleCursorSize]);

    const mouseOverEvent = useCallback(() => {
        cursorEnlarged.current = true;
        toggleCursorSize();
    }, [toggleCursorSize]);

    const mouseOutEvent = useCallback(() => {
        cursorEnlarged.current = false;
        toggleCursorSize();
    }, [toggleCursorSize]);

    const mouseEnterEvent = useCallback(() => {
        cursorVisible.current = true;
        toggleCursorVisibility();
    }, [toggleCursorVisibility]);

    const mouseLeaveEvent = useCallback(() => {
        cursorVisible.current = false;
        toggleCursorVisibility();
    }, [toggleCursorVisibility]);

    const mouseMoveEvent = useCallback(e => {
        cursorVisible.current = true;
        toggleCursorVisibility();

        endX.current = e.pageX;
        endY.current = e.pageY;

        dot.current.style.top = endY.current + 'px';
        dot.current.style.left = endX.current + 'px';
    }, [toggleCursorVisibility]);

    const buttonHoverEvent = useCallback(() => {
        cursorRectangular.current = true;
        toggleCursorShape();
    }, [toggleCursorShape]);

    const buttonLeaveEvent = useCallback(() => {
        cursorRectangular.current = false;
        toggleCursorShape();
    }, [toggleCursorShape]);

    const headingHoverEvent = useCallback(() => {
        cursorScaled.current = true;
        toggleCursorScale();
    }, [toggleCursorScale]);

    const headingLeaveEvent = useCallback(() => {
        cursorScaled.current = false;
        toggleCursorScale();
    }, [toggleCursorScale]);

    const animateDotOutline = useCallback(() => {
        _x.current += (endX.current - _x.current) / delay;
        _y.current += (endY.current - _y.current) / delay;

        dotOutline.current.style.top = _y.current + 'px';
        dotOutline.current.style.left = _x.current + 'px';

        requestRef.current = requestAnimationFrame(animateDotOutline);
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', mouseOverEvent);
        document.addEventListener('mouseup', mouseOutEvent);
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);

        // Add listeners for buttons and header elements
        const buttons = document.querySelectorAll('button, .header-element');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', buttonHoverEvent);
            button.addEventListener('mouseleave', buttonLeaveEvent);
        });

        // Add listeners for h1, h2, h3 elements
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.addEventListener('mouseenter', headingHoverEvent);
            heading.addEventListener('mouseleave', headingLeaveEvent);
        });

        animateDotOutline();

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseenter', mouseEnterEvent);
            document.removeEventListener('mouseleave', mouseLeaveEvent);

            buttons.forEach(button => {
                button.removeEventListener('mouseenter', buttonHoverEvent);
                button.removeEventListener('mouseleave', buttonLeaveEvent);
            });

            headings.forEach(heading => {
                heading.removeEventListener('mouseenter', headingHoverEvent);
                heading.removeEventListener('mouseleave', headingLeaveEvent);
            });

            cancelAnimationFrame(requestRef.current);
        };
    }, [
        mouseOverEvent,
        mouseOutEvent,
        mouseMoveEvent,
        mouseEnterEvent,
        mouseLeaveEvent,
        buttonHoverEvent,
        buttonLeaveEvent,
        headingHoverEvent,
        headingLeaveEvent,
        animateDotOutline,
    ]);

    return (
        <>
            <div ref={dotOutline} className="cursor-dot-outline absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 transition-opacity duration-300 ease-in-out z-[999]"></div>
            <div ref={dot} className="cursor-dot absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 transition-opacity duration-300 ease-in-out mix-blend-difference bg-blend-exclusion z-[999]"></div>
        </>
    );
};

export default Cursor;
