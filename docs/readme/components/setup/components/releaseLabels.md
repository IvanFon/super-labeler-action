##### ReleaseLabels

| Option     | Required | Description                                                                                                              | Params   |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| build      | true     | A tag to represent dependencies updates and insignificant changes                                                        | `string` |
| prerelease | true     | A tag to represent a prerelease of the next version.                                                                     | `string` |
| patch      | true     | A tag to represent a Patch version to be incremented due to backwards compatible bug fixes are introduced.               | `string` |
| minor      | true     | A tag to represent a Minor version to be incremented due to substantial new functionality or improvements are introduced | `string` |
| major      | true     | A tag to represent a Major version to be incremented due to of backwards incompatible changes are introduced             | `string` |
| breaking   | true     | A tag to represent a breaking change                                                                                     | `string` |
