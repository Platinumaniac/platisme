import { createContext } from "@lit/context";
import type { BlogTagDB } from "../../blog_tags"

export type BlogData = {
	tagDB: BlogTagDB;
	publicEntries: string[];
}

export const blogContext = createContext<BlogData>(Symbol("blogData"));