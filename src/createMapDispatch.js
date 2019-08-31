import _ from "underscore"
import { bindActionCreators } from "redux"

/**
 * Creates a mapDispatch function for the actionType sections.
 *
 * @param {string} [prefix]
 * The page name to save each method into.
 * @param {object} sections
 * The actionType sections actions.
 * @param {function} mapMethod
 * An extra method to run to create extra dispatched methods.
 *
 * @returns {function}
 * A function that maps dispatch to each action provided for each section.
 *
 * @example
 * import { createMapDispatch } from "@alexseitsinger/redux-action-types"
 *
 * import * as usersActions from "./actions/users"
 * import * as tasksActions from "./actions/tasks"
 *
 * export const mapDispatch = createMapDispatch("home-page", {
 *   users: usersActions,
 *   tasks: tasksActions,
 * })
 */
export function createMapDispatch(prefix, sections, mapMethod) {
  if (_.isArray(prefix)) {
    mapMethod = sections
    sections = prefix
    prefix = ""
  }
  return dispatch => {
    // convert each section provided into bound action creators.
    const bound = {}
    Object.keys(sections).forEach(sectionName => {
      const actionCreators = sections[sectionName]
      bound[sectionName] = bindActionCreators({...actionCreators}, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    if (_.isFunction(mapMethod)) {
      if (prefix) {
        return {
          methods: {
            [prefix]: {
              ...bound,
              ...mapMethod(dispatch),
            },
          },
        }
      }
      return {
        methods: {
          ...bound,
          ...mapMethod(dispatch),
        }
      }
    }

    if (prefix) {
      return {
        methods: {
          [prefix] : {
            ...bound,
          }
        }
      }
    }
    return {
      methods: bound,
    }
  }
}
