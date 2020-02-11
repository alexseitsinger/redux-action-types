export interface Item {
  [key: string]: string;
}

export interface SectionOneReducerState {
  items: Item[];
}

export interface SectionTwoReducerState {
  items: Item[];
}

export interface ReducerState {
  one: SectionOneReducerState;
  two: SectionTwoReducerState;
}
