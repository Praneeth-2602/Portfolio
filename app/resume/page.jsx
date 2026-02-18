"use client";

import { FaCss3, FaFigma, FaGitAlt, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiExpress, SiGithubactions, SiMongodb, SiNextdotjs, SiPostman, SiTailwindcss } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { revealUp, sectionStagger } from "@/components/motion-presets";
import { useEffect, useRef, useState } from "react";

const about = {
    title: "About me",
    description: "I am a full-stack developer focused on building practical, user-centered products. I enjoy turning product ideas into clean, performant experiences and collaborating closely with teams.",
    info: [
        { fieldName: "Name", fieldValue: "Praneeth Palugula" },
        { fieldName: "Email", fieldValue: "praneeth.palugula@gmail.com" },
        { fieldName: "Phone", fieldValue: "(+91) 8555033466" },
        { fieldName: "Experience", fieldValue: "Early-career, project-driven" },
        { fieldName: "Nationality", fieldValue: "Indian" },
        { fieldName: "Freelance", fieldValue: "Available" },
        { fieldName: "Languages", fieldValue: "English, Telugu, Hindi" }
    ]
};

const experience = {
    title: "My Experience",
    description: "Hands-on experience through open-source programs, student communities, and product-focused project work.",
    items: [
        { company: "GirlScript Summer of Code", position: "Open Source Contributor", period: "Summer 2024" },
        { company: "CRISPR Club", position: "Core Team Member", period: "2024 - 2025" },
        { company: "GPT 4.0 Solvathon", position: "Organizing Committee", period: "TantraFiesta 2024" },
        { company: "KaleidoXP Consulting Services", position: "Software Development Intern", period: "Aug 2025-Present" },
    ]
};

const education = {
    title: "My Education",
    description: "Formal academics combined with focused online programs in modern web development and Web3 fundamentals.",
    items: [
        { institution: "IIIT Nagpur", degree: "B.Tech in Computer Science", period: "2023 - Present" },
        { institution: "SCJC", degree: "Higher Secondary", period: "2020 - 2022" },
        { institution: "Pallavi Model School", degree: "High School", period: "2016 - 2020" },
    ]
};

const skills = {
    title: "My Skills",
    description: "Grouped by domain with proficiency and practical usage time.",
    groups: [
        {
            name: "Frontend",
            items: [
                { name: "HTML5", icon: <FaHtml5 />, years: "3+ yrs", level: 90 },
                { name: "CSS3", icon: <FaCss3 />, years: "3+ yrs", level: 88 },
                { name: "JavaScript", icon: <FaJs />, years: "2+ yrs", level: 84 },
                { name: "React", icon: <FaReact />, years: "2+ yrs", level: 82 },
                { name: "Next.js", icon: <SiNextdotjs />, years: "1.5+ yrs", level: 80 },
                { name: "Tailwind CSS", icon: <SiTailwindcss />, years: "2+ yrs", level: 86 }
            ]
        },
        {
            name: "Backend",
            items: [
                { name: "Node.js", icon: <FaNodeJs />, years: "1.5+ yrs", level: 76 },
                { name: "Express.js", icon: <SiExpress />, years: "1+ yrs", level: 72 },
                { name: "MongoDB", icon: <SiMongodb />, years: "1+ yrs", level: 70 }
            ]
        },
        {
            name: "Tools",
            items: [
                { name: "Git", icon: <FaGitAlt />, years: "2+ yrs", level: 82 },
                { name: "Figma", icon: <FaFigma />, years: "1+ yrs", level: 68 },
                { name: "Postman", icon: <SiPostman />, years: "1+ yrs", level: 74 },
                { name: "GitHub Actions", icon: <SiGithubactions />, years: "0.5+ yrs", level: 60 }
            ]
        }
    ],
};

const certifications = {
    title: "Certifications and Badges",
    description: "Recognitions from reputable platforms for completing courses and contributing to open-source projects.",
    badges: [
        { name: "Full Stack Bootcamp Completion", issuer: "Udemy", year: "2023" },
        { name: "GSSoC Contributor Badge", issuer: "GirlScript Summer of Code", year: "2024" },
        { name: "Web3 Program Coursework", issuer: "100xDEVs", year: "2024" },
        { name: "Web3 Coursework", issuer: "freeCodeCamp", year: "2024" },
        { name: "Supervised Machine Learning: Regression and Classification", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Neural Networks and Deep Learning", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Improving Deep Neural Networks", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Structuring Machine Learning Projects", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Advanced Learning Algorithms", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Unsupervised Learning, Recommenders, Reinforcement Learning", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Convolutional Neural Networks", issuer: "Stanford University / deeplearning.ai", year: "2026" },
        { name: "Sequence Models", issuer: "Stanford University / deeplearning.ai", year: "2026" }
    ]
}

