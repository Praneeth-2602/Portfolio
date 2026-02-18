import Link from "next/link"
import Magnetic from "./Magnetic";

import { FaGithub as FaGitHub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

const socials = [
    {
        path: 'https://www.github.com/praneeth-2602',
        icon: <FaGitHub />
    },
    {
        path: 'https://www.linkedin.com/in/praneeth-palugula/',
        icon: <FaLinkedin />
    },
    {
        path: 'https://x.com/Praneet57813413',
        icon: <FaTwitter />
    },
    {
        path: 'https://www.instagram.com/praneeth_2602/',
        icon: <FaInstagram />
    }
]

function Socials({containerStyles, iconStyles}) {
    return (
        <div className={containerStyles}>
            {socials.map((social, index) => (
                <Magnetic key={index} strength={16}>
                    <Link href={social.path} className={iconStyles}>
                        {social.icon}
                    </Link>
                </Magnetic>
            ))}
        </div>
    )
}

export default Socials;
