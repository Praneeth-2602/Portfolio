"use client";

import { useEffect, useRef, useCallback } from 'react';
import 'tailwindcss/tailwind.css';

const CLICKABLE_SELECTOR = 'button, a[href], [role="button"], input[type="button"], input[type="submit"], [data-cursor-button], [data-cursor-clickable]';
const CARD_SELECTOR = '[data-cursor-card]';

const Cursor = () => {
    const delay = 18;
    const outlineOffset = 6;
    const cardOutlineOffset = 8; // make the outer ring slightly larger than cards

    const dot = useRef(null);
    const dotOutline = useRef(null);

    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);
    const cursorScaled = useRef(false);
    const activeTarget = useRef(null);

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
            dotOutline.current.style.transform = activeTarget.current
                ? 'translate(-50%, -50%)'
                : 'translate(-50%, -50%) scale(1.5)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
            dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, []);

    const clamp = useCallback((value, min, max) => {
        return Math.min(Math.max(value, min), max);
    }, []);

    const resetOutline = useCallback(() => {
        dotOutline.current.style.width = '50px';
        dotOutline.current.style.height = '50px';
        dotOutline.current.style.borderRadius = '50%';
        dotOutline.current.style.borderWidth = '1px';
        dotOutline.current.style.borderStyle = 'solid';
        dotOutline.current.style.borderColor = '#fff';
    }, []);

    const syncOutlineToTarget = useCallback((target) => {
        if (!target || !dotOutline.current) return;

        const rect = target.getBoundingClientRect();
        const computed = window.getComputedStyle(target);
        const borderWidth = computed.borderTopWidth === '0px' ? '1px' : computed.borderTopWidth;
        const borderStyle = computed.borderTopStyle === 'none' ? 'solid' : computed.borderTopStyle;
        const isCard = target.matches(CARD_SELECTOR);
        const offset = isCard ? cardOutlineOffset : outlineOffset;
        const width = rect.width + offset * 2;
        const height = rect.height + offset * 2;

        dotOutline.current.style.width = `${width}px`;
        dotOutline.current.style.height = `${height}px`;
        dotOutline.current.style.left = `${rect.left + rect.width / 2}px`;
        dotOutline.current.style.top = `${rect.top + rect.height / 2}px`;
        dotOutline.current.style.borderRadius = isCard
            ? `calc(${computed.borderRadius} + ${offset}px)`
            : `calc(${computed.borderRadius} + ${outlineOffset}px)`;
        dotOutline.current.style.borderWidth = borderWidth;
        dotOutline.current.style.borderStyle = borderStyle;
        dotOutline.current.style.borderColor = '#fff';
        dotOutline.current.style.opacity = '1';
    }, [outlineOffset]);

    const toggleCursorScale = useCallback(() => {
        if (cursorScaled.current) {
            dot.current.style.transform = 'translate(-50%, -50%) scale(2)';
        } else {
            toggleCursorSize();
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

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (activeTarget.current) {
            const rect = activeTarget.current.getBoundingClientRect();
            const dotRadius = (dot.current.getBoundingClientRect().width || 20) / 2;

            syncOutlineToTarget(activeTarget.current);
            endX.current = clamp(mouseX, rect.left + dotRadius, rect.right - dotRadius);
            endY.current = clamp(mouseY, rect.top + dotRadius, rect.bottom - dotRadius);
        } else {
            endX.current = mouseX;
            endY.current = mouseY;
        }

        dot.current.style.top = endY.current + 'px';
        dot.current.style.left = endX.current + 'px';
    }, [clamp, syncOutlineToTarget, toggleCursorVisibility]);

    const clickableHoverEvent = useCallback((e) => {
        if (!(e.target instanceof Element)) return;
        const interactive = e.target.closest(`${CLICKABLE_SELECTOR}, ${CARD_SELECTOR}`);
        if (!interactive) return;

        activeTarget.current = interactive;
        syncOutlineToTarget(activeTarget.current);
    }, [syncOutlineToTarget]);

    const clickableLeaveEvent = useCallback((e) => {
        if (!(e.target instanceof Element)) return;
        const leaving = e.target.closest(`${CLICKABLE_SELECTOR}, ${CARD_SELECTOR}`);
        if (!leaving || activeTarget.current !== leaving) return;

        if (e.relatedTarget instanceof Element && e.relatedTarget.closest(`${CLICKABLE_SELECTOR}, ${CARD_SELECTOR}`) === leaving) {
            return;
        }

        // Keep the outline trail anchored to the element's current center
        // so exit motion starts from the hovered element itself.
        if (dotOutline.current) {
            const outlineRect = dotOutline.current.getBoundingClientRect();
            _x.current = outlineRect.left + outlineRect.width / 2;
            _y.current = outlineRect.top + outlineRect.height / 2;
        }

        activeTarget.current = null;
        if (!cursorScaled.current) {
            resetOutline();
        }
    }, [resetOutline]);

    const headingHoverEvent = useCallback(() => {
        if (activeTarget.current) return;
        cursorScaled.current = true;
        toggleCursorScale();
    }, [toggleCursorScale]);

    const headingLeaveEvent = useCallback(() => {
        if (activeTarget.current) return;
        cursorScaled.current = false;
        toggleCursorScale();
    }, [toggleCursorScale]);

    const animateDotOutline = useCallback(() => {
        if (activeTarget.current) {
            syncOutlineToTarget(activeTarget.current);
            requestRef.current = requestAnimationFrame(animateDotOutline);
            return;
        }

        _x.current += (endX.current - _x.current) / delay;
        _y.current += (endY.current - _y.current) / delay;

        dotOutline.current.style.top = _y.current + 'px';
        dotOutline.current.style.left = _x.current + 'px';

        requestRef.current = requestAnimationFrame(animateDotOutline);
    }, [syncOutlineToTarget]);

    useEffect(() => {
        // Ensure window exists to attach event listeners
        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', mouseOverEvent);
            document.addEventListener('mouseup', mouseOutEvent);
            document.addEventListener('mousemove', mouseMoveEvent);
            document.addEventListener('mouseover', clickableHoverEvent);
            document.addEventListener('mouseout', clickableLeaveEvent);

            const headings = document.querySelectorAll('h1, h2, h3');
            headings.forEach((heading) => {
                heading.addEventListener('mouseenter', headingHoverEvent);
                heading.addEventListener('mouseleave', headingLeaveEvent);
            });

            resetOutline();
            animateDotOutline();
        }

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseover', clickableHoverEvent);
            document.removeEventListener('mouseout', clickableLeaveEvent);

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
        clickableHoverEvent,
        clickableLeaveEvent,
        headingHoverEvent,
        headingLeaveEvent,
        animateDotOutline,
        resetOutline,
    ]);

    return (
        <>
            <div ref={dotOutline} className="rounded-full cursor-dot-outline fixed left-0 top-0 z-[9999] pointer-events-none"></div>
            <div ref={dot} className="rounded-full cursor-dot fixed left-0 top-0 z-[10000] pointer-events-none"></div>
        </>
    );
};

export default Cursor;