function Resume() {
    const [activeTab, setActiveTab] = useState("experience");
    const [certProgress, setCertProgress] = useState(0);
    const certificationsScrollRef = useRef(null);

    useEffect(() => {
        if (activeTab !== "certifications") return;

        const viewport = certificationsScrollRef.current?.querySelector("[data-radix-scroll-area-viewport]");
        if (!viewport) return;

        const updateProgress = () => {
            const maxScroll = viewport.scrollHeight - viewport.clientHeight;
            if (maxScroll <= 0) {
                setCertProgress(1);
                return;
            }
            setCertProgress(viewport.scrollTop / maxScroll);
        };

        updateProgress();
        viewport.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            viewport.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [activeTab]);

    return (
        <motion.div
            variants={sectionStagger}
            initial="hidden"
            animate="show"
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <motion.div variants={revealUp} className="w-[80%]">
                <motion.p variants={revealUp} className="mb-8 text-center xl:text-left text-sm text-white/55 italic tracking-wide">
                    Built by shipping, refined by iteration, documented with intent.
                </motion.p>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col xl:flex-row gap-[60px] w-full">
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="certifications">Certifications</TabsTrigger>
                        <TabsTrigger value="about">About Me</TabsTrigger>
                    </TabsList>

                    <div className="min-h-[70vh] w-full">
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {experience.items.map((item, index) => (
                                            <li
                                                key={index}
                                                data-cursor-card
                                                className="group relative bg-[#232329] h-[184px] py-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 border border-transparent transition-all duration-300 ease-out hover:bg-accent hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                                            >
                                                <span className="text-accent">{item.period}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="h-[6px] w-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-white/50">{item.company}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="education" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {education.items.map((item, index) => (
                                            <li
                                                key={index}
                                                data-cursor-card
                                                className="group relative bg-[#232329] h-[184px] py-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 border border-transparent transition-all duration-300 ease-out hover:bg-accent hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                                            >
                                                <span className="text-accent">{item.period}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="h-[6px] w-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-white/50">{item.institution}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[20px] text-center xl:text-left">
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {skills.groups.map((group, groupIndex) => (
                                        <div key={groupIndex} className="bg-[#232329] rounded-xl p-5">
                                            <h4 className="text-xl font-semibold text-accent mb-4">{group.name}</h4>
                                            <ul className="flex flex-wrap gap-2 mb-5">
                                                {group.items.map((skill, skillIndex) => (
                                                    <li key={skillIndex} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 text-sm text-white/90">
                                                        <span className="text-accent text-base">{skill.icon}</span>
                                                        <span>{skill.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="space-y-3">
                                                {group.items.map((skill, skillIndex) => (
                                                    <div key={skillIndex}>
                                                        <div className="flex items-center justify-between text-sm mb-1">
                                                            <span className="text-white/90">{skill.name}</span>
                                                            <span className="text-white/60">{skill.years}</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-accent rounded-full"
                                                                style={{ width: `${skill.level}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="certifications" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{certifications.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{certifications.description}</p>
                                <div className="relative pr-6">
                                    <ScrollArea ref={certificationsScrollRef} className="h-[400px]">
                                        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                            {certifications.badges.map((item, index) => (
                                                <li
                                                    key={index}
                                                    data-cursor-card
                                                    className="group relative bg-[#232329] h-[184px] py-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 border border-transparent transition-all duration-300 ease-out hover:bg-accent hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                                                >
                                                    <span className="text-accent">{item.year}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.name}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="h-[6px] w-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/50">{item.issuer}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                    <div className="pointer-events-none absolute right-0 top-0 h-full w-[3px] rounded-full bg-white/15 overflow-hidden">
                                        <motion.div
                                            className="w-full h-full bg-accent origin-top"
                                            style={{ scaleY: certProgress }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {about.info.map((item, index) => (
                                        <li key={index} className="flex justify-center items-center xl:justify-start gap-4">
                                            <span className="text-white/50">{item.fieldName}</span>
                                            <span className="text-xl">{item.fieldValue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </motion.div>
        </motion.div>
    );
}

export default Resume;
