'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { PortfolioProjectView } from '@/lib/content';
import { motion } from 'framer-motion';

type Category = 'all' | 'graphic' | 'web' | 'photo';

type PortfolioSectionProps = {
  items: PortfolioProjectView[];
};

const tabs: Category[] = ['all', 'graphic', 'web', 'photo'];

export default function PortfolioSection({ items }: PortfolioSectionProps) {
  const [active, setActive] = useState<Category>('all');
  const visibleTabs = useMemo(() => {
    const present = new Set(items.map((item) => item.category));
    return tabs.filter((tab) => tab === 'all' || present.has(tab));
  }, [items]);

  const filtered = useMemo(() => {
    const data =
      active === 'all' ? items : items.filter((item) => item.category === active);

    return [...data].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [active, items]);

  return (
    <section className="portfolioContainer" id="portfolio">
      <div className="portfolioHeader">
        <h1>PORTFOLIO</h1>
      </div>

      <div className="portfolioTabs">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            className={active === tab ? 'active' : ''}
            onClick={() => setActive(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="portfolioGrid">
        {filtered.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="portfolioItem portfolioTextCard"
          >
            <div className="portfolioTextInner">
              <div>
                {item.featured ? <span className="portfolioFeatured">FEATURED</span> : null}
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <div className="portfolioLinks">
                <Link href={item.liveUrl}>LIVE</Link>
                <Link href={item.githubUrl}>CODE</Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
