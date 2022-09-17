<!-- @format -->

> This project is no longer actively updated. Maintainace is only added when github issues a breaking change on their github actions api. If you need more functionality, we actively develop and maintain [@resnovas/smartcloud](https://github.com/Resnovas/smartcloud) which utilises the code from this project.
>
> We appriciate all the support during the condintued development of this project and want to thank @IvanFon for allowing us to work on expanding their original code

# Label Collection

The super-powered labeler for Github Actions, with complex customisable conditions for PR, Issues and Projects.

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/IvanFon"><img src="https://avatars.githubusercontent.com/u/1174413?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan</b></sub></a><br /><a href="https://github.com/Resnovas/smartcloud/issues?q=author%3AIvanFon" title="Bug reports">🐛</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=IvanFon" title="Code">💻</a> <a href="#ideas-IvanFon" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=IvanFon" title="Documentation">📖</a> <a href="#infra-IvanFon" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-IvanFon" title="Maintenance">🚧</a> <a href="#projectManagement-IvanFon" title="Project Management">📆</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=IvanFon" title="Tests">⚠️</a> <a href="#tool-IvanFon" title="Tools">🔧</a></td>
      <td align="center"><a href="https://keybase.io/TGTGamer"><img src="https://avatars.githubusercontent.com/u/11413796?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan S</b></sub></a><br /><a href="#question-TGTGamer" title="Answering Questions">💬</a> <a href="https://github.com/Resnovas/smartcloud/issues?q=author%3ATGTGamer" title="Bug reports">🐛</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=TGTGamer" title="Code">💻</a> <a href="#design-TGTGamer" title="Design">🎨</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=TGTGamer" title="Documentation">📖</a> <a href="#example-TGTGamer" title="Examples">💡</a> <a href="#ideas-TGTGamer" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-TGTGamer" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-TGTGamer" title="Maintenance">🚧</a> <a href="#projectManagement-TGTGamer" title="Project Management">📆</a> <a href="#security-TGTGamer" title="Security">🛡️</a> <a href="https://github.com/Resnovas/smartcloud/commits?author=TGTGamer" title="Tests">⚠️</a> <a href="#tool-TGTGamer" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/jbinda"><img src="https://avatars.githubusercontent.com/u/21242757?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jbinda</b></sub></a><br /><a href="https://github.com/Resnovas/smartcloud/commits?author=jbinda" title="Code">💻</a> <a href="#maintenance-jbinda" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/VidendumStudios"><img src="https://avatars.githubusercontent.com/u/68557851?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Videndum Studios Github Actions</b></sub></a><br /><a href="#projectManagement-VidendumStudios" title="Project Management">📆</a> <a href="#tool-VidendumStudios" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## Index

<!-- toc -->

- [Features](#features)
- [How to get support 👨‍👩‍👧‍👦](#how-to-get-support-%F0%9F%91%A8%E2%80%8D%F0%9F%91%A9%E2%80%8D%F0%9F%91%A7%E2%80%8D%F0%9F%91%A6)
  - [Why not GitHub Issues?](#why-not-github-issues)
- [Backlog & Contributing](#backlog--contributing)
- [Running Locally & Developing](#running-locally--developing)
  - [Prerequisities](#prerequisities)
  - [Developing](#developing)
  - [Running locally](#running-locally)
- [Getting Started](#getting-started)
  - [Automatic setup via CLI](#automatic-setup-via-cli)
  - [Manual setup](#manual-setup)
    - [Workflow Options](#workflow-options)
  - [All configuration options](#all-configuration-options)
    - [Runners](#runners)
      - [Versioning](#versioning)
    - [IssueConfig](#issueconfig)
    - [ProjectConfig](#projectconfig)
    - [PullRequestConfig](#pullrequestconfig)
    - [PullRequestConfig](#pullrequestconfig-1)
    - [Typings](#typings)
  - [Using Regex Patterns](#using-regex-patterns)
- [Available Conditions](#available-conditions)
  - [Common Conditions](#common-conditions)
    - [\$and](#and)
    - [creatorMatches](#creatormatches)
    - [descriptionMatches](#descriptionmatches)
    - [hasLabel](#haslabel)
    - [isAbandoned](#isabandoned)
    - [isLocked](#islocked)
    - [isOpen](#isopen)
    - [isStale](#isstale)
    - [\$only](#only)
    - [\$or](#or)
  - [Pull Request Conditions](#pull-request-conditions)
    - [branchMatches](#branchmatches)
    - [changesSize](#changessize)
    - [filesMatch](#filesmatch)
    - [isApproved](#isapproved)
    - [isDraft](#isdraft)
    - [pendingReview](#pendingreview)
    - [requestedChanges](#requestedchanges)
  - [Issue Conditions](#issue-conditions)
  - [Project Conditions](#project-conditions)
    - [onColumn](#oncolumn)
- [Final Note](#final-note)

<!-- tocstop -->

## Features

Label Mastermind is capable of the following:

- Create, Update, Delete Labels declaratively from Config file or JSON String
- Apply Labels based on conditions:
  - Pull Releases
  - Issues
  - Project Cards

Label Mastermind is designed to work in combination with other Videndum Studios Projects. Check out our [Universal Workflows Project](https://github.com/Videndum/Universal-GitAction-Workflows)

<!-- @format -->

## How to get support 👨‍👩‍👧‍👦

For **Features Requests**, **Q&A**, **Show & Tell** and **Discussions** please use **[our discussions page](https://github.com/Videndum/action-masterminds/discussions)** 🚑.

We have a **FAQ** category in our **[discussions page](https://github.com/Videndum/action-masterminds/discussions)** where you can get quick answers, help with debugging weird issues, and general help.

Our extensive **documentation** can be found at **[here](https://github.com/Videndum/action-masterminds/blob/develop/README.md)**.

### Why not GitHub Issues?

GitHub is our office, it's the place where our development and contributor teams do their work. We use the issue list to keep track of bugs and the features that we are working on. We do this openly for transparency, to reduce replication by contributors and increase productivity.

With the discussion page, you can leverage the knowledge of our wider community to get help with any problems you are having. Please keep in mind that this project is open-source, support is provided by the goodwill of our wonderful community members.

<!-- @format -->

## Backlog & Contributing

Thank you for taking an interst in contributing. We have created development containers (`.devcontainer`) to allow you to jump straight in with coding. We even went through the hassle of setting up step by step guides using [CodeTour](https://github.com/vsls-contrib/codetour). Everything is configured and ready to go, all you need to do is use one of the supported platforms: [VSCode](https://code.visualstudio.com/docs/remote/remote-overview) | [Github Codespaces](https://github.com/features/codespaces)

For more information on how to contribute, please read the [contributing guidelines](docs/contributing/README.md).

Our backlog can be found on [Github](https://github.com/Videndum/action-masterminds/projects/1)

<!-- @format -->

## Running Locally & Developing

Setting up local running is simple, however we **MUST** warn that building / packaging while using local scripts can cause your GITHUB_TOKEN to be included within the package. To avoid this happening. you **MUST** follow the steps correctly. We will not be held responsible for any leeked personal tokens.

### Prerequisities

1. Setup a secret on your repository named: `ACTIONS_STEP_DEBUG` value: `true`
2. Ensure the action has run once after you created this secret

### Developing

3. Fork & Clone the [development repository](https://github.com/Videndum/action-masterminds)
4. Continue from step 4 of `Running Locally` then return to step 5 & 6.
5. Make changes, then rebuild using `npm run dev:run` or `yarn dev:run`
6. If uploading changes to Github
   - Delete `./context.json`, `./config`, `./lib`, `./dist`.
   - Run `yarn dev:all`.
   - Commit & push.

### Running locally

3. Fork & Clone this repository
4. Run `yarn install` or `npm install`
5. From the action logs find `Context for local running` copy the output into a file named `./context.json` at the root of the project.
6. Modify the `./config.sample.json` to contain your `GITHUB_TOKEN` and rename to `./config.json`
7. Run the script using `yarn dev:run` or `npm run dev:run`

## Getting Started

> [!IMPORTANT]
> It is **Extremely** important to understand while using this template, most of the code within `.github/` will automatically update within a new pull request whenever the [template repository](https://github.com/Videndum/Universal-GitAction-Workflows) is updated.

<!-- @format -->

### Automatic setup via CLI

[coming soon]

### Manual setup

Create a new Github Actions workflow at `.github/workflows/main.yml`:

_Note: `actions/checkout` must be run first so that the release action can find your config file._

<details>
    <summary><b>main.yml</b></summary>

```yaml
# @format

on:
  issues:
    types: [opened, edited, closed, reopened]
  pull_request:
    types: [opened, edited, closed, reopened, synchronize]
  project_card:
    types: [created, moved, deleted]

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ./
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

</details>

Now create the config file at `.github/config.json`:

<details>
    <summary><b>Our runners config</b></summary>

```json
[
	{
		"root": ".",
		"versioning": {
			"source": "milestones",
			"type": "SemVer"
		},
		"prereleaseName": "alpha",
		"sharedConfig": {
			"labels": {
				"bug": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^bug(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/(created|new|opened|made)( an| a)? bug/i"
						}
					]
				},
				"chore": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^chore(\\(.*\\))?(!)?:/i"
						}
					]
				},
				"optimisation": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^opt(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^optimisation(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Style|Refactoring|Revert|Deprecated|Removal)*optimisation/im"
						}
					]
				},
				"style": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^style(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Refactoring|Optimisation|Revert|Deprecated|Removal)*style/im"
						}
					]
				},
				"refactor": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^ref(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^refactor(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Style|Optimisation|Revert|Deprecated|Removal)*refactoring/im"
						}
					]
				},
				"revert": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^revert(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Style|Refactoring|Optimisation|Deprecated|Removal)*revert/im"
						}
					]
				},
				"deprecated": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^dep(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^deprecated(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Style|Refactoring|Optimisation|Revert|Removal)*deprecated/im"
						}
					]
				},
				"removal": {
					"requires": 2,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^removal(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maint(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^maintenance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^type:(,| |Style|Refactoring|Optimisation|Revert|Deprecated)*removal/im"
						}
					]
				},
				"discussion": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^discussion(\\(.*\\))?(!)?:/i"
						}
					]
				},
				"documentation": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^docs(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^documentation(\\(.*\\))?(!)?:/i"
						}
					]
				},
				"feature": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^feat(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^enhance(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^feature(\\(.*\\))?(!)?:/i"
						},
						{
							"type": "titleMatches",
							"pattern": "/^enhancement(\\(.*\\))?(!)?:/i"
						}
					]
				},
				"fix": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^fix(\\(.*\\))?(!)?:/i"
						}
					]
				},
				"workflow": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "/^.*\\(workflow\\)(!)?:/i"
						}
					]
				},
				"releaseMastermind": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- package\\(s\\):.*(@videndum\\/)?release-mastermind.*/im"
						},
						{
							"type": "titleMatches",
							"pattern": "/^.*\\((@videndum\\/)?release-mastermind\\)(!)?:/i"
						}
					]
				},
				"labelMastermind": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- package\\(s\\):.*(@videndum\\/)?label-mastermind.*/im"
						},
						{
							"type": "titleMatches",
							"pattern": "/^.*\\((@videndum\\/)?label-mastermind\\)(!)?:/i"
						}
					]
				},
				"variableMastermind": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- package\\(s\\):.*(@videndum\\/)?variable-mastermind.*/im"
						},
						{
							"type": "titleMatches",
							"pattern": "/^.*\\((@videndum\\/)?variable-mastermind\\)(!)?:/i"
						}
					]
				},
				"installer": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- package\\(s\\):.*(@videndum\\/)?action-masterminds.*/im"
						},
						{
							"type": "titleMatches",
							"pattern": "/^.*\\(installer\\)(!)?:/i"
						}
					]
				},
				"priorityCritical": {
					"requires": 1,
					"conditions": [
						{
							"type": "titleMatches",
							"pattern": "!:.*(critical|urgent)?|!?:.*(critical|urgent)"
						}
					]
				}
			}
		},
		"pr": {
			"labels": {
				"xs": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 0,
							"max": 10
						}
					]
				},
				"s": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 10,
							"max": 30
						}
					]
				},
				"m": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 40,
							"max": 100
						}
					]
				},
				"l": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 100,
							"max": 500
						}
					]
				},
				"xl": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 500,
							"max": 1000
						}
					]
				},
				"xxl": {
					"requires": 1,
					"conditions": [
						{
							"type": "changesSize",
							"min": 1000
						}
					]
				},
				"fixConfirmed": {
					"requires": 6,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] fix Confirmed by ((@.*& .*){4,}|(@.*& )*@(tgtgamer|videndum\\/.*))/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a clean installation/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a stable build/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a development build/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have included logs or screenshots/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have linked any related/im"
						}
					]
				},
				"devOpsReviewing": {
					"requires": 1,
					"conditions": [
						{
							"type": "pendingReview",
							"value": true
						}
					]
				},
				"devOpsRejected": {
					"requires": 1,
					"conditions": [
						{
							"type": "requestedChanges",
							"value": true
						}
					]
				}
			}
		},
		"issue": {
			"ref": "develop",
			"labels": {
				"android": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*android/im"
						}
					]
				},
				"aws": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*aws/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*amazon web service/im"
						}
					]
				},
				"google": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*google/im"
						}
					]
				},
				"ios": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*ios/im"
						}
					]
				},
				"ubuntu": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*ubuntu/im"
						}
					]
				},
				"fedora": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*fedora/im"
						}
					]
				},
				"debian": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*debian/im"
						}
					]
				},
				"macos": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*macos/im"
						}
					]
				},
				"windows": {
					"requires": 1,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- platform:.*windows/im"
						}
					]
				},
				"bugConfirmed": {
					"requires": 8,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] bug Confirmed by ((@.*& .*){4,}|(@.*& )*@(tgtgamer|videndum\\/.*))/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have reproduced on my application version/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have reproduced on a clean installation/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have reproduced on a development build/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have included logs or screenshots/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have contacted support/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have asked the community/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have linked any related/im"
						}
					]
				},
				"fixConfirmed": {
					"requires": 6,
					"conditions": [
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] fix Confirmed by ((@.*& .*){4,}|(@.*& )*@(tgtgamer|videndum\\/.*))/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a clean installation/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a stable build/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have fixed on a development build/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have included logs or screenshots/im"
						},
						{
							"type": "descriptionMatches",
							"pattern": "/^- \\[x\\] have linked any related/im"
						}
					]
				}
			}
		},
		"project": {
			"ref": "develop",
			"labels": {
				"available": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Requested"
						}
					]
				},
				"pending": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Accepted"
						}
					]
				},
				"progress": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "In Progress"
						},
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Testing"
						}
					]
				},
				"review": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Reviewing"
						}
					]
				},
				"completed": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Completed"
						}
					]
				},
				"doNotDevelop": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Rejected"
						}
					]
				},
				"devOpsAccepted": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Accepted"
						}
					]
				},
				"devOpsDeveloping": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "In Progress"
						}
					]
				},
				"devOpsTesting": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Testing"
						}
					]
				},
				"devOpsReviewing": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Reviewing"
						}
					]
				},
				"devOpsStaging": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Staging"
						}
					]
				},
				"devOpsCompleted": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Completed"
						}
					]
				},
				"devOpsRejected": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Developer Operations",
							"column": "Rejected"
						}
					]
				},
				"priorityLow": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Issues",
							"column": "Low Priority"
						}
					]
				},
				"priorityMedium": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Issues",
							"column": "Medium Priority"
						}
					]
				},
				"priorityHigh": {
					"requires": 1,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Issues",
							"column": "High Priority"
						}
					]
				},
				"priorityCritical": {
					"requires": 2,
					"conditions": [
						{
							"type": "onColumn",
							"project": "Issues",
							"column": "High Priority"
						},
						{
							"type": "titleMatches",
							"pattern": "!:.*(critical|urgent)?|!?:.*(critical|urgent)"
						}
					]
				}
			}
		}
	}
]
```

</details>

Be sure that Github Actions is enabled for in your repository's settings. The action will now run on your issues, projects and pull requests.

<!-- @format -->

#### Workflow Options

| Option       | Required | Description                                          | Default                 |
| ------------ | -------- | ---------------------------------------------------- | ----------------------- |
| GITHUB_TOKEN | true     | Your github token or PAT                             | `N/A`                   |
| config       | false    | The config file to use                               | `".github/config.json"` |
| configJSON   | false    | "JSON string with config data"                       | `N/A`                   |
| fillEmpty    | false    | Fill Empty context configuration with shared configs | `true`                  |
| skipDelete   | false    | Skip deleting labels from repository                 | `false`                 |

<!-- @format -->

### All configuration options

Due to the nature of this project. Most of the options have been documented as tables of information for your convinience. However Where this isn't partically helpful or easy to do, we have used the `Typing` from our typescript files to showcase the option.

<!-- @format -->

| Option  | Required | Description                                | Params                  |
| ------- | -------- | ------------------------------------------ | ----------------------- |
| labels  | false    | Defines all the labels within the repo     | `Labels`                |
| runners | true     | Defines the configuration for each project | [`Runners[]`](#runners) |

<!-- @format -->

#### Runners

You can have multiple runners, which allows for configuration for monorepo projects.

| Option             | Required | Description                                 | Params                                    |
| ------------------ | -------- | ------------------------------------------- | ----------------------------------------- |
| Root               | true     | Defines the root of the project             | `string`                                  |
| projectType        | true     | Defines the type of project                 | `"node" / "other"`                        |
| versioning         | true     | Defines the versioning of the project       | [`Versioning`](#versioning)               |
| prereleaseName     | false    | Defines the name of a prerelease            | `string`                                  |
| sharedLabelsConfig | false    | Defines labels to use on both PR and Issues | [`SharedLabels`](#sharedlabels)           |
| pr                 | false    | Defines the configuration for Pull Requests | [`PullRequestConfig`](#pullrequestconfig) |
| issue              | false    | Defines the configuration for issues        | [`IssueConfig`](#issueconfig)             |
| project            | false    | Defines the configuration for projects      | [`ProjectConfig`](#projectconfig)         |

##### Versioning

| Option | Required | Description                           | Params                           |
| ------ | -------- | ------------------------------------- | -------------------------------- |
| source | true     | Defines the source for versioning     | `"node" / "milestones" / string` |
| type   | false    | Defines the versioning of the project | `"SemVer" / "other"`             |

<!-- @format -->

#### IssueConfig

| Option | Required | Description                | Params                                                         |
| ------ | -------- | -------------------------- | -------------------------------------------------------------- |
| ref    | false    | Overrides the reference    | `string`                                                       |
| labels | false    | Apply labels automatically | [`[Key: string]: IssueConditionConfig`](#issueconditionconfig) |

<!-- @format -->

#### ProjectConfig

| Option | Required | Description                | Params                                                             |
| ------ | -------- | -------------------------- | ------------------------------------------------------------------ |
| ref    | false    | Overrides the reference    | `string`                                                           |
| labels | false    | Apply labels automatically | [`[Key: string]: ProjectConditionConfig`](#projectconditionconfig) |

<!-- @format -->

#### PullRequestConfig

| Option | Required | Description                | Params                                                   |
| ------ | -------- | -------------------------- | -------------------------------------------------------- |
| ref    | false    | Overrides the reference    | `string`                                                 |
| labels | false    | Apply labels automatically | [`[Key: string]: PRConditionConfig`](#prconditionconfig) |

<!-- @format -->

#### PullRequestConfig

| Option | Required | Description                | Params                                                   |
| ------ | -------- | -------------------------- | -------------------------------------------------------- |
| ref    | false    | Overrides the reference    | `string`                                                 |
| labels | false    | Apply labels automatically | [`[Key: string]: PRConditionConfig`](#prconditionconfig) |

#### Typings

<details>
    <summary><b>Types</b></summary>

```types/index.d.ts
/** @format */

