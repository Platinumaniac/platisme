import z from "zod/v4";

export const stuffPageDataSchema = z.object({
	iconPath: z.string(),
	id: z.string(),
});

export type StuffPageData = z.infer<typeof stuffPageDataSchema>;

export const projectTagSchema = z.object({
	id: z.string(),
});

export type ProjectTag = z.infer<typeof projectTagSchema>;

export const projectEntrySchema = z.object({
	id: z.string(),
	title: z.string(),
	tags: z.array(projectTagSchema),
});

export type ProjectEntry = z.infer<typeof projectEntrySchema>;

export function getDefaultProjectEntry(): ProjectEntry {
	return projectEntrySchema.parse({
		id: "",
		title: "",
		tags: []
	});
}
