import {createCipheriv, createDecipheriv} from 'node:crypto';

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
  const cipher = createCipheriv('aes-256-gcm', key, iv, {authTagLength: 16});
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
  const decipher = createDecipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  });
  decipher.setAuthTag(tag);
  decipher.setAAD(aad);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}
