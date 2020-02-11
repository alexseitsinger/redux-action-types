export interface Item {
  [key: string]: string;
}

export interface ReducerState {
  items: [] | Item[];
}
