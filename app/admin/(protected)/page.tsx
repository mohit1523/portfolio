import Link from 'next/link';
import {
  getContactContent,
  getProjects,
  getResumeEntries,
  getTestimonials,
} from '@/lib/content';

export default async function AdminOverviewPage() {
  const [projects, resumeEntries, testimonials, contact] = await Promise.all([
    getProjects(),
    getResumeEntries(),
    getTestimonials(),
    getContactContent(),
  ]);
  const educationCount = resumeEntries.filter((item) => item.type === 'education').length;
  const experienceCount = resumeEntries.filter((item) => item.type === 'experience').length;

  return (
    <section className="adminPage">
      <div className="adminPanelHeader">
        <p className="adminEyebrow">Overview</p>
        <h1>Manage your portfolio like a product</h1>
        <p>
          Update every recruiter-facing section without touching the public layout, then keep improving content quality over time.
        </p>
      </div>

      <div className="adminStatsGrid">
        <div className="adminStatCard">
          <span>Projects</span>
          <strong>{projects.length}</strong>
        </div>
        <div className="adminStatCard">
          <span>Featured Projects</span>
          <strong>{projects.filter((item) => item.featured).length}</strong>
        </div>
        <div className="adminStatCard">
          <span>Education Entries</span>
          <strong>{educationCount}</strong>
        </div>
        <div className="adminStatCard">
          <span>Experience Entries</span>
          <strong>{experienceCount}</strong>
        </div>
        <div className="adminStatCard">
          <span>Testimonials</span>
          <strong>{testimonials.length}</strong>
        </div>
        <div className="adminStatCard">
          <span>Contact CTA</span>
          <strong>{contact.contactCtaLabel}</strong>
        </div>
      </div>

      <div className="adminCardGrid">
        {[
          ['Resume', '/admin/resume', 'Manage education and experience entries.'],
          ['Projects', '/admin/projects', 'Control featured work, stack, metrics, and links.'],
          ['Testimonials', '/admin/testimonials', 'Refresh social proof and ratings.'],
          ['Contact', '/admin/contact', 'Strengthen availability and conversion messaging.'],
        ].map(([title, href, copy]) => (
          <Link key={href} href={href} className="adminActionCard">
            <h3>{title}</h3>
            <p>{copy}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
