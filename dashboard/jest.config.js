module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
  testMatch: ['**/tests/unit/**/*.(spec|steps).[jt]s?(x)', '**/__tests__/*?steps.[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/?!(vue-datepicker-local | vue-spinner)'],
  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};
