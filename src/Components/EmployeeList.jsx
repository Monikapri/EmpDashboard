
import { useContext } from "react";
import AppContext from "../context/AppContext";
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
    const { theme } = useContext(AppContext);
    const isLight = theme === "light";

    return (
        <div
            className={`mx-auto mt-6 w-full max-w-4xl rounded-lg p-5 shadow ${isLight
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-gray-100"
                }`}
        >
            <h2 className="p-2 text-center text-lg font-bold">
                Employee List
            </h2>

            <div className="flex flex-col items-center gap-2 p-2 sm:flex-row">
                <input
                    type="text"
                    value={search}
                    ref={searchRef}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Search name or email..."
                    className={`w-full rounded border px-3 py-2 sm:w-60 ${isLight
                        ? "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        : "border-gray-600 bg-gray-700 text-white placeholder-gray-300"
                        }`}
                />

                <button
                    type="button"
                    onClick={() => searchRef?.current?.focus()}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Focus Search
                </button>

                <button
                    type="button"
                    onClick={onSort}
                    className="rounded bg-gray-600 px-4 py-2 text-white"
                >
                    {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
                </button>
            </div>

            <p
                className={`p-2 text-center text-sm ${isLight ? "text-gray-600" : "text-gray-300"
                    }`}
            >
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
                    <p className="text-center text-red-500">
                        No employees found
                    </p>
                )}
            </div>
        </div>
    );
}

export default EmployeeList;