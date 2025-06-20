import { BlogEntry } from "../../blog";


class TestEntry extends BlogEntry {
	constructor() {
		super("THIS IS A TEST BLOG", "/test");
	}
}

export default new TestEntry();