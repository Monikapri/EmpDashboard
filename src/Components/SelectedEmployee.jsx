
import React from "react";

function SelectedEmployee({ employee, onClear }) {
    if (!employee) return null;

    return (
        <div className="shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">
            <h2 className="text-center font-bold text-lg mb-4">
                Selected Employee: {employee.name}
            </h2>

            <p>Name: {employee.name || "None"}</p>
            <p>Email: {employee.email || "None"}</p>
            <p>Phone: {employee.phone || "None"}</p>
            <p>Website: {employee.website || "None"}</p>
            <p>Company: {employee.company?.name || "None"}</p>

            <button
                type="button"
                onClick={onClear}
                className="mt-4 p-2 rounded text-white bg-gray-600"
            >
                Clear Selection
            </button>
        </div>
    );
}

export default SelectedEmployee;
