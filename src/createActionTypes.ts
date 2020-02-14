import { ObjectOfStrings } from "./types"
import { distributeChild, mapChild } from "./utils"

export default function createActionTypes({
  prefix,
  names,
}: {
  prefix: string,
  names: any[],
}): ObjectOfStrings {
  let result = {}

  names.forEach((item: any) => {
    const mapped = mapChild({
      child: item,
      parentLevel: -1,
      parentPrefix: "",
    })

    result = {
      ...result,
      ...distributeChild(prefix, mapped),
    }
  })

  return result
}
