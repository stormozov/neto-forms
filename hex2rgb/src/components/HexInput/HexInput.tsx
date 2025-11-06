import React from "react";
import "./HexInput.css";

/**
 * Интерфейс, описывающий свойства компонента HexInput
 */
export interface HexInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

/**
 * Компонент HexInput
 * 
 * @param {HexInputProps} props - свойства компонента
 * @param {string} props.value - текущее значение hex-кода
 * @param {string} props.placeholder - текст, отображаемый в поле ввода
 * по умолчанию
 * @param {Function} props.onChange - функция обратного вызова при изменении
 * значения hex-кода
 * @param {Function} props.onBlur - функция обратного вызова при потере фокуса
 */
const HexInput: React.FC<HexInputProps> = ({
  value,
  placeholder = "#000000",
  onChange,
  onBlur,
}) => {
  return (
    <input
      type="text"
      className="hex-input"
      id="hex-input"
      placeholder={placeholder}
      value={value}
      maxLength={7}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default HexInput;
