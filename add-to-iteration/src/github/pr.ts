import { GitHub } from '@actions/github/lib/utils'
import { PullRequestClosedEvent } from '@octokit/webhooks-definitions/schema'
import {
  GetProjectAndFieldByNumber,
  AddItemToProject,
  UpdateIterFieldValueOnItem
} from 'src/generated/graphql';
import { Organization, AddProjectV2ItemByIdPayload, UpdateProjectV2ItemFieldValuePayload } from "@octokit/graphql-schema";
import { parseGqlQuery } from 'src/utils';

export async function handlePr(
  client: InstanceType<typeof GitHub>,
  event: PullRequestClosedEvent,
  projectNumber: number,
  owner: string,
  iterFieldName: string,
): Promise<void> {
  const getProjectInfoQuery = parseGqlQuery(GetProjectAndFieldByNumber)
  const addIssueToProjectMutation = parseGqlQuery(AddItemToProject)
  const updateIterFieldValueMutation = parseGqlQuery(UpdateIterFieldValueOnItem)

  const org = await client.graphql<Organization>(getProjectInfoQuery, {
    projectNumber,
    owner,
    iterFieldName,
  })

  if (!org.projectV2?.id || !org.projectV2?.field?.id) {
    throw new Error("The Inputs did not return a project or iterfield")
  }

  // Now that we know these fields came back, destructure them
  const { id: projectId, field: { id: fieldId } } = org.projectV2

  // Add the issue to the project
  const newProjectItem = await client.graphql<AddProjectV2ItemByIdPayload>(
    addIssueToProjectMutation,
    {
      item: {
        projectId,
        contentId: event.pull_request.node_id,
      }
    }
  )

  if (!newProjectItem.item) {
    throw new Error("No Item returned from the API for that projectId or issue")
  }

  const { item: { id: itemId } } = newProjectItem

  const updatedItemWithIterField = await client.graphql<UpdateProjectV2ItemFieldValuePayload>(
    updateIterFieldValueMutation,
    {
      item: {
        projectId,
        fieldId,
        itemId,
      }
    }
  )
}
