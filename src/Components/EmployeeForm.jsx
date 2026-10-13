
import React from "react";

function EmployeeForm({
    userInfo,
    errors,
    editingEmployeeId,
    onChange,
    onSubmit,
    onCancel
}) {
    return (
        <div className="w-full min-w-0 rounded-lg p-4 sm:p-6 shadow">
            <h2 className="font-bold text-lg text-center mb-4">
                {editingEmployeeId !== null
                    ? "Edit Employee"
                    : "Employee Form"}
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
                {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" }
                ].map(field => (
                    <div key={field.name}>
                        <label
                            htmlFor={`employee-${field.name}`}
                            className="block text-sm font-medium mb-2"
                        >
                            {field.label}
                        </label>

                        <input
                            id={`employee-${field.name}`}
                            type={field.type}
                            name={field.name}
                            value={userInfo[field.name]}
                            onChange={onChange}
                            className="w-full min-w-0 rounded border p-2"
                        />

                        {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="rounded px-3 py-2 text-sm sm:text-base border"
                >
                    {editingEmployeeId !== null
                        ? "Update Employee"
                        : "Add Employee"}
                </button>

                {editingEmployeeId !== null && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded px-3 py-2 text-sm sm:text-base border"
                    >
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
}

export default EmployeeForm;
