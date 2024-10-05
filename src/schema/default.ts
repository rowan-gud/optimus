import {
  OptimusAnyFailableSchema,
  OptimusFailableSchemaOutput,
  OptimusSchema,
} from './schema';

export class OptimusDefault<
  Schema extends OptimusAnyFailableSchema,
  DefaultValue,
> extends OptimusSchema<
  OptimusFailableSchemaOutput<Schema> | DefaultValue,
  never
> {
  constructor(
    private readonly schema: Schema,
    private readonly defaultValue: DefaultValue,
  ) {
    super();
  }

  protected transformInner(
    value: unknown,
  ): OptimusFailableSchemaOutput<Schema> | DefaultValue {
    return this.schema.transform(value).unwrapOr(this.defaultValue);
  }
}
