import { Hash } from "src/utils/Hash";
import { ValueTransformer } from "typeorm";

export class PasswordTransformer implements ValueTransformer {
  to(value) {
    if (value && value != "") return Hash.make(value);
    else return value;
  }

  from(value) {
    return value;
  }
}
