import type { ResumeEntry } from '@/lib/content';
import MotionReveal from './MotionReveal';

type ResumeSectionProps = {
  entries: ResumeEntry[];
};

export default function ResumeSection({ entries }: ResumeSectionProps) {
  const education = entries.filter((item) => item.type === 'education');
  const experience = entries.filter((item) => item.type === 'experience');

  return (
    <section className="resumeContainer" id="resume">
      <div className="resumeHeader">
        <h1>RESUME</h1>
      </div>

      <div className="resumeBlock">
        <h2>EDUCATION</h2>

        <div className="resumeGrid">
          {education.map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.05}>
              <div className="resumeCard">
                <span className="badge">{item.yearLabel}</span>
                <h3>{item.title}</h3>
                <h4>{item.organization}</h4>
                <p>{item.description}</p>
                <p className="resumeImpact">{item.impact}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>

      <div className="resumeBlock">
        <h2>EXPERIENCE</h2>

        <div className="resumeGrid">
          {experience.map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.05}>
              <div className="resumeCard">
                <span className="badge">{item.yearLabel}</span>
                <h3>{item.title}</h3>
                <h4>{item.organization}</h4>
                <p>{item.description}</p>
                <p className="resumeImpact">{item.impact}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
