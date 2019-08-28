import { createActionTypes } from "./createActionTypes"
import { makeLowercaseDashed } from "./utils"

export function createActionTypeSections(prefix, sections) {
  const result = {}

  Object.keys(sections).forEach(sectionName => {
    const updatedActionTypes = {}

    const uppercased = sectionName.toUpperCase()
    const sectionNameUppercased = `${uppercased}_`

    const lowercased = makeLowercaseDashed(sectionName)
    const sectionPrefixLowercased = `${prefix}/${lowercased}`

    const sectionActionTypes = createActionTypes(
      sectionPrefixLowercased, sections[sectionName]
    )

    Object.keys(sectionActionTypes).forEach(name => {
      const value = sectionActionTypes[name]

      if (name.startsWith(sectionNameUppercased)) {
        const constant = name.replace(sectionNameUppercased, "")
        updatedActionTypes[constant] = value
      }
      else {
        updatedActionTypes[name] = value
      }
    })

    // Add the updated section action types to the object that is returned.
    result[sectionName] = updatedActionTypes
  })

  return result
}

