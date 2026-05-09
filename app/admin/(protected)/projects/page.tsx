import { getProjects } from '@/lib/content';
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from '../../actions';
import AdminCollapsibleCard from '@/components/AdminCollapsibleCard';

export default async function AdminProjectsPage() {
  const portfolioProjects = await getProjects();

  return (
    <section className="adminPage">
      <div className="adminPanelHeader">
        <p className="adminEyebrow">Projects</p>
        <h1>Portfolio projects</h1>
        <p>Manage filter category, featured logic, recruiter-facing copy, links, stack, metrics, and imagery.</p>
      </div>

      <div className="adminStack">
        {portfolioProjects.map((project) => (
          <AdminCollapsibleCard
            key={project.id}
            title={project.title}
            meta={project.category.toUpperCase()}
            badge={project.featured ? 'FEATURED' : undefined}
          >
            <form action={updateProjectAction} className="adminForm adminCard adminEmbeddedCard">
              <input type="hidden" name="id" value={project.id} />
              <div className="adminFormGrid">
                <label>
                  Title
                  <input name="title" defaultValue={project.title} required />
                </label>
                <label>
                  Slug
                  <input name="slug" defaultValue={project.slug} required />
                </label>
                <label>
                  Category
                  <select name="category" defaultValue={project.category}>
                    <option value="web">Web</option>
                    <option value="graphic">Graphic</option>
                    <option value="photo">Photo</option>
                    <option value="all">All</option>
                  </select>
                </label>
                <label>
                  Sort order
                  <input name="sortOrder" type="number" defaultValue={project.sortOrder} required />
                </label>
                <label>
                  GitHub URL
                  <input name="githubUrl" defaultValue={project.githubUrl} required />
                </label>
                <label>
                  Live URL
                  <input name="liveUrl" defaultValue={project.liveUrl} required />
                </label>
              </div>

              <label className="adminCheckbox">
                <input type="checkbox" name="featured" defaultChecked={project.featured} />
                Featured project
              </label>

              <label>
                Summary
                <textarea name="summary" rows={3} defaultValue={project.summary} required />
              </label>
              <label>
                Problem
                <textarea name="problem" rows={4} defaultValue={project.problem} required />
              </label>
              <label>
                Approach
                <textarea name="approach" rows={4} defaultValue={project.approach} required />
              </label>
              <label>
                Result
                <textarea name="result" rows={3} defaultValue={project.result} required />
              </label>
              <label>
                Tech stack
                <textarea name="techStack" rows={4} defaultValue={project.techStack} required />
              </label>
              <label>
                Metrics or signals
                <textarea name="metrics" rows={4} defaultValue={project.metrics} required />
              </label>

              <div className="adminButtonRow">
                <button type="submit" className="adminButton">
                  Update project
                </button>
                <button formAction={deleteProjectAction} type="submit" className="adminDangerButton">
                  Delete
                </button>
              </div>
            </form>
          </AdminCollapsibleCard>
        ))}
      </div>

      <form action={createProjectAction} className="adminForm adminCard">
        <h2>Add project</h2>
        <div className="adminFormGrid">
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Slug
            <input name="slug" />
          </label>
          <label>
            Category
            <select name="category" defaultValue="web">
              <option value="web">Web</option>
              <option value="graphic">Graphic</option>
              <option value="photo">Photo</option>
              <option value="all">All</option>
            </select>
          </label>
          <label>
            Sort order
            <input name="sortOrder" type="number" defaultValue={0} required />
          </label>
          <label>
            GitHub URL
            <input name="githubUrl" defaultValue="#" required />
          </label>
          <label>
            Live URL
            <input name="liveUrl" defaultValue="#" required />
          </label>
        </div>
        <label className="adminCheckbox">
          <input type="checkbox" name="featured" />
          Featured project
        </label>
        <label>
          Summary
          <textarea name="summary" rows={3} required />
        </label>
        <label>
          Problem
          <textarea name="problem" rows={4} required />
        </label>
        <label>
          Approach
          <textarea name="approach" rows={4} required />
        </label>
        <label>
          Result
          <textarea name="result" rows={3} required />
        </label>
        <label>
          Tech stack
          <textarea name="techStack" rows={4} required />
        </label>
        <label>
          Metrics or signals
          <textarea name="metrics" rows={4} required />
        </label>
        <button type="submit" className="adminButton">
          Add project
        </button>
      </form>
    </section>
  );
}
