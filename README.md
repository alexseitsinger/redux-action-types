# Redux Action Types

Helpers for redux

## Installation

```bash
yarn add @alexseitsinger/redux-action-types
```

## Exports

#### createActionTypes

###### Usage

```typescript
import { createActionTypes } from "@alexseitsinger/redux-action-types"

export default createActionTypes({
  prefix: "dates",
  names: ["dates-for-week", ["dates-for-week", ["success", "failure"]],
})

// returns
{
  "DATES_FOR_WEEK": "dates/DATES_FOR_WEEK",
  "SUCCESS": "dates/DATES_FOR_WEEK_SUCCESS",
  "FAILURE": "dates/DATES_FOR_WEEK_FAILURE",
}
```

#### createActionTypeSections

###### Usage


```typescript
// home/constants/sections/dates.ts

export default [
  "dates-for-week",
  ["dates-for-week", [
    "success",
    "failure",
  ]],
]

// home/constants/index.ts
import { createActionTypeSections } from "@alexseitsinger/redux-action-types"

import datesConstants from "./sections/dates"

export default createActionTypeSections({
  prefix: "home-page",
  sections: {
    dates: datesActionNames,
  },
})

// returns...

{
  home: {
    dates: {
      DATES_FOR_WEEK: "home-page/dates/DATES_FOR_WEEK",
      DATES_FOR_WEEK_SUCCESS: "home-page/dates/DATES_FOR_WEEK_SUCCESS",
      DATES_FOR_WEEK_FAILURE: "home-page/dates/DATES_FOR_WEEK_FAILURE",
    },
  },
}
```

#### createReducer

###### Usage

```typescript
// home/reducer/sections/dates.ts
import { AnyAction } from "redux"

import { AnyActionType } from "src/types/actions"
import { PageReducerState, DatesSectionState } from "../../"

export default (
  action: AnyAction,
  section: AnyActionType,
  sectionState: DatesSectionState,
  setSectionState: (o: Partial<DatesSectionState>) => DatesSectionState,
  parentState: PageReducerState,
  setParentState: (o: Partial<PageReducerState>) => PageReducerState,
): DatesSectionState | PageReducerState => {
  switch (action.type) {
    case section.DATES_FOR_WEEK: {
      return setSectionState({
        datesForWeek: action.data,
      })
    }
  }
}

// home/reducer/index.js
import { createReducer } from "@alexseitsinger/redux-action-types"

import defaultState from "./defaultState.json"
import actionTypeSections from "./constants"
import datesReducer from "./sections/dates"

export default createReducer({
  defaultState,
  sections: actionTypeSections,
  reducers: {
    dates: datesReducer,
  },
})
```

#### createMapDispatch

###### Usage


```typescript
// home/actions/dates.ts
import actionTypeSections from "../../constants"

const section = actionTypeSections.dates

export const setDatesForWeek = (data: DatesForWeekData): DatesForWeekAction => ({
  type: section.DATES_FOR_WEEK,
  data,
})

const getDatesForWeekSuccess = (): DatesForWeekSuccessAction => ({
  type: section.DATES_FOR_WEEK_SUCCESS,
})

const getDatesForWeekFailure = (): DatesForWeekFailureAction => ({
  type: section.DATES_FOR_WEEK_FAILURE,
})

export const getDatesForWeek = (): ThunkAction => (dispatch: ThunkDispatch): void => {
  // Make some asyncronous API call, then...
  dispatch(getDatesForWeekSuccess())
  dispatch(setDatesForWeek(data))
  // Or...
  dispatch(getDatesForWeekFailure())
}

// home/mapDispatchToProps.ts
import { createMapDispatch } from "@alexseitsinger/redux-action-types"

import * as datesActions from "./actions/dates"

export default createMapDispatch({
  methods: {
    home: {
      dates: datesActions,
    },
  },
  mapDispatch: (dispatch: Dispatch) => ({
    goBack: (): void => {
      dispatch(push("/"))
    },
  }),
})

// returns (in component props)...

{
  methods: {
    home: {
      dates: {
        getDatesForWeek, setDatesForWeek,
      },
    },
    goBack,
  },
}
```
