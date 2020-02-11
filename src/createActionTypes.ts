import { isArray, isString } from "underscore"

import { ObjectOfStrings } from "src/types"

import {
  formatPrefix,
  makeLowercaseDashed,
  makeUppercaseUnderscored,
  normalize,
} from "./utils"

interface CreateActionTypesArguments {
  prefix: string;
  names: any[];
}

export default function createActionTypes({
  prefix,
  names,
}: CreateActionTypesArguments): ObjectOfStrings {
  let results: ObjectOfStrings = {}

  const originalPrefix = formatPrefix(prefix)
  let currentPrefix = originalPrefix
  let lastPrefix = currentPrefix
  let isLastString = false

  const addStringResult = (s: string): void => {
    const suffix = makeUppercaseUnderscored(s)
    const bits = currentPrefix.split("/")
    bits.shift()
    const constantPrefix = bits.join("-")
    const key = makeUppercaseUnderscored(
      normalize(`${constantPrefix}_${suffix}`)
    )
    if (isLastString) {
      results[key] = normalize(`${currentPrefix}/${suffix}`)
    } else {
      results[key] = normalize(`${lastPrefix}/${suffix}`)
    }
    isLastString = true
  }

  const addArrayResult = (a: any[]): void => {
    const nextPrefix = makeLowercaseDashed(`${currentPrefix}/${a[0]}`)
    if (!nextPrefix.startsWith(currentPrefix)) {
      lastPrefix = currentPrefix
      currentPrefix = nextPrefix
    }
    const newResults = createActionTypes({
      prefix: nextPrefix,
      names: a[1],
    })
    results = {
      ...results,
      ...newResults,
    }
    isLastString = false
  }

  names.forEach((s: string | any[]) => {
    if (isString(s)) {
      addStringResult(s)
    } else if (isArray(s)) {
      addArrayResult(s)
    }
  })

  return results
}
