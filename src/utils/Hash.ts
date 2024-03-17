import * as bcrypt from "bcrypt";
import { info } from "console";

export class Hash {
  static make(plainText: string) {
    info("encrypt the given string ", __filename, "make()");
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText: string, hash: string) {
    info(
      "compare the encrypted string and the plain string ",
      __filename,
      "compare()"
    );
    return bcrypt.compareSync(plainText, hash);
  }
}
