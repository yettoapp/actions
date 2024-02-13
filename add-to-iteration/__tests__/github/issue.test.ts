import * as nock from 'nock';

nock("api.github.com")
  .persist()
  .post("/graphql")

describe("", () => {
  it("does stuff", () => { })
})
