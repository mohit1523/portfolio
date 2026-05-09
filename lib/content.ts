import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import {
  contactContentFileSchema,
  portfolioProjectFileSchema,
  resumeEntryFileSchema,
  testimonialFileSchema,
} from './schemas';

const contentDir = path.join(process.cwd(), 'content');

export type PortfolioProject = z.infer<typeof portfolioProjectFileSchema>;
export type ResumeEntry = z.infer<typeof resumeEntryFileSchema>;
export type Testimonial = z.infer<typeof testimonialFileSchema>;
export type ContactContent = z.infer<typeof contactContentFileSchema>;
export type PortfolioProjectView = PortfolioProject & {
  techStackList: string[];
  metricsList: string[];
};

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toProjectView(project: PortfolioProject): PortfolioProjectView {
  return {
    ...project,
    techStackList: splitLines(project.techStack),
    metricsList: splitLines(project.metrics),
  };
}

async function ensureContentDir() {
  await mkdir(contentDir, { recursive: true });
}

async function readJsonFile<T>(fileName: string, schema: z.ZodSchema<T>): Promise<T> {
  await ensureContentDir();
  const filePath = path.join(contentDir, fileName);
  const raw = await readFile(filePath, 'utf8');
  return schema.parse(JSON.parse(raw));
}

async function writeJsonFile<T>(fileName: string, schema: z.ZodSchema<T>, value: T) {
  await ensureContentDir();
  const filePath = path.join(contentDir, fileName);
  const parsed = schema.parse(value);
  await writeFile(filePath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
}

export async function getProjects() {
  const data = await readJsonFile(
    'projects.json',
    z.array(portfolioProjectFileSchema)
  );
  return data
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toProjectView);
}

export async function saveProjects(projects: PortfolioProject[]) {
  await writeJsonFile('projects.json', z.array(portfolioProjectFileSchema), projects);
}

export async function getResumeEntries() {
  const data = await readJsonFile(
    'resume.json',
    z.array(resumeEntryFileSchema)
  );
  return data.sort((a, b) => {
    if (a.type === b.type) {
      return a.sortOrder - b.sortOrder;
    }
    return a.type.localeCompare(b.type);
  });
}

export async function saveResumeEntries(entries: ResumeEntry[]) {
  await writeJsonFile('resume.json', z.array(resumeEntryFileSchema), entries);
}

export async function getTestimonials() {
  const data = await readJsonFile(
    'testimonials.json',
    z.array(testimonialFileSchema)
  );
  return data.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveTestimonials(testimonials: Testimonial[]) {
  await writeJsonFile(
    'testimonials.json',
    z.array(testimonialFileSchema),
    testimonials
  );
}

export async function getContactContent() {
  return readJsonFile('contact.json', contactContentFileSchema);
}

export async function saveContactContent(contact: ContactContent) {
  await writeJsonFile('contact.json', contactContentFileSchema, contact);
}

export function getNextId(items: Array<{ id: number }>) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}
