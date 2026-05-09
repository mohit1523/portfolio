import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import type { ContactContent } from '@/lib/content';
import MotionReveal from './MotionReveal';

type ContactSectionProps = {
  contact: ContactContent;
};

function renderContactLine(value: string) {
  if (value.includes('@')) {
    return <a href={`mailto:${value}`}>{value}</a>;
  }

  if (value.startsWith('+')) {
    return <a href={`tel:${value}`}>{value}</a>;
  }

  return value;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section className="contactContainer" id="contact">
      <div className="contactHeader">
        <h1>CONTACT</h1>
      </div>

      <MotionReveal>
        <div className="contactIntro">
          <h2>
            {contact.heading} <span>{contact.headingHighlight}</span>
          </h2>

          <p>{contact.intro}</p>
        </div>
      </MotionReveal>

      <div className="contactInfo">
        <MotionReveal>
          <div className="contactItem">
            <Mail size={50} />
            <div>
              <p>{renderContactLine(contact.primaryEmail)}</p>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <div className="contactItem">
            <Phone size={50} />
            <div>
              <p>{renderContactLine(contact.primaryPhone)}</p>
            </div>
          </div>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.08}>
        <div className="contactSocialRow">
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="contactSocialLink"
          >
            LinkedIn
          </a>
          <a
            href={contact.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="contactSocialLink"
          >
            GitHub
          </a>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="contactFooter">
          <h3>{contact.footerTitle}</h3>
          <Link href={contact.contactCtaLink} className="contactCta">
            {contact.contactCtaLabel}
          </Link>
        </div>
      </MotionReveal>
    </section>
  );
}
