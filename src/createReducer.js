import { reducerFactory } from "./reducerFactory"

export function createReducer(initialState, sections, reducers) {
  const { reducer, addCase, cases } = reducerFactory(initialState)

  Object.keys(sections).forEach(sectionName => {
    const reducer = reducers[sectionName]
    const actionTypes = sections[sectionName]

    Object.keys(actionTypes).forEach(actionTypeName => {
      const actionType = actionTypes[actionTypeName]
      addCase(actionType, reducer, sectionName)
    })
  })

  return reducer
}

