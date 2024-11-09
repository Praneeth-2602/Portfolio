"use client";

import AnimatedText from "@/components/AnimatedText";
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { useEffect } from "react";

const Home = () => {
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

  return (
    <section className="h-full">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-8">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1">
              Hello I'm <br />
              <span className="text-accent">
                <AnimatedText text="Praneeth" /> <AnimatedText text="Palugula" />
              </span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <span>Download CV</span> <FiDownload />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials containerStyles="flex gap-6" iconStyles="w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
