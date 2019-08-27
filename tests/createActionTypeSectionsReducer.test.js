import { createActionTypeSectionsReducer } from "../src"

const actionTypeSections = createActionTypeSections("some-name", {
  sectionOne: [
    "add",
  ],
})

const initialState = {
  someKey: true,
}

const sectionOneReducer = (action, sectionState, setSectionState, parentState, setParentState) => {
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

describe("createActionTypeSectionsReducer", () => {
  it("returns an object of sections for each set of actionTypes", () => {
    const reducer = createActionTypeSectionsReducer({
      initialState,
      actionTypeSections,
      reducerSections: {
        sectionOne: sectionOneReducer,
      }
    })
  })
})
