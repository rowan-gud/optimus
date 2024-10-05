import { OptimusSchemaErrorType } from '@/enums/schema-error-type';
import { OptimusValueType } from '@/enums/value-type';

export class OptimusSchemaError<Type extends string = string> extends Error {
  public static missingValue(): OptimusMissingValueError {
    return new OptimusMissingValueError();
  }

  public static unparsableValue(
    sourceType: OptimusValueType = OptimusValueType.Unknown,
  ): OptimusUnparsableValueError {
    return new OptimusUnparsableValueError(sourceType);
  }

  constructor(
    public readonly type: Type,
    message?: string,
  ) {
    super(message);

    this.type = type;
  }
}

export class OptimusMissingValueError extends OptimusSchemaError<OptimusSchemaErrorType.MissingValue> {
  constructor(message?: string) {
    super(OptimusSchemaErrorType.MissingValue, message);
  }
}

export class OptimusUnparsableValueError extends OptimusSchemaError<OptimusSchemaErrorType.UnparsableValue> {
  constructor(
    public readonly sourceType: OptimusValueType,
    message?: string,
  ) {
    super(OptimusSchemaErrorType.UnparsableValue, message);
  }
}
