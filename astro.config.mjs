// @ts-check
import { defineConfig } from 'astro/config';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const site = process.env.PUBLIC_SITE_URL ?? 'https://norbick.github.io';
const base =
	process.env.PUBLIC_BASE_PATH ??
	(process.env.GITHUB_ACTIONS === 'true' && repoName ? `/${repoName}` : '/');

export default defineConfig({
	site,
	base,
});
