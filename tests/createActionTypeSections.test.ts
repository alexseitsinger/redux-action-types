import createActionTypeSections from "src/createActionTypeSections"

describe("createActionTypeSections", () => {
  it("should return a list of action types for each section", () => {
    const actionTypeSections = createActionTypeSections({
      prefix: "page-name",
      sections: {
        one: ["alpha", "beta"],
        two: ["alpha"],
        three: [["alpha", ["first", "second"]]],
      },
    })

    expect(actionTypeSections).toStrictEqual({
      one: {
        ALPHA: "@@page-name/one/ALPHA",
        BETA: "@@page-name/one/BETA",
      },
      two: {
        ALPHA: "@@page-name/two/ALPHA",
      },
      three: {
        ALPHA_FIRST: "@@page-name/three/alpha/FIRST",
        ALPHA_SECOND: "@@page-name/three/alpha/SECOND",
      },
    })
  })
})
