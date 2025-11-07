import type { IStepsInfo } from "../components/Steps/types";

/**
 * Извлекает и валидирует данные из формы шагов.
 * 
 * @param {HTMLFormElement} form - HTML-форма, из которой нужно извлечь данные
 * @returns {IStepsInfo | null}
 * - Объект с информацией о шагах, если данные валидны
 * - null, если данные невалидны
 */
export const parseStepsForm = (form: HTMLFormElement): IStepsInfo | null => {
  const formData = new FormData(form);

  const date = formData.get('steps-form-date') as string | null;
  const distanceStr = formData.get('steps-form-distance') as string | null;

  if (!date || !distanceStr) return null;

  const distance = parseFloat(distanceStr);
  if (isNaN(distance) || distance < 0) return null;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  return { date, distance };
};

/**
 * Форматирует дату в формате YYYY-MM-DD в формат DD.MM.YY
 * 
 * @param {string} isoDate - Дата в формате YYYY-MM-DD
 * @returns {string} - Дата в формате DD.MM.YY
 */
export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year.slice(2)}`;
};
