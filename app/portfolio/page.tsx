import dynamic from 'next/dynamic';
import LeftSidebar from '@/components/LeftSideNavMap';
import { getProjects } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'));

export async function generateMetadata() {
  return buildMetadata(
    'Portfolio',
    'Featured projects showing full stack delivery, performance optimization, and AI-assisted engineering workflows.',
    '/portfolio'
  );
}

export default async function PortfolioPage() {
  const portfolioProjects = await getProjects();
  return (
    <div className="pageLayout">
      <LeftSidebar />
      <PortfolioSection items={portfolioProjects} />
    </div>
  );
}
