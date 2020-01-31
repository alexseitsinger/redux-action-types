import { AnyAction } from "redux"
import { isFunction } from "underscore"

import reducerFactory from "./reducerFactory"
import { FlatSection,SectionReducer, SectionReducers, Sections, StateObject } from "./types"

export interface CreateReducerArguments {
  defaultState: StateObject;
  sections: Sections;
  reducers: SectionReducers | SectionReducer;
}

export type CreateReducerReturnType = (
  state: StateObject,
  action: AnyAction
) => StateObject

export default ({
  defaultState,
  sections,
  reducers,
}: CreateReducerArguments): CreateReducerReturnType => {
  const { reducer, addCase } = reducerFactory(defaultState, sections)

  // If we get a single function as the reducers value, assume its a single,
  // non-section reducer to create.
  if (isFunction(reducers)) {
    const targetReducer = reducers

    Object.keys(sections).forEach(key => {
      const actionType = (sections as FlatSection)[key]
      const first = actionType.split("/").shift()
      if (first !== undefined) {
        addCase(actionType, targetReducer, first)
      }
    })
  }

  // Otherwise, assume its a section object.
  else {
    Object.keys(sections).forEach(sectionName => {
      const sectionReducer = reducers[sectionName]
      const section = sections[sectionName]

      Object.keys(section).forEach(key => {
        const actionType = section[key]

        if (isFunction(sectionReducer)) {
          addCase(actionType, sectionReducer, sectionName)
        }
      })
    })
  }

  return reducer
}
