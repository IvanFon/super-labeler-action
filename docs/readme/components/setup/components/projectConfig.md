#### ProjectConfig

| Option             | Required | Description                                    | Params                                                   |
| ------------------ | -------- | ---------------------------------------------- | -------------------------------------------------------- |
| ref                | false    | Overrides the reference                        | `string`                                                 |
| enforceConventions | false    | Enforces conventions                           | [`EnforceConventions`](#enforceconventions)              |
| labels             | false    | Apply labels automatically                     | [`[Key: string]: PRConditionConfig`](#prconditionconfig) |
| syncRemote         | false    | Syncronise remote projects (e.g. org projects) | [`ExProjects[]`](#exprojects)                            |
| openBranch         | false    | Create Branch based on config                  | [`ProjectCreateBranch`](#projectcreatebranch)            |
| assignMilestone    | false    | Automatically assign to milestones             | [`[milestone: string]: Milestones`](#milestones)         |
