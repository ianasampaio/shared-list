export class UUIDGenerator {
  static generate() {
    return crypto.randomUUID().toString();
  }
}
