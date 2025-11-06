import "./ConverterBackground.css";

/**
 * Интерфейс, описывающий свойства компонента ConverterBackground
 */
export interface ConverterBgProps {
  backgroundColor: string;
  children: React.ReactNode;
}

/**
 * Компонент ConverterBackground
 */
const ConverterBackground = ({
  backgroundColor,
  children
}: ConverterBgProps) => {
  return (
    <div className="converter-bg" style={{ backgroundColor }}>{children}</div>
  )
}

export default ConverterBackground;
