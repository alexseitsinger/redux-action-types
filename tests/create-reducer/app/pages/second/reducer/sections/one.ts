import { AnyAction } from "redux"

import { SectionOneReducerState as SectionState } from "../types"

export default (
  action: AnyAction,
  section: { [key: string]: any },
  sectionState: SectionState,
  setSectionState: (o: Partial<SectionState>) => SectionState
): Partial<SectionState> => {
  switch (action.type) {
    default: {
      return sectionState
    }
    case section.ADD: {
      return setSectionState({
        items: [...sectionState.items, action.obj],
      })
    }
  }
}
