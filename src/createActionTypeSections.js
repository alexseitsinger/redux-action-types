import { createActionTypes } from "./createActionTypes"
import { makeLowercaseDashed } from "./utils"

/**
 * Creates an object of actionTypes split up into sections for each naming and
 * use with reducers and actions.
 *
 * @param {string} prefix
 * The base name to prefix each section with.
 * @param {object} sections
 * An object of name/value pairs to combine into single actionTypes.
 *
 * @returns {object}
 * An object of key/value pairs for each section with their actionTypes.
 *
 * @example
 * // pages/home/types/lib/tasks.js
 * export const tasksActionTypeNames = [
 *   "add",
 *   "add-many",
 *   ["add-form", [
 *     ["completed", [
 *       "success",
 *       "failure",
 *     ]],
 *   ]],
 * ]
 *
 * // pages/home/types/lib/users.js
 * export const usersActionTypeNames = [
 *   "remove",
 *   "add",
 *   "add-many",
 *   ["delete", [
 *     "success",
 *     "failure",
 *   ]],
 * ]
 *
 * pages/home/types/index.js
 * import { createActionTypeSetions } from "@alexseitsinger/redux-action-types"
 *
 * import { usersActionTypeNames } from "./lib/users"
 * import { tasksActionTypeNames } from "./lib/tasks"
 *
 * export const actionTypeSections = createActionTypeSections("home-page", {
 *   users: usersActionTypeNames,
 *   tasks: tasksActionTypeNames,
 * })
 *
 * // returns...
 * // {
 * //   tasks: {
 * //     ADD: "home-page/tasks/ADD",
 * //     ADD_MANY: "home-page/tasks/ADD_MANY",
 * //     ADD_FORM_COMPLETED_SUCCESS:
 * 'home-page/tasks/ADD_FORM_COMPLETED_SUCCESS",
 * //     ADD_FORM_COMPLETED_FAILURE:
 * "home-page/tasks/ADD_FORM_COMPLETED_FAILURE,
 * //   },
 * //   users: {
 * //     REMOVE: "home-page/users/REMOVE",
 * //     ADD: "home-page/users/ADD",
 * //     ADD_MANY: "home-page/users/ADD_MANY",
 * //     DELETE_SUCCESS: "home-page/users/DELETE_SUCCESS",
 * //     DELETE_FAILURE: "home-page/users/DELETE_FAILURE",
 * //   },
 * // }
 */
export function createActionTypeSections(prefix, sections) {
  const result = {}

  Object.keys(sections).forEach(sectionName => {
    const updatedActionTypes = {}

    const uppercased = sectionName.toUpperCase()
    const sectionNameUppercased = `${uppercased}_`

    const lowercased = makeLowercaseDashed(sectionName)
    const sectionPrefixLowercased = `${prefix}/${lowercased}`
    const sectionActionTypes = createActionTypes(
      sectionPrefixLowercased, sections[sectionName]
    )

    Object.keys(sectionActionTypes).forEach(name => {
      const value = sectionActionTypes[name]

      if (name.startsWith(sectionNameUppercased)) {
        const constant = name.replace(sectionNameUppercased, "")
        updatedActionTypes[constant] = value
      }
      else {
        updatedActionTypes[name] = value
      }
    })

    // Add the updated section action types to the object that is returned.
    result[sectionName] = updatedActionTypes
  })

  return result
}

