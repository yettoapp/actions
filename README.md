# GitHub Actions developed for Yetto development

In this repository are a list of actions which we've found useful while building Yetto!

You can find more information about the specific inputs and outputs of each workflow in the corresponding folders, but a general overview of each action is defined below.

## Reusable workflows

- _automerge_dependabot_: Automerge logic for Dependabot
- _automerge_sisyphuysbot_: Automerge logic for Sisyphus
- _browserlist_: Logic to update browserlistrc
- _ruby_gem_release_: Logic to release a Ruby gem
- _ruby_security_checks_: Logic to run Ruby security checks

## Composable actions

- _pr-contains-files_: Checks whether a PR contains modifications for a specific file
- _run-license-verify_: Runs a licensed command to check whether OSS license is up-to-date
- _run-ruby-tests_: Runs Ruby test suites
- _run-sorbet-update_: Updates any Sorbet definitions
- _setup-languages_: Sets up language definitions
- _send-honeycomb-marker_: Create a Honeycomb Marker of any type in a specified dataset
