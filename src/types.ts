import { AnyAction } from "redux"

export interface ObjectOfAnything {
  [key: string]: any;
}

export type SetState = (state: ObjectOfAnything) => ObjectOfAnything

export interface ObjectOfStrings {
  [key: string]: string;
}

export interface NestedObjectOfStrings {
  [key: string]: ObjectOfStrings;
}

export type SectionActionTypes = ObjectOfStrings

export interface SectionsActionTypes {
  [key: string]: SectionActionTypes;
}

export type State<
  U extends { [name: string]: any } = { [name: string]: any }
> = {
  [P in keyof U]: U[P]
}

export type FlatReducer<S = {}> = (
  action: AnyAction,
  state: State<S>,
  setState: SetState
) => State<S>

export type SectionReducer = (
  action: AnyAction,
  section: SectionActionTypes,
  sectionState: ObjectOfAnything,
  setSectionState: SetState,
  parentState?: ObjectOfAnything,
  setParentState?: SetState
) => ObjectOfAnything

export interface SectionReducers {
  [key: string]: SectionReducer;
}

export type ReduxReducer = (
  state: State,
  action: AnyAction
) => ObjectOfAnything
