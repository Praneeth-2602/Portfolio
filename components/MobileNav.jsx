"use client";

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';
import { motion } from 'framer-motion';

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

function MobileNav() {
    const pathname = usePathname();

    const isActiveLink = (path) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <Sheet>
            <SheetTrigger className='flex justify-center outline-none'>
                <CiMenuFries className='text-[32px] text-accent' />
            </SheetTrigger>
            <SheetContent>
                {/* logo */}
                <div className="mt-32 mb-40 text-center text-2xl outline-none">
                    <Link href='/'>
                        <h1 className="text-4xl font-semibold">
                            PP<span className='text-accent'>.</span>
                        </h1>
                    </Link>
                </div>

                {/* nav */}
                <nav className="flex flex-col justify-center items-center gap-8">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            aria-current={isActiveLink(link.path) ? "page" : undefined}
                            className={`relative capitalize text-xl transition-all px-3 py-1 rounded-md ${
                                isActiveLink(link.path)
                                    ? "text-accent"
                                    : "text-white hover:text-accent"
                            }`}
                        >
                            {isActiveLink(link.path) && (
                                <motion.span
                                    layoutId="mobile-nav-active-pill"
                                    className="absolute inset-0 rounded-md border border-accent/60 bg-accent/10"
                                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                                />
                            )}
                            <span className='relative z-10'>{link.name}</span>
                        </Link>
                    ))
                    }
                </nav>
            </SheetContent>

        </Sheet>
    )
}

export default MobileNav
