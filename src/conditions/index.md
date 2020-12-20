## Available Conditions

For complex conditions, you can use conditional options such as `only`, `$and` and `$or`. They can be found within the common conditions section.

### Common Conditions

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

### Pull Request Conditions

#### branchMatches

Checks if branch name matches a Regex pattern.

Example:

```json
{
  "type": "branchMatches",
  "pattern": "^bugfix\\/"
}
```

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
