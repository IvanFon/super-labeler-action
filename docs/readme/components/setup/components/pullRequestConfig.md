#### PullRequestConfig

| Option             | Required | Description                                   | Params                                                   |
| ------------------ | -------- | --------------------------------------------- | -------------------------------------------------------- |
| ref                | false    | Overrides the reference                       | `string`                                                 |
| enforceConventions | false    | Enforces conventions                          | [`EnforceConventions`](#enforceconventions)              |
| labels             | false    | Apply labels automatically                    | [`[Key: string]: PRConditionConfig`](#prconditionconfig) |
| automaticApprove   | false    | Automatically approved PR based on conditions | [`AutomaticApprove`](#automaticapprove)                  |
| manageRelease      | false    | Manage releases                               | [`Release`](#release)                                    |
| duplicateHotfix    | false    | Duplicate a hotfix to the `main` branch       | [`[title: string]: DuplicateHotfix`](#duplicatehotfix)   |
| syncRemote         | false    | Syncronise a remote repository                | [`SyncRemote[]`](#syncremote)                            |
| assignProject      | false    | Automatically assign to projects              | [`AssignProject[]`](#assignproject)                      |
