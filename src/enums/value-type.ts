import { match as tsPatternMatch } from 'ts-pattern';

export enum OptimusValueType {
  Array = 'array',
  Boolean = 'boolean',
  Null = 'null',
  Number = 'number',
  Object = 'object',
  String = 'string',
  Undefined = 'undefined',
  Unknown = 'unknown',
}

export namespace OptimusValueType {
  type OptimusValueTypeMap = {
    [OptimusValueType.Array]: unknown[];
    [OptimusValueType.Boolean]: boolean;
    [OptimusValueType.Null]: null;
    [OptimusValueType.Number]: number;
    [OptimusValueType.Object]: Record<string | number | symbol, unknown>;
    [OptimusValueType.String]: string;
    [OptimusValueType.Undefined]: undefined;
    [OptimusValueType.Unknown]: unknown;
  };

  type OptimusValueTypeUnion = {
    [Key in OptimusValueType]: [Key, OptimusValueTypeMap[Key]];
  }[OptimusValueType];

  export function fromValue(value: unknown): OptimusValueType {
    if (value === null) {
      return OptimusValueType.Null;
    }

    if (Array.isArray(value)) {
      return OptimusValueType.Array;
    }

    switch (typeof value) {
      case 'boolean':
        return OptimusValueType.Boolean;
      case 'number':
        return OptimusValueType.Number;
      case 'object':
        return OptimusValueType.Object;
      case 'string':
        return OptimusValueType.String;
      case 'undefined':
        return OptimusValueType.Undefined;
    }

    return OptimusValueType.Unknown;
  }

  export function match(value: unknown) {
    const type = fromValue(value);

    return tsPatternMatch([type, value] as OptimusValueTypeUnion);
  }

  export function isType<Types extends OptimusValueType[]>(
    value: unknown,
    ...types: Types
  ): value is OptimusValueTypeMap[Types[number]] {
    return types.includes(fromValue(value));
  }
}
