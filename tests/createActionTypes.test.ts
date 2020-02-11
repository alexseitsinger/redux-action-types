import { createActionTypes } from "src"

describe("createActionTypes", () => {
  it("should return an object of action types from an array of strings and nested arrays of strings", () => {
    const actionTypes = createActionTypes({
      prefix: "page-name",
      names: [
        "data",
        ["login-form", ["submitted", ["completed", ["success", "failure"]]]],
        [
          "three",
          [
            ["alpha", ["one", "two"]],
            ["beta", ["one"]],
          ],
        ],
        "four",
      ],
    })

    expect(actionTypes).toStrictEqual({
      DATA: "@@page-name/DATA",
      LOGIN_FORM_SUBMITTED: "@@page-name/login-form/SUBMITTED",
      LOGIN_FORM_COMPLETED_SUCCESS: "@@page-name/login-form/completed/SUCCESS",
      LOGIN_FORM_COMPLETED_FAILURE: "@@page-name/login-form/completed/FAILURE",
      THREE_ALPHA_ONE: "@@page-name/three/alpha/ONE",
      THREE_ALPHA_TWO: "@@page-name/three/alpha/TWO",
      THREE_BETA_ONE: "@@page-name/three/beta/ONE",
      FOUR: "@@page-name/FOUR",
    })
  })
})
