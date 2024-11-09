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

    const endX = useRef(0);
    const endY = useRef(0);
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
            dot.current.style.width = '100px';
            dot.current.style.height = '40px';
            dot.current.style.borderRadius = '10px';
            dotOutline.current.style.width = '120px';
            dotOutline.current.style.height = '60px';
            dotOutline.current.style.borderRadius = '10px';
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

    const mouseMoveEvent = useCallback((e) => {
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
        // Ensure window exists to attach event listeners
        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', mouseOverEvent);
            document.addEventListener('mouseup', mouseOutEvent);
            document.addEventListener('mousemove', mouseMoveEvent);

            const buttons = document.querySelectorAll('button, .header-element');
            buttons.forEach((button) => {
                button.addEventListener('mouseenter', buttonHoverEvent);
                button.addEventListener('mouseleave', buttonLeaveEvent);
            });

            const headings = document.querySelectorAll('h1, h2, h3');
            headings.forEach((heading) => {
                heading.addEventListener('mouseenter', headingHoverEvent);
                heading.addEventListener('mouseleave', headingLeaveEvent);
            });

            animateDotOutline();
        }

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);

            const buttons = document.querySelectorAll('button, .header-element');
            buttons.forEach((button) => {
                button.removeEventListener('mouseenter', buttonHoverEvent);
                button.removeEventListener('mouseleave', buttonLeaveEvent);
            });

            const headings = document.querySelectorAll('h1, h2, h3');
            headings.forEach((heading) => {
                heading.removeEventListener('mouseenter', headingHoverEvent);
                heading.removeEventListener('mouseleave', headingLeaveEvent);
            });

            cancelAnimationFrame(requestRef.current);
        };
    }, [
        mouseOverEvent,
        mouseOutEvent,
        mouseMoveEvent,
        buttonHoverEvent,
        buttonLeaveEvent,
        headingHoverEvent,
        headingLeaveEvent,
        animateDotOutline,
    ]);

    return (
        <>
            <div ref={dotOutline} className="rounded-full cursor-dot-outline absolute pointer-events-none"></div>
            <div ref={dot} className="rounded-full cursor-dot absolute pointer-events-none"></div>
        </>
    );
};

export default Cursor;
