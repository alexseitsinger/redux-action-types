import _ from "underscore"
import { bindActionCreators } from "redux"


export function createMapDispatch(sections, mapMethod) {
  return dispatch => {
    const result = {}

    // convert each section provided into bound action creators.
    Object.keys(sections).forEach(sectionName => {
      const actionCreators = sections[sectionName]
      result[sectionName] = bindActionCreators({...actionCreators}, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    if (_.isFunction(mapMethod)) {
      return {
        ...result,
        ...mapMethod(dispatch),
      }
    }

    return result
  }
}
