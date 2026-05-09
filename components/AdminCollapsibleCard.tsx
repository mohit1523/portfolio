'use client';

import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type AdminCollapsibleCardProps = {
  title: string;
  meta?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export default function AdminCollapsibleCard({
  title,
  meta,
  badge,
  defaultOpen = false,
  children,
}: AdminCollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="adminCollapsibleCard">
      <button
        type="button"
        className={open ? 'adminCollapseHeader open' : 'adminCollapseHeader'}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <div className="adminCollapseSummary">
          <div>
            <h3>{title}</h3>
            {meta ? <p>{meta}</p> : null}
          </div>
          <div className="adminCollapseActions">
            {badge ? <span className="adminCollapseBadge">{badge}</span> : null}
            <ChevronDown size={18} className="adminCollapseChevron" />
          </div>
        </div>
      </button>

      {open ? <div className="adminCollapseBody">{children}</div> : null}
    </section>
  );
}
