##### ProjectCreateBranch

| Option       | Required | Description                     | Params                         |
| ------------ | -------- | ------------------------------- | ------------------------------ |
| onProject    | false    | Which project shoud be used     | `string`                       |
| onColumn     | false    | Which column should be used     | `string / number`              |
| branchPrefix | false    | Should the branch have a prefix | `string`                       |
| branchSuffix | false    | Should the branch have a suffix | `string`                       |
| branchName   | false    | Branch name                     | `'title' / 'short' / 'number'` |

`'title'` - Use the entire title
`'short'` - Use the first 3 words
`'number'` - Use the issue number
