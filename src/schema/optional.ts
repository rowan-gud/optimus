import { OptimusDefault } from './default';
import { OptimusAnyFailableSchema } from './schema';

export class OptimusOptional<
  Schema extends OptimusAnyFailableSchema,
> extends OptimusDefault<Schema, undefined> {
  constructor(schema: Schema) {
    super(schema, undefined);
  }
}
