import { Item } from "tests/create-map-dispatch/app/pages/first/reducer/types"

import actionTypes from "../constants"

import { AddItemAction } from "./types"

export const addItem = (obj: Item): AddItemAction => ({
  type: actionTypes.ADD,
  obj,
})
