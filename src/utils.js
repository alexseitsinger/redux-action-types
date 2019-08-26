import _ from "underscore"

const pattern = "[A-Za-z]+"
const camelCaseRegex = /(?:^|\.?)([A-Z])/g
const dashCaseRegex = new RegExp(`^${pattern}(-${pattern})+$`)
const underscoreCaseRegex = new RegExp(`^${pattern}(_${pattern})+$`)

const isUnderscoreCase = string => underscoreCaseRegex.test(string)
const isDashCase = string => dashCaseRegex.test(string)
const isCamelCase = string => camelCaseRegex.test(string)

const fromDashCase = (string, newCase) => string.replace(/-/g, newCase)
const fromUnderscoreCase = (string, newCase) => string.replace(/_/g, newCase)
function fromCamelCase(string, newCase) {
  const handler = (_, y) => newCase + y.toLowerCase()
  const prefix = new RegExp(`^${newCase}`)
  return string.replace(camelCaseRegex, handler).replace(prefix, "")
}

export const makeUppercaseUnderscored = string => fromDashCase(string, "_").toUpperCase()
export const makeLowercaseDashed = string => {
  if (isUnderscoreCase(string)) {
    return fromUnderscoreCase(string, "-").toLowerCase()
  }
  return fromCamelCase(string, "-").toLowerCase()
}

export function createSuffixes(names) {
  const built = []

  names.forEach(name => {
    if (_.isString(name)) {
      built.push(makeUppercaseUnderscored(name))
    }
    else if (_.isArray(name)) {
      const base = name[0]
      createSuffixes(name[1]).forEach(uppercase => {
        built.push(makeUppercaseUnderscored(`${base}_${uppercase}`))
      })
    }
  })

  return built
}

export function normalize(name) {
  if (name.startsWith("/")) {
    name = name.replace("/", "")
  }
  return name
}
