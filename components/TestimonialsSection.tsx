import type { Testimonial } from '@/lib/content';
import MotionReveal from './MotionReveal';

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="testimonialsContainer" id="testimonials">
      <div className="testimonialsHeader">
        <h1>TESTIMONIALS</h1>
      </div>

      <div className="testimonialsGrid">
        {testimonials.map((item, i) => (
          <MotionReveal key={item.id} delay={i * 0.05}>
            <article className="testimonialCard testimonialTextCard">
              <div className="testimonialContent testimonialContentFull">
                <h3>{item.name}</h3>
                <span>
                  {item.role} | {item.company}
                </span>
                <p>{item.quote}</p>
                <div className="stars">{'★'.repeat(item.rating)}</div>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
