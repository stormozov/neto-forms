/**
 * Интерфейс, описывающий информацию о объекте шага
 */
export interface IStepsInfo {
  date: string;
  distance: number;
}

/**
 * Интерфейс, описывающий состояние компонента StepsApp
 */
export interface IStepsAppState {
  steps: IStepsInfo[];
  editingStep: IStepsInfo | null;
}
