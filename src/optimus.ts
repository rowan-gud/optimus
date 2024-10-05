import { OptimusString } from './schema/string';

export class Optimus {
  public string(): OptimusString {
    return new OptimusString();
  }
}

export function string(): OptimusString {
  return new OptimusString();
}
