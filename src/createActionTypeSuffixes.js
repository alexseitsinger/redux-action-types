import _ from "underscore"

export function createActionTypeSuffixes(names) {
  const built = []

  names.forEach(name => {
    if (_.isArray(name)) {
      const base = name[0]
      createActionTypeSuffixes(name[1]).forEach(uppercase => {
        const full = `${base}_${uppercase}`.toUpperCase()
        const underscored = full.replace(/-/g, "_")
        built.push(underscored)
      })
    }
    else if (_.isString(name)) {
      const uppercase = name.toUpperCase()
      const underscored = uppercase.replace(/-/g, "_")
      built.push(underscored)
    }
  })

  return built
}


