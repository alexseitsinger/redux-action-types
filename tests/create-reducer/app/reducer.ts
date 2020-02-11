import { combineReducers } from "redux"

import firstPageReducer from "./pages/first/reducer"
import secondPageReducer from "./pages/second/reducer"

export default combineReducers({
  firstPage: firstPageReducer,
  secondPage: secondPageReducer,
})
