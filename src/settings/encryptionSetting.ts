import { isDevMode } from '/@/utils/env';

// 系统默认缓存时间(秒)
export const DEFAULT_CACHE_TIME = 60 * 60 * 2;

// 屏幕固定比例
export const ScreenFixedScale = 1;

// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

//系统缓存是否使用aes加密
export const enableStorageEncryption = !isDevMode();
