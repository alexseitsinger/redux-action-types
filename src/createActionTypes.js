import _ from "underscore"

import {
  makeUppercaseUnderscored,
  createSuffixes,
} from "./utils"

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
  // Save each actionType to this object.
  const obj = {}

  // Prefix all prefixes with this symbol.
  const prefixSymbol = "@@"

  // Make sure our args are correct.
  // Re-arrange the args if we dont get a prefix.
  var finalPrefix = prefix
  var finalNames = names
  if((_.isArray(finalPrefix) === true) && (_.isArray(finalNames) === false)) {
    finalNames = finalPrefix
    finalPrefix = ""
  }

  // Make sure any prefixes start with '@@'
  if(finalPrefix.length && (finalPrefix.startsWith(prefixSymbol) === false)) {
    finalPrefix = `${prefixSymbol}${finalPrefix}`
  }

  // Iterate over each name passed and create the correct type string.  Add that
  // string to the object we're creating.
  finalNames.forEach(name => {
    if (_.isString(name)) {
      const formatted = makeUppercaseUnderscored(name)
      if(finalPrefix.length) {
        obj[formatted] = `${finalPrefix}/${formatted}`
      }
      else {
        obj[formatted] = formatted
      }
    }
    else if (_.isArray(name)) {
      const base = name[0]
      createSuffixes(name[1]).forEach(uppercase => {
        const formatted = makeUppercaseUnderscored(`${base}_${uppercase}`)
        if(finalPrefix.length) {
          obj[formatted] = `${finalPrefix}/${formatted}`
        }
        else {
          obj[formatted] = formatted
        }
      })
    }
  })

  // Return the object we created.
  return obj
}
