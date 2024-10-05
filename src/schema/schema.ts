/**
 * @file Defines the schema which all the types extend
 */
import { Result } from '@ellefe/ts-core';

import { OptimusSchemaError } from './error';

export type OptimusAnySchema = OptimusSchema<any, any, any>;

export type OptimusSchemaOutput<Schema extends OptimusAnySchema> =
  Schema extends OptimusSchema<infer Output, any, any> ? Output : never;

/** */
export abstract class OptimusSchema<
  Output = unknown,
  Options extends object = never,
  Input = unknown,
> {
  constructor(protected options: Partial<Options> = {}) {}

  protected abstract transformInner(value: Input): Output;

  public transform(value: Input): Output {
    return this.transformInner(value);
  }

  protected updateOptions(options: Partial<Options>): void {
    this.options = { ...this.options, ...options };
  }
}
export type OptimusAnyFailableSchema = OptimusFailableSchema<
  any,
  any,
  any,
  any
>;

export type OptimusFailableSchemaOutput<
  Schema extends OptimusAnyFailableSchema,
> =
  Schema extends OptimusFailableSchema<infer Output, any, any, any>
    ? Output
    : never;

export abstract class OptimusFailableSchema<
  Output = unknown,
  Options extends object = never,
  Input = unknown,
  ErrorType extends Error = OptimusSchemaError,
> extends OptimusSchema<Result<Output, ErrorType>, Options, Input> {
  protected abstract transformInner(value: Input): Result<Output, ErrorType>;

  public transform(value: Input): Result<Output, ErrorType> {
    return this.transformInner(value);
  }
}
