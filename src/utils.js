import _ from "underscore"

export function makeUppercaseUnderscored(string) {
  const uppercased = string.toUpperCase()
  const underscored = uppercased.replace(/-/g, "_")
  return underscored
}

export function createSuffixes(names) {
  const built = []

  names.forEach(name => {
    if (_.isArray(name)) {
      const base = name[0]
      createSuffixes(name[1]).forEach(uppercase => {
        const formatted = makeUppercaseUnderscored(`${base}_${uppercase}`)
        built.push(formatted)
      })
    }
    else if (_.isString(name)) {
      const formatted = makeUppercaseUnderscored(name)
      built.push(formatted)
    }
  })

  return built
}


