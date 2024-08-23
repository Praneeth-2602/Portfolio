import Link from "next/link"

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
                <Link key={index} href={social.path} className={iconStyles}>
                    {social.icon}
                </Link>
            ))}
        </div>
    )
}

export default Socials;