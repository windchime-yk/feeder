import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { ValueObject } from "../../../../src/domain/valueObjects/valueObject.ts";

// Test implementation of ValueObject for testing purposes
class TestValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): TestValueObject {
    return new TestValueObject(value);
  }
}

describe("ValueObject", () => {
  describe("construction", () => {
    it("should create a value object with the given value", () => {
      // Given
      const testValue = "test-value";

      // When
      const valueObject = TestValueObject.create(testValue);

      // Then
      assertEquals(valueObject.value, testValue);
    });
  });

  describe("equality", () => {
    it("should be equal to another value object with the same value", () => {
      // Given
      const value = "same-value";
      const valueObject1 = TestValueObject.create(value);
      const valueObject2 = TestValueObject.create(value);

      // When
      const isEqual = valueObject1.equals(valueObject2);

      // Then
      assertEquals(isEqual, true);
    });

    it("should not be equal to another value object with different value", () => {
      // Given
      const valueObject1 = TestValueObject.create("value1");
      const valueObject2 = TestValueObject.create("value2");

      // When
      const isEqual = valueObject1.equals(valueObject2);

      // Then
      assertEquals(isEqual, false);
    });

    it("should not be equal to null", () => {
      // Given
      const valueObject = TestValueObject.create("test");

      // When
      const isEqual = valueObject.equals(null as any);

      // Then
      assertEquals(isEqual, false);
    });

    it("should not be equal to undefined", () => {
      // Given
      const valueObject = TestValueObject.create("test");

      // When
      const isEqual = valueObject.equals(undefined as any);

      // Then
      assertEquals(isEqual, false);
    });
  });

  describe("string representation", () => {
    it("should return string representation of the value", () => {
      // Given
      const testValue = "test-value";
      const valueObject = TestValueObject.create(testValue);

      // When
      const stringValue = valueObject.toString();

      // Then
      assertEquals(stringValue, testValue);
    });
  });

  describe("JSON serialization", () => {
    it("should return the primitive value for JSON serialization", () => {
      // Given
      const testValue = "test-value";
      const valueObject = TestValueObject.create(testValue);

      // When
      const jsonValue = valueObject.toJSON();

      // Then
      assertEquals(jsonValue, testValue);
    });

    it("should serialize correctly with JSON.stringify", () => {
      // Given
      const testValue = "test-value";
      const valueObject = TestValueObject.create(testValue);

      // When
      const jsonString = JSON.stringify(valueObject);

      // Then
      assertEquals(jsonString, `"${testValue}"`);
    });
  });
});
