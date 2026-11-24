/**
 * Skenario pengujian IntegrityError
 *
 * - harus merupakan turunan Error dengan nama 'IntegrityError'
 * - harus selalu membawa pesan yang sama, tanpa membedakan penyebab kegagalan
 */
import {IntegrityError} from '../IntegrityError';

describe('IntegrityError', () => {
  it('should be an Error named IntegrityError', () => {
    // Action
    const error = new IntegrityError();

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('IntegrityError');
  });

  it('should always carry the same generic message', () => {
    // Action
    const first = new IntegrityError();
    const second = new IntegrityError();

    // Assert
    expect(first.message).toBe('CRYPTO.INTEGRITY_CHECK_FAILED');
    expect(second.message).toBe(first.message);
  });
});
