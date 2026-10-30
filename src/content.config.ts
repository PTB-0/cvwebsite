import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const copy = z.object({
  summary: z.string(),
  role: z.string(),
  built: z.string(),
  figure: z.string(),
  linksNote: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number().int(),
    name: z.string(),
    diagram: z.enum(["dloudos", "prompt-router", "secretfix"]),
    tags: z.array(z.string()),
    stack: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
    en: copy,
    tr: copy.optional(),
  }),
});

export const collections = { projects };
