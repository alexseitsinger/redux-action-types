import { AnyAction } from "redux"

export interface StateObject {
  [key: string]: any;
}

export interface SectionNames {
  [key: string]: string;
}

export interface Sections {
  [key: string]: SectionNames;
}

export type SetState = (state: StateObject) => StateObject

export type SectionReducer = (
  action: AnyAction,
  section: SectionNames,
  sectionState: StateObject,
  setSectionState: SetState,
  parentState: StateObject,
  setParentState: SetState
) => StateObject

export interface SectionReducers {
  [key: string]: SectionReducer;
}
