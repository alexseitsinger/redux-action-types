import { AnyAction } from "redux"
import { isFunction } from "underscore"

import reducerFactory from "./reducerFactory"
import { SectionReducers, Sections, StateObject } from "./types"

export interface CreateReducerArguments {
  defaultState: StateObject;
  sections: Sections;
  reducers: SectionReducers;
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

  return reducer
}
