module.exports = {
  parser: 'babel-eslint',
  env: {
		browser: true,
		node: true,
	},
  extends: 'airbnb',
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'no-console': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off'
  }
};