import {
	Condition,
	IssueCondition,
	PRCondition,
	ProjectCondition,
	ScheduleCondition
} from "../src/conditions"
import { Repo } from "../src/utils"

/**
 * Application interfaces
 */

export interface Options {
	configPath: string
	configJSON: Runners
	showLogs: boolean
	dryRun: boolean
	fillEmpty: boolean
	skipDelete: boolean
	repo?: Repo
}

export interface Runners {
	labels?: Labels
	runners: Config[]
}

export interface Config {
	root: string
	versioning: {
		source: VersionSource
		type?: VersionType
	}
	retryLimit?: number
	prereleaseName?: string
	labels?: { [key: string]: string }
	sharedConfig?: SharedConfig
	pr?: PullRequestConfig
	issue?: IssueConfig
	project?: ProjectConfig
	schedule?: ScheduleConfig
}

/**
 * Config types
 */

export type VersionSource = "node" | "milestones" | string
export type VersionType = "SemVer"

export interface SharedConditions {
	requires: number
	conditions: Condition[]
}

export interface Label {
	name: string
	description: string
	color: string
}

export interface Labels {
	[key: string]: Label
}

export interface PRConditionConfig {
	requires: number
	conditions: PRCondition[]
}

export interface IssueConditionConfig {
	requires: number
	conditions: IssueCondition[]
}

