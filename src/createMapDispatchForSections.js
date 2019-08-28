import _ from "underscore"
import { bindActionCreators } from "redux"


export function createMapDispatchForSections(sections, mapMethod) {
  return dispatch => {
    const methods = {}

    // convert each section provided into bound action creators.
    Object.keys(sections).forEach(sectionName => {
      const actionCreators = sections[sectionName]
      methods[sectionName] = bindActionCreators({...actionCreators}, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    if (_.isFunction(mapMethod)) {
      return {
        methods: {
          ...methods,
          ...mapMethods(dispatch),
        }
      }
    }

    return {
      methods: methods,
    }
  }
}
