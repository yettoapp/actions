import * as core from '@actions/core'
import * as github from '@actions/github'

// Type definitions for Payloads
import type {
  PullRequestClosedEvent,
  IssuesClosedEvent
} from '@octokit/webhooks-definitions/schema'

import { gatherInputs } from './utils'
import { handleIssue, handlePr } from './github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const { projectNumber, owner, token, iterFieldName } = gatherInputs()
    const client = github.getOctokit(token)
    const event = github.context.payload

    if (github.context.eventName == 'issue') {
      await handleIssue(
        client,
        event as IssuesClosedEvent,
        projectNumber,
        owner,
        iterFieldName
      )
    } else if (github.context.eventName == 'pull_request') {
      await handlePr(
        client,
        event as PullRequestClosedEvent,
        projectNumber,
        owner,
        iterFieldName
      )
    } else {
      throw new Error('Only `pull_request` and `issue` events are supported.')
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
