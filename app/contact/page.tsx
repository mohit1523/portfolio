import LeftSidebar from '@/components/LeftSideNavMap';
import ContactSection from '@/components/ContactSection';
import { getContactContent } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return buildMetadata(
    'Contact',
    'Open to software engineering roles, freelance collaborations, and product-focused development conversations.',
    '/contact'
  );
}

export default async function ContactPage() {
  const contact = await getContactContent();
  return (
    <div className="pageLayout">
      <LeftSidebar />
      <ContactSection contact={contact} />
    </div>
  );
}