export interface ProjectConditionConfig {
	requires: number
	conditions: ProjectCondition[]
}

export interface ScheduleConditionConfig {
	requires: number
	conditions: ScheduleCondition[]
}

export interface PullRequestConfig extends SharedConfig {
	assignProject?: AssignProject[]
	automaticApprove?: AutomaticApprove
	manageRelease?: Release
	duplicateHotfix?: { [title: string]: DuplicateHotfix }
	syncRemote?: SyncRemote[]
}

export interface IssueConfig extends SharedConfig {
	assignProject?: AssignProject[]
	createBranch?: { [label: string]: CreateBranch }
}

export interface ProjectConfig extends SharedConfig {
	syncRemote?: ExProjects[]
	openBranch?: ProjectCreateBranch
	assignMilestone?: { [milestone: string]: Milestones }
}

export interface ScheduleConfig extends SharedConfig {}

export type SharedConfigIndex =
	| "ref"
	| "enforceConventions"
	| "labels"
	| "stale"

export interface SharedConfig {
	ref?: string
	enforceConventions?: EnforceConventions
	stale?: Stale
	labels?: {
		[key: string]:
			| IssueConditionConfig
			| ProjectConditionConfig
			| PRConditionConfig
			| ScheduleConditionConfig
			| SharedConditions
	}
}

