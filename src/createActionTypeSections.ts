import { NestedObjectOfStrings, ObjectOfStrings } from "src/types"

import createActionTypes from "./createActionTypes"

interface CreateActionTypeSectionsArguments {
  prefix: string;
  sections: {
    [key: string]: any[],
  };
}

export default ({
  prefix,
  sections,
}: CreateActionTypeSectionsArguments): NestedObjectOfStrings => {
  const result: NestedObjectOfStrings = {}

  Object.keys(sections).forEach(sectionName => {
    const updatedActionTypes: ObjectOfStrings = {}

    // Generate new action types for the section.
    const sectionActionTypes = createActionTypes({
      prefix: `${prefix}/${sectionName}`,
      names: sections[sectionName],
    })

    // Remove the section names from the keys used.
    const uppercased = sectionName.toUpperCase()
    const sectionNameUppercased = `${uppercased}_`
    Object.keys(sectionActionTypes).forEach((n: string): void => {
      const value = sectionActionTypes[n]
      if (n.startsWith(sectionNameUppercased)) {
        const key = n.replace(sectionNameUppercased, "")
        updatedActionTypes[key] = value
      } else {
        updatedActionTypes[n] = value
      }
    })

    // Add the updated section action types to the object that is returned.
    result[sectionName] = updatedActionTypes
  })

  return result
}
