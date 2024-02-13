export function queryProjectAndIterFieldIds(
  projectNumber: number,
  iterFieldName: string,
  owner: string
): [string, any] {
  return [`
    query GetProjectAndFieldByNumber($projectNumber: Int!, $iterFieldName: String!, $owner: String!) {
      organization(login: $owner) {
        projectV2(number: $projectNumber) {
          id
          field(name: $iterFieldName) {
            ... on ProjectV2IterationField {
              id
              name
              configuration {
                iterations {
                  id
                  title
                  startDate
                }
              }
            }
          }
        }
      }
    }`,
    {
      projectNumber,
      iterFieldName,
      owner
    }
  ]
}
