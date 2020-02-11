import { isArray, isString } from "underscore"

const pattern = "[A-Za-z]+"

const camelCaseRegex = /(?:^|\.?)([A-Z])/g
//const isCamelCase = (s: string): boolean => camelCaseRegex.test(s)

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
  return fromCamelCase(s, "-").toLowerCase()
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
  if (s.startsWith("/")) {
    return s.replace("/", "")
  }
  return s
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
