import { Dispatch } from "redux"
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
      mapDispatch: (dispatch: Dispatch) => ({
        firstPage: {
          goBack: (): void => {
            dispatch({ type: "GO_BACK" })
          },
        },
      }),
    })

    const store = mockStore(undefined)
    const { dispatch } = store

    const mapped = mapDispatch(dispatch)

    expect(mapped.methods.firstPage.addItem).toBeDefined()
    expect(mapped.methods.firstPage.goBack).toBeDefined()
  })
})
