import { Item } from "tests/create-reducer/app/pages/first/reducer/types"

import actionTypes from "../constants"

export interface AddItemAction {
  type: typeof actionTypes.ADD;
  obj: Item;
}

export const addItem = (obj: Item): AddItemAction => ({
  type: actionTypes.ADD,
  obj,
})
