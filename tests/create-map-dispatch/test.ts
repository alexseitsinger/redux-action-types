import configureMockStore from "redux-mock-store"

import { createMapDispatch } from "src"

import * as firstPageActions from "./app/pages/first/actions"

const mockStore = configureMockStore()

describe("createMapDispatch", () => {
  it("should wrap provided methods within a methods prop object", () => {
    const mapDispatch = createMapDispatch({
      methods: {
        firstPage: firstPageActions,
      },
    })

    const store = mockStore(undefined)
    const { dispatch } = store

    expect(mapDispatch(dispatch).methods.firstPage.addItem).toBeDefined()
  })
})
