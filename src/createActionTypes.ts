import { isArray, isString } from "underscore"

import { createSuffixes, makeUppercaseUnderscored, normalize } from "./utils"

export interface CreateActionTypesArguments {
  prefix: string;
  names: any[];
}

export interface CreateActionTypesReturnType {
  [key: string]: string;
}

export default ({
  prefix,
  names,
}: CreateActionTypesArguments): CreateActionTypesReturnType => {
  const result = {}

  names.forEach((s: string | any[]) => {
    if (isString(s)) {
      const constant = makeUppercaseUnderscored(s)
      //const lowercased = makeLowercaseDashed(constant)
      const normalized = normalize(`${prefix}/${constant}`)
      result[constant] = normalized
    } else if (isArray(s)) {
      const base = s[0]

      createSuffixes(s[1]).forEach((uppercase: string) => {
        const string = `${base}_${uppercase}`
        const constant = makeUppercaseUnderscored(string)
        //const lowercased = makeLowercaseDashed(constant)
        const normalized = normalize(`${prefix}/${constant}`)
        result[constant] = normalized
      })
    }
  })

  return result
}
