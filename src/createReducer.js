import { reducerFactory } from "./reducerFactory"

/**
 * Creates a reducer for each actionType section.
 *
 * @param {object} initialState
 * The initial state to use for the reducer.
 * @param {object} sections
 * The actionType sections to create a reducer for.
 * @param {object} reducers
 * The reducers to use for each section.
 *
 * @returns {function}
 * A reducer function that delegates actions to the appropriate section reducer.
 *
 * @example
 * // pages/home/reducer/index.js
 * import { createReducer } from "@alexseitsinger/redux-action-types"
 * import { actionTypeSections } from "../types"
 * import initialState from "./state.json"
 * // or
 * const initialState = {
 *   users: {
 *     ...
 *   },
 *   tasks: {
 *     ...
 *   }
 * }
 *
 * export const homePageReducer = createReducer(initialState, actionTypeSections, {
 *   users: usersReducer,
 *   tasks: tasksReducer,
 * })
 */
export function createReducer(initialState, sections, reducers) {
  const { reducer, addCase, cases } = reducerFactory(initialState, sections)

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

