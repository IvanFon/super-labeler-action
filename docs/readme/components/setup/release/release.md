##### Release

| Option           | Required  | Description                                       | Params                                |
| ---------------- | --------- | ------------------------------------------------- | ------------------------------------- |
| labels           | sometimes | Defines the labels to use within automation tasks | [`ReleaseLabels`](#releaselabels)     |
| createTag        | false     | Should this action create a tag?                  | `boolean`                             |
| createRelease    | false     | Create a github release                           | [`CreateRelease`](#createrelease)     |
| createMilestones | false     | Create a milestone                                | [`CreateMilestone`](#createmilestone) |
| createPackages   | false     | Commands to use when creating packages            | `String[] / string`                   |
| createChangelog  | false     | Create a changelog                                | [`Changelog`](#changelog)             |
