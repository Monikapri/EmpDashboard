import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const EmployeeItem = React.memo(({ employee, onDelete, onSelect }) => {
    console.log("EmployeeItem rendered:", employee.name);

    return (
        <div onClick={() => onSelect(employee)}>
            <p>{employee.name}</p>
            <p>{employee.email}</p>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(employee.id);
                }}
            >
                <MdDeleteOutline />
            </button>
        </div>
    );
});

export default EmployeeItem;