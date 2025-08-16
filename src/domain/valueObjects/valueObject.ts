/**
 * Base class for value objects in the domain layer.
 * Value objects are immutable and defined by their attributes rather than identity.
 */
export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * Get the primitive value of this value object
   */
  get value(): T {
    return this._value;
  }

  /**
   * Check equality with another value object
   */
  equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    
    if (this.constructor !== other.constructor) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation of the value object
   */
  toString(): string {
    return String(this._value);
  }

  /**
   * Get JSON representation of the value object
   */
  toJSON(): T {
    return this._value;
  }
}