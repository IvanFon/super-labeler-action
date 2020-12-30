# Label Collection

The super-powered labeler for Github Actions, with complex customisable conditions for PR, Issues and Projects.

## Index

<!-- toc -->

## Features

Label Mastermind is capable of the following:

- Create, Update, Delete Labels declaratively from Config file or JSON String
- Apply Labels based on conditions:
  - Pull Releases
  - Issues
  - Project Cards

Label Mastermind is designed to work in combination with other Videndum Studios Projects. Check out our [Universal Workflows Project](https://github.com/Videndum/Universal-GitAction-Workflows)

<!-- #include docs/readme/components/support.md -->
<!-- #include docs/readme/components/backlog.md -->
<!-- #include docs/readme/components/runningLocally.md -->

## Getting Started

> [!IMPORTANT]
> It is **Extremely** important to understand while using this template, most of the code within `.github/` will automatically update within a new pull request whenever the [template repository](https://github.com/Videndum/Universal-GitAction-Workflows) is updated.

<!-- #include docs/readme/components/setup/automaticSetup.md -->

### Manual setup

Create a new Github Actions workflow at `.github/workflows/main.yml`:

_Note: `actions/checkout` must be run first so that the release action can find your config file._

<details>
    <summary><b>main.yml</b></summary>

<!-- #code .github/workflows/main.yml -->

</details>

Now create the config file at `.github/config.json`:

<details>
    <summary><b>Our runners config</b></summary>

<!-- #code .github/config/runners.json -->

</details>

Be sure that Github Actions is enabled for in your repository's settings. The action will now run on your issues, projects and pull requests.

<!-- #include docs/readme/components/workflowConfig.md -->
<!-- #include docs/readme/components/setup/labelConfig.md -->

#### Typings

<details>
    <summary><b>Types</b></summary>

<!-- #code types/*.d.ts -->

</details>

<!-- #include docs/readme/components/regex.md -->
<!-- #include src/conditions/index.md -->

## Final Note

Thank you for taking the time to look through this repository. If you have liked what you have found, please would you favourite & share. Ideally I would like to get a community behind this project which can ensure that it is maintained, updated and improved as GitActions get more suffisticated.

This project took heavy infulence from [IvanFon/super-labeler-action](https://github.com/IvanFon/super-labeler-action) which we are actively maintaining on our fork here: [Videndum/label-mastermind](https://github.com/Videndum/label-mastermind). We invite any of the team who worked on his project to come onboard with our version and intend to continue maintaining for a significant while.