export interface SharedConventionConditions {
	requires: number
	conditions: Condition[] | string
}
export interface SharedConventionsConfig extends SharedConventionConditions {
	failedComment: string
	contexts?: string[]
}

export interface CreateBranch {
	branchPrefix?: string
	branchSuffix?: string
	branchName: "title" | "short" | "number"
}

export interface EnforceConventions {
	onColumn?: Column[]
	commentHeader?: string
	commentFooter?: string
	moveToColumn?: string
	conventions: SharedConventionsConfig[]
}

export interface Stale {
	staleLabel: string
	stale?: StaleConfig
	abandoned?: AbanondedConfig
	conditions?: SharedConditions[]
}

export interface StaleConfig extends SharedConditions {
	days: number
	comment?: string
	resolve?: string
	commentHeader?: string
	commentFooter?: string
}

export interface AbanondedConfig extends StaleConfig {
	close?: boolean
	lock?: boolean
	label: string
}

export interface AutomaticApprove {
	commentHeader?: string
	commentFooter?: string
	conventions: SharedConventionsConfig[]
}

export interface Release extends PRConditionConfig {
	labels?: {
		build: string
		prerelease: string
		patch: string
		minor: string
		major: string
		breaking?: string
	}
	createTag?: boolean
	createRelease?: CreateRelease
	createMilestone?: CreateMilestone
	createPackages?: string[] | string
	createChangelog?: Changelog
}

