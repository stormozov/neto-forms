import { FaPersonWalking } from "react-icons/fa6";
import { formatDistance, getTotalDistance } from "../../../utils/stepsUtils";
import type { IStepsInfo } from "../types";
import "./TotalDistance.css";

/**
 * Интерфейс, описывающий свойства компонента TotalDistance
 */
interface TotalDistanceProps {
  steps: IStepsInfo[];
}

/**
 * Компонент TotalDistance
 * 
 * @description
 * Компонент отображает общее расстояние по всем шагам
 */
const TotalDistance = ({ steps }: TotalDistanceProps) => {
  const total = getTotalDistance(steps);
  const formattedTotal = formatDistance(total, navigator.language);

  return total === 0 ? null : (
    <div className="total-distance">
      <FaPersonWalking className="total-distance__icon" />
      <p className="total-distance__label">Всего пройдено:</p>
      <span className="total-distance__value">{formattedTotal} км</span>
      <FaPersonWalking className="total-distance__icon" />
    </div>
  );
};

export default TotalDistance;
