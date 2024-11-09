"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs } from "react-icons/fa"

import { SiTailwindcss, SiNextdotjs } from "react-icons/si"

// about data
const about = {
    title: "About me",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies.",
    info: [
        {
            fieldName: "Name",
            fieldValue: "Praneeth Palugula",
        },
        {
            fieldName: "Email",
            fieldValue: "praneeth.palugula@gmail.com",
        },
        {
            fieldName: "Phone",
            fieldValue: "(+91) 8555033466",
        },
        {
            fieldName: "Experience",
            fieldValue: "Fresher",
        },
        {
            fieldName: "Nationality",
            fieldValue: "Indian",
        },
        {
            fieldName: "Freelance",
            fieldValue: "Available",
        },
        {
            fieldName: "Languages",
            fieldValue: "Telugu, English, Hindi",
        }
    ]
}

// experience data
const experience = {
    icon: '/assets/resume/badge.svg',
    title: "My Experience",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies.",
    items: [
        {
            company: "GirlScript Summer of Code",
            position: "Contributor",
            period: "Summer 2024",
        },
        {
            company: "CRISPR Club",
            position: "Core Team Member",
            period: "2024 - Present",
        },
        {
            company: "GPT 4.0 Solvathon",
            position: "Organising Committee",
            period: "TantraFeista 2024",
        }
    ]
}

// education data
const education = {
    icon: '/assets/resume/cap.svg',
    title: "My Education",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies.",
    items: [

        {
            institution: "IIIT Nagpur",
            degree: "B.Tech in Computer Science",
            period: "2023 - Present",
        },
        {
            institution: "SCJC",
            degree: "Higher Secondary",
            period: "2020 - 2022",
        },
        {
            institution: "Pallavi Model School",
            degree: "High School",
            period: "2016 - 2020",
        },
        {
            institution: "Online Course Platform",
            degree: "Full Stack Web Development Bootcamp",
            period: "2023",
        },
        {
            institution: "100xDEVs",
            degree: "Web 3",
            period: "2024",
        },
        {
            institution: "FreeCodeCamp",
            degree: "Web 3",
            period: "2024"
        },
    ]
}

// skills data
const skills = {
    title: "My Skills",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies.",
    skillList: [
        {
            name: "html 5",
            icon: <FaHtml5 />,
        },

        {
            name: "css 3",
            icon: <FaCss3 />,
        },

        {
            name: "javascript",
            icon: <FaJs />,
        },

        {
            name: "reactJS",
            icon: <FaReact />,
        },

        {
            name: "next.js",
            icon: <SiNextdotjs />,
        },

        {
            name: "node.js",
            icon: <FaNodeJs />,
        },

        {
            name: "tailwind css",
            icon: <SiTailwindcss />,
        },

        {
            name: "Figma",
            icon: <FaFigma />,
        }
    ]
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

function Resume() {
    return (
        <motion.div initial={{
            opacity: 0
        }} animate={{
            opacity: 1,
            transition: { duration: 0.4, delay: 2.4, ease: "easeIn" }
        }}
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <div className="w-[80%]">
                <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px] w-full">
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="about">About Me</TabsTrigger>
                    </TabsList>

                    {/* content */}
                    <div className="min-h-[70vh] w-full">
                        {/* experience */}
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/50 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {experience.items.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-[#232329] h-[184px] py-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                    <span className="text-accent">{item.period}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                                                    <div className="flex items-center gap-3">
                                                        {/* dot */}
                                                        <span className="h-[6px] w-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/50">{item.company}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        {/* education */}
                        <TabsContent value="education" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/50 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
                                        {education.items.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-[#232329] h-[184px] py-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                    <span className="text-accent">{item.period}</span>
                                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                                                    <div className="flex items-center gap-3">
                                                        {/* dot */}
                                                        <span className="h-[6px] w-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/50">{item.institution}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        {/* skills */}
                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/50 mx-auto xl:mx-0">
                                        {skills.description}
                                    </p>
                                </div>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                                    {skills.skillList.map((skill, index) => {
                                        return (
                                            <li key={index}>
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                                            <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="capitalize">{skill.name}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </TabsContent>

                        {/* about */}
                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/50 mx-auto xl:mx-0">{about.description}</p>

                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {about.info.map((item, index) => {
                                        return (
                                            <li key={index} className="flex justify-center items-center xl:justify-start gap-4">
                                                <span className="text-white/50">{item.fieldName}</span>
                                                <span className="text-xl">{item.fieldValue}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div >
        </motion.div >
    )
}

export default Resume