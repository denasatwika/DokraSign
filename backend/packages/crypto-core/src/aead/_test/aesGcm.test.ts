/**
 * Skenario pengujian aesGcm
 *
 * - aesGcmEncrypt
 *   - harus menghasilkan ciphertext dan authentication tag yang identik dengan
 *     test vector McGrew & Viega Test Case 16 (AES-256, IV 96-bit, dengan AAD)
 *
 * - aesGcmDecrypt
 *   - harus mengembalikan plaintext asli dari ciphertext dan tag Test Case 16
 */
import {aesGcmDecrypt, aesGcmEncrypt} from '../aesGcm';

const hex = (value: string): Buffer => Buffer.from(value, 'hex');
const toHex = (bytes: Uint8Array): string => Buffer.from(bytes).toString('hex');

const TC16 = {
  key: 'feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308',
  iv: 'cafebabefacedbaddecaf888',
  plaintext: [
    'd9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a72',
    '1c3c0c95956809532fcf0e2449a6b525b16aedf5aa0de657ba637b39',
  ].join(''),
  aad: 'feedfacedeadbeeffeedfacedeadbeefabaddad2',
  ciphertext: [
    '522dc1f099567d07f47f37a32a84427d643a8cdcbfe5c0c97598a2bd2555d1aa',
    '8cb08e48590dbb3da7b08b1056828838c5f61e6393ba7a0abcc9f662',
  ].join(''),
  tag: '76fc6ece0f4e1768cddf8853bb2d551b',
};

describe('aesGcmEncrypt', () => {
  it('should produce ciphertext and tag matching McGrew & Viega Test Case 16', () => {
    // Arrange
    const key = hex(TC16.key);
    const iv = hex(TC16.iv);
    const plaintext = hex(TC16.plaintext);
    const aad = hex(TC16.aad);

    // Action
    const result = aesGcmEncrypt(key, iv, plaintext, aad);

    // Assert
    expect(toHex(result.ciphertext)).toBe(TC16.ciphertext);
    expect(toHex(result.tag)).toBe(TC16.tag);
  });
});

describe('aesGcmDecrypt', () => {
  it('should recover the original plaintext of McGrew & Viega Test Case 16', () => {
    // Arrange
    const key = hex(TC16.key);
    const iv = hex(TC16.iv);
    const ciphertext = hex(TC16.ciphertext);
    const tag = hex(TC16.tag);
    const aad = hex(TC16.aad);

    // Action
    const plaintext = aesGcmDecrypt(key, iv, ciphertext, tag, aad);

    // Assert
    expect(toHex(plaintext)).toBe(TC16.plaintext);
  });
});
