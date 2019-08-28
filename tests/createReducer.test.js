import { createActionTypeSections, createReducer } from "../src"

const actionTypeSections = createActionTypeSections("some-name", {
  sectionOne: [
    "add",
  ],
})

const initialState = {
  items: [],
}

const sectionOneReducer = (
  action, sectionState, setSectionState, parentState, setParentState
) => {
  switch (action.type) {
    case actionTypeSections.sectionOne.ADD: {
      return setSectionState({
        items: [
          ...sectionState.items,
          {name: "new-item"},
        ],
      })
    }
  }
}

const addItem = obj => ({
  type: actionTypeSections.sectionOne.ADD,
  obj,
})

describe("createReducer", () => {
  it("returns an object of sections for each set of actionTypes", () => {
    const reducer = createReducer(initialState, actionTypeSections, {
      sectionOne: sectionOneReducer,
    })
  })
})
