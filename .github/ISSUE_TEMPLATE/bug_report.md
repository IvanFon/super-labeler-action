---
name: Bug report
about: Report a bug with Super Labeler
title: ''
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Config**
Add your `labels.json` config and Github Actions workflow:

```json
{
  insert labels.json here
}
```

```yaml
insert workflow here
```

**Github Actions Output**
Please [set the `ACTIONS_RUNNER_DEBUG` secret to `true` to enable debug logging](https://help.github.com/en/actions/configuring-and-managing-workflows/managing-a-workflow-run#enabling-debug-logging), rerun the labeler workflow, and paste the output below:

```
insert debug output here
```

If your repo is public, you may also enable debug logging, rerun the workflow, and link the check run here.

**Additional context**
Add any other context about the problem here.
