"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

let activeMagnetId = null;
let activeMagnetReset = null;

function Magnetic({
  children,
  className,
  strength = 28,
  stickyDistance = 120,
  releaseFalloff = 48,
  spring = { stiffness: 320, damping: 24, mass: 0.22 },
}) {
  const magnetIdRef = useRef(Symbol("magnetic"));
  const rootRef = useRef(null);
  const stickyRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, spring);
  const my = useSpring(y, spring);
  const scale = useSpring(1, { stiffness: 260, damping: 20, mass: 0.3 });

  const resetMagnet = useCallback(() => {
    if (activeMagnetId === magnetIdRef.current) {
      activeMagnetId = null;
      activeMagnetReset = null;
    }
    stickyRef.current = false;
    setIsHovering(false);
    scale.set(1);
    x.set(0);
    y.set(0);
  }, [scale, x, y]);

  const applyMagnetFromPoint = useCallback((clientX, clientY) => {
    if (!rootRef.current) return;
    // Only one magnet is allowed to react at a time to avoid adjacent pulls.
    if (activeMagnetId && activeMagnetId !== magnetIdRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    const overDistance = distance - stickyDistance;
    if (overDistance > releaseFalloff) {
      resetMagnet();
      return;
    }

    // As the pointer exits the sticky zone, we reduce the pull so the element
    // resists before snapping back when the resistance "breaks".
    const resistanceFalloff = overDistance > 0
      ? Math.max(0.08, 1 - overDistance / releaseFalloff)
      : 1;

    const limitX = rect.width / 2 || 1;
    const limitY = rect.height / 2 || 1;
    const offsetX = Math.max(-1, Math.min(1, dx / limitX));
    const offsetY = Math.max(-1, Math.min(1, dy / limitY));
    const outsideX = Math.max(0, Math.abs(dx) - limitX);
    const outsideY = Math.max(0, Math.abs(dy) - limitY);
    const outsideDistance = Math.hypot(outsideX, outsideY);
    const proximity = Math.min(outsideDistance / stickyDistance, 1);
    const elasticBoost = 1 + (1 - proximity) * 0.45;
    // Add resistance at the edge: it still follows, but increasingly fights movement.
    const resistance = Math.max(0.25, 1 - proximity * 0.75);
    const maxOffset = strength * 1.65;
    const targetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength * elasticBoost * resistance * resistanceFalloff));
    const targetY = Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength * elasticBoost * resistance * resistanceFalloff));

    x.set(targetX);
    y.set(targetY);
  }, [resetMagnet, stickyDistance, strength, x, y]);

  const handlePointerEnter = (event) => {
    if (activeMagnetId && activeMagnetId !== magnetIdRef.current && activeMagnetReset) {
      activeMagnetReset();
    }
    activeMagnetId = magnetIdRef.current;
    activeMagnetReset = resetMagnet;
    stickyRef.current = true;
    setIsHovering(true);
    scale.set(1.035);
    applyMagnetFromPoint(event.clientX, event.clientY);
  };

  const handlePointerMove = (event) => {
    applyMagnetFromPoint(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event) => {
    applyMagnetFromPoint(event.clientX, event.clientY);
  };

  useEffect(() => {
    const handleWindowPointerMove = (event) => {
      if (!stickyRef.current) return;
      applyMagnetFromPoint(event.clientX, event.clientY);
    };

    const handleWindowBlur = () => {
      if (!stickyRef.current) return;
      resetMagnet();
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      if (activeMagnetId === magnetIdRef.current) {
        activeMagnetId = null;
        activeMagnetReset = null;
      }
    };
  }, [applyMagnetFromPoint, resetMagnet]);

  return (
    <motion.div
      ref={rootRef}
      className={cn("inline-flex will-change-transform transform-gpu", className)}
      style={{ x: mx, y: my, scale }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-magnetic-active={isHovering ? "true" : "false"}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
