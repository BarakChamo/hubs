# [Mozilla Hubs](https://hubs.mozilla.com/)

## Strata Verse notes & docs

### Steps to working build from `upstream/hubs-cloud`

The default state of the `hubs-cloud` is currently broken, and doesn't
work with a symlinked submodule approach. These are the steps to 
get the upstream version working after merges and fresh clones:

1. Remove import to `components/media-pdf` in `hub.js` to bypass `pdfjs` errors, also delete `pdfjs` from `package.json`.
2. Do not use `npm install`, this will take literally forver and break over multiple package conflicts. Instead, run `npm ci` to install packaged from the `package-lock` file and then make any additional installs and uninstalls. (read `7.` before installing).
3. Set `stats: minimal` in `webpack.config.js` to silence webpack output logs.
4. Remove calls to `npm ci` in `deploy.js` to speed up deployment and avoid elevation errors.
5. Install `fs-extra` and replace `ncp` with `copy` from `fs-extra` to fix broken admin client.
6. Update webpack to latest `4.x.x` to allow `symlink: false` behaviour.
7. (option A) - Install `nvm` and use node version `v14.15.0` or any which uses `npm@6`, otherwise installs may fail.
7. (option B) - Manually apply [this patch](https://github.com/mozilla/hubs/pull/5473/commits/8a7b07d0951ee1f22f4c5bd6b435ee14b0272cca) to `package-lock.json` before running `npm ci`
8. Delete package-lock.json and yarn.lock to force a fresh install.
9. Remove `"@mozillareality/three-batch-manager"` from `package.json` before installing, to avoid clashes between Mozilla forks.
10. Symlink `strataverse-common` as `strata` in root directory to include custom modules.

These steps will produce a functional, deployable copy of the `hubs-cloud` repo.
This copy can then be extended and deployed to AWS.

### Code separation and `Hubs` / `Spoke` interop
To create custom components files need to be added to both the `Spoke` and `Hubs` codebases.

This allows for setting up custom components easily in Spoke but makes the creation of custom components clunky
as files need to be updated in multiple places. 

To solve this common logic for custom components is extracted to a third repository that is symlinked into both the `hubs`and `spoke` forks maintained by strata. The `common` repo exposes two main entrypoints for hubs and spoke respectively to register all custom components, keeping code modification in the original repos
to a minimum.

The `common` repo cannot run on its own, and is designed to act as a partial addition for the `hub` and `spoke`.
It is not `npm install`ed, but simply becomes another folder in the source.

### Component development
Both local copies of `hubs` and `spoke` can be configured to run against the production Hubs server running on AWS. This is best as it guarantees that any progress made is compatible with the custom deployment pipeline rather than Mozilla-managed instances that may vary in version.


## Original Hubs documentation

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0) [![Build Status](https://travis-ci.org/mozilla/hubs.svg?branch=master)](https://travis-ci.org/mozilla/hubs) [![Discord](https://img.shields.io/discord/498741086295031808)](https://discord.gg/CzAbuGu)

The client-side code for [Mozilla Hubs](https://hubs.mozilla.com/), an online 3D collaboration platform that works for desktop, mobile, and VR platforms.

[Learn more about Hubs](https://hubs.mozilla.com/docs/welcome.html)

## Getting Started

If you would like to run Hubs on your own servers, check out [Hubs Cloud](https://hubs.mozilla.com/docs/hubs-cloud-intro.html).

If you would like to deploy a custom client to your existing Hubs Cloud instance please refer to [this guide](https://hubs.mozilla.com/docs/hubs-cloud-custom-clients.html).

If you would like to contribute to the main fork of the Hubs client please see the [contributor guide](./CONTRIBUTING.md).

If you just want to check out how Hubs works and make your own modifications continue on to our Quick Start Guide.

### Quick Start

[Install NodeJS](https://nodejs.org) if you haven't already. We recommend version 12 or above.

Run the following commands:

```bash
git clone https://github.com/mozilla/hubs.git
cd hubs
npm ci
npm run dev
```

Then visit https://localhost:8080 (note: HTTPS is required, you'll need to accept the warning for the self-signed SSL certificate)

> Note: When running the Hubs client locally, you will still connect to the development versions of our [Janus WebRTC](https://github.com/mozilla/janus-plugin-sfu) and [reticulum](https://github.com/mozilla/reticulum) servers. These servers do not allow being accessed outside of localhost. If you want to host your own Hubs servers, please check out [Hubs Cloud](https://hubs.mozilla.com/docs/hubs-cloud-intro.html).

## Documentation

The Hubs documentation can be found [here](https://hubs.mozilla.com/docs).

## Community

Join us on our [Discord Server](https://discord.gg/CzAbuGu) or [follow us on Twitter](https://twitter.com/MozillaHubs).

## Contributing

Read our [contributor guide](./CONTRIBUTING.md) to learn how you can submit bug reports, feature requests, and pull requests.

We're also looking for help with localization. The Hubs redesign has a lot of new text and we need help from people like you to translate it. Follow the [localization docs](./src/assets/locales/README.md) to get started.

Contributors are expected to abide by the project's [Code of Conduct](./CODE_OF_CONDUCT.md) and to be respectful of the project and people working on it. 

## Additional Resources

* [Reticulum](https://github.com/mozilla/reticulum) - Phoenix-based backend for managing state and presence.
* [NAF Janus Adapter](https://github.com/mozilla/naf-janus-adapter) - A [Networked A-Frame](https://github.com/networked-aframe) adapter for the Janus SFU service.
* [Janus Gateway](https://github.com/meetecho/janus-gateway) - A WebRTC proxy used for centralizing network traffic in this client.
* [Janus SFU Plugin](https://github.com/mozilla/janus-plugin-sfu) - Plugins for Janus which enables it to act as a SFU.
* [Hubs-Ops](https://github.com/mozilla/hubs-ops) - Infrastructure as code + management tools for running necessary backend services on AWS.

## Privacy

Mozilla and Hubs believe that privacy is fundamental to a healthy internet. Read our [privacy policy](./PRIVACY.md) for more info.

## License

Hubs is licensed with the [Mozilla Public License 2.0](./LICENSE)