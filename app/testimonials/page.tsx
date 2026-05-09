import LeftSidebar from '@/components/LeftSideNavMap';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getTestimonials } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata(
    'Testimonials',
    'Client and stakeholder feedback on delivery quality, ownership, and engineering execution.',
    '/testimonials'
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div className="pageLayout">
      <LeftSidebar />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
