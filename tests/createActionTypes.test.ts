import { createActionTypes } from "src"

describe("createActionTypes", () => {
  it("should return an object of action types from an array of strings and nested arrays of strings", () => {
    const actionTypes = createActionTypes({
      prefix: "page-name",
      names: [
        "data",
        ["login-form", ["submitted", ["completed", ["success", "failure"]]]],
        [
          "activation-form",
          [
            ["first-action", ["a", "b"]],
            ["second-action", ["a"]],
          ],
        ],
        "authentication-form",
        [
          "signup-form",
          ["first-action", ["second-action", ["a", ["b", ["one", "two"]]]]],
        ],
      ],
    })

    expect(actionTypes).toStrictEqual({
      DATA: "@@page-name/DATA",
      LOGIN_FORM_SUBMITTED: "@@page-name/login-form/SUBMITTED",
      LOGIN_FORM_COMPLETED_SUCCESS: "@@page-name/login-form/completed/SUCCESS",
      LOGIN_FORM_COMPLETED_FAILURE: "@@page-name/login-form/completed/FAILURE",
      ACTIVATION_FORM_FIRST_ACTION_A:
        "@@page-name/activation-form/first-action/A",
      ACTIVATION_FORM_FIRST_ACTION_B:
        "@@page-name/activation-form/first-action/B",
      ACTIVATION_FORM_SECOND_ACTION_A:
        "@@page-name/activation-form/second-action/A",
      AUTHENTICATION_FORM: "@@page-name/AUTHENTICATION_FORM",
      SIGNUP_FORM_FIRST_ACTION: "@@page-name/signup-form/FIRST_ACTION",
      SIGNUP_FORM_SECOND_ACTION_A: "@@page-name/signup-form/second-action/A",
      SIGNUP_FORM_SECOND_ACTION_B_ONE:
        "@@page-name/signup-form/second-action/b/ONE",
      SIGNUP_FORM_SECOND_ACTION_B_TWO:
        "@@page-name/signup-form/second-action/b/TWO",
    })
  })
})
