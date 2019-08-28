import _ from "underscore"

import {
  makeLowercaseDashed,
  makeUppercaseUnderscored,
  createSuffixes,
  normalize,
} from "./utils"

/**
 * @description Creates an object of actionType names.
 *
 * @return {Object} Returns an object of actionTypes.
 *
 * @param {object} args
 * @param {string} args.prefix
 * The prefix to add to each name to create the action type.
 * @param {array} args.names
 * The collection of names to use to generate full action types.
 *
 * @example
 * // actions/landing/types.js
 * import { createActionTypes } from "@alexseitsinger/redux-action-types"
 *
 * export const actionTypes = createActionTypes("landing-page", [
 *   ["login-form", [
 *     ["completed", [
 *       "success",
 *       "failure",
 *     ]],
 *   ]],
 * ])
 *
 * // returns...
 * //
 * // {
 * //   LOGIN_FORM_COMPLETED_SUCCESS: "landing-page/LOGIN_FORM_COMPLETED_SUCCESS",
 * //   LOGIN_FORM_COMPLETED_FAILURE: "landing-page/LOGIN_FORM_COMPLETED_FAILURE",
 * // }
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
  if (_.isArray(prefix)) {
    names = prefix
    prefix = ""
  }

  const result = {}

  names.forEach(name => {
    if (_.isString(name)) {
      const constant = makeUppercaseUnderscored(name)
      //const lowercased = makeLowercaseDashed(constant)
      const normalized = normalize(`${prefix}/${constant}`)
      result[constant] = normalized
    }
    else if (_.isArray(name)) {
      const base = name[0]
      createSuffixes(name[1]).forEach(uppercase => {
        const string = `${base}_${uppercase}`
        const constant = makeUppercaseUnderscored(string)
        //const lowercased = makeLowercaseDashed(constant)
        const normalized = normalize(`${prefix}/${constant}`)
        result[constant] = normalized
      })
    }
  })

  return result
}


