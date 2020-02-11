import actionTypeSections from "../constants"
import { Item } from "../reducer/types"

export interface AddItemToSectionOneAction {
  type: typeof actionTypeSections.one.ADD;
  obj: Item;
}

export const addItemToSectionOne = (obj: Item): AddItemToSectionOneAction => ({
  type: actionTypeSections.one.ADD,
  obj,
})

export interface AddItemToSectionTwoAction {
  type: typeof actionTypeSections.two.ADD;
  obj: Item;
}

export const addItemToSectionTwo = (obj: Item): AddItemToSectionTwoAction => ({
  type: actionTypeSections.two.ADD,
  obj,
})
