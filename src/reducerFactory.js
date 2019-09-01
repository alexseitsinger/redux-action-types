export function reducerFactory(initialState = {}, actionTypeSections) {
  const cases = {}

  function addCase(actionType, sectionReducer, sectionName) {
    cases[actionType] = cases[actionType] || {
      sectionName,
      sectionReducer,
    }
  }

  function reducer(state = initialState, action) {
    const parentState = state
    const setParentState = obj => ({
      ...parentState,
      ...obj,
    })

    if (cases[action.type]) {
      const { sectionName, sectionReducer } = cases[action.type]
      const sectionActionTypes = actionTypeSections[sectionName]
      const sectionState = parentState[sectionName]
      const setSectionState = obj => setParentState({
        [sectionName]: {
          ...sectionState,
          ...obj
        }
      })

      const reducedState = sectionReducer(
        action,
        sectionActionTypes,
        sectionState,
        setSectionState,
        parentState,
        setParentState
      )
      if (reducedState) {
        return reducedState
      }
    }

    return parentState
  }

  return {
    reducer,
    addCase,
    cases,
  }
}