export interface DuplicateHotfix {
	prName: "unchanged" | "number" | string
	titlePrefix?: string
	branches: string[]
}
export interface SyncRemote {
	localBranch: string
	remoteBranch: string
	localPath: string
	remotePath: string
	conditions: SharedConditions[]
}

export interface ReleaseChanges {
	includeIssues?: boolean
	sections?: Sections[]
}

export interface Sections {
	title: string
	body?: string
	PRlabels: string[]
	issueLabels?: string[]
	includeCommitter?: boolean
	linkPR?: boolean
}

export interface CreateRelease extends ReleaseChanges {
	tagName?: string
	tagPrefix?: string
	releaseName?: string
	releaseNamePrefix?: string
	releaseNameSuffix?: string
	draft?: boolean
	prerelease?: boolean
	useChangelog?: boolean
}
export interface Changelog extends ReleaseChanges {
	title?: string
	body?: string
}

export interface CreateMilestone {
	milestone: "version" | string
	deadline?: string
}

export type Column = string | number

interface AssignProject extends IssueConditionConfig {
	owner?: string
	user?: string
	repo?: string
	project: string
	column: string
}

interface ExProjects {
	localProject: string
	owner?: string
	user?: string
	repo?: string
	project: string
}
interface ProjectCreateBranch extends CreateBranch {
	onProject?: string
	onColumn?: string
}

