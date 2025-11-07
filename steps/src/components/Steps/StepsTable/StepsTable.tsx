import { MdEditSquare } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { formatDate } from "../../../utils/formUtils";
import type { IStepsInfo } from "../types";
import "./StepsTable.css";

/**
 * Интерфейс, описывающий свойства компонента StepsTable
 */
export interface IStepsTableProps {
  steps: IStepsInfo[];
  onDelete: (dateToDelete: string) => void;
  onEdit: (step: IStepsInfo) => void;
}

/**
 * Компонент StepsTable
 * 
 * @description
 * Компонент отображает таблицу с информацией о шагах
 */
const StepsTable = ({ steps, onDelete, onEdit }: IStepsTableProps) => {
  const handleDeleteClick = (date: string, displayDate: string) => {
    if (confirm(`Удалить запись за ${displayDate}?`)) onDelete(date);
  };

  return steps.length ? (
    <table className="steps-table">
      <thead className="steps-table__header">
        <tr>
          <th>Дата</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody className="steps-table__body">
        {steps.map((step) => {
          const { date, distance } = step;
          const formattedDate = formatDate(date);

          return (
            <tr key={date} className="steps-table__row">
              <td>{formattedDate}</td>
              <td>{distance}</td>
              <td className="steps-table__actions">
                <button 
                  className="steps-table__edit" 
                  title="Изменить"
                  onClick={() => onEdit(step)}
                >
                  <MdEditSquare />
                </button>
                <button
                  className="steps-table__delete"
                  title="Удалить"
                  onClick={() => handleDeleteClick(date, formattedDate)}
                >
                  <RiDeleteBack2Fill />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default StepsTable;
