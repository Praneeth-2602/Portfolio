"use client";

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import { revealUp, sectionStagger } from "@/components/motion-presets";

const services = [
    {
        num: '01',
        title: "Web & SaaS Development",
        description: "I build scalable full-stack applications with modern frameworks and production-ready architecture.",
        link: "#",
    },
    {
        num: '02',
        title: "AI Systems Development",
        description: "I design and integrate LLM-powered systems, RAG pipelines, and intelligent automation workflows.",
        link: "#",
    },
    {
        num: '03',
        title: "Backend & Architecture Design",
        description: "I architect robust APIs, scalable backend systems, and structured data-driven platforms.",
        link: "#",
    },
    {
        num: '04',
        title: "Machine Learning & Optimization",
        description: "I build predictive models, time-series systems, and constraint optimization solutions.",
        link: "#",
    },
]

import { motion } from "framer-motion";

function Services() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
            <div className="mx-auto container">
                <motion.div
                    variants={sectionStagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-[60px] md:grid-cols-2"
                >
                    <motion.div variants={revealUp} className="md:col-span-2 text-center md:text-left">
                        <p className="text-sm text-white/55 italic tracking-wide">Designed to feel calm at first glance and sharp on interaction.</p>
                    </motion.div>
                    {services.map((service, index) => {
                        return <motion.div variants={revealUp} key={index} className="flex-1 flex flex-col justify-center gap-6 group">
                            {/* top */}
                            <div className="w-full flex justify-between items-center">
                                <div className="text-5xl font-extrabold text-outline  text-transparent group-hover:text-outline-hover transition-all duration-500">
                                    {service.num}
                                </div>
                                <Magnetic strength={18}>
                                    <Link href={service.link} className="h-[70px] w-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                                        <BsArrowDownRight className="text-primary text-3xl" />
                                    </Link>
                                </Magnetic>
                            </div>
                            {/* title */}
                            <h2 className="text-[42px] leading-none text-white group-hover:text-accent font-bold transition-all duration-500">{service.title}</h2>
                            {/* description */}
                            <p className="text-white/50">{service.description}</p>
                            {/* border */}
                            <div className="border-b border-white/20 w-full"></div>
                        </motion.div>
                    })}
                </motion.div>
            </div>
        </section >
    )
}

export default Services
