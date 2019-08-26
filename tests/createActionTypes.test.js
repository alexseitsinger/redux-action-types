import { createActionTypes } from "../src/createActionTypes"

describe("createActionTypes", () => {
  it("returns an object of pairs from a prefix and an array of keys.", () => {
    const result = createActionTypes({
      prefix: "some-name",
      names: [
        ["login-form", [
          ["completed", [
            "success",
            "failure",
          ]]
        ]]
      ]
    })
    expect(Object.keys(result)).toHaveLength(2)
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_SUCCESS", "some-name/LOGIN_FORM_COMPLETED_SUCCESS")
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_FAILURE", "some-name/LOGIN_FORM_COMPLETED_FAILURE")
  })
  it("returns an object of pairs from an array of keys, but no prefix", () => {
    const result = createActionTypes({
      names: [
        ["login-form", [
          ["completed", [
            "success",
            "failure",
          ]]
        ]]
      ]
    })
    expect(Object.keys(result)).toHaveLength(2)
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_SUCCESS", "LOGIN_FORM_COMPLETED_SUCCESS")
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_FAILURE", "LOGIN_FORM_COMPLETED_FAILURE")
  })
  it("returns an object created only from arrays of keys, and ignores the objects", () => {
    const result = createActionTypes({
      prefix: "some-name",
      names: [
        ["login-form", [
          ["completed", [
            "success",
            "failure",
          ]],
        ]],
        ["signup-form", [
          ["completed", [
            "success",
            "failure",
          ]],
        ]],
        "another-form-completed",
        {name: "another-form"},
      ]
    })
    expect(Object.keys(result)).toHaveLength(5)
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_SUCCESS", "some-name/LOGIN_FORM_COMPLETED_SUCCESS")
    expect(result).toHaveProperty("LOGIN_FORM_COMPLETED_FAILURE", "some-name/LOGIN_FORM_COMPLETED_FAILURE")
    expect(result).toHaveProperty("SIGNUP_FORM_COMPLETED_SUCCESS", "some-name/SIGNUP_FORM_COMPLETED_SUCCESS")
    expect(result).toHaveProperty("SIGNUP_FORM_COMPLETED_FAILURE", "some-name/SIGNUP_FORM_COMPLETED_FAILURE")
    expect(result).toHaveProperty("ANOTHER_FORM_COMPLETED", "some-name/ANOTHER_FORM_COMPLETED")
  })
})
