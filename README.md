# thaw-repl
A generic read-evaluate-print loop. Written in TypeScript for Node.js.

Obligatory BadgeFest:

[![build status][build-status-badge-image]][build-status-url]
[![npm version][npm-version-badge-image]][npm-version-url]
[![latest tag][latest-tag-badge-image]][latest-tag-url]
[![npm total downloads][npm-total-downloads-badge-image]][npm-total-downloads-url]
[![watchers][watchers-badge-image]][watchers-url]
[![stars][stars-badge-image]][stars-url]
[![forks][forks-badge-image]][forks-url]
[![repo dependents][repo-dependents-badge-image]][repo-dependents-url]
[![pkg dependents][pkg-dependents-badge-image]][pkg-dependents-url]
[![commits][commits-badge-image]][commits-url]
[![last commit][last-commit-badge-image]][last-commit-url]
[![types][types-badge-image]][types-url]
[![install size][install-size-badge-image]][install-size-url]
[![known vulnerabilities][known-vulnerabilities-badge-image]][known-vulnerabilities-url]
[![lines of code][lines-of-code-badge-image]][lines-of-code-url]
[![technical debt][technical-debt-badge-image]][technical-debt-url]
[![maintainability][maintainability-badge-image]][maintainability-url]
[![test coverage][test-coverage-badge-image]][test-coverage-url]
[![tested with jest][jest-badge-image]][jest-url]
[![code style: prettier][prettier-badge-image]][prettier-url]
[![license][license-badge-image]][license-url]
[![FOSSA Status][fossa-badge-image]][fossa-badge-url]

<!-- [![dependents](https://badgen.net/npm/dependents/thaw-repl)](https://badgen.net/npm/dependents/thaw-repl) -->

[build-status-badge-image]: https://secure.travis-ci.org/tom-weatherhead/thaw-repl.svg
[build-status-url]: https://travis-ci.org/tom-weatherhead/thaw-repl
[npm-version-badge-image]: https://img.shields.io/npm/v/thaw-repl.svg
[npm-version-url]: https://www.npmjs.com/package/thaw-repl
[latest-tag-badge-image]: https://badgen.net/github/tag/tom-weatherhead/thaw-repl
[latest-tag-url]: https://github.com/tom-weatherhead/thaw-repl/tags
[npm-total-downloads-badge-image]: https://img.shields.io/npm/dt/thaw-repl.svg
[npm-total-downloads-url]: https://www.npmjs.com/package/thaw-repl
[watchers-badge-image]: https://badgen.net/github/watchers/tom-weatherhead/thaw-repl
[watchers-url]: https://github.com/tom-weatherhead/thaw-repl/watchers
[stars-badge-image]: https://badgen.net/github/stars/tom-weatherhead/thaw-repl
[stars-url]: https://github.com/tom-weatherhead/thaw-repl/stargazers
[forks-badge-image]: https://badgen.net/github/forks/tom-weatherhead/thaw-repl
[forks-url]: https://github.com/tom-weatherhead/thaw-repl/network/members
[repo-dependents-badge-image]: https://badgen.net/github/dependents-repo/tom-weatherhead/thaw-repl
[repo-dependents-url]: https://badgen.net/github/dependents-repo/tom-weatherhead/thaw-repl
[pkg-dependents-badge-image]: https://badgen.net/github/dependents-pkg/tom-weatherhead/thaw-repl
[pkg-dependents-url]: https://badgen.net/github/dependents-pkg/tom-weatherhead/thaw-repl
[commits-badge-image]: https://badgen.net/github/commits/tom-weatherhead/thaw-repl
[commits-url]: https://github.com/tom-weatherhead/thaw-repl/commits/master
[last-commit-badge-image]: https://badgen.net/github/last-commit/tom-weatherhead/thaw-repl
[last-commit-url]: https://badgen.net/github/last-commit/tom-weatherhead/thaw-repl
[types-badge-image]: https://badgen.net/npm/types/thaw-repl
[types-url]: https://badgen.net/npm/types/thaw-repl
[install-size-badge-image]: https://badgen.net/packagephobia/install/thaw-repl
[install-size-url]: https://badgen.net/packagephobia/install/thaw-repl
[known-vulnerabilities-badge-image]: https://snyk.io/test/github/tom-weatherhead/thaw-repl/badge.svg?targetFile=package.json&package-lock.json
[known-vulnerabilities-url]: https://snyk.io/test/github/tom-weatherhead/thaw-repl?targetFile=package.json&package-lock.json
[lines-of-code-badge-image]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-repl
[lines-of-code-url]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-repl
[technical-debt-badge-image]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-repl
[technical-debt-url]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-repl
[maintainability-badge-image]: https://api.codeclimate.com/v1/badges/95257078e060ec5ede87/maintainability
[maintainability-url]: https://codeclimate.com/github/tom-weatherhead/thaw-repl/maintainability
[test-coverage-badge-image]: https://api.codeclimate.com/v1/badges/95257078e060ec5ede87/test_coverage
[test-coverage-url]: https://codeclimate.com/github/tom-weatherhead/thaw-repl/test_coverage
[jest-badge-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest
[prettier-badge-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-badge-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/tom-weatherhead/thaw-repl/blob/master/LICENSE
[fossa-badge-image]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fmoment%2Fmoment.svg?type=shield
[fossa-badge-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fmoment%2Fmoment?ref=badge_shield

## Features

- Self-contained: No run-time package dependencies!

## Installation
To install the stable version:
```
npm install --save thaw-repl
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
