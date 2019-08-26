import { createActionTypeSections } from "../src/createActionTypeSections"

describe("createActionTypeSections", () => {
  it("returns an object of sections for each set of actionTypes", () => {
    const result = createActionTypeSections("some-name", {
      sectionOne: [
        ["create-form", [
          ["completed", [
            "success",
            "failure",
          ]],
        ]],
      ],
    })

    expect(Object.keys(result)).toHaveLength(1)
    expect(result).toHaveProperty("sectionOne")
    expect(Object.keys(result.sectionOne)).toHaveLength(2)
    expect(result.sectionOne).toHaveProperty("CREATE_FORM_COMPLETED_SUCCESS")
    expect(result.sectionOne.CREATE_FORM_COMPLETED_SUCCESS).toEqual(
      "some-name/section-one/CREATE_FORM_COMPLETED_SUCCESS"
    )
  })
})
