"use client";

import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import Magnetic from "@/components/Magnetic";
import { revealUp, sectionStagger } from "@/components/motion-presets";

const projects = [

    // =========================
    // FULL STACK / WEB
    // =========================

    {
        num: "01",
        category: "fullstack",
        title: "WeekendKnocks – Esports Event Management Platform",
        description:
            "A full-stack platform for organizing esports tournaments with registration systems, dashboards, and match tracking.",
        problem:
            "Manual coordination through chats and spreadsheets caused inefficiencies and operational delays.",
        solution:
            "Built a structured event creation system with admin dashboards, participant management, and real-time tracking.",
        impact:
            "Streamlined tournament execution and reduced organizer overhead through centralized automation.",
        role:
            "Led full-stack development including frontend architecture, backend APIs, and deployment workflows.",
        stack: [
            { name: "Next.js", version: "14" },
            { name: "Node.js", version: "20" },
            { name: "Tailwind CSS", version: "3" }
        ],
        image: "/assets/work/weekendknocks.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/Weekend_Knocks"
    },

    {
        num: "02",
        category: "fullstack",
        title: "IIIT Nagpur Website – Institutional CMS Platform",
        description:
            "A structured institutional website built with dynamic content rendering and categorized documents.",
        problem:
            "Institutional data was scattered and difficult to maintain dynamically.",
        solution:
            "Implemented modular content rendering with structured JSON-driven CMS sections.",
        impact:
            "Improved accessibility and maintainability of institutional information.",
        role:
            "Developed frontend architecture and dynamic content components.",
        stack: [
            { name: "React", version: "18" },
            { name: "Vite", version: "5" },
            { name: "Tailwind CSS", version: "3" }
        ],
        image: "/assets/work/iiit.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/iiitn-website"
    },

    {
        num: "03",
        category: "frontend",
        title: "AI Resume Builder – Prompt-Guided Resume Generator",
        description:
            "A guided resume creation tool that transforms structured prompts into polished resumes.",
        problem:
            "Users struggle to convert achievements into professional content.",
        solution:
            "Designed AI-assisted editing flow with template switching and preview rendering.",
        impact:
            "Reduced drafting time and improved output clarity.",
        role:
            "Built UI workflow and AI integration pipeline.",
        stack: [
            { name: "Next.js", version: "14" },
            { name: "Tailwind CSS", version: "3" }
        ],
        image: "/assets/work/resume.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/Ai-Resume-Builder-App"
    },

    // =========================
    // AI / ML / RESEARCH
    // =========================

    {
        num: "04",
        category: "ai",
        title: "InsightAgent – Multimodal Agentic Research Assistant",
        description:
            "An AI system that ingests PDFs, web articles, charts, and lecture audio to generate structured research briefs.",
        problem:
            "Research synthesis across multiple sources is time-intensive and fragmented.",
        solution:
            "Built a RAG pipeline using semantic retrieval and multimodal orchestration.",
        impact:
            "Automated structured knowledge synthesis.",
        role:
            "Architected ingestion pipeline and AI orchestration.",
        stack: [
            { name: "Next.js", version: "14" },
            { name: "Gemini Flash", version: "1.x" },
            { name: "Astra DB", version: "Vector DB" }
        ],
        image: "/assets/work/researchai.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/InsightAgent"
    },

    {
        num: "05",
        category: "ml",
        title: "BTC Predictor – LSTM-Based Crypto Forecasting",
        description:
            "Time-series deep learning model for short-term BTC trend prediction.",
        problem:
            "Manual crypto trend estimation is inconsistent.",
        solution:
            "Implemented LSTM forecasting pipeline with preprocessing and validation splits.",
        impact:
            "Created reproducible experimentation framework.",
        role:
            "Built model training and evaluation pipeline.",
        stack: [
            { name: "Python", version: "3.11" },
            { name: "TensorFlow", version: "2.x" }
        ],
        image: "/assets/work/btc.png",
        liveUrl: "",
        codeUrl: ""
    },

    {
        num: "06",
        category: "research",
        title: "Decision Intelligence Framework for Customer Churn",
        description:
            "Extended predictive churn modeling into adaptive policy learning.",
        problem:
            "Prediction alone does not optimize intervention strategies.",
        solution:
            "Integrated predictive modeling with decision policy optimization.",
        impact:
            "Shifted churn modeling toward actionable decision systems.",
        role:
            "Designed framework and evaluation methodology.",
        stack: [
            { name: "Python", version: "3.x" },
            { name: "Scikit-learn", version: "1.x" }
        ],
        image: "/assets/work/churn.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/Customer-Churn-Decision-System"
    },

    {
        num: "07",
        category: "ai",
        title: "Regular Expression Inference using Reinforcement Learning",
        description:
            "RL-based system that learns regular expressions and constructs corresponding automata.",
        problem:
            "Manual regex design is error-prone and difficult to scale.",
        solution:
            "Modeled regex generation as an RL search problem with automata validation.",
        impact:
            "Bridged ML with formal language theory.",
        role:
            "Designed RL environment and automata visualization.",
        stack: [
            { name: "Python", version: "3.x" },
            { name: "PyTorch", version: "2.x" }
        ],
        image: "/assets/work/regex.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/automata-with-ml"
    },

    {
        num: "08",
        category: "research",
        title: "Quantum Multi-Attention Network for Time-Series Forecasting",
        description:
            "Hybrid quantum-classical neural architecture for long-horizon forecasting.",
        problem:
            "Classical models struggle with long-term dependency capture.",
        solution:
            "Proposed integration of quantum attention layers in sequential models.",
        impact:
            "Explored intersection of quantum ML and forecasting.",
        role:
            "Conceptualized architecture and evaluation framework.",
        stack: [
            { name: "Python", version: "3.x" },
            { name: "Qiskit", version: "0.x" }
        ],
        image: "/assets/work/quantum.png",
        liveUrl: "",
        codeUrl: ""
    },

    // =========================
    // OPTIMIZATION / SYSTEMS
    // =========================

    {
        num: "09",
        category: "optimization",
        title: "Task Scheduler Benchmark using Metaheuristics",
        description:
            "Comparative evaluation of swarm-based algorithms for constrained task allocation.",
        problem:
            "Static schedulers fail under combinatorial constraints.",
        solution:
            "Implemented BFPA, MPA, FFMPA, and BGWO for 0/1 knapsack-style optimization.",
        impact:
            "Benchmarked bio-inspired scheduling approaches.",
        role:
            "Implemented and evaluated algorithms.",
        stack: [
            { name: "Python", version: "3.x" }
        ],
        image: "/assets/work/metaheuristic.png",
        liveUrl: "",
        codeUrl: ""
    },

    {
        num: "10",
        category: "systems",
        title: "SIMPL – Custom Programming Language & Compiler",
        description:
            "Statically-typed experimental language with full compiler pipeline.",
        problem:
            "Compiler theory requires hands-on implementation for mastery.",
        solution:
            "Built lexer, parser (AST), semantic analyzer, and intermediate representation generator.",
        impact:
            "Demonstrated end-to-end compiler construction expertise.",
        role:
            "Designed grammar and implemented compilation stages.",
        stack: [
            { name: "C++", version: "20" },
            { name: "Flex", version: "2.x" },
            { name: "Bison", version: "3.x" }
        ],
        image: "/assets/work/simpl.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/SIMPL-Simple-Imperative-Modular-Programming-Language"
    },

    {
        num: "11",
        category: "systems",
        title: "Aquila – Self-Optimizing Task Scheduler",
        description:
            "Adaptive scheduler designed for integration into a custom OS architecture.",
        problem:
            "Static scheduling policies cannot adapt to runtime workload changes.",
        solution:
            "Designed adaptive scheduling core with optimization logic.",
        impact:
            "Foundation for modular self-optimizing OS component.",
        role:
            "Implemented scheduling engine and modular architecture.",
        stack: [
            { name: "C++", version: "20" }
        ],
        image: "/assets/work/aquila.png",
        liveUrl: "",
        codeUrl: ""
    },

    // =========================
    // ADDITIONAL GITHUB PROJECTS
    // =========================

    {
        num: "12",
        category: "fullstack",
        title: "Movie Website",
        description:
            "Responsive movie browsing platform with dynamic routing and API integration.",
        problem:
            "Users require an interactive interface to explore movie content.",
        solution:
            "Built a dynamic frontend integrated with backend services.",
        impact:
            "Delivered an engaging movie discovery experience.",
        role:
            "Developed frontend and server logic.",
        stack: [
            { name: "JavaScript", version: "ES6+" },
            { name: "Node.js", version: "20" }
        ],
        image: "/assets/work/movie.png",
        liveUrl: "https://movie-website-orcin.vercel.app",
        codeUrl: "https://github.com/Praneeth-2602/Movie-Website"
    },

    {
        num: "13",
        category: "ml",
        title: "Fraud Detection ML Model",
        description:
            "Machine learning model for detecting fraudulent patterns in structured datasets.",
        problem:
            "Fraud detection requires identifying subtle anomalies in data.",
        solution:
            "Trained supervised learning models with feature engineering.",
        impact:
            "Built baseline automated fraud classification system.",
        role:
            "Data preprocessing and model experimentation.",
        stack: [
            { name: "Python", version: "3.x" },
            { name: "Scikit-learn", version: "1.x" }
        ],
        image: "/assets/work/fraud.png",
        liveUrl: "",
        codeUrl: "https://github.com/Praneeth-2602/Fraud-Detection-ML"
    }
];


