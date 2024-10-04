/**
 * @file Defines the schema which all the types extend
 */

/** */
export abstract class OptimusSchema<Output = unknown, Input = unknown> {
  protected abstract transformInner(value: Input): Output;

  public transform(value: Input): Output {
    return this.transformInner(value);
  }
}
