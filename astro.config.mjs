// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL || 'https://nrbck.pl';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
	site,
	base,
});
