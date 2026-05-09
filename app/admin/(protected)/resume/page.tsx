import { getResumeEntries } from '@/lib/content';
import {
  createResumeEntryAction,
  deleteResumeEntryAction,
  updateResumeEntryAction,
} from '../../actions';
import AdminCollapsibleCard from '@/components/AdminCollapsibleCard';

export default async function AdminResumePage() {
  const resumeEntries = await getResumeEntries();

  return (
    <section className="adminPage">
      <div className="adminPanelHeader">
        <p className="adminEyebrow">Resume</p>
        <h1>Resume entries</h1>
        <p>Control both education and experience content with recruiter-ready descriptions and impact statements.</p>
      </div>

      <div className="adminStack">
        {resumeEntries.map((entry) => (
          <AdminCollapsibleCard
            key={entry.id}
            title={entry.title}
            meta={`${entry.type.toUpperCase()} | ${entry.yearLabel}`}
          >
            <form action={updateResumeEntryAction} className="adminForm adminCard adminEmbeddedCard">
              <input type="hidden" name="id" value={entry.id} />
              <div className="adminFormGrid">
                <label>
                  Type
                  <select name="type" defaultValue={entry.type}>
                    <option value="education">Education</option>
                    <option value="experience">Experience</option>
                  </select>
                </label>
                <label>
                  Year label
                  <input name="yearLabel" defaultValue={entry.yearLabel} required />
                </label>
                <label>
                  Title
                  <input name="title" defaultValue={entry.title} required />
                </label>
                <label>
                  Organization
                  <input name="organization" defaultValue={entry.organization} required />
                </label>
                <label>
                  Sort order
                  <input name="sortOrder" type="number" defaultValue={entry.sortOrder} required />
                </label>
              </div>

              <label>
                Description
                <textarea name="description" rows={4} defaultValue={entry.description} required />
              </label>
              <label>
                Impact
                <textarea name="impact" rows={3} defaultValue={entry.impact} required />
              </label>

              <div className="adminButtonRow">
                <button type="submit" className="adminButton">
                  Update entry
                </button>
                <button formAction={deleteResumeEntryAction} type="submit" className="adminDangerButton">
                  Delete
                </button>
              </div>
            </form>
          </AdminCollapsibleCard>
        ))}
      </div>

      <form action={createResumeEntryAction} className="adminForm adminCard">
        <h2>Add entry</h2>
        <div className="adminFormGrid">
          <label>
            Type
            <select name="type" defaultValue="experience">
              <option value="education">Education</option>
              <option value="experience">Experience</option>
            </select>
          </label>
          <label>
            Year label
            <input name="yearLabel" required />
          </label>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Organization
            <input name="organization" required />
          </label>
          <label>
            Sort order
            <input name="sortOrder" type="number" defaultValue={0} required />
          </label>
        </div>
        <label>
          Description
          <textarea name="description" rows={4} required />
        </label>
        <label>
          Impact
          <textarea name="impact" rows={3} required />
        </label>
        <button type="submit" className="adminButton">
          Add entry
        </button>
      </form>
    </section>
  );
}
