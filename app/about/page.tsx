import LeftSidebar from '@/components/LeftSideNavMap';
import AboutSection from '@/components/AboutSection';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata(
    'About',
    'Learn about Mohit Patel, a full stack developer focused on performance, product quality, and end-to-end delivery.',
    '/about'
  );
}

export default async function AboutPage() {
  return (
    <div className="pageLayout">
      <LeftSidebar />
      <AboutSection />
    </div>
  );
}