const categories = ['all', ...new Set(projects.map(p => p.category))];

function Work() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [activeIndex, setActiveIndex] = useState(0);
    const filteredProjects = useMemo(
        () => selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory),
        [selectedCategory]
    );
    const project = filteredProjects[activeIndex] || filteredProjects[0];

    useEffect(() => {
        setActiveIndex(0);
    }, [selectedCategory]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 2.4, ease: 'easeIn' } }}
            className="min-h-[80vh] flex flex-col py-12 xl:px-0"
        >
            <motion.div
                variants={sectionStagger}
                initial="hidden"
                animate="show"
                className="container mx-auto"
            >
                <motion.p variants={revealUp} className="mb-6 text-center xl:text-left text-sm text-white/55 italic tracking-wide">
                    A portfolio should read fast and still reward curiosity.
                </motion.p>
                <motion.div variants={revealUp} className="mb-8 flex gap-4 flex-wrap justify-center">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectedCategory === cat
                                ? "bg-accent text-white"
                                : "border-gray-600 text-gray-400 hover:border-accent hover:text-accent"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </motion.div>
                <motion.div variants={revealUp} className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[20px] h-[50%]">
                            <div className="text-8xl leading-none font-extrabold text-transparent text-outline group-hover:text-outline-hover transition-all duration-500">
                                {project?.num}
                            </div>
                            {project?.liveUrl || project?.codeUrl ? (
                                <Link
                                    href={project?.liveUrl || project?.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[30px] xl:text-[36px] text-white font-bold leading-tight hover:text-accent transition-all duration-300"
                                >
                                    {project?.title}
                                </Link>
                            ) : (
                                <h2 className="text-[30px] xl:text-[36px] text-white font-bold leading-tight">
                                    {project?.title}
                                </h2>
                            )}
                            <p className="text-[16px] text-gray-300">{project?.description}</p>
                            <div className="grid gap-3 text-sm">
                                <p className="text-white/80"><span className="text-accent font-semibold">Problem:</span> {project?.problem}</p>
                                <p className="text-white/80"><span className="text-accent font-semibold">Solution:</span> {project?.solution}</p>
                                <p className="text-white/80"><span className="text-accent font-semibold">Impact:</span> {project?.impact}</p>
                            </div>
                            <p className="text-white/80 text-sm">
                                <span className="text-accent font-semibold">My role:</span> {project?.role}
                            </p>
                            <ul className="flex gap-3 flex-wrap">
                                {project?.stack.map((item, index) => (
                                    <li key={index} className="text-sm border border-accent/40 rounded-full px-3 py-1 text-accent">
                                        {item.name} <span className="text-white/70">v{item.version}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border border-white/20 mt-4"></div>
                            <div className="flex items-center gap-4 flex-wrap">
                                {project?.liveUrl ? (
                                    <Magnetic strength={16}>
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary font-semibold hover:bg-accent-hover transition-all duration-300"
                                        >
                                            <BsArrowUpRight className="text-lg" />
                                            View Live
                                        </Link>
                                    </Magnetic>
                                ) : (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/40">
                                        <BsArrowUpRight className="text-lg" />
                                        View Live
                                    </span>
                                )}

                                {project?.codeUrl ? (
                                    <Magnetic strength={16}>
                                        <Link
                                            href={project.codeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-primary transition-all duration-300"
                                        >
                                            <BsGithub className="text-lg" />
                                            View Code
                                        </Link>
                                    </Magnetic>
                                ) : (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white/40">
                                        <BsGithub className="text-lg" />
                                        View Code
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%]">
                        <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520] mb-12" onSlideChange={handleSlideChange}>
                            {filteredProjects.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                                        <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                                        <div className="relative w-full h-full">
                                            <Image src={item.image} fill className="object-cover" alt={item.title} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <WorkSliderBtns
                                containerStyles="flex gap-2 mt-4 justify-end"
                                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                            />
                        </Swiper>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default Work;
