import { describe, expect, it } from "vitest"

import {
  strings,
  lowercase,
  uppercase,
  capitalize,
} from "./index"

describe("strings.index", () => {
  describe("lowercase", () => {
    it("should lowercase string", () => {
      expect(lowercase("Hello")).toBe("hello")
      expect(lowercase("WoRld")).toBe("world")
    })
  })
  describe("uppercase", () => {
    it("should uppercase string", () => {
      expect(uppercase("Hello")).toBe("HELLO")
      expect(uppercase("world")).toBe("WORLD")
    })
  })
  describe("capitalize", () => {
    it("should capitalize string", () => {
      expect(capitalize("hello")).toBe("Hello")
      expect(capitalize("woRld")).toBe("WoRld")
    })
  })
  describe("hasNumber", () => {
    it("should validate if string includes a number", () => {
      expect(strings("hello1").hasNumber()).toBeTruthy()
      expect(strings("hello").hasNumber()).toBeFalsy()
    })
  })
  describe("hasSpecialChar", () => {
    it("should validate if string includes a special character", () => {
      expect(strings("hello!").hasSpecialChar()).toBeTruthy()
      expect(strings("hello").hasSpecialChar()).toBeFalsy()
    })
  })
  describe("hasLowercaseChar", () => {
    it("should validate if string includes a special character", () => {
      expect(strings("HElLO").hasLowercaseChar()).toBeTruthy()
      expect(strings("HELLO").hasLowercaseChar()).toBeFalsy()
    })
  })
  describe("hasUppercaseChar", () => {
    it("should validate if string includes a special character", () => {
      expect(strings("heLlo").hasUppercaseChar()).toBeTruthy()
      expect(strings("hello").hasUppercaseChar()).toBeFalsy()
    })
  })
})
