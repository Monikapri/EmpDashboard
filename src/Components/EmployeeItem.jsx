
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const EmployeeItem = React.memo(function EmployeeItem({
    employee,
    onSelect,
    onDelete,
    onEdit
}) {
    console.log("EmployeeItem rendered:", employee.name);
    const { theme } = useContext(AppContext);
    const cardClass = theme === "light"
        ? "bg-white text-gray-900 border-gray-200"
        : "bg-gray-700 text-gray-100 border-gray-600";


    return (
        <div className={`${cardClass} p-3 bg-gray-300 rounded flex justify-between items-center gap-3`}>
            <button
                type="button"
                className="flex-1 min-w-0 text-left"
                onClick={() => onSelect(employee)}
            >
                <p className="font-medium">{employee.name}</p>
                <p className="text-gray-600 text-sm break-words">
                    {employee.email}
                </p>
            </button>

            <div className="flex items-center">
                <button
                    type="button"
                    title="Edit employee"
                    aria-label={`Edit ${employee.name}`}
                    className="p-2 text-xl hover:text-blue-600"
                    onClick={() => onEdit(employee)}
                >
                    <FiEdit />
                </button>

                <button
                    type="button"
                    title="Delete employee"
                    aria-label={`Delete ${employee.name}`}
                    className="p-2 text-xl hover:text-red-600"
                    onClick={() => onDelete(employee.id)}
                >
                    <MdDeleteOutline />
                </button>
            </div>
        </div>
    );
});

export default EmployeeItem;
