import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    role: z.string(),
    status: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(1),
    category: z.string().default('Systems & Automation'),
    // Areas for the section filters (a project can be in several).
    areas: z.array(z.enum(['security', 'linux', 'backend', 'web'])).min(1),
    problemSolved: z.string(),
    architectureHighlights: z.array(z.string()),
    keyLearnings: z.array(z.string()),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()),
    order: z.number().default(1),
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
};
