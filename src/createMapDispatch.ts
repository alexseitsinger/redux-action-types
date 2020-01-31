import { bindActionCreators, Dispatch } from "redux"
import { isEqual, isFunction } from "underscore"

import { dashToCamelCase, isDefined, isNullish } from "./utils"

export type ActionCreator = (...args: any) => any

export interface BoundActionCreators {
  [key: string]: {
    [key: string]: ActionCreator,
  };
}

export type MapMethods = (
  dispatch: Dispatch
) => {
  [key: string]: ActionCreator,
}

export interface SectionActions {
  [key: string]: {
    [key: string]: ActionCreator,
  };
}

export interface MappedMethods {
  methods: BoundActionCreators;
}

export type CreateMapDispatchReturnType = (dispatch: Dispatch) => MappedMethods

export interface CreateMapDispatchArguments {
  pageName: string;
  sections: SectionActions;
  mapMethods?: MapMethods;
}

export default ({
  pageName,
  sections,
  mapMethods,
}: CreateMapDispatchArguments): CreateMapDispatchReturnType => {
  const camelCasedPageName = dashToCamelCase(pageName)
  let lastResult: MappedMethods

  return (dispatch: Dispatch): MappedMethods => {
    if (isNullish(dispatch)) {
      throw new Error("Dispatch is missing!")
    }

    // convert each section provided into bound action creators.
    const bound: BoundActionCreators = {}
    Object.keys(sections).forEach((sectionName: string) => {
      const actionCreators = sections[sectionName]
      bound[sectionName] = bindActionCreators(actionCreators, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    var mapped = {}
    if (isFunction(mapMethods)) {
      mapped = mapMethods(dispatch)
    }

    /**
     * Wrap all of our dispatch-wrapped action creators in an object named
     * 'methods' for easy organization within a connected component's props.
     */
    let methods = {}
    if (isDefined(camelCasedPageName)) {
      methods[camelCasedPageName] = {
        ...bound,
        ...mapped,
      }
    } else {
      methods = {
        ...bound,
        ...mapped,
      }
    }

    const nextResult = { methods }
    if (isEqual(lastResult, nextResult)) {
      return lastResult
    }

    lastResult = nextResult
    return nextResult
  }
}
