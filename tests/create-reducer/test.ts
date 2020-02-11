import firstPageReducer from "tests/create-reducer/app/pages/first/reducer"
import secondPageReducer from "tests/create-reducer/app/pages/second/reducer"

import actionTypes from "./app/pages/first/constants"
import actionTypeSections from "./app/pages/second/constants"

const newItem1 = {
  name: "new-item-1",
}

describe("createReducer", () => {
  it("should return the correct state for an action using the flat reducer", () => {
    const preloadedState = {
      items: [],
    }
    const addItemAction = {
      type: actionTypes.ADD,
      obj: newItem1,
    }

    expect(firstPageReducer(preloadedState, addItemAction)).toStrictEqual({
      items: [newItem1],
    })
  })

  it("should add a new item to section one when action matches", () => {
    const preloadedState = {
      one: {
        items: [],
      },
      two: {
        items: [],
      },
    }

    const addToSectionOne = {
      type: actionTypeSections.one.ADD,
      obj: newItem1,
    }

    expect(secondPageReducer(preloadedState, addToSectionOne)).toStrictEqual({
      one: {
        items: [newItem1],
      },
      two: {
        items: [],
      },
    })
  })

  it("should add a new item to section two when action matches", () => {
    const preloadedState = {
      one: {
        items: [],
      },
      two: {
        items: [],
      },
    }

    const addToSectionTwo = {
      type: actionTypeSections.two.ADD,
      obj: newItem1,
    }

    expect(secondPageReducer(preloadedState, addToSectionTwo)).toStrictEqual({
      one: {
        items: [],
      },
      two: {
        items: [newItem1],
      },
    })
  })
})
