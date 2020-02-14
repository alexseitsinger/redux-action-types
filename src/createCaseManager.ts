import { SectionReducer } from "./types"
import { isDefined } from "./utils"

type VoidFunction = (...args: any[]) => void

type BooleanFunction = (...args: any[]) => boolean

export interface Case {
  sectionName: string;
  sectionReducer: SectionReducer;
}

type CaseFunction = (actionType: string) => Case

interface CreateCaseManagerReturnType {
  addCase: VoidFunction;
  assertCase: BooleanFunction;
  getCase: CaseFunction;
}

interface Cases {
  [key: string]: Case;
}

export default (): CreateCaseManagerReturnType => {
  let cases: Cases = {}

  const assertCase = (actionType: string): boolean => {
    return isDefined(cases[actionType])
  }

  const addCase = (
    actionType: string,
    sectionName: string,
    sectionReducer: SectionReducer
  ): void => {
    if (assertCase(actionType)) {
      return
    }

    cases = {
      ...cases,
      [actionType]: { sectionName, sectionReducer },
    }
  }

  const getCase = (actionType: string): Case => {
    if (!assertCase(actionType)) {
      throw new Error(`Case not found for ${actionType}`)
    }

    return cases[actionType]
  }

  return {
    addCase,
    assertCase,
    getCase,
  }
}
