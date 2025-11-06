import React from "react";
import ConverterBackground from "../ConverterBackground/ConverterBackground";
import { hexToRgb, isValidHex } from "../../utils/colorUtils";
import RgbOutput from "../RgbOutput/RgbOutput";
import ConverterForm from "../ConverterForm/ConverterForm";

/**
 * Интерфейс, описывающий свойства компонента HexToRgbConverter
 */
interface State {
  inputHex: string;
  displayText: string;
  isError: boolean;
  backgroundColor: string;
}

/**
 * Компонент HexToRgbConverter
 * 
 * @description
 * Компонент HexToRgbConverter представляет конвертер HEX-кода в RGB-код.
 */
export default class HexToRgbConverter extends React.Component {
  state: State = {
    inputHex: "#9921ff",
    displayText: "rgb(153, 33, 255)",
    isError: false,
    backgroundColor: "#9921ff",
  };

  /**
   * Обработчик изменения значения в поле ввода HEX-кода
   * 
   * @param {string} value - текущее значение HEX-кода
   * 
   * @description
   * Обновляет состояние компонента с новым значением HEX-кода.
   */
  private _handleInputChange = (value: string) => {
    this.setState({ inputHex: value });
  };

  /**
   * Обработчик конвертации HEX-кода в RGB-код
   * 
   * @description
   * Проверяет валидность HEX-кода и конвертирует его в RGB-код.
   */
  private _handleConvert = () => {
    const { inputHex } = this.state;

    if (isValidHex(inputHex)) {
      const { r, g, b } = hexToRgb(inputHex)!;
      const rgbStr = `rgb(${r}, ${g}, ${b})`;

      this.setState({
        displayText: rgbStr,
        isError: false,
        backgroundColor: inputHex,
      });
    } else {
      this.setState({
        displayText: "Invalid hex code",
        isError: true,
        backgroundColor: "#dd4040ff",
      });
    }
  };

  /**
   * Обработчик отправки формы
   * 
   * @param {React.FormEvent} e - событие отправки формы
   */
  private _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this._handleConvert();
  };

  /**
   * Отображение компонента HexToRgbConverter
   */
  render() {
    const { inputHex, displayText, isError, backgroundColor } = this.state;
    return (
      <ConverterBackground backgroundColor={backgroundColor}>
        <h1>Hex To Rgb Converter</h1>
        <div className="converter-container">
          <ConverterForm
            value={inputHex}
            onChange={this._handleInputChange}
            onSubmit={this._handleSubmit}
            onBlur={this._handleConvert}
          />
          <RgbOutput isError={isError}>
            {displayText}
          </RgbOutput>
        </div>
      </ConverterBackground>
    );
  }
}
