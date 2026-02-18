"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
    {
        name: "home",
        path: "/"
    },
    {
        name: "services", 
        path: "/services"
    },
    {
        name: "resume", 
        path: "/resume"
    },
    {
        name: "work", 
        path: "/work"
    },
    {
        name: "contact",
        path: "/contact"
    }
];

function Nav() {
    const pathname = usePathname();

    const isActiveLink = (path) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <nav className="flex gap-8">
            { links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.path}
                        aria-current={isActiveLink(link.path) ? "page" : undefined}
                        className={`relative capitalize font-medium transition-all header-element px-3 py-1.5 rounded-md ${
                            isActiveLink(link.path)
                                ? "text-accent"
                                : "text-white hover:text-accent"
                        }`}
                    >
                        {isActiveLink(link.path) && (
                            <motion.span
                                layoutId="nav-active-pill"
                                className="absolute inset-0 rounded-md border border-accent/60 bg-accent/10"
                                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{link.name}</span>
                    </Link>
                ))
            }
        </nav>
    )
}

export default Nav
