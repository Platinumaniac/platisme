import z from "zod/v4";

export const StuffPageDataSchema = z.object({
	iconPath: z.string(),
	id: z.string(),
});

export type StuffPageData = z.infer<typeof StuffPageDataSchema>;
