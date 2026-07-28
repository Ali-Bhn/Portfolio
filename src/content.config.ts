import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      description: z.string(),
      coverImage: image(),
      coverImageAlt: z.string(),
      screenshots: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      technologies: z.array(z.string()),
      liveUrl: z.string().url().optional(),
      githubUrl: z.string().url().optional(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.string(),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
      status: z.enum(["completed", "in-progress", "planned"]),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().optional(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
