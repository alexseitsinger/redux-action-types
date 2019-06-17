<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [createActionTypes][1]
    -   [Parameters][2]
    -   [Examples][3]

## createActionTypes

Creates an object of actionType names.

### Parameters

-   `prefix` **[String][4]** The prefix to use for all these action types.
-   `names` **[Array][5]** The array of name parts to use to create the action
    types.

### Examples

```javascript
// actions/landing/types.js
import { createActionTypes } from "@alexseitsinger/redux-action-types"

export const actionTypes = createActionTypes("landing", [
 ["login-form", [
   ["completed", [
     "success",
     "failure",
   ]],
 ]]
])

//
// returns...
//
// {
//   LOGIN_FORM_COMPLETED_SUCCESS: "@@landing/LOGIN_FORM_COMPLETED_SUCCESS",
//   LOGIN_FORM_COMPLETED_FAILURE: "@@landing/LOGIN_FORM_COMPLETED_FAILURE",
// }
//

// actions/landing/index.js
import { actionTypes } from "./types"

export function setLoginFormCompletedSuccess(bool) {
  return {
    type: actionTypes.LOGIN_FORM_COMPLETED_SUCCESS,
    bool,
  }
}

export function setLoginFormCompletedFailure(bool) {
  return {
    type: actionTypes.LOGIN_FORM_COMPLETED_FAILURE,
    bool,
  }
}

// reducers/landing/index.js
import { actionTypes } from "../../actions/landing/types"

export function landingReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
    case actionTypes.LOGIN_FORM_COMPLETED_SUCCESS: {
      return {
        ...state,
        loginFormCompletedSuccess: action.bool,
      }
    }
    case actionTypes.LOGIN_FORM_COMPLETED_FAILURE: {
      return {
        ...state,
        loginFormCompletedFailure: action.bool,
      }
    }
  }
}
```

Returns **[Object][6]** Returns an object of actionTypes.

[1]: #createactiontypes

[2]: #parameters

[3]: #examples

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
