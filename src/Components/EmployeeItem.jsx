
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const EmployeeItem = React.memo(function EmployeeItem({
    employee,
    onDelete,
    onSelect,
    onEdit
}) {
    console.log("EmployeeItem rendered:", employee.name);

    return (
        <div className="p-3 bg-gray-300 rounded hover:bg-gray-200 flex justify-between items-center gap-4">

            {/* Employee details */}
            <button
                type="button"
                onClick={() => onSelect(employee)}
                className="flex-1 min-w-0 text-left"
            >
                <p className="font-medium text-gray-800">
                    {employee.name}
                </p>

                <p className="text-gray-500 text-sm break-words">
                    {employee.email}
                </p>
            </button>

            {/* Action buttons */}
            <div className="flex items-center shrink-0">
                <button
                    type="button"
                    aria-label={`Edit ${employee.name}`}
                    title="Edit employee"
                    className="p-2 text-xl hover:text-blue-600"
                    onClick={() => onEdit(employee)}
                >
                    <FiEdit />
                </button>

                <button
                    type="button"
                    aria-label={`Delete ${employee.name}`}
                    title="Delete employee"
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
