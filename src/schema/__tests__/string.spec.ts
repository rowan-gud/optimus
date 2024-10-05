import { OptimusValueType } from '@/enums/value-type';

import { OptimusSchemaError } from '../error';
import { OptimusString } from '../string';

describe('class OptimusString', () => {
  describe('allowEmpty()', () => {
    it('should not allow empty strings by default', () => {
      const schema = new OptimusString();

      expect(schema.transform('')._unwrapErr()).toStrictEqual(
        OptimusSchemaError.missingValue(),
      );
    });

    it('should allow non-empty strings by default', () => {
      const schema = new OptimusString();

      expect(schema.transform('test')._unwrap()).toStrictEqual('test');
      expect(schema.transform(' ')._unwrap()).toStrictEqual(' ');
    });

    it('should allow empty strings when allowEmpty() is called', () => {
      const schema = new OptimusString().allowEmpty();

      expect(schema.transform('')._unwrap()).toStrictEqual('');
    });
  });

  describe('trim()', () => {
    it('should not trim strings by default', () => {
      const schema = new OptimusString();

      expect(schema.transform('  test  ')._unwrap()).toStrictEqual('  test  ');
    });

    it('should trim strings when trim() is called', () => {
      const schema = new OptimusString().trim();

      expect(schema.transform('  test  ')._unwrap()).toStrictEqual('test');
    });
  });

  describe('noNumber()', () => {
    it('should transform numbers by default', () => {
      const schema = new OptimusString();

      expect(schema.transform(123)._unwrap()).toStrictEqual('123');
    });

    it('should not transform numbers when noNumber() is called', () => {
      const schema = new OptimusString().noNumber();

      expect(schema.transform(123)._unwrapErr()).toStrictEqual(
        OptimusSchemaError.unparsableValue(OptimusValueType.Number),
      );
    });
  });

  describe('noArray()', () => {
    it('should transform arrays by default', () => {
      const schema = new OptimusString();

      expect(schema.transform([1, 2, 3])._unwrap()).toStrictEqual('1,2,3');
    });

    it('should not transform arrays when noArray() is called', () => {
      const schema = new OptimusString().noArray();

      expect(schema.transform([1, 2, 3])._unwrapErr()).toStrictEqual(
        OptimusSchemaError.unparsableValue(OptimusValueType.Array),
      );
    });
  });

  describe('arraySeparator()', () => {
    it('should join arrays with a comma by default', () => {
      const schema = new OptimusString();

      expect(schema.transform([1, 2, 3])._unwrap()).toStrictEqual('1,2,3');
    });

    it('should join arrays with the specified separator', () => {
      const schema = new OptimusString().arraySeparator('-');

      expect(schema.transform([1, 2, 3])._unwrap()).toStrictEqual('1-2-3');
    });
  });

  describe('noObject()', () => {
    it('should transform objects by default', () => {
      const schema = new OptimusString();

      expect(schema.transform({ key: 'value' })._unwrap()).toStrictEqual(
        '{"key":"value"}',
      );
    });

    it('should not transform objects when noObject() is called', () => {
      const schema = new OptimusString().noObject();

      expect(schema.transform({ key: 'value' })._unwrapErr()).toStrictEqual(
        OptimusSchemaError.unparsableValue(OptimusValueType.Object),
      );
    });
  });
});
