import { actionTypeSectionsReducerFactory } from "./actionTypeSectionsReducerFactory"

export function createActionTypeSectionsReducer({
  actionTypeSections, reducerSections, initialState,
}) {
  // create a new switch to use
  const { reducer, addCase } = actionTypeSectionsReducerFactory(initialState)

  // Create a switch for each section by connecting it wieht a reducer.
  Object.keys(actionTypeSections).forEach(sectionName => {
    const sectionReducer = reducerSections[sectionName]
    const sectionActionTypes = actionTypeSections[sectionName]

    Object.keys(sectionActionTypes).forEach(sectionActionTypeName => {
      const sectionActionType = sectionActionTypes[sectionActionTypeName]
      addCase({ sectionActionType, sectionName, sectionReducer })
    })
  })

  return reducer
}

