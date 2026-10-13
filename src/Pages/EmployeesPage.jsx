import { useContext } from "react";
import AppContext from "../context/AppContext";
import EmployeeList from "../Components/EmployeeList";
import SelectedEmployee from "../Components/SelectedEmployee";

function EmployeesPage(props) {
    const { theme } = useContext(AppContext);

    const {
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
        selectedEmployee,
        onClear,
        searchRef
    } = props;

    return (
        <div
            className={`min-h-screen rounded p-4 ${theme === "light"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-gray-900 text-gray-100"
                }`}
        >
            <h2 className="mb-4 text-xl font-bold">
                Employees
            </h2>

            <EmployeeList
                employees={employees}
                search={search}
                onSearchChange={onSearchChange}
                searchRef={searchRef}
                onFocusSearch={onFocusSearch}
                sortOrder={sortOrder}
                onSort={onSort}
                onSelect={onSelect}
                onDelete={onDelete}
                onEdit={onEdit}
                loading={loading}
                message={message}
            />

            <div className="mt-6">
                <SelectedEmployee
                    employee={selectedEmployee}
                    onClear={onClear}
                />
            </div>
        </div>
    );
}

export default EmployeesPage;