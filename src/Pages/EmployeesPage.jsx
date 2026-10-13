
import EmployeeList from "../Components/EmployeeList";
import SelectedEmployee from "../Components/SelectedEmployee";

function EmployeesPage({
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
}) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Employees</h2>

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
