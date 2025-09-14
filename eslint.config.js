import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
	js.configs.recommended,
	prettier,
	{
		files: ['src/**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				console: 'readonly',
				window: 'readonly',
				document: 'readonly',
				FileReader: 'readonly',
			},
		},
		rules: {
			'no-alert': 'warn',
			indent: ['error', 'tab'],
		},
	},
	{
		files: ['src/**/*.pug'],
	},
];
