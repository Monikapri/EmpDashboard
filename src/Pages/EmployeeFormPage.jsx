
import EmployeeForm from "../Components/EmployeeForm";

function EmployeeFormPage({
    userInfo,
    errors,
    editingEmployeeId,
    onChange,
    onSubmit,
    onCancel
}) {
    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">
                {editingEmployeeId !== null
                    ? "Edit Employee"
                    : "Add Employee"}
            </h2>

            <EmployeeForm
                userInfo={userInfo}
                errors={errors}
                editingEmployeeId={editingEmployeeId}
                onChange={onChange}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </div>
    );
}

export default EmployeeFormPage;
