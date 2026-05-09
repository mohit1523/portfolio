'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  getContactContent,
  getNextId,
  getProjects,
  getResumeEntries,
  getTestimonials,
  saveContactContent,
  saveProjects,
  saveResumeEntries,
  saveTestimonials,
} from '@/lib/content';
import { clearAdminSession, createAdminSession, getAdminCredentials, requireAdminSession } from '@/lib/auth';
import {
  contactContentFileSchema,
  contactContentSchema,
  portfolioProjectFileSchema,
  portfolioProjectSchema,
  resumeEntryFileSchema,
  resumeEntrySchema,
  testimonialFileSchema,
  testimonialSchema,
} from '@/lib/schemas';

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function revalidatePublicPages() {
  revalidatePath('/portfolio');
  revalidatePath('/resume');
  revalidatePath('/testimonials');
  revalidatePath('/contact');
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');
  const creds = getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    redirect('/admin/login?error=invalid');
  }

  await createAdminSession(username);
  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createProjectAction(formData: FormData) {
  await requireAdminSession();
  const projects = await getProjects();
  const title = String(formData.get('title') || '');

  const parsed = portfolioProjectSchema.parse({
    title,
    slug: slugify(String(formData.get('slug') || title)),
    category: formData.get('category'),
    featured: formData.get('featured') === 'on',
    summary: formData.get('summary'),
    problem: formData.get('problem'),
    approach: formData.get('approach'),
    result: formData.get('result'),
    techStack: formData.get('techStack'),
    metrics: formData.get('metrics'),
    githubUrl: formData.get('githubUrl'),
    liveUrl: formData.get('liveUrl'),
    sortOrder: formData.get('sortOrder'),
  });

  const nextProject = portfolioProjectFileSchema.parse({
    id: getNextId(projects),
    ...parsed,
  });

  await saveProjects([...projects, nextProject]);
  revalidatePublicPages();
  revalidatePath('/admin/projects');
}

export async function updateProjectAction(formData: FormData) {
  await requireAdminSession();
  const projects = await getProjects();
  const id = Number(formData.get('id'));
  const current = projects.find((item) => item.id === id);
  if (!current) {
    throw new Error(`Project ${id} not found`);
  }

  const title = String(formData.get('title') || '');
  const parsed = portfolioProjectSchema.parse({
    title,
    slug: slugify(String(formData.get('slug') || title)),
    category: formData.get('category'),
    featured: formData.get('featured') === 'on',
    summary: formData.get('summary'),
    problem: formData.get('problem'),
    approach: formData.get('approach'),
    result: formData.get('result'),
    techStack: formData.get('techStack'),
    metrics: formData.get('metrics'),
    githubUrl: formData.get('githubUrl'),
    liveUrl: formData.get('liveUrl'),
    sortOrder: formData.get('sortOrder'),
  });

  const updated = projects.map((item) =>
    item.id === id
      ? portfolioProjectFileSchema.parse({
          id,
          ...parsed,
        })
      : item
  );

  await saveProjects(updated);
  revalidatePublicPages();
  revalidatePath('/admin/projects');
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get('id'));
  const projects = await getProjects();
  await saveProjects(projects.filter((item) => item.id !== id));
  revalidatePublicPages();
  revalidatePath('/admin/projects');
}

export async function createResumeEntryAction(formData: FormData) {
  await requireAdminSession();
  const entries = await getResumeEntries();
  const parsed = resumeEntrySchema.parse({
    type: formData.get('type'),
    yearLabel: formData.get('yearLabel'),
    title: formData.get('title'),
    organization: formData.get('organization'),
    description: formData.get('description'),
    impact: formData.get('impact'),
    sortOrder: formData.get('sortOrder'),
  });

  const nextEntry = resumeEntryFileSchema.parse({
    id: getNextId(entries),
    ...parsed,
  });

  await saveResumeEntries([...entries, nextEntry]);
  revalidatePublicPages();
  revalidatePath('/admin/resume');
}

export async function updateResumeEntryAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get('id'));
  const entries = await getResumeEntries();
  const parsed = resumeEntrySchema.parse({
    type: formData.get('type'),
    yearLabel: formData.get('yearLabel'),
    title: formData.get('title'),
    organization: formData.get('organization'),
    description: formData.get('description'),
    impact: formData.get('impact'),
    sortOrder: formData.get('sortOrder'),
  });

  const updated = entries.map((item) =>
    item.id === id ? resumeEntryFileSchema.parse({ id, ...parsed }) : item
  );

  await saveResumeEntries(updated);
  revalidatePublicPages();
  revalidatePath('/admin/resume');
}

export async function deleteResumeEntryAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get('id'));
  const entries = await getResumeEntries();
  await saveResumeEntries(entries.filter((item) => item.id !== id));
  revalidatePublicPages();
  revalidatePath('/admin/resume');
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdminSession();
  const testimonials = await getTestimonials();
  const parsed = testimonialSchema.parse({
    name: formData.get('name'),
    role: formData.get('role'),
    company: formData.get('company'),
    quote: formData.get('quote'),
    rating: formData.get('rating'),
    sortOrder: formData.get('sortOrder'),
  });

  const nextTestimonial = testimonialFileSchema.parse({
    id: getNextId(testimonials),
    ...parsed,
  });

  await saveTestimonials([...testimonials, nextTestimonial]);
  revalidatePublicPages();
  revalidatePath('/admin/testimonials');
}

export async function updateTestimonialAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get('id'));
  const testimonials = await getTestimonials();
  const current = testimonials.find((item) => item.id === id);
  if (!current) {
    throw new Error(`Testimonial ${id} not found`);
  }

  const parsed = testimonialSchema.parse({
    name: formData.get('name'),
    role: formData.get('role'),
    company: formData.get('company'),
    quote: formData.get('quote'),
    rating: formData.get('rating'),
    sortOrder: formData.get('sortOrder'),
  });

  const updated = testimonials.map((item) =>
    item.id === id
      ? testimonialFileSchema.parse({
          id,
          ...parsed,
        })
      : item
  );

  await saveTestimonials(updated);
  revalidatePublicPages();
  revalidatePath('/admin/testimonials');
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get('id'));
  const testimonials = await getTestimonials();
  await saveTestimonials(testimonials.filter((item) => item.id !== id));
  revalidatePublicPages();
  revalidatePath('/admin/testimonials');
}

export async function updateContactAction(formData: FormData) {
  await requireAdminSession();
  const current = await getContactContent();
  const parsed = contactContentSchema.parse({
    heading: formData.get('heading'),
    headingHighlight: formData.get('headingHighlight'),
    intro: formData.get('intro'),
    primaryEmail: formData.get('primaryEmail'),
    primaryPhone: formData.get('primaryPhone'),
    linkedinUrl: formData.get('linkedinUrl'),
    githubUrl: formData.get('githubUrl'),
    footerTitle: formData.get('footerTitle'),
    contactCtaLabel: formData.get('contactCtaLabel'),
    contactCtaLink: formData.get('contactCtaLink'),
  });

  await saveContactContent(contactContentFileSchema.parse({ ...current, ...parsed }));
  revalidatePublicPages();
  revalidatePath('/admin/contact');
}
