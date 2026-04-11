import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', 'node_modules/**', '.astro/**'],
	},
	...astro.configs['flat/recommended'],
	{
		files: ['*.astro', '**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tsParser,
			},
		},
	},
	{
		...js.configs.recommended,
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			...js.configs.recommended.languageOptions,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.astro', '**/*.astro/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
];
