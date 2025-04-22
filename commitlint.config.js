module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'update', 'fix', 'refactor', 'optimize', 'style', 'docs', 'chore', 'release',
    ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [2, 'always', ['pascal-case']],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'body-max-line-length': [0],
  },
};
