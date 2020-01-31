import createActionTypes from "./createActionTypes"
import { makeLowercaseDashed } from "./utils"

export interface CreateActionTypeSectionsArguments {
  prefix: string;
  sections: {
    [key: string]: any[],
  };
}

export interface CreateActionTypeSectionsReturnType {
  [key: string]: {
    [key: string]: string,
  };
}

export default ({
  prefix,
  sections,
}: CreateActionTypeSectionsArguments): CreateActionTypeSectionsReturnType => {
  const result = {}

  Object.keys(sections).forEach(sectionName => {
    const updatedActionTypes = {}

    const uppercased = sectionName.toUpperCase()
    const sectionNameUppercased = `${uppercased}_`

    const lowercased = makeLowercaseDashed(sectionName)
    const sectionPrefixLowercased = `${prefix}/${lowercased}`
    const sectionActionTypes = createActionTypes({
      prefix: sectionPrefixLowercased,
      names: sections[sectionName],
    })

    Object.keys(sectionActionTypes).forEach((n: string): void => {
      const value = sectionActionTypes[n]

      if (n.startsWith(sectionNameUppercased)) {
        const constant = n.replace(sectionNameUppercased, "")
        updatedActionTypes[constant] = value
      } else {
        updatedActionTypes[n] = value
      }
    })

    // Add the updated section action types to the object that is returned.
    result[sectionName] = updatedActionTypes
  })

  return result
}
