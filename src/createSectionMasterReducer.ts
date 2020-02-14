import { AnyAction } from "redux"
import { isEqual } from "underscore"

import createCaseManager, { Case } from "./createCaseManager"
import { NestedObjectOfStrings,ObjectOfAnything, ReduxReducer, SectionReducer } from "./types"
import { isDefined } from "./utils"

interface Returned {
  addCase: (
    actionType: string,
    sectionName: string,
    sectionReducer: SectionReducer
  ) => void;
  getCase: (actionType: string) => Case;
  assertCase: (actionType: string) => boolean;
  masterReducer: ReduxReducer;
}

export default (defaultState: ObjectOfAnything, sections: NestedObjectOfStrings): Returned => {
  const { assertCase, addCase, getCase } = createCaseManager()

  const masterReducer = (state = defaultState, action: AnyAction): ObjectOfAnything => {
    const parentState = state

    // Make sure states received and returned match the shape of the original
    // state object.
    type ParentState = {
      [P in keyof typeof parentState]: typeof parentState[P]
    }

    const setParentState = (newState: ParentState): ParentState => {
      const nextState = { ...parentState, ...newState }
      // If objects are the same, avoid creating a new object reference by
      // returning the previous object, instead of a new one.
      if (isEqual(parentState, nextState)) {
        return parentState
      }
      return nextState
    }

    if (assertCase(action.type)) {
      const { sectionName, sectionReducer } = getCase(action.type)

      const section = sections[sectionName]
      const sectionState = parentState[sectionName]

      // Make sure states received and returned match the shape of the original
      // state object.
      type SectionState = {
        [P in keyof typeof sectionState]: typeof sectionState[P]
      }

      const setSectionState = (newState: SectionState): SectionState => {
        return setParentState({
          [sectionName]: {
            ...sectionState,
            ...newState,
          },
        })
      }

      const reducedState = sectionReducer(
        action,
        section,
        sectionState,
        setSectionState,
        parentState,
        setParentState
      )

      if (isDefined(reducedState)) {
        return reducedState
      }
    }

    return parentState
  }

  return {
    masterReducer,
    addCase,
    getCase,
    assertCase,
  }
}
