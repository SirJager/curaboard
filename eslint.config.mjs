import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import {defineConfig, globalIgnores} from "eslint/config";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	{
		name: "custom-rules",
		rules: {
			"@typescript-eslint/triple-slash-reference": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"prefer-spread": "off",
			"no-case-declarations": "off",
			"no-console": "off",
			"@typescript-eslint/consistent-type-imports": "warn",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			quotes: ["error", "double"],
			"react/no-unknown-property": [0],
			"no-unused-vars": [
				1,
				{
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"linebreak-style": ["error", "unix"],
			"require-jsdoc": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},

	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
