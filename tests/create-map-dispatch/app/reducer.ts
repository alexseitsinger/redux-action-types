import { combineReducers } from "redux"

import firstPageReducer from "./pages/first/reducer"

export default combineReducers({
  firstPage: firstPageReducer,
})
