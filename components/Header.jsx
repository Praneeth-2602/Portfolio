import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

function Header() {
    return (
        <header className="py-8 xl:py-8 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href='/'>
                    <h1 className="text-4xl font-semibold">
                        PP<span className="text-accent">.</span>
                    </h1>
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Link href='/contact'>
                        <Button>Hire me</Button>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="flex xl:hidden mt-6">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header