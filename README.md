[![Build Status](https://dev.azure.com/yuttadhammo/digitalpalireader/_apis/build/status/digitalpalireader%20-%20build?branchName=master)](https://dev.azure.com/yuttadhammo/digitalpalireader/_build/latest?definitionId=1&branchName=master) [![Release Status](https://vsrm.dev.azure.com/yuttadhammo/_apis/public/Release/badge/5c79c309-a1e5-4a73-b2a5-4faa0c2a2cce/1/2)](https://yuttadhammo.visualstudio.com/digitalpalireader/_release)

# Digital Pali Reader

The Digital Pali Reader (DPR) is a tool much like a hard-copy language reader. It includes the collections of scriptures including the Pali canon, commentaries, sub-commentaries, Visuddhimagga and other texts in the Pali language. It also includes a dictionary to facilitate reading the texts and is useful in the study of the Pali language at an advanced level.

## Build and test instructions

To get DRP running on the local machine:

1. Install live-server: `npm i live-server -g`
1. Run live-server in root folder: `live-server`
1. Browse to `http://localhost:8080`

## Working effectively with legacy code

The current codebase has organically evolved since the last decade. Every piece of code implements some critical functionality.

For the following reasons working with the code base is tricky:

- Lots of students, professors, monastics depend on DPR for their day to day work.
- Code and markup aren't cleanly separated, special care must be taken to not break stuff when changing the code.
- Manual testing process are not yet streamlined.

Over a period of time with care and above infrastructure support (linters, prettiers, testing processes), the code base will evolve to be much easier to change.

Here is an [excellent book](https://www.amazon.com.au/FEATHERS-WORK-EFFECT-LEG-CODE/dp/0131177052) for techniques for working effectively with legacy code.

### Guidelines for contributions

> This is a 'live' section. Feel free to suggest amendments through PRs.

1. **DO** reuse existing code. Remember that features that are being ported over from XUL to Web are already working.
1. **DO** make only the minimum changes necessary for implementing features, fixing bugs. VSCode will auto format those changes as per .editorconfig and other settings.
1. **DO** abstract out HTML ids behind PAL interface. E.g. ```DPR_PAL.getDifId();```
1. **DO** ask for buddy testing.
1. **DO** test all scenarios (TBD: Link to manual test scenarios that every commit must pass)
1. **DO** resolve all PR comments through discussion.
1. **DO** follow the project conventions: [ES6](coding-conventions/es6.md), [jQuery](coding-conventions/jquery.md), [HTML5](coding-conventions/html5.md), [CSS3](coding-conventions/css3.md), [Bootstrap](coding-conventions/bootstrap.md).
1. **DON'T** bulk format files. This makes it very hard to trace the exact changes in case a revert is required.
1. **DON'T** do non-trivial refactoring. It becomes hard to track changes across commit and revert selectively when necessary.
1. **DON'T** change HTML class names or ids. It is hard to tell which is being directly referenced form the code.

check modernization issue for other points

### Upcoming Infrastructure support to make codebase easy to change

- Linters.
- Unit tests.
- Effective manual testing process.

## Useful links

- Work items & Execution: [v5 Release](https://github.com/yuttadhammo/digitalpalireader/projects/1).
- Pipeline: [Build](https://yuttadhammo.visualstudio.com/digitalpalireader/_build), [Deployment](https://yuttadhammo.visualstudio.com/digitalpalireader/_release).
- Deployments: [Staging](https://dprstaging.z24.web.core.windows.net/), [Production](https://dprproduction.z13.web.core.windows.net/).
- Telemetry: [Staging](https://portal.azure.com/#@parthopdaslive.onmicrosoft.com/resource/subscriptions/dc9c3151-f906-4b6a-b7d3-040337cbcc79/resourceGroups/sirimangalo-staging/providers/microsoft.insights/components/sirimangalo-staging/sessions), [Production](https://portal.azure.com/#@parthopdaslive.onmicrosoft.com/resource/subscriptions/dc9c3151-f906-4b6a-b7d3-040337cbcc79/resourceGroups/sirimangalo-production/providers/microsoft.insights/components/sirimangalo-production/sessions).
