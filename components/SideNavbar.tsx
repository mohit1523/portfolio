'use client';

import { Home, User, NewspaperIcon, Briefcase, UserStarIcon, Mail } from 'lucide-react';
import Link from 'next/link';

const menu = [
  {title: 'HOME', icon: Home, url: '' },
  {title: 'ABOUT ME' , icon: User, url: 'about' },
  {title: 'RESUME', icon: NewspaperIcon, url: 'resume' },
  {title: 'PORTFOLIO', icon: Briefcase, url: 'portfolio' },
  {title: 'TESTIMONIALS', icon: UserStarIcon, url: 'testimonials' },
  {title: 'CONTACT', icon: Mail, url: 'contact' },
];

export default function SideNavbar() {
  return (
    <div className="sideNav">
      {menu.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link key={i} href={`/${item.url}`} title={item.title} className="navItem">
            <Icon size={18} />
          </Link>
        );
      })}
    </div>
  );
}