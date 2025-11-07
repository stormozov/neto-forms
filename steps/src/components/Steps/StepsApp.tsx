import React from "react";
import { parseStepsForm } from "../../utils/formUtils";
import { addAndSortStep } from "../../utils/stepsUtils";
import "./StepsApp.css";
import StepsForm from "./StepsForm/StepsForm";
import StepsTable from "./StepsTable/StepsTable";
import type { IStepsInfo } from "./types";

/**
 * Интерфейс, описывающий состояние компонента StepsApp
 */
export interface IStepsAppState {
  steps: IStepsInfo[];
}

/**
 * Компонент StepsApp
 * 
 * @description
 * Компонент отображает форму для ввода информации о шагах и таблицу
 * с информацией о шагах.
 */
export default class StepsApp extends React.Component<object, IStepsAppState> {
  state: IStepsAppState = {
    steps: [],
  };

  /**
   * Обработчик события submit формы шагов
   * 
   * @description
   * Получает данные из формы, проверяет их валидность, и записывает их
   * в состояние (state.steps) компонента.
   * 
   * Если полученная из формы дата уще есть в состоянии (state.steps),
   * то перезаписывает соответствующую запись, при этом суммирует значения.
   * 
   * Перед записью данных в состояние, сортирует от новых дат
   * к старым (по убыванию).
   */
  private _handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newEntry = parseStepsForm(form);
    if (!newEntry) {
      console.warn("Submit failed: Invalid form data");
      return;
    }

    this.setState((prevState) => ({
      steps: addAndSortStep(prevState.steps, newEntry),
    }));

    form.reset();
  };

  /**
   * Обработчик события удаления шага
   * 
   * @param {string} dateToDelete - Дата удаляемого шага
   */
  private _handleDeleteStep = (dateToDelete: string) => {
    this.setState((prevState) => ({
      steps: prevState.steps.filter((step) => step.date !== dateToDelete),
    }));
  };

  /**
   * Рендер компонента
   */
  render () {
    return (
      <div className="steps-app">
        <StepsForm onSubmit={this._handleFormSubmit} />
        <StepsTable
          steps={this.state.steps} 
          onDelete={this._handleDeleteStep} 
        />
      </div>
    )
  }
}
