import {createCipheriv, createDecipheriv} from 'node:crypto';
import {IntegrityError} from '../errors/IntegrityError';

const ALGORITHM = 'aes-256-gcm';
const TAG_LENGTH = 16;

export interface AesGcmResult {
  ciphertext: Uint8Array;
  tag: Uint8Array;
}

export function aesGcmEncrypt(
  key: Uint8Array,
  iv: Uint8Array,
  plaintext: Uint8Array,
  aad: Uint8Array,
): AesGcmResult {
  const cipher = createCipheriv(ALGORITHM, key, iv, {
    authTagLength: TAG_LENGTH,
  });
  cipher.setAAD(aad);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return {ciphertext, tag: cipher.getAuthTag()};
}

export function aesGcmDecrypt(
  key: Uint8Array,
  iv: Uint8Array,
  ciphertext: Uint8Array,
  tag: Uint8Array,
  aad: Uint8Array,
): Uint8Array {
  try {
    const decipher = createDecipheriv(ALGORITHM, key, iv, {
      authTagLength: TAG_LENGTH,
    });
    decipher.setAuthTag(tag);
    decipher.setAAD(aad);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch {
    throw new IntegrityError();
  }
}
