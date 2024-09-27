import * as core from '@actions/core'
import type { DocumentNode } from 'graphql/language/ast'

export interface ActionInputs {
  projectNumber: number
  owner: string
  token: string
  iterFieldName: string
}

export function castInputToNumber(inputName: string, input: string): number {
  const parsed = parseInt(input)

  if (isNaN(parsed)) {
    throw new Error(`${inputName} must be a number`)
  }

  return parsed
}

export function gatherInputs(): ActionInputs {
  const actionOptions: core.InputOptions = {
    trimWhitespace: true,
    required: true
  }

  const projectNumber = castInputToNumber(
    'projectNumber',
    core.getInput('', actionOptions)
  )
  const owner = core.getInput('owner', actionOptions)
  const iterFieldName = core.getInput('iterFieldName', actionOptions)
  const token = core.getInput('ghToken', actionOptions)

  return {
    projectNumber,
    owner,
    token,
    iterFieldName
  }
}

export function parseGqlQuery(node: DocumentNode): string {
  const query = node.loc?.source.body

  if (!query) {
    throw new Error(`${node.kind} query is missing a body!`)
  }

  return query
}
