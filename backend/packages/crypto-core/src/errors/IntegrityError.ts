export class IntegrityError extends Error {
  constructor() {
    super('CRYPTO.INTEGRITY_CHECK_FAILED');
    this.name = 'IntegrityError';
  }
}
