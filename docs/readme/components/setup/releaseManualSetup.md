### Manual setup

Create a new Github Actions workflow at `.github/workflows/action.yml`:

_Note: `actions/checkout` must be run first so that the release action can find your config file._

```yaml
on:
  issues:
  pull_request:
  project_card:

jobs:
  release:
    runs-on: ubuntu-latest
    name: Mastermind behind all realse actions
    steps:
      - uses: actions/checkout@v2
      - uses: Videndum/release-mastermind@latest
        with:
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          config: .github/allconfigs.json
```

Now create the config file at `.github/config.json`:

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

Be sure that Github Actions is enabled for in your repository's settings. The action will now run on your issues, projects and pull requests.
