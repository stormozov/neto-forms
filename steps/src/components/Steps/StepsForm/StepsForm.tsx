import { MdAddBox } from "react-icons/md";
import "./StepsForm.css";

/**
 * Интерфейс, описывающий свойства компонента StepsForm
 */
interface StepsFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Компонент StepsForm
 * 
 * @description
 * Компонент отображает форму для ввода информации о шагах
 */
const StepsForm = ({ onSubmit }: StepsFormProps) => {
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
          required
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
          required 
        />
      </div>

      <button type="submit" className="steps-form__button">
        <MdAddBox />
      </button>
    </form>
  )
};

export default StepsForm;
