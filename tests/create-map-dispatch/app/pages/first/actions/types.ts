import actionTypes from "../constants"
import { Item } from "../reducer/types"

export interface AddItemAction {
  type: typeof actionTypes.ADD;
  obj: Item;
}
