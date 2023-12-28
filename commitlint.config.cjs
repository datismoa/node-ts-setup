module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'always'],
    'body-max-line-length': [0, 'always'],
    'body-leading-blank': [2, 'always'],
    'footer-max-line-length': [0, 'always'],
    'footer-leading-blank': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'dx',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'release',
        'style',
        'test',
        'type',
        'types',
        'workflow',
      ]
    ]
  }
}