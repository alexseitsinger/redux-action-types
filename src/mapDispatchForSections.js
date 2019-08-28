import _ from "underscore"
import { bindActionCreators } from "redux"


export function mapDispatchForSections(sections, mapMethod) {
  return dispatch => {
    const result = {
      methods: {
        // sections names go here.
      },
    }

    // convert each section provided into bound action creators.
    Object.keys(sections).forEach(sectionName => {
      const actionCreators = sections[sectionName]
      result[sectionName] = bindActionCreators({...actionCreators}, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    if (_.isFunction(mapMethod)) {
      result = {
        ...result,
        ...mapMethod(dispatch),
      }
    }

    return result
  }
}
