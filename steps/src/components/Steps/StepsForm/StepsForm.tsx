import { MdAddBox, MdCancel, MdEditSquare } from "react-icons/md";
import type { IStepsInfo } from "../types";
import "./StepsForm.css";

/**
 * Интерфейс, описывающий свойства компонента StepsForm
 */
interface StepsFormProps {
  editingStep: IStepsInfo | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancelEdit?: () => void;
}

/**
 * Компонент StepsForm
 * 
 * @description
 * Компонент отображает форму для ввода информации о шагах
 */
const StepsForm = ({ onSubmit, editingStep, onCancelEdit }: StepsFormProps) => {
  return (
    <form onSubmit={onSubmit} className="steps-form">
      <div className="steps-form__group">
        <label
          className="steps-form__label"
          htmlFor="steps-form-date"
        >
          Дата (ДД.ММ.ГГ) <span>*</span>
        </label>
        <input 
          type="date" 
          className="steps-form__date" 
          id="steps-form-date" 
          name="steps-form-date"
          defaultValue={editingStep?.date || ''}
          required
          readOnly={!!editingStep}
        />
      </div>

      <div className="steps-form__group">
        <label
          className="steps-form__label"
          htmlFor="steps-form-distance"
        >
          Пройдено км <span>*</span>
        </label>
        <input
          type="number" 
          className="steps-form__distance" 
          id="steps-form-distance"
          name="steps-form-distance"
          min="0"
          step="0.1"
          placeholder="0.0"
          defaultValue={editingStep?.distance ?? ''}
          required 
        />
      </div>

      <div className="steps-form__actions">
        <button type="submit" className="steps-form__button">
          {editingStep 
            ? <><MdEditSquare /> Сохранить</>
            : <MdAddBox className="steps-form__button-icon" />
          }
        </button>
        {editingStep && onCancelEdit && (
          <button
            type="button"
            className="steps-form__button steps-form__button--cancel"
            onClick={onCancelEdit}
          >
            <MdCancel />
            Отмена
          </button>
        )}
      </div>
    </form>
  )
};

export default StepsForm;