interface Milestones {
	onColumn: string
	ignoreLabels?: string[]
}
```

</details>

<!-- @format -->

### Using Regex Patterns

Many conditions use regular expressions (usually with a `pattern` parameter).
Since these regular expressions are passed in through JSON strings, there are
some things to pay attention to.

Special characters must be double escaped: `pattern: "\\W+$"` is equivalent to the Regex: `/\W+$/`.

If you want to use flags, use the following format: `pattern: "/^wip:/i"` is equivalent to the Regex: `/^wip:/i`.

<!-- @format -->

## Available Conditions

For complex conditions, you can use conditional options such as `only`, `$and` and `$or`. They can be found within the common conditions section.

### Common Conditions

<!-- @format -->

#### \$and

Allows conditions to be combined to create more advanced conditions. Would require all conditions to return true otherwise it would fail.

```json
{
	"type": "$and",
	"pattern": [
		{
			"requires": 1,
			"conditions": []
		},
		{
			"requires": 1,
			"conditions": []
		}
	]
}
```

<!-- @format -->

#### creatorMatches

Checks if an issue or pull request's creator's username matches a Regex pattern.

Example:

```json
{
	"type": "creatorMatches",
	"pattern": "^foo"
}
```

<!-- @format -->

#### descriptionMatches

Checks if an issue or pull request's description matches a Regex pattern.

Example:

```json
{
	"type": "descriptionMatches",
	"pattern": "foo.*bar"
}
```

<!-- @format -->

#### hasLabel

Checks if an issue or pull request has a specific label applied.

Example:

```json
{
	"type": "hasLabel",
	"label": "Type - Bug",
	"value": "false"
}
```

<!-- @format -->

#### isAbandoned

Checks if an issue or pull request is abandoned.

Example:

```json
{
	"type": "isAbandoned",
	"stale": 30
}
```

<!-- @format -->

#### isLocked

Checks if an issue or pull request is locked.

Example:

```json
{
	"type": "isLocked",
	"value": true
}
```

<!-- @format -->

#### isOpen

Checks if an issue or pull request is open or closed.

Example:

```json
{
	"type": "isOpen",
	"value": true
}
```

<!-- @format -->

#### isStale

Checks if an issue or pull request is stale.

Example:

```json
{
	"type": "isStale",
	"stale": 30
}
```

<!-- @format -->

#### \$only

Requires only the number specified in `requires` to pass otherwise it fails.

```json
{
	"type": "$only",
	"requires": 1,
	"pattern": [
		{
			"requires": 1,
			"conditions": []
		},
		{
			"requires": 1,
			"conditions": []
		}
	]
}
```

<!-- @format -->

#### \$or

Allows conditions to be combined to create more advanced conditions. Would require one conditions to return true otherwise it would fail.

```json
{
	"type": "$or",
	"pattern": [
		{
			"requires": 1,
			"conditions": []
		},
		{
			"requires": 1,
			"conditions": []
		}
	]
}
```

<!-- @format -->

### Pull Request Conditions

<!-- @format -->

#### branchMatches

Checks if branch name matches a Regex pattern.

Example:

```json
{
	"type": "branchMatches",
	"pattern": "^bugfix\\/"
}
```

<!-- @format -->

#### changesSize

Checks if an pull request's changes against `min` & `max` values. Note: if `max` is `undefined` assumed value is `unlimited`

Example:

```json
{
	"type": "changesSize",
	"min": 0,
	"max": 100
}
```

<!-- @format -->

#### filesMatch

Checks if the files modified in the pull request match a glob.

Globs are matched using the [minimatch](https://github.com/isaacs/minimatch) library.

Example:

```json
{
	"type": "filesMatch",
	"glob": "src/foo/**/*"
}
```

<!-- @format -->

#### isApproved

Checks if a pull request has requested a review.

Example:

```json
{
	"type": "isApproved",
	"value": true,
	"required": 1
}
```

<!-- @format -->

#### isDraft

Checks if a pull request is a draft.

Example:

```json
{
	"type": "isDraft",
	"value": true
}
```

<!-- @format -->

#### pendingReview

Checks if a pull request has requested a review.

Example:

```json
{
	"type": "pendingReview",
	"value": true
}
```

<!-- @format -->

#### requestedChanges

Checks if a pull request has requested a review.

Example:

```json
{
	"type": "requestedChanges",
	"value": true
}
```

### Issue Conditions

### Project Conditions

<!-- @format -->

#### onColumn

Checks if the card is in the specified column.

Example:

```json
{
	"type": "onColumn",
	"project": "Isuues",
	"column": "New"
}
```

## Final Note

Thank you for taking the time to look through this repository. If you have liked what you have found, please would you favourite & share. Ideally I would like to get a community behind this project which can ensure that it is maintained, updated and improved as GitActions get more suffisticated.

This project took heavy infulence from [IvanFon/super-labeler-action](https://github.com/IvanFon/super-labeler-action) which we are actively maintaining on our fork here: [Videndum/label-mastermind](https://github.com/Videndum/label-mastermind). We invite any of the team who worked on his project to come onboard with our version and intend to continue maintaining for a significant while.
