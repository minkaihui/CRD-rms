import { isDevMode } from '/@/utils/env';

// 系统默认缓存时间(秒)
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
