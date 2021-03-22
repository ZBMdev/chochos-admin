module.exports = {
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
	],
	rules: {
		// "@typescript-eslint/interface-name-prefix": ["error", "always"]
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/camelcase": 0
	}
}
