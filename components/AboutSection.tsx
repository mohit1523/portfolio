import { Gauge, Laptop, Sparkles } from 'lucide-react';
import MotionReveal from './MotionReveal';
import { aboutContent, aboutServices, aboutStats } from '@/lib/authored-content';

const iconMap = {
  Gauge,
  Laptop,
  Sparkles,
};

export default function AboutSection() {
  return (
    <section className="aboutContainer" id="about-me">
      <div className="aboutHeader">
        <h1>ABOUT ME</h1>
      </div>

      <MotionReveal>
        <div className="aboutIntro">
          <h2>
            {aboutContent.headingPrefix} <span>{aboutContent.headingHighlight}</span>, Full Stack Developer
          </h2>

          <p>{aboutContent.intro}</p>
          <p className="aboutCurrent">{aboutContent.currentlyWorkingOn}</p>
        </div>
      </MotionReveal>

      <div className="aboutContent">
        <MotionReveal className="statsBox">
          {aboutStats.map((item) => (
            <div key={item.id}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </MotionReveal>

        <div className="services">
          <MotionReveal>
            <h3>What I Bring</h3>
          </MotionReveal>

          {aboutServices.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Laptop;
            return (
              <MotionReveal key={service.id} delay={index * 0.05}>
                <div className="serviceItem">
                  <div className="icon">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
