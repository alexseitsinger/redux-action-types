import { AnyAction } from "redux"

import { createFlatReducer } from "src"
import { SetState, State } from "src/types"

import actionTypes from "../constants"

import { ReducerState } from "./types"

export const defaultState: ReducerState = {
  items: [],
}

export default createFlatReducer({
  defaultState,
  actionTypes,
  reducer: (
    action: AnyAction,
    state: State,
    setState: SetState
  ): Partial<ReducerState> => {
    switch (action.type) {
      case actionTypes.ADD: {
        return setState({
          items: [...state.items, { name: "new-item-1" }],
        })
      }
    }
    return state
  },
})
