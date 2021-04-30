module.exports = {
	root: true,
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-const-assign': 'error',
		'spaced-comment': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		],
		'prettier/prettier': 'error'
	},
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true
	},
	extends: ['plugin:prettier/recommended'],
	plugins: ['prettier']
}
