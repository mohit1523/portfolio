import LeftSidebar from '@/components/LeftSideNavMap';
import ResumeSection from '@/components/ResumeSection';
import { getResumeEntries } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata(
    'Resume',
    'Experience and education focused on full stack development, product delivery, and engineering ownership.',
    '/resume'
  );
}

export default async function ResumePage() {
  const resumeEntries = await getResumeEntries();
  return (
    <div className="pageLayout">
      <LeftSidebar />
      <ResumeSection entries={resumeEntries} />
    </div>
  );
}
