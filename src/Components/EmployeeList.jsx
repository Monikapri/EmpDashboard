
import React from "react";
import EmployeeItem from "./EmployeeItem";

function EmployeeList({
    employees,
    search,
    onSearchChange,
    onFocusSearch,
    sortOrder,
    onSort,
    onSelect,
    onDelete,
    onEdit,
    loading,
    message,
    searchRef
}) {
    return (
        <div className="shadow rounded-lg w-full max-w-4xl mx-auto p-5 mt-6">
            <h2 className="text-center font-bold text-lg p-2">
                Employee List
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 items-center p-2">
                <input
                    type="text"
                    value={search}
                    ref={searchRef}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Search name or email..."
                    className="border rounded px-3 py-2 w-full sm:w-60"
                />


                <button
                    type="button"
                    onClick={onFocusSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Focus Search
                </button>

                <button
                    type="button"
                    onClick={onSort}
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                    {sortOrder ? "Sort A-Z" : "Sort Z-A"}
                </button>
            </div>

            <p className="text-center text-sm text-gray-600 p-2">
                {loading ? "Loading employees..." : message}
            </p>

            <div className="grid grid-cols-1 gap-3 p-3">
                {loading ? (
                    <p>Loading...</p>
                ) : employees.length > 0 ? (
                    employees.map(employee => (
                        <EmployeeItem
                            key={employee.id}
                            employee={employee}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                ) : (
                    <p className="text-red-500 text-center">
                        No employees found
                    </p>
                )}
            </div>
        </div>
    );
}

export default EmployeeList;
