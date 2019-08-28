import _ from "underscore"
import { bindActionCreators } from "redux"


export function mapDispatchForSections(sections, mapMethod) {
  return dispatch => {
    const mapped = {}

    // convert each section provided into bound action creators.
    Object.keys(sections).forEach(sectionName => {
      const actionCreators = sections[sectionName]
      mapped[sectionName] = bindActionCreators({...actionCreators}, dispatch)
    })

    // If we also get a mapper function, invoke it to add to the state.
    if (_.isFunction(mapMethod)) {
      return {
        ...mapped,
        ...mapMethod(dispatch),
      }
    }

    return mapped
  }
}
