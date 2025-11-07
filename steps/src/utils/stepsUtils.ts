import type { IStepsAppState, IStepsInfo } from "../components/Steps/types";

/**
 * Обновляет или добавляет запись в список шагов.
 * 
 * @param {IStepsInfo[]} steps - Список шагов
 * @param {IStepsInfo} newStep - Новая запись
 * 
 * @returns новый массив записей (без мутации исходного)
 */
export const upsertStep = (
  steps: IStepsInfo[], newStep: IStepsInfo
): IStepsInfo[] => {
  const existingIndex = steps.findIndex((step) => step.date === newStep.date);

  let updatedSteps: IStepsInfo[];

  if (existingIndex !== -1) {
    // Обновляем существующую запись
    updatedSteps = steps.map((step, idx) =>
      idx === existingIndex
        ? { ...step, distance: step.distance + newStep.distance }
        : step
    );
  } else {
    // Добавляем новую запись
    updatedSteps = [...steps, newStep];
  }

  return updatedSteps;
};

/**
 * Сортирует шаги от новых дат к старым (по убыванию).
 * Формат даты: YYYY-MM-DD
 * 
 * @param {IStepsInfo[]} steps - Список шагов
 * @returns {IStepsInfo[]} новый массив записей (без мутации исходного)
 */
export const sortStepsByDateDesc = (steps: IStepsInfo[]): IStepsInfo[] => {
  return [...steps].sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * Объединяет добавление и сортировку.
 * 
 * @param {IStepsInfo[]} steps - Список шагов
 * @param {IStepsInfo} newStep - Новая запись
 * 
 * @returns {IStepsInfo[]} новый массив записей (без мутации исходного)
 */
export const addAndSortStep = (
  steps: IStepsInfo[], newStep: IStepsInfo
): IStepsInfo[] => {
  const stepsAfterUpsert = upsertStep(steps, newStep);
  return sortStepsByDateDesc(stepsAfterUpsert);
};

/**
 * Обновляет состояние при сохранении шагов.
 * 
 * @param {IStepsAppState} prevState - Предыдущее состояние
 * @param {IStepsInfo} newEntry - Новая запись
 * 
 * @returns {IStepsAppState} Обновленное состояние
 */
export const computeUpdatedSteps = (
  prevState: IStepsAppState,
  newEntry: IStepsInfo
): IStepsAppState => {
  let updatedSteps: IStepsInfo[];

  if (prevState.editingStep) {
    updatedSteps = prevState.steps.map(step =>
      step.date === prevState.editingStep!.date ? newEntry : step
    );
  } else {
    updatedSteps = addAndSortStep(prevState.steps, newEntry);
  }

  return {
    steps: updatedSteps,
    editingStep: null,
  };
};

/**
 * Вычисляет общее расстояние по всем шагам.
 * 
 * @param {IStepsInfo[]} steps - Список шагов
 * @returns {number} Общее расстояние
 */
export const getTotalDistance = (steps: IStepsInfo[]): number => {
  return steps.reduce((total, step) => total + step.distance, 0);
};

/**
 * Форматирует расстояние в километрах.
 * 
 * @param {number} distance - Расстояние в метрах
 * @param {string} locale - Локализация (по умолчанию "ru-RU")
 * 
 * @returns {string} Форматированное расстояние
 */
export const formatDistance = (
  distance: number, 
  locale: string = "ru-RU"
): string => {
  return distance.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
