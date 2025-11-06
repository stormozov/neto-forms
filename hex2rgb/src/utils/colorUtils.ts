import type { Rgb } from "../shared/interfaces";

/**
 * Утилита для проверки валидности hex-кода
 * 
 * @param {string} hex - валидный hex-код
 * @returns {boolean} true, если hex-код валиден, иначе false
 */
export const isValidHex = (hex: string): boolean => {
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);
};

/**
 * Конвертирует hex-код в RGB
 * 
 * @param {string} hex - валидный hex-код
 * @returns {Rgb | null} RGB в формате объекта, если hex-код валиден, иначе null
 */
export const hexToRgb = (hex: string): Rgb | null => {
  if (!isValidHex(hex)) return null;

  let normalizedHex = hex.slice(1);
  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(normalizedHex.slice(0, 2), 16);
  const g = parseInt(normalizedHex.slice(2, 4), 16);
  const b = parseInt(normalizedHex.slice(4, 6), 16);

  return { r, g, b };
};
