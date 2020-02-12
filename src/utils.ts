import { isArray, isString } from "underscore"

const pattern = "[A-Za-z]+"

const camelCaseRegex = /(?:^|\.?)([A-Z])/g
const isCamelCase = (s: string): boolean => camelCaseRegex.test(s)

//const dashCaseRegex = new RegExp(`^${pattern}(-${pattern})+$`)
//const isDashCase = (s: string): boolean => dashCaseRegex.test(s)

const underscoreCaseRegex = new RegExp(`^${pattern}(_${pattern})+$`)
const isUnderscoreCase = (s: string): boolean => underscoreCaseRegex.test(s)

const fromDashCase = (s: string, n: string): string => s.replace(/-/g, n)
const fromUnderscoreCase = (s: string, c: string): string => s.replace(/_/g, c)

function fromCamelCase(s: string, c: string): string {
  const handler = (_: string, y: string): string => c + y.toLowerCase()
  const prefix = new RegExp(`^${c}`)
  return s.replace(camelCaseRegex, handler).replace(prefix, "")
}

export const dashToCamelCase = (s: string): string => {
  const bits = s.split("-")
  const firstWord = bits.shift()
  const joinedWords = bits
    .map((bit: string) => {
      const letters = bit.split("")
      let firstLetter = letters.shift()
      if (firstLetter !== undefined) {
        firstLetter = firstLetter.toUpperCase()
      }
      const remainingLetters = letters.join("").toLowerCase()
      return `${firstLetter}${remainingLetters}`
    })
    .join("")
  return `${firstWord}${joinedWords}`
}

export const makeUppercaseUnderscored = (s: string): string => {
  let result = fromDashCase(s, "_").toUpperCase()
  result = result.replace(/^_+/, "")
  result = result.replace(/_+$/, "")
  return result
}

export const makeLowercaseDashed = (s: string): string => {
  if (isUnderscoreCase(s)) {
    return fromUnderscoreCase(s, "-").toLowerCase()
  }
  if (isCamelCase(s)) {
    return fromCamelCase(s, "-").toLowerCase()
  }
  return s
}

export function createSuffixes(names: string[]): string[] {
  const built: string[] = []

  names.forEach((n: string | any[]): void => {
    if (isString(n) === true) {
      built.push(makeUppercaseUnderscored((n as string)))
    } else if (isArray(n) === true) {
      const base = n[0]

      createSuffixes(n[1]).forEach((uppercase: string): void => {
        built.push(makeUppercaseUnderscored(`${base}_${uppercase}`))
      })
    }
  })

  return built
}

export function formatPrefix(s: string): string {
  if (!(s.startsWith("@@"))) {
    return `@@${s}`
  }
  return s
}

export function normalize(s: string): string {
  const rep = s.replace(/\/\/+/, "/")
  if (rep.startsWith("/")) {
    return rep.replace(/^\/+/, "")
  }
  if (rep.endsWith("/")) {
    return rep.replace(/\/+$/, "")
  }
  return rep
}

export const isNullish = (o?: any): boolean => {
  if (typeof o === "undefined" || o === null) {
    return true
  }
  return false
}

export const isDefined = (o?: any): boolean => {
  if (isNullish(o)) {
    return false
  }
  return true
}

/**
 * Retrns the number of arrays immediately below the provided array.
 * NOTE: Does not count nested arrays.
 */
export const countImmediateArrays = (arrs: any[]): number => {
  return arrs.map((item: any) => {
    if (isArray(item)) {
      return 1
    }
    return 0
  }).reduce((a: number, b: number) => a + b, 0)
}

/**
 * Returns the total number of nested arrays within the arr.
 *
 * NOTE:
 * - This should be used on the "rest" portion of each item array.
 *   ie: [first, >>>rest<<<]
 */
export const getDepth = (arr: any[]): number => {
  return arr.map((item: any) => {
    if (isArray(item)) {
      return 1 + getDepth(item)
    }
    return 0
  }).reduce((a: number, b: number) => a + b, 0)
}

/**
 * Sorts the array of arrays from highest depth to lowest.
 */
const sortArraysByDepth = (arrs: any[]): any[] => {
  return arrs.sort((a: any[], b: any[]) => {
    const aDepth = getDepth(a)
    const bDepth = getDepth(b)
    if (aDepth > bDepth) {
      /**
       * If the array is the deepest, move it to the front of the array.
       */
      return -1
    }
    if (aDepth < bDepth) {
      /**
       * Otherwise, move it to the back of the array.
       */
      return 1
    }
    /**
     * Else, return it in place.
     */
    return 0
  })
}

/**
 * Returns the array that hs the most nesed arrays within it.
 */
export const getMostNestedArray = (a: any[]): any[] => {
  const sorted = sortArraysByDepth(a)
  return sorted[0]
}

/**
 * Returns the array that is nested the deepest among all the arrays.
 */
export const getDeepestArray = (a: any[]): any[] => {
  let target: any[] = a

  a.forEach((item: any) => {
    if (isArray(item)) {
      target = getDeepestArray(item)
    }
  })

  return target
}

/**
 * Returns the total number of actionType strings that will be produced from using
 * this array along with its nested arrays.
 *
 * NOTE:
 * This should be run on the combination array, not the rest array alone.
 * ie: [first, rest]
 */
export function getResultCount(item: any[] | string): number {
  if (isString(item)) {
    return 1
  }

  return item[1].map((selected: any) => {
    if (isArray(selected)) {
      const totalSiblings = countImmediateArrays(selected)
      const deepestLength = getDeepestArray(selected).length
      return totalSiblings * deepestLength
    }
    return 1
  }).reduce((a: number, b: number) => a + b, 0)
}

export function mapChild({
  child,
  parentLevel,
  parentPrefix,
}: {
  child: any[] | string,
  parentLevel: number,
  parentPrefix: string,
}): any {
  let thisChild = child
  if (isString(child)) {
    thisChild = [child, []]
  }
  const [first, rest] = thisChild
  const children: any[] = []
  const thisLevel = parentLevel + 1
  const thisPrefix = normalize(`${parentPrefix}/${first}`)
  const mapped = {
    level: thisLevel,
    prefix: thisPrefix,
    children,
  }

  rest.forEach((item: any) => {
    mapped.children = [
      ...mapped.children,
      mapChild({
        child: item,
        parentPrefix: thisPrefix,
        parentLevel: thisLevel,
      }),
    ]
  })

  return mapped
}

export function distributeChild(baseName: string, mapped: any): any {
  let ret = {}

  const finalBaseName = formatPrefix(baseName)

  if (mapped.children.length === 0) {
    //const suffix = prefix.split("/").pop()
    const key = makeUppercaseUnderscored(mapped.prefix.split("/").join("_"))
    const bits = mapped.prefix.split("/")
    const last = makeUppercaseUnderscored(bits.pop())
    const first = makeLowercaseDashed(bits.join("/"))
    const root = makeLowercaseDashed(finalBaseName)
    const value = `${root}/${first}/${last}`
    const finalValue = normalize(value)

    ret = {
      ...ret,
      [key]: finalValue,
    }
  } else {
    mapped.children.forEach((mc: any) => {
      ret = {
        ...ret,
        ...distributeChild(baseName, mc),
      }
    })
  }

  return ret
}
