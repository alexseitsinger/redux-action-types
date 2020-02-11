import createSectionReducer from "src/createSectionReducer"

import actionTypeSections from "../constants"

import sectionOneReducer from "./sections/one"
import sectionTwoReducer from "./sections/two"
import { ReducerState } from "./types"

export const defaultState: ReducerState = {
  one: {
    items: [],
  },
  two: {
    items: [],
  },
}

export default createSectionReducer({
  defaultState,
  sections: actionTypeSections,
  reducers: {
    one: sectionOneReducer,
    two: sectionTwoReducer,
  },
})
