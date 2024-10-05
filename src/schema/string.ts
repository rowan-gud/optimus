import { Result, err, ok } from '@ellefe/ts-core';
import { P } from 'ts-pattern';

import { OptimusValueType } from '@/enums/value-type';

import { OptimusSchemaError } from './error';
import { OptimusFailableSchema } from './schema';

export interface OptimusStringOptions {
  allowEmpty?: boolean;
  trim?: boolean;

  noNumber?: boolean;

  noArray?: boolean;
  arraySeparator?: string;

  noObject?: boolean;
}

export class OptimusString extends OptimusFailableSchema<
  string,
  OptimusStringOptions
> {
  protected transformInner(value: unknown): Result<string, OptimusSchemaError> {
    return OptimusValueType.match(value)
      .with(
        [P.union(OptimusValueType.Null, OptimusValueType.Undefined), P._],
        () => {
          return err(OptimusSchemaError.missingValue());
        },
      )
      .with([OptimusValueType.String, P.select()], (value) => {
        const trimmed = this.options.trim ? value.trim() : value;

        if (!this.options.allowEmpty && trimmed === '') {
          return err(OptimusSchemaError.missingValue());
        }

        return ok(trimmed);
      })
      .with(
        [OptimusValueType.Number, P.select()],
        (_) => !this.options.noNumber,
        (value) => {
          return ok(String(value));
        },
      )
      .with(
        [OptimusValueType.Array, P.select()],
        (_) => !this.options.noArray,
        (value) => {
          return ok(value.join(this.options.arraySeparator ?? ','));
        },
      )
      .with(
        [OptimusValueType.Object, P.select()],
        (_) => !this.options.noObject,
        (value) => {
          return ok(JSON.stringify(value));
        },
      )
      .otherwise(([type]) => err(OptimusSchemaError.unparsableValue(type)));
  }

  public allowEmpty(): this {
    this.updateOptions({ allowEmpty: true });

    return this;
  }

  public trim(): this {
    this.updateOptions({ trim: true });

    return this;
  }

  public noNumber(): this {
    this.updateOptions({ noNumber: true });

    return this;
  }

  public noArray(): this {
    this.updateOptions({ noArray: true });

    return this;
  }

  public arraySeparator(separator: string): this {
    this.updateOptions({ arraySeparator: separator });

    return this;
  }

  public noObject(): this {
    this.updateOptions({ noObject: true });

    return this;
  }

  public strict(): this {
    this.updateOptions({
      allowEmpty: false,
      trim: true,
      noNumber: true,
      noArray: true,
      noObject: true,
    });

    return this;
  }
}
