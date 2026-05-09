'use client';
import HeroImg from '../assets/images/Hero.png'
import Image from 'next/image';
import Link from 'next/link';

const menu = [
  {title: 'HOME', url: ""},
  {title: 'ABOUT ME', url: "about"},
  {title: 'RESUME', url: "resume"},
  {title: 'PORTFOLIO', url: "portfolio"},
  {title: 'TESTIMONIALS', url: "testimonials"},
  {title: 'CONTACT', url: "contact"},
];

export default function LeftSidebar() {
  return (
    <aside className="leftSidebar">
      <div className="profile">
        <Image 
          src={HeroImg} 
          alt="profile" />
      </div>

      <nav className="menu">
        {menu.map((item, i) => (
          <Link key={i} href={`/${item.url}`}>
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}