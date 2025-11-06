// ConverterForm.tsx
import React from "react";
import HexInput, { type HexInputProps } from "../HexInput/HexInput";

/**
 * Интерфейс, описывающий свойства компонента ConverterForm
 */
interface ConverterFormProps extends HexInputProps {
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Компонент ConverterForm
 * 
 * @param {ConverterFormProps} props - свойства компонента
 * @param {string} props.value - текущее значение hex-кода
 * @param {string} props.placeholder - текст, отображаемый в поле ввода
 * по умолчанию
 * @param {Function} props.onChange - функция обратного вызова при изменении
 * значения hex-кода
 * @param {Function} props.onSubmit - функция обратного вызова при отправке
 * формы
 * @param {Function} props.onBlur - функция обратного вызова при потере фокуса
 */
const ConverterForm: React.FC<ConverterFormProps> = ({
  value,
  placeholder,
  onChange,
  onSubmit,
  onBlur,
}) => {
  return (
    <form onSubmit={onSubmit} className="converter-form">
      <HexInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </form>
  );
};

export default ConverterForm;
