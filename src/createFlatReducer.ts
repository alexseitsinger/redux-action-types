import { AnyAction } from "redux"
import { isEqual } from "underscore"

import { FlatReducer, ObjectOfAnything,ObjectOfStrings, ReduxReducer, State } from "./types"
import { isDefined } from "./utils"

interface CreateFlatReducerArguments<S = {}> {
  defaultState: State;
  actionTypes: ObjectOfStrings;
  reducer: FlatReducer<S>;
}

export default ({
  defaultState,
  actionTypes,
  reducer,
}: CreateFlatReducerArguments): ReduxReducer => {
  const values = Object.keys(actionTypes).map(key => actionTypes[key])

  return (state = defaultState, action: AnyAction): ObjectOfAnything => {
    const lastState = state

    if (values.includes(action.type)) {
      // Make sure states received and returned match the shape of the original
      // state object.
      type State = {
        [P in keyof typeof lastState]: typeof lastState[P]
      }

      const setState = (newState: State): State => {
        const nextState = { ...lastState, ...newState }
        if (isEqual(lastState, nextState)) {
          return lastState
        }
        return nextState
      }

      const reducedState = reducer(
        action,
        lastState,
        setState,
      )

      if (isDefined(reducedState)) {
        return reducedState
      }
    }

    return lastState
  }
}
