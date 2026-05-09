import { getContactContent } from '@/lib/content';
import { updateContactAction } from '../../actions';

export default async function AdminContactPage() {
  const contact = await getContactContent();

  return (
    <section className="adminPage">
      <div className="adminPanelHeader">
        <p className="adminEyebrow">Contact</p>
        <h1>Contact section</h1>
        <p>Make the contact experience more direct, role-oriented, and action-driven without moving the section around.</p>
      </div>

      <form action={updateContactAction} className="adminForm adminCard">
        <div className="adminFormGrid">
          <label>
            Heading
            <input name="heading" defaultValue={contact.heading} required />
          </label>
          <label>
            Heading highlight
            <input name="headingHighlight" defaultValue={contact.headingHighlight} required />
          </label>
          <label>
            Primary email
            <input name="primaryEmail" defaultValue={contact.primaryEmail} required />
          </label>
          <label>
            Primary phone
            <input name="primaryPhone" defaultValue={contact.primaryPhone} required />
          </label>
          <label>
            LinkedIn URL
            <input name="linkedinUrl" defaultValue={contact.linkedinUrl} required />
          </label>
          <label>
            GitHub URL
            <input name="githubUrl" defaultValue={contact.githubUrl} required />
          </label>
          <label>
            Footer title
            <input name="footerTitle" defaultValue={contact.footerTitle} required />
          </label>
          <label>
            CTA label
            <input name="contactCtaLabel" defaultValue={contact.contactCtaLabel} required />
          </label>
          <label>
            CTA link
            <input name="contactCtaLink" defaultValue={contact.contactCtaLink} required />
          </label>
        </div>

        <label>
          Intro
          <textarea name="intro" rows={4} defaultValue={contact.intro} required />
        </label>

        <button type="submit" className="adminButton">
          Save contact section
        </button>
      </form>
    </section>
  );
}
