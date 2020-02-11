import { isFunction } from "underscore"

import createSectionMasterReducer from "./createSectionMasterReducer"
import {
  ObjectOfAnything,
  ReduxReducer,
  SectionReducers,
  SectionsActionTypes,
} from "./types"

interface CreateReducerArguments {
  defaultState: ObjectOfAnything;
  sections: SectionsActionTypes;
  reducers: SectionReducers;
}

export default ({
  defaultState,
  sections,
  reducers,
}: CreateReducerArguments): ReduxReducer => {
  const { masterReducer, addCase } = createSectionMasterReducer(
    defaultState,
    sections
  )

  Object.keys(sections).forEach(sectionName => {
    const sectionReducer = reducers[sectionName]
    const section = sections[sectionName]

    Object.keys(section).forEach(key => {
      const actionType = section[key]

      if (isFunction(sectionReducer)) {
        addCase(actionType, sectionName, sectionReducer)
      }
    })
  })

  return masterReducer
}
