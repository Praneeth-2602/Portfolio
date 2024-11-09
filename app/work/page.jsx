"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from "react-icons/bs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
    {
        num: '01',
        category: 'frontend',
        title: 'INSPIRE',
        description: `This project aims to create a vibrant online community for students to share resources, collaborate on projects, and support each other's academic and personal growth.`,
        stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "Javascript" }],
        image: '/assets/work/thumb1.png',
        live: "",
        github: ""
    },
    {
        num: '02',
        category: 'fullstack',
        title: 'Weekend Knocks',
        description: 'A fullstack application designed for weekend event management.',
        description: 'A fullstack application designed for weekend esports event management.',
        stack: [{ name: "NextJS" }, { name: "Tailwind" }, { name: "NodeJS" }],
        image: '/assets/work/thumb2.png',
        live: "",
        github: ""
    },
    {
        num: '03',
        category: 'frontend',
        title: 'AI Resume Builder',
        description: 'An AI-powered tool to help users create professional resumes.',
        stack: [{ name: "NextJS" }, { name: "Tailwind" }],
        image: '/assets/work/thumb3.png',
        live: "",
        github: ""
    },
]

function Work() {

    const [project, setProject] = useState(projects[0]);

    const handleSlideChange = (swiper) => {
        setProject(projects[swiper.activeIndex]);
    }

    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4, delay: 2.4, ease: 'easeIn' } }} className="min-h-[80vh] flex flex-col py-12 xl:px-0">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            {/* outline number */}
                            <div className="text-8xl leading-none font-extrabold text-transparent text-outline group-hover:text-outline-hover transition-all duration-500">
                                {project.num}
                            </div>
                            {/* category */}
                            <h2 className="text-[42px] text-white font-bold leading-none group-hover:text-accent transition-all duration-500 capitalize">
                                {project.category}
                            </h2>
                            {/* description */}
                            <p className="text-[18px] text-gray-500 mt-4">
                                {project.description}
                            </p>
                            {/* stack */}
                            <ul className="flex gap-4">
                                {project.stack.map((item, index) => (
                                    <li key={index} className="text-xl text-accent">
                                        {item.name}
                                        {index < project.stack.length - 1 && <span className="text-gray-500">,</span>}
                                    </li>
                                ))}
                            </ul>
                            {/* border */}
                            <div className="border border-white/20 mt-4"></div>
                            {/* buttons */}
                            <div className="flex items-center gap-4">
                                {/* live project link */}
                                <Link href={project.live}>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-[#232329] flex justify-center items-center group">
                                                <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Live</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>

                                {/* github link */}
                                <Link href={project.github}>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-[#232329] flex justify-center items-center group">
                                                <BsGithub className="text-white text-3xl group-hover:text-accent" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Github Repo</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%]">
                        <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520] mb-12" onSlideChange={handleSlideChange}>
                            {projects.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                                            {/* overlay */}
                                            <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                                            {/* image */}
                                            <div className="relative w-full h-full ">
                                                <Image src={project.image} fill className="object-cover" alt="" />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        
                        {/* slider buttons */}
                        <WorkSliderBtns containerStyles="flex gap-2 mt-4 justify-end" btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Work
