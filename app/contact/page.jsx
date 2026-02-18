"use client";

import { Button } from "@/components/ui/button";
import Magnetic from "@/components/Magnetic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { revealUp, sectionStagger } from "@/components/motion-presets";

const info = [
    {
        icon: <FaPhoneAlt />,
        title: 'Phone',
        text: '(+91) 85550 33466'
    },
    {
        icon: <FaEnvelope />,
        title: 'Email',
        text: 'praneeth.palugula@gmail.com'
    },
    {
        icon: <FaMapMarkerAlt />,
        title: 'Address',
        text: 'Hyderabad, India'
    }
];

const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const inputVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } }
};

function Contact() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 0.4, delay: 2.4, ease: "easeIn" }
            }}
            className="py-6 "
        >
            <motion.div
                variants={sectionStagger}
                initial="hidden"
                animate="show"
                className="container mx-auto"
            >
                <motion.p variants={revealUp} className="mb-6 text-center xl:text-left text-sm text-white/55 italic tracking-wide">
                    Good products start with a clear conversation.
                </motion.p>
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    {/* form */}
                    <motion.div variants={revealUp} className="xl:w-[54%] order-2 xl:order-none">
                        <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                            <h3 className="text-4xl text-accent">Let's work together</h3>
                            <p className="text-white/50">
                                I'm always open to new projects, collaborations or employment opportunities. Let's connect.
                            </p>
                            {/* input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input type="firstname" placeholder="Firstname" />
                                <Input type="lastname" placeholder="Lastname" />
                                <Input type="email" placeholder="Email" />
                                <Input type="phone" placeholder="Phone" />
                            </div>
                            {/* select */}
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select a service</SelectLabel>
                                        <SelectItem value="est">Web Development</SelectItem>
                                        <SelectItem value="cst">UI/UX Design</SelectItem>
                                        <SelectItem value="mst">Logo Design</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* textarea */}
                            <Textarea className="h-200px]" placeholder="Type your message here" />
                            {/* button */}
                            <Magnetic strength={18}>
                                <Button size="md" className="max-w-40">Send Message</Button>
                            </Magnetic>
                        </form>
                    </motion.div>

                    {/* contact info */}
                    <motion.div variants={revealUp} className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                            {info.map((item, i) => {
                                return (
                                    <li key={i} className="flex items-center gap-6">
                                        <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md justify-center flex hover:bg-accent hover:text-primary hover:scale-75 transition-all duration-500">
                                            <div className="text-[28px] flex items-center">{item.icon}</div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white/50">{item.title} </p>
                                            <h3 className="text-xl text-accent">{item.text}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
}

export default Contact;
