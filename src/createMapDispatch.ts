import { bindActionCreators, Dispatch } from "redux"
import { isFunction } from "underscore"

import { dashToCamelCase, isNullish } from "./utils"

interface Methods {
  // { method_name: func }
  [key: string]: any;
}

interface NestedMethods {
  // { section_name: { method_name: func } }
  [key: string]: Methods;
}

interface PageDispatchProps {
  //{ methods: { section_name: { method_name: func } } }
  methods: Methods | NestedMethods;
}

type CreateMapDispatchReturnType = (
  dispatch: Dispatch
) => PageDispatchProps

interface CreateMapDispatchArguments {
  methods: {
    // name
    [key: string]: (Methods | NestedMethods),
  };
  mapDispatch?: (dispatch: Dispatch) => Methods | NestedMethods;
}

export default ({
  methods,
  //mapDispatch,
}: CreateMapDispatchArguments): CreateMapDispatchReturnType => {
  //const camelCasedPageName = dashToCamelCase(pageName)
  return (dispatch: Dispatch): PageDispatchProps => {
    if (isNullish(dispatch)) {
      throw new Error("Dispatch is missing!")
    }

    // convert each section provided into bound action creators.
    const bound: NestedMethods = {}
    Object.keys(methods).forEach((targetName: string) => {
      // Convert the name to camel-cased (incase its hyphenated).
      const camel = dashToCamelCase(targetName)
      if (!(camel in bound)) {
        bound[camel] = {}
      }

      // Get the current object under the current name.
      const current = methods[camel]

      // If every item is a function, assume its a flat object.
      if (Object.keys(current).every(key => isFunction(current[key]))) {
        bound[camel] = bindActionCreators((current as Methods), dispatch)
      }

      // Otherwise, assume its a section.
      else {
        Object.keys(current).forEach((sectionName: string) => {
          const section = current[sectionName]

          bound[camel][sectionName] = bindActionCreators(section, dispatch)
        })
      }
    })

    const result = {
      ...bound,
    }

    /**
     * Wrap all of our dispatch-wrapped action creators in an object named
     * 'methods' for easy organization within a connected component's props.
     *
     * If we also get a mapper function, invoke it to add to the state.
    let mapped
    if (isFunction(mapDispatch)) {
      mapped = mapDispatch(dispatch)
    }
     */

    //
    // Object.keys(mapped).forEach((key: string): void => {
    // const camel = dashToCamelCase(key)
    // console.log(camel)
    //
    // if ((camel in result) && (camel in mapped)) {
    //     result[camel] = {
    //       ...result[camel],
    //       ...mapped[camel],
    //     }
    // }
    // else {
    //     result = {
    //       ...result,
    //       ...mapped,
    //     }
    // }
    // })
    //

    return {
      methods: result,
    }
  }
}
