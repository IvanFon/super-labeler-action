##### CreateRelease

| Option            | Required | Description                                        | Params                    |
| ----------------- | -------- | -------------------------------------------------- | ------------------------- |
| includeIssues     | false    | Should issues be included in release               | `boolean`                 |
| sections          | false    | The sections configureation                        | [`Sections[]`](#sections) |
| tagName           | false    | The name of the tag to create                      | `string`                  |
| tagPrefix         | false    | The prefix before the tagName                      | `string`                  |
| releaseName       | false    | The name of the release                            | `string`                  |
| releaseNamePrefix | false    | The prefix before the releaseName                  | `string`                  |
| releaseNameSuffix | false    | The Suffex before the releaseName                  | `string`                  |
| draft             | false    | Should the release be draft                        | `boolean`                 |
| prerelease        | false    | Should the release be a prerelease                 | `boolean`                 |
| useChangelog      | false    | Should the release use the changelog configuration | `boolean`                 |
