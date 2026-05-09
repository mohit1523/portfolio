'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminLink = {
  href: string;
  label: string;
};

type AdminSidebarNavProps = {
  links: AdminLink[];
};

export default function AdminSidebarNav({
  links,
}: AdminSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="adminNav">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? 'adminNavLink active' : 'adminNavLink'}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
