import _ from "underscore"
import { bindActionCreators } from "redux"


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
