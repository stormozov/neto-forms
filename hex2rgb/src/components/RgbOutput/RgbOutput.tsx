import React from "react";
import "./RgbOutput.css";

/**
 * Интерфейс, описывающий свойства компонента RgbOutput
 */
export interface RgbOutputProps {
  children: string;
  isError?: boolean;
}

/**
 * Компонент RgbOutput
 * 
 * @param {RgbOutputProps} props - свойства компонента
 * @param {string} props.children - текст внутри компонента
 * @param {boolean} props.isError - флаг ошибки
 * 
 * @description
 * Компонент RgbOutput отображает вывод RGB-кода в формате `rgb(r, g, b)`, либо
 * сообщение об ошибке в виде текста.
 */
const RgbOutput: React.FC<RgbOutputProps> = ({ children, isError = false }) => {
  return (
    <div className={`rgb-output ${isError ? "error" : ""}`}>
      {children}
    </div>
  );
};

export default RgbOutput;
