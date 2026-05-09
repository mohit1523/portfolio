import Image from 'next/image';
import Link from 'next/link';
import HeroImg from '../assets/images/Hero.png';
import MotionReveal from './MotionReveal';
import { heroContent } from '@/lib/authored-content';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="heroLeft">
        <MotionReveal>
          <h4 className="subtitle">{heroContent.greeting}</h4>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <h1 className="title">
            {heroContent.titlePrefix} <span>{heroContent.titleHighlight}</span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <div className="badge">{heroContent.roleBadge}</div>
        </MotionReveal>

        <MotionReveal delay={0.15}>
          <p className="desc">{heroContent.description}</p>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <p className="heroMeta">{heroContent.availabilityText}</p>
        </MotionReveal>

        <MotionReveal delay={0.25}>
          <div className="cta-btns">
            <Link className="cta" href={heroContent.primaryCtaLink}>
              {heroContent.primaryCtaLabel}
            </Link>
            <Link className="cta" href={heroContent.secondaryCtaLink}>
              {heroContent.secondaryCtaLabel}
            </Link>
            <Link className="cta" href={heroContent.tertiaryCtaLink}>
              {heroContent.tertiaryCtaLabel}
            </Link>
          </div>
        </MotionReveal>
      </div>

      <div className="heroRight">
        <Image
          src={HeroImg}
          alt={heroContent.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="heroImg"
        />
      </div>
    </section>
  );
}
