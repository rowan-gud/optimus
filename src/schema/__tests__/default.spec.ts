import { OptimusDefault } from '../default';
import { OptimusString } from '../string';

describe('class OptimusDefault', () => {
  it('should return the transformed value when the inner schema succeeds', () => {
    const schema = new OptimusDefault(new OptimusString(), 'default');

    expect(schema.transform('test')).toStrictEqual('test');
  });

  it('should return the default value when the inner schema fails', () => {
    const schema = new OptimusDefault(
      new OptimusString().noNumber(),
      'default',
    );

    expect(schema.transform(123)).toStrictEqual('default');
  });
});
