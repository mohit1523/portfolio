import { getTestimonials } from '@/lib/content';
import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
} from '../../actions';
import AdminCollapsibleCard from '@/components/AdminCollapsibleCard';

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="adminPage">
      <div className="adminPanelHeader">
        <p className="adminEyebrow">Testimonials</p>
        <h1>Testimonials</h1>
        <p>Keep social proof current with strong quotes, clear roles, and optional image uploads.</p>
      </div>

      <div className="adminStack">
        {testimonials.map((testimonial) => (
          <AdminCollapsibleCard
            key={testimonial.id}
            title={testimonial.name}
            meta={`${testimonial.role} | ${testimonial.company}`}
          >
            <form action={updateTestimonialAction} className="adminForm adminCard adminEmbeddedCard">
              <input type="hidden" name="id" value={testimonial.id} />
              <div className="adminFormGrid">
                <label>
                  Name
                  <input name="name" defaultValue={testimonial.name} required />
                </label>
                <label>
                  Role
                  <input name="role" defaultValue={testimonial.role} required />
                </label>
                <label>
                  Company
                  <input name="company" defaultValue={testimonial.company} required />
                </label>
                <label>
                  Rating
                  <input name="rating" type="number" min={1} max={5} defaultValue={testimonial.rating} required />
                </label>
                <label>
                  Sort order
                  <input name="sortOrder" type="number" defaultValue={testimonial.sortOrder} required />
                </label>
              </div>

              <label>
                Quote
                <textarea name="quote" rows={4} defaultValue={testimonial.quote} required />
              </label>

              <div className="adminButtonRow">
                <button type="submit" className="adminButton">
                  Update testimonial
                </button>
                <button formAction={deleteTestimonialAction} type="submit" className="adminDangerButton">
                  Delete
                </button>
              </div>
            </form>
          </AdminCollapsibleCard>
        ))}
      </div>

      <form action={createTestimonialAction} className="adminForm adminCard">
        <h2>Add testimonial</h2>
        <div className="adminFormGrid">
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Role
            <input name="role" required />
          </label>
          <label>
            Company
            <input name="company" required />
          </label>
          <label>
            Rating
            <input name="rating" type="number" min={1} max={5} defaultValue={5} required />
          </label>
          <label>
            Sort order
            <input name="sortOrder" type="number" defaultValue={0} required />
          </label>
        </div>
        <label>
          Quote
          <textarea name="quote" rows={4} required />
        </label>
        <button type="submit" className="adminButton">
          Add testimonial
        </button>
      </form>
    </section>
  );
}
