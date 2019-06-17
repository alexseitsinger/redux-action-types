import _ from "underscore"

import { createActionTypeSuffixes } from "./createActionTypeSuffixes"


/**
 * @description Creates an object of actionType names.
 * @param {String} prefix The prefix to use for all these action types.
 * @param {Array} names The array of name parts to use to create the action
 * types.
 * @return {Object} Returns an object of actionTypes.
 * @example
 * // actions/landing/types.js
 * import { createActionTypes } from "@alexseitsinger/redux-action-types"
 *
 * export const actionTypes = createActionTypes("landing", [
 *  ["login-form", [
 *    ["completed", [
 *      "success",
 *      "failure",
 *    ]],
 *  ]]
 * ])
 *
 * //
 * // returns...
 * //
 * // {
 * //   LOGIN_FORM_COMPLETED_SUCCESS: "@@landing/LOGIN_FORM_COMPLETED_SUCCESS",
 * //   LOGIN_FORM_COMPLETED_FAILURE: "@@landing/LOGIN_FORM_COMPLETED_FAILURE",
 * // }
 * //
 *
 * // actions/landing/index.js
 * import { actionTypes } from "./types"
 *
 * export function setLoginFormCompletedSuccess(bool) {
 *   return {
 *     type: actionTypes.LOGIN_FORM_COMPLETED_SUCCESS,
 *     bool,
 *   }
 * }
 *
 * export function setLoginFormCompletedFailure(bool) {
 *   return {
 *     type: actionTypes.LOGIN_FORM_COMPLETED_FAILURE,
 *     bool,
 *   }
 * }
 *
 * // reducers/landing/index.js
 * import { actionTypes } from "../../actions/landing/types"
 *
 * export function landingReducer(state = initialState, action) {
 *   switch (action.type) {
 *     default: {
 *       return state
 *     }
 *     case actionTypes.LOGIN_FORM_COMPLETED_SUCCESS: {
 *       return {
 *         ...state,
 *         loginFormCompletedSuccess: action.bool,
 *       }
 *     }
 *     case actionTypes.LOGIN_FORM_COMPLETED_FAILURE: {
 *       return {
 *         ...state,
 *         loginFormCompletedFailure: action.bool,
 *       }
 *     }
 *   }
 * }
 */
export function createActionTypes(prefix, names) {
  // Save each type string we create to a new object.
  const obj = {}

  // Make sure our prefix starts with the symbols.
  var finalPrefix = prefix
  if (!finalPrefix.startsWith("@@")) {
    finalPrefix = `@@${finalPrefix}`
  }

  // Iterate over each name passed and create the correct type string.  Add that
  // string to the object we're creating.
  names.forEach(name => {
    if (_.isString(name)) {
      const uppercase = name.toUpperCase()
      const underscored = uppercase.replace(/-/g, "_")
      const path = `${finalPrefix}/${underscored}`
      obj[underscored] = path
    }
    else if (_.isArray(name)) {
      const base = name[0]
      createActionTypeSuffixes(name[1]).forEach(uppercase => {
        const full = `${base}_${uppercase}`.toUpperCase()
        const suffix = full.replace(/-/g, "_")
        obj[suffix] = `${finalPrefix}/${suffix}`
      })
    }
  })

  // Return the object we created.
  return obj
}
