# super-labeler-action

A superpowered issue and pull request labeler for Github Actions.

Super Labeler allows you to declaratively define your repository's labels, and when to apply them, in a config file that's checked into your repository.

_This is a fork of [IvanFon/super-labeler-action](https://github.com/IvanFon/super-labeler-action) which we are maintaining due to the main repository going inactive. The original idea and all credit goes to IvanFon._

## Getting Started

Create a new Github Actions workflow at `.github/workflows/label.yml`:

<details>
  <summary><b>Click to show example workflow</b></summary>

_Note: `actions/checkout` must be run first so that the labeler action can find your config file._

```yaml
on:
  issues: [opened, edited, closed, reopened]
  pull_request:
    types: [opened, edited, closed, reopened, ready_for_review, synchronize]

jobs:
  label:
    runs-on: ubuntu-latest
    name: Label issues and pull requests
    steps:
      - uses: actions/checkout@v2
      - uses: IvanFon/super-labeler-action@v1
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
```

</details>

Now create the labeler config file at `.github/labels.json`:

<details>
  <summary><b>Click here to show example config</b></summary>

```json
{
  "labels": {
    "example": {
      "name": "example",
      "colour": "#00ff00",
      "description": "Example label"
    }
  },
  "issue": {
    "example": {
      "requires": 2,
      "conditions": [
        {
          "type": "titleMatches",
          "pattern": "example"
        },
        {
          "type": "isOpen"
        }
      ]
    }
  },
  "pr": {
    "example": {
      "requires": 1,
      "conditions": [
        {
          "type": "isDraft",
          "value": false
        }
      ]
    }
  },
  "skip_labeling": true,
  "delete_labels": true
}
```

</details>

Be sure that Github Actions is enabled for in your repository's settings. Super Labeler will now run on your issues and pull requests.

## Index

- [super-labeler-action](#super-labeler-action)
  - [Getting Started](#getting-started)
  - [Index](#index)
  - [How it Works](#how-it-works)
  - [Config File Format](#config-file-format)
  - [Using Regex Patterns](#using-regex-patterns)
  - [Available Conditions](#available-conditions)
    - [Common Conditions](#common-conditions)
      - [creatorMatches](#creatormatches)
      - [descriptionMatches](#descriptionmatches)
      - [isLocked](#islocked)
      - [isOpen](#isopen)
      - [titleMatches](#titlematches)
    - [Pull Request Conditions](#pull-request-conditions)
      - [changesSize](#changessize)
      - [branchMatches](#branchmatches)
      - [filesMatch](#filesmatch)
      - [isDraft](#isdraft)
      - [pendingReview](#pendingreview)
    - [Issue Conditions](#issue-conditions)
  - [Running Locally](#running-locally)

## How it Works

Whenever Super Labeler runs, it will first add and update your repository's labels to match your config. Then it will go through each label's conditions to determine if it should apply or remove that label.

Each label has a list of conditions that must be met for it to be applied. You must specify the minimum number of conditions that must be met for the label to be applied.

Each label has a key, which can be different from it's name. This key should be in plaintext, and will be used to refer to the given label when defining your conditions. For example, given the following labels definition:

```json
{
  "labels": {
    "bugfix": {
      "name": "Bugfix! 🎉",
      "colour": "ff0000",
      "description": "Fixes a bug."
    }
  }
}
```

While the label's name, which will be displayed on Github, is "Bugfix! 🎉", to be able to easily refer to it from our conditions, we would use it's key, which is just `bugfix`:

```json
{
  "pr": {
    "bugfix": {
      "requires": 1,
      "conditions": [
        {
          "type": "branchMatches",
          "pattern": "^bugfix"
        }
      ]
    }
  }
}
```

## Config File Format

The config object contains three keys:

- `labels`: Your repository's labels, which will be automatically created and updated by Super Labeler
- `issue`: Labels to apply to issues, and their conditions
- `pr`: Labels to apply to pull requests, and their conditions

Take a look at the examples in this file to get a feel for how to configure it. The below Typescript interface, which is used by this action, may also be helpful:

<details>
  <summary><b>Click to show Typescript config interface</b></summary>

```ts
interface Config {
  labels: {
    [key: string]: {
      name: string
      colour: string
      description: string
    }
  }
  issue: {
    [key: string]: {
      requires: number
      conditions: IssueCondition[]
    }
  }
  pr: {
    [key: string]: {
      requires: number
      conditions: PRCondition[]
    }
  }
  skip_labeling: string
  delete_labels: boolean
}
```

</details>

## Using Regex Patterns

Many conditions use regular expressions (usually with a `pattern` parameter).
Since these regular expressions are passed in through JSON strings, there are
some things to pay attention to.

Special characters must be double escaped: `pattern: "\\W+$"` is equivalent to the Regex: `/\W+$/`.

If you want to use flags, use the following format: `pattern: "/^wip:/i"` is equivalent to the Regex: `/^wip:/i`.

## Available Conditions

<details>
<summary><b>Common Conditions</b></summary>

### Common Conditions

#### creatorMatches

Checks if an issue or pull request's creator's username matches a Regex pattern.

Example:

```json
{
  "type": "creatorMatches",
  "pattern": "^foo"
}
```

#### descriptionMatches

Checks if an issue or pull request's description matches a Regex pattern.

Example:

```json
{
  "type": "descriptionMatches",
  "pattern": "foo.*bar"
}
```

#### isLocked

Checks if an issue or pull request is locked.

Example:

```json
{
  "type": "isLocked",
  "value": true
}
```

#### isOpen

Checks if an issue or pull request is open or closed.

Example:

```json
{
  "type": "isOpen",
  "value": true
}
```

#### titleMatches

Checks if an issue or pull request's title matches a Regex pattern.

Example:

```json
{
  "type": "titleMatches",
  "pattern": "/^wip:/i"
}
```

</details>

<details>
<summary><b>Pull Request Conditions</b></summary>
  
### Pull Request Conditions

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

#### branchMatches

Checks if branch name matches a Regex pattern.

Example:

```json
{
  "type": "branchMatches",
  "pattern": "^bugfix\\/"
}
```

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

#### isDraft

Checks if a pull request is a draft.

Example:

```json
{
  "type": "isDraft",
  "value": true
}
```

#### pendingReview

Checks if a pull request has requested a review.

Example:

```json
{
  "type": "pendingReview",
  "value": true
}
```

</details>

<details>
<summary><b>Issue Conditions</b></summary>

### Issue Conditions

</details>

## Running Locally

Setting up local running is simple, however we **MUST** warn that building / packaging while using local scripts can cause your GITHUB_TOKEN to be included within the package. To avoid this happening please follow the steps correctly

1. Setup a secret on your repository named: `ACTIONS_STEP_DEBUG` value: `true`
2. Ensure the action after you created this secret
3. Clone this repository
4. Run `yarn install` or `npm install`
5. From the action logs find `Context for local running` copy the output into a file named `./context.json` at the root of the project.
6. Modify the `./config.sample.json` to contain your `GITHUB_TOKEN` and rename to `./config.json`
7. Run the script using `yarn run`
8. (Optional) For developing, make changes, then rebuild using `yarn build` or `yarn dev:run`
9. (Optional) If pushing changes to Github
   - Delete `./context.json`, `./config`, `./lib`, `./dist`.
   - Run `yarn dev:all`.

---

[back to top](#super-labeler-action)
