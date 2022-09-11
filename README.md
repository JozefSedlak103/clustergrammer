<img src='img/clustergrammer-gl_logo.png' alt="Clustergramer" width="350px" >

[![NPM](https://img.shields.io/npm/v/@gumuslab/clustergrammer.svg)](https://www.npmjs.com/package/@gumuslab/clustergrammer) [![NPM](https://img.shields.io/npm/l/clustergrammer-gl.svg)](https://github.com/ismms-himc/clustergrammer-gl/blob/master/LICENSE) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

## About

[Clustergrammer](https://www.npmjs.com/package/clustergrammer), [Clustergrammer2](https://www.npmjs.com/package/clustergrammer2), and [Clustergrammer-GL](https://www.npmjs.com/package/clustergrammer-gl) are packages originally developed by the [Human Immune Monitoring Center](https://icahn.mssm.edu/research/human-immune-monitoring-center) and [Ma'ayan lab](http://labs.icahn.mssm.edu/maayanlab/) at the [Icahn School of Medicine at Mount Sinai](http://icahn.mssm.edu/).

This work is now being continued by [Gumus Lab](https://gumuslab.github.io/), also at ISMMS, and the code is being updated and maintained so it can be used in genomics project that the Gumus Lab is working on.

The project lead is [Kevin Ulrich](https://github.com/moromis), who can be [contacted here](kevin.ulrich@mssm.edu).

The original documentation for Clustergrammer and all its associated projects is [located here](http://clustergrammer.readthedocs.io), though it mainly applies in terms of creating formatted data with [Clustergrammer-PY](https://clustergrammer.readthedocs.io/clustergrammer_py.html) and the [desired format for the data for Javascript applications](https://clustergrammer.readthedocs.io/clustergrammer_js.html#visualization-json).

## Contributions

Contributions are totally welcome -- there are two ways to contribute:
1. Find [an issue](https://github.com/GumusLab/clustergrammer/issues) that you want to tackle and comment on it/submit a PR for it.
2. If you find a bug with Clustergrammer or want to make an enhancement, please write [an issue](https://github.com/GumusLab/clustergrammer/issues) detailing the change and make sure the community is on board, and then submit a PR for the changes.

## Setup for Local Development

1. Clone the code to your local machine
2. Run `yarn` to install all required node modules
3. Run `yarn build-for-example` to build the package locally into the `example/example-app` folder and watch for changes (will rebuild automatically)
4. Open a new terminal tab or window, `cd example/example-app` and `yarn start` to start the local test app

## Licensing

The [original license](https://clustergrammer.readthedocs.io/license.html) still applies, and the code is MIT-licensed.
