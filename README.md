# super-labeler-action

A superpowered issue and pull request labeler for Github Actions.

## Example Workflow

```yaml
on:
  pull_request:
    types: [opened, ready_for_review]

jobs:
  test:
    runs-on: ubuntu-latest
    name: Super Labeler
    steps:
      - uses: actions/checkout@v2
      - uses: IvanFon/super-labeler-action@master
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
```

## Example Config

Place your config at `.github/labels.json`.

```json
{
  "labels": {
    "bugfix": {
      "name": "bugfix",
      "colour": "#abcdef",
      "description": "Fixes a bug"
    },
    "draft": {
      "name": "draft",
      "colour": "#abcdef",
      "description": "Is a draft pull request"
    }
  },
  "pr": {
    "bugfix": {
      "requires": 1,
      "conditions": [
        {
          "type": "branchMatches",
          "pattern": "^bugfix\\/"
        }
      ]
    },
    "draft": {
      "requires": 1,
      "conditions": [
        {
          "type": "isDraft",
          "value": true
        }
      ]
    }
  }
}
```
