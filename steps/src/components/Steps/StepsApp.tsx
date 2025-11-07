import React from "react";
import { parseStepsForm } from "../../utils/formUtils";
import { computeUpdatedSteps } from "../../utils/stepsUtils";
import "./StepsApp.css";
import StepsForm from "./StepsForm/StepsForm";
import StepsTable from "./StepsTable/StepsTable";
import TotalDistance from "./TotalDistance/TotalDistance";
import type { IStepsAppState, IStepsInfo } from "./types";

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
    editingStep: null
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

    this.setState((prevState) => computeUpdatedSteps(prevState, newEntry));

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
   * Обработчик события редактирования шага
   * 
   * @param {IStepsInfo} step - Редактируемая запись
   */
  private _handleEditStep = (step: IStepsInfo) => {
    this.setState({ editingStep: step });
    // Форма сама заполнится, когда получит editingStep через пропсы
  };

  /**
   * Обработчик события отмены редактирования шага
   */
  private _handleCancelEdit = () => {
    this.setState({ editingStep: null });
  };  

  /**
   * Рендер компонента
   */
  render () {    
    return (
      <div className="steps-app">
        <StepsForm
          onSubmit={this._handleFormSubmit}
          editingStep={this.state.editingStep}
          onCancelEdit={this._handleCancelEdit}
        />

        <TotalDistance steps={this.state.steps} />

        <StepsTable
          steps={this.state.steps} 
          onDelete={this._handleDeleteStep} 
          onEdit={this._handleEditStep}
        />
      </div>
    )
  }
}
