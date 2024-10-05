import { OptimusOptional } from '../optional';
import { OptimusString } from '../string';

describe('class OptimusOptional', () => {
  it('should return undefined when the inner schema fails', () => {
    const schema = new OptimusOptional(new OptimusString().noNumber());

    expect(schema.transform(123)).toStrictEqual(undefined);
  });

  it('should return the transformed value when the inner schema succeeds', () => {
    const schema = new OptimusOptional(new OptimusString());

    expect(schema.transform('test')).toStrictEqual('test');
  });
});
