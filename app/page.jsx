"use client";

import AnimatedText from "@/components/AnimatedText";
import Magnetic from "@/components/Magnetic";
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { revealUp, sectionStagger } from "@/components/motion-presets";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useEffect } from "react";

const Home = () => {
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const textX = useSpring(parallaxX, { stiffness: 180, damping: 20, mass: 0.35 });
  const textY = useSpring(parallaxY, { stiffness: 180, damping: 20, mass: 0.35 });
  const photoX = useTransform(textX, (value) => value * -0.7);
  const photoY = useTransform(textY, (value) => value * -0.7);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseUp = () => {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement("span");
        span.className = "highlight";
        range.surroundContents(span);

        createParticles(range.getBoundingClientRect());

        // Remove highlight class after 2 seconds
        setTimeout(() => {
          const highlightedElements = document.querySelectorAll(".highlight");
          highlightedElements.forEach((el) => {
            el.classList.remove("highlight");
          });
        }, 2000);
      }
    };

    const createParticles = (rect) => {
      if (typeof window === "undefined") return;

      const particlesContainer = document.createElement("div");
      particlesContainer.style.position = "absolute";
      particlesContainer.style.top = `${rect.top + window.scrollY}px`;
      particlesContainer.style.left = `${rect.left + window.scrollX}px`;
      particlesContainer.style.width = `${rect.width}px`;
      particlesContainer.style.height = `${rect.height}px`;
      particlesContainer.style.pointerEvents = "none";
      document.body.appendChild(particlesContainer);

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.top = `${Math.random() * rect.height}px`;
        particle.style.left = `${Math.random() * rect.width}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
          particle.remove();
          if (particlesContainer.childNodes.length === 0) {
            particlesContainer.remove();
          }
        }, 1000);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleParallaxMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = (event.clientX - rect.left) / rect.width - 0.5;
    const ry = (event.clientY - rect.top) / rect.height - 0.5;

    parallaxX.set(rx * 24);
    parallaxY.set(ry * 18);
  };

  const handleParallaxLeave = () => {
    parallaxX.set(0);
    parallaxY.set(0);
  };

  return (
    <motion.section
      className="h-full"
      variants={sectionStagger}
      initial="hidden"
      animate="show"
      onMouseMove={handleParallaxMove}
      onMouseLeave={handleParallaxLeave}
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-8">
          {/* text */}
          <motion.div
            variants={revealUp}
            style={{ x: textX, y: textY }}
            className="text-center xl:text-left order-2 xl:order-none"
          >
            <motion.span variants={revealUp} className="text-xl inline-block">Full-Stack Developer</motion.span>
            <motion.h1 variants={revealUp} className="h1">
              Hello I'm <br />
              <span className="text-accent">
                <AnimatedText text="Praneeth" /> <AnimatedText text="Palugula" />
              </span>
            </motion.h1>
            <motion.p variants={revealUp} className="max-w-[500px] mb-9 text-white/80">
              I build fast, accessible web apps for startups and student-led teams, focusing on product quality, performance, and clean user experience.
            </motion.p>
            <motion.div variants={revealUp} className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/50 bg-accent/10 text-accent text-sm">
              <span className="font-semibold">Achievement:</span>
              <span>5+ client and community projects delivered, 50+ production-ready features shipped.</span>
            </motion.div>
            <motion.p variants={revealUp} className="mb-9 text-sm text-white/55 tracking-wide italic">
              Quietly obsessive about speed, clarity, and tiny interaction details.
            </motion.p>
            {/* btn and socials */}
            <motion.div variants={revealUp} className="flex flex-col xl:flex-row items-center gap-8">
              <Magnetic strength={20}>
                <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                  <span>Download CV</span> <FiDownload />
                </Button>
              </Magnetic>
              <div className="mb-8 xl:mb-0">
                <Socials containerStyles="flex gap-6" iconStyles="w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
              </div>
            </motion.div>
          </motion.div>
          {/* photo */}
          <motion.div variants={revealUp} style={{ x: photoX, y: photoY }} className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </motion.div>
        </div>
      </div>
      <Stats />
    </motion.section>
  );
};

export default Home;
