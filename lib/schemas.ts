import { z } from 'zod';

const categorySchema = z.enum(['all', 'graphic', 'web', 'photo']).catch('web');

export const resumeEntrySchema = z.object({
  type: z.enum(['education', 'experience']),
  yearLabel: z.string().min(2),
  title: z.string().min(2),
  organization: z.string().min(2),
  description: z.string().min(20),
  impact: z.string().min(10),
  sortOrder: z.coerce.number().int().min(0),
});

export const portfolioProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  category: categorySchema,
  featured: z.boolean(),
  summary: z.string().min(20),
  problem: z.string().min(20),
  approach: z.string().min(20),
  result: z.string().min(10),
  techStack: z.string().min(2),
  metrics: z.string().min(2),
  githubUrl: z.string().min(1),
  liveUrl: z.string().min(1),
  sortOrder: z.coerce.number().int().min(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  company: z.string().min(2),
  quote: z.string().min(10),
  rating: z.coerce.number().int().min(1).max(5),
  sortOrder: z.coerce.number().int().min(0),
});

export const contactContentSchema = z.object({
  heading: z.string().min(2),
  headingHighlight: z.string().min(2),
  intro: z.string().min(20),
  primaryEmail: z.string().min(3),
  primaryPhone: z.string().min(3),
  linkedinUrl: z.string().min(3),
  githubUrl: z.string().min(3),
  footerTitle: z.string().min(3),
  contactCtaLabel: z.string().min(2),
  contactCtaLink: z.string().min(1),
});

export const portfolioProjectFileSchema = portfolioProjectSchema.extend({
  id: z.number().int().nonnegative(),
});

export const resumeEntryFileSchema = resumeEntrySchema.extend({
  id: z.number().int().nonnegative(),
});

export const testimonialFileSchema = testimonialSchema.extend({
  id: z.number().int().nonnegative(),
});

export const contactContentFileSchema = contactContentSchema;
