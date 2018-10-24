module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  rules: { // to reduce..
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'func-names': 'off',
    'prefer-destructuring': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-self-compare': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'no-self-compare': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'react/no-string-refs': 'off',
    'react/no-string-refs': 'off',
    'react/self-closing-comp': 'off',
    'react/no-unused-state': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': [
      'error', {
        handlers: [
          'onClick',
        ],
      }
    ],
  }
};
