import { AnyAction } from "redux"
import { isEqual } from "underscore"

import { CreateReducerReturnType } from "./createReducer"
import { SectionReducer, Sections, StateObject } from "./types"
import { isDefined, isNullish } from "./utils"

export interface Cases {
  [key: string]: {
    sectionName: string,
    sectionReducer: SectionReducer,
  };
}

export interface ReducerFactoryReturnType {
  addCase: (
    actionType: string,
    sectionReducer: SectionReducer,
    sectionName: string
  ) => void;
  reducer: CreateReducerReturnType;
  cases: Cases;
}

export default (
  defaultState = {},
  sections: Sections
): ReducerFactoryReturnType => {
  const cases = {}

  function addCase(
    actionType: string,
    sectionReducer: SectionReducer,
    sectionName: string
  ): void {
    if (isNullish(cases[actionType])) {
      cases[actionType] = { sectionName, sectionReducer }
    }
  }

  function reducer(state = defaultState, action: AnyAction): StateObject {
    const parentState = state

    const setParentState = (newState: StateObject): StateObject => {
      const nextState = { ...parentState, ...newState }
      // If objects are the same, avoid creating a new object reference by
      // returning the previous object, instead of a new one.
      if (isEqual(parentState, nextState)) {
        return parentState
      }
      return nextState
    }

    if (isDefined(cases[action.type])) {
      const { sectionName, sectionReducer } = cases[action.type]

      const sectionActionTypes = sections[sectionName]
      const sectionState = parentState[sectionName]

      const setSectionState = (newState: StateObject): StateObject => {
        return setParentState({
          [sectionName]: {
            ...sectionState,
            ...newState,
          },
        })
      }

      const reducedState = sectionReducer(
        action,
        sectionActionTypes,
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
    reducer,
    addCase,
    cases,
  }
}
